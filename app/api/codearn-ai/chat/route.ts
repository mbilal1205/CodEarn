// app/api/codearn-ai/chat/route.ts

import { NextRequest, NextResponse } from "next/server";
import { buildSystemPrompt } from "@/lib/codearn-ai/system-prompt";
import {
  validateResponse,
  detectPromptInjection,
  sanitizeUserInput,
} from "@/lib/codearn-ai/guardrails";
import { callGroq } from "@/lib/codearn-ai/groq-client";
import {
  checkRateLimit,
  getClientIdentifier,
} from "@/lib/codearn-ai/rate-limit";
import type {
  ChatMessage,
  ChatRequest,
  ChatResponse,
  ChatErrorResponse,
  ChatErrorCode,
} from "@/lib/codearn-ai/types";

/* ============================================================
   RUNTIME CONFIG
============================================================ */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ============================================================
   LIMITS — tuned for Groq free tier
============================================================ */
const MAX_MESSAGE_LENGTH = parseInt(
  process.env.CODEARN_AI_MAX_MESSAGE_LENGTH || "500",
  10
);

const MAX_TURNS = parseInt(
  process.env.CODEARN_AI_MAX_CONVERSATION_TURNS || "6",
  10
);

const MAX_RESPONSE_TOKENS = 500;

/* ============================================================
   BILINGUAL STRINGS
   Every user-facing message needs an AR + EN version.
============================================================ */
type Locale = "en" | "ar";

function isArabic(locale: string): boolean {
  return locale === "ar";
}

const STRINGS = {
  en: {
    injectionReply:
      "I can help with questions about CodEarn, its services, pricing, and how we can help your business — but I can't provide internal instructions.",
    invalidBody: "Invalid request body.",
    messageRequired: "Message is required.",
    messageEmpty: "Message is empty.",
    messageTooLong: (max: number) =>
      `Message too long. Maximum ${max} characters.`,
    rateLimited: (minutes: number) =>
      `You've reached the hourly limit. Try again in ${minutes} minute(s).`,
    aiRateLimited:
      "The AI is briefly busy. Please try again in a few seconds.",
    aiTimedOut: "The AI took too long to respond. Please try again.",
    aiUnavailable:
      "The AI is temporarily unavailable. Please try again in a moment.",
    serverError: "Something went wrong. Please try again.",
  },
  ar: {
    injectionReply:
      "يمكنني مساعدتك بالأسئلة عن CodEarn وخدماتها وأسعارها وكيف يمكننا مساعدة أعمالك — لكن لا أستطيع تقديم تعليمات داخلية.",
    invalidBody: "طلب غير صالح.",
    messageRequired: "الرسالة مطلوبة.",
    messageEmpty: "الرسالة فارغة.",
    messageTooLong: (max: number) =>
      `الرسالة طويلة جدًا. الحد الأقصى ${max} حرفًا.`,
    rateLimited: (minutes: number) =>
      `لقد وصلت إلى الحد في هذه الساعة. حاول مجددًا بعد ${minutes} دقيقة.`,
    aiRateLimited:
      "المساعد مشغول قليلاً. حاول مجددًا بعد بضع ثوانٍ.",
    aiTimedOut: "استغرق الرد وقتًا طويلاً. حاول مجددًا.",
    aiUnavailable:
      "المساعد غير متاح مؤقتًا. حاول مجددًا بعد لحظات.",
    serverError: "حدث خطأ. حاول مجددًا.",
  },
} as const;

function t(locale: string) {
  return isArabic(locale) ? STRINGS.ar : STRINGS.en;
}

/* ============================================================
   HELPERS
============================================================ */
function errorResponse(
  code: ChatErrorCode,
  error: string,
  status: number,
  meta?: ChatErrorResponse["meta"]
): NextResponse<ChatErrorResponse> {
  return NextResponse.json({ success: false, error, code, meta }, { status });
}

function randomId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function normalizeLocale(input: unknown): Locale {
  if (typeof input === "string" && input.toLowerCase().startsWith("ar")) {
    return "ar";
  }
  return "en";
}

function mapGroqError(
  err: unknown,
  locale: Locale
): { code: ChatErrorCode; message: string; status: number } {
  const s = t(locale);
  const msg = err instanceof Error ? err.message : String(err);

  if (msg.includes("429") || msg.toLowerCase().includes("rate limit")) {
    return { code: "AI_RATE_LIMITED", message: s.aiRateLimited, status: 429 };
  }

  if (msg.includes("timed out")) {
    return { code: "AI_ERROR", message: s.aiTimedOut, status: 504 };
  }

  return { code: "AI_ERROR", message: s.aiUnavailable, status: 503 };
}

