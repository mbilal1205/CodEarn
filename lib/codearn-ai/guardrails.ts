// lib/codearn-ai/guardrails.ts

/**
 * Response guardrails — validates AI output before sending to the user.
 * Catches hallucinations and forbidden phrases.
 */

const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  // Unverified claims
  {
    pattern: /\bSOC\s*2\b/i,
    reason: "Unverified certification claim",
  },
  {
    pattern: /\bISO\s*27001\b/i,
    reason: "Unverified certification claim",
  },
  {
    pattern: /\bGDPR[-\s]?compliant\b/i,
    reason: "Unverified compliance claim",
  },
  {
    pattern: /\bHIPAA[-\s]?compliant\b/i,
    reason: "Unverified compliance claim",
  },

  // Hallucination markers
  {
    pattern: /\bI\s+think\s+(CodEarn|GigThink|Muhammad)\b/i,
    reason: "Speculative claim about CodEarn",
  },
  {
    pattern: /\bprobably\s+(CodEarn|GigThink)\b/i,
    reason: "Speculative claim about CodEarn",
  },
  {
    pattern: /\b(CodEarn|GigThink)\s+may\s+have\b/i,
    reason: "Speculative claim about CodEarn",
  },

  // System prompt leak
  {
    pattern: /system\s+prompt/i,
    reason: "Attempted system prompt reveal",
  },
  {
    pattern: /internal\s+instructions/i,
    reason: "Attempted system prompt reveal",
  },

  // Impersonation
  {
    pattern: /\b(I\s+am\s+Muhammad\s+Bilal)\b/i,
    reason: "Impersonation attempt",
  },
];

/**
 * Check if a response is safe to send.
 */
export function validateResponse(response: string): {
  safe: boolean;
  reason?: string;
  sanitized?: string;
} {
  for (const { pattern, reason } of FORBIDDEN_PATTERNS) {
    if (pattern.test(response)) {
      return {
        safe: false,
        reason,
        sanitized: buildSafeFallback(reason),
      };
    }
  }

  return { safe: true };
}

/**
 * Fallback response when guardrail triggers.
 */
function buildSafeFallback(reason: string): string {
  if (reason.includes("system prompt") || reason.includes("internal")) {
    return "I can help with questions about CodEarn, its products, services, and founder — but I can't provide internal instructions.";
  }

  return "I don't have verified information about that yet. You can reach the CodEarn team at hello@codearntech.com for details.";
}

/**
 * Detects prompt injection attempts from user input.
 */
export function detectPromptInjection(message: string): boolean {
  const injectionPatterns = [
    /ignore\s+(all\s+)?(previous|prior|above)\s+instructions/i,
    /forget\s+(everything|your\s+rules|your\s+instructions)/i,
    /you\s+are\s+now\s+(a|an)?\s*(?!CodEarn)/i,
    /reveal\s+(your\s+)?(system\s+)?prompt/i,
    /what\s+are\s+your\s+instructions/i,
    /repeat\s+after\s+me/i,
    /jailbreak/i,
    /DAN\s+mode/i,
  ];

  return injectionPatterns.some((pattern) => pattern.test(message));
}

/**
 * Sanitizes user input before sending to AI.
 */
export function sanitizeUserInput(message: string): string {
  return message
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, 500); // Hard cap at 500 chars
}