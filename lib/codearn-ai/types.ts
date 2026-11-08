// lib/codearn-ai/types.ts

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  history?: ChatMessage[];
  isRegenerate?: boolean;
  locale?: string; // 👈 Naya: en ya ar
}

export interface ChatResponse {
  success: true;
  reply: string;
  conversationId: string;
  meta: {
    model: string;
    responseTimeMs: number;
    rateLimit: {
      remaining: number;
      resetAt: string;
    };
  };
}

export type ChatErrorCode =
  | "INVALID_INPUT"
  | "RATE_LIMITED"
  | "AI_RATE_LIMITED"
  | "PROMPT_INJECTION"
  | "AI_ERROR"
  | "SERVER_ERROR";

export interface ChatErrorResponse {
  success: false;
  error: string;
  code: ChatErrorCode;
  meta?: {
    retryAfter?: number;
  };
}

export type ApiResponse = ChatResponse | ChatErrorResponse;