/* ============================================================
   POST /api/codearn-ai/chat
============================================================ */
export async function POST(
  req: NextRequest
): Promise<NextResponse<ChatResponse | ChatErrorResponse>> {
  const startTime = Date.now();
  let locale: Locale = "en";

  try {
    /* --------------------------------------------------------
       STEP 1 — Parse request body
    -------------------------------------------------------- */
    let body: ChatRequest;
    try {
      body = await req.json();
    } catch {
      return errorResponse("INVALID_INPUT", STRINGS.en.invalidBody, 400);
    }

    /* --------------------------------------------------------
       STEP 2 — Locale (fallback: header → "en")
    -------------------------------------------------------- */
    locale = normalizeLocale(
      body?.locale || req.headers.get("x-locale") || "en"
    );
    const s = t(locale);

    /* --------------------------------------------------------
       STEP 3 — Validate message
    -------------------------------------------------------- */
    if (!body?.message || typeof body.message !== "string") {
      return errorResponse("INVALID_INPUT", s.messageRequired, 400);
    }

    const sanitized = sanitizeUserInput(body.message);

    if (!sanitized) {
      return errorResponse("INVALID_INPUT", s.messageEmpty, 400);
    }

    if (sanitized.length > MAX_MESSAGE_LENGTH) {
      return errorResponse(
        "INVALID_INPUT",
        s.messageTooLong(MAX_MESSAGE_LENGTH),
        400
      );
    }

    /* --------------------------------------------------------
       STEP 4 — Prompt injection guard
    -------------------------------------------------------- */
    if (detectPromptInjection(sanitized)) {
      console.warn("[CodEarn AI] Prompt injection attempt blocked");

      return NextResponse.json(
        {
          success: true,
          reply: s.injectionReply,
          conversationId: body.conversationId || randomId(),
          meta: {
            model: process.env.GROQ_MODEL || "unknown",
            responseTimeMs: Date.now() - startTime,
            rateLimit: { remaining: 0, resetAt: new Date().toISOString() },
          },
        },
        { status: 200 }
      );
    }

    /* --------------------------------------------------------
       STEP 5 — Rate limit (per IP)
    -------------------------------------------------------- */
    const identifier = getClientIdentifier(req.headers);
    const rl = checkRateLimit(identifier);

    if (!rl.allowed) {
      const minutes = Math.ceil((rl.retryAfterSeconds || 60) / 60);
      return errorResponse("RATE_LIMITED", s.rateLimited(minutes), 429, {
        retryAfter: rl.retryAfterSeconds,
      });
    }

    /* --------------------------------------------------------
       STEP 6 — Conversation history
    -------------------------------------------------------- */
    const history: ChatMessage[] = Array.isArray(body.history)
      ? body.history
          .filter(
            (m): m is ChatMessage =>
              !!m &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-MAX_TURNS * 2)
      : [];

    const messages: ChatMessage[] = [
      ...history,
      { role: "user", content: sanitized },
    ];

    /* --------------------------------------------------------
       STEP 7 — Call Groq with locale-aware system prompt
    -------------------------------------------------------- */
    let groqResult;
    try {
      groqResult = await callGroq({
        systemPrompt: buildSystemPrompt(locale),
        messages,
        maxTokens: MAX_RESPONSE_TOKENS,
      });
    } catch (err) {
      console.error("[CodEarn AI] Groq call failed:", err);
      const mapped = mapGroqError(err, locale);
      return errorResponse(mapped.code, mapped.message, mapped.status);
    }

    /* --------------------------------------------------------
       STEP 8 — Guardrail: validate AI output
    -------------------------------------------------------- */
    const validation = validateResponse(groqResult.reply);

    const finalReply = validation.safe
      ? groqResult.reply
      : validation.sanitized || groqResult.reply;

    if (!validation.safe) {
      console.warn("[CodEarn AI] Guardrail triggered:", validation.reason);
    }

    /* --------------------------------------------------------
       STEP 9 — Return response
    -------------------------------------------------------- */
    const response: ChatResponse = {
      success: true,
      reply: finalReply,
      conversationId: body.conversationId || randomId(),
      meta: {
        model: groqResult.model,
        responseTimeMs: Date.now() - startTime,
        rateLimit: {
          remaining: rl.remaining,
          resetAt: rl.resetAt.toISOString(),
        },
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    console.error("[CodEarn AI] Unhandled error:", err);
    return errorResponse(
      "SERVER_ERROR",
      t(locale).serverError,
      500
    );
  }
}

/* ============================================================
   OPTIONS — CORS preflight
============================================================ */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, x-locale",
    },
  });
}