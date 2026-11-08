// lib/codearn-ai/guardrails.ts

const FORBIDDEN_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  // Unverified certifications
  { pattern: /\bSOC\s*2\b/i, reason: "Unverified certification claim" },
  { pattern: /\bISO\s*27001\b/i, reason: "Unverified certification claim" },
  { pattern: /\bGDPR[-\s]?compliant\b/i, reason: "Unverified compliance claim" },
  { pattern: /\bHIPAA[-\s]?compliant\b/i, reason: "Unverified compliance claim" },

  // Hallucinations
  { pattern: /\bI\s+think\s+CodEarn\b/i, reason: "Speculative claim" },
  { pattern: /\bprobably\s+CodEarn\b/i, reason: "Speculative claim" },
  { pattern: /\bCodEarn\s+may\s+have\b/i, reason: "Speculative claim" },

  // Leaks
  { pattern: /system\s+prompt/i, reason: "Attempted system prompt reveal" },
  { pattern: /internal\s+instructions/i, reason: "Attempted system prompt reveal" },
  
  // Impersonation
  { pattern: /\b(I\s+am\s+Muhammad\s+Bilal)\b/i, reason: "Impersonation attempt" },
];

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

function buildSafeFallback(reason: string): string {
  if (reason.includes("system prompt") || reason.includes("internal")) {
    return "I can help with questions about CodEarn, its services, and how we can help your business — but I can't provide internal instructions.";
  }
  return "I don't have verified information about that yet. You can reach the CodEarn team at hello@codearntech.com or WhatsApp us for details.";
}

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

export function sanitizeUserInput(message: string): string {
  return message.trim().replace(/\s+/g, " ").slice(0, 500);
}