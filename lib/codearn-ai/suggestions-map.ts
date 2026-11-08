// lib/codearn-ai/suggestions-map.ts

interface SuggestionRule {
  keywords: string[];
  followUps: string[];
}

const RULES: SuggestionRule[] = [
  {
    keywords: ["website", "web", "site", "web app"],
    followUps: [
      "How much does a business website cost?",
      "Do you build custom web applications?",
      "Can you integrate APIs into my website?",
    ],
  },
  {
    keywords: ["mobile", "app", "react native", "ios", "android"],
    followUps: [
      "How much does a mobile app cost?",
      "Do you handle App Store submissions?",
      "Do you build offline-first apps?",
    ],
  },
  {
    keywords: ["saas", "platform", "subscription", "multi-tenant"],
    followUps: [
      "Can you build a multi-tenant SaaS platform?",
      "How long does SaaS development take?",
      "Do you help with product scoping?",
    ],
  },
  {
    keywords: ["ai", "automation", "chatbot", "whatsapp"],
    followUps: [
      "Can you build a WhatsApp AI chatbot?",
      "Do you integrate OpenAI into business tools?",
      "How does AI automation help my business?",
    ],
  },
  {
    keywords: ["price", "cost", "pricing", "budget", "how much"],
    followUps: [
      "What is included in the Business package?",
      "Do you offer express delivery?",
      "Can I get a custom quote?",
    ],
  },
  {
    keywords: ["case study", "work", "portfolio", "buzzly", "hds"],
    followUps: [
      "Can I see the Buzzly Publicity case study?",
      "What projects have you delivered?",
      "Do you have experience with bilingual sites?",
    ],
  },
  {
    keywords: ["contact", "email", "whatsapp", "call", "reach"],
    followUps: [
      "What is your WhatsApp number?",
      "How can I book a strategy call?",
      "Do you offer free consultations?",
    ],
  },
  {
    keywords: ["uae", "dubai", "saudi", "riyadh", "bahrain", "gulf"],
    followUps: [
      "Do you work with clients in the UAE?",
      "Are you a remote-first studio?",
      "Can you support Arabic and English?",
    ],
  },
];

const FALLBACK: string[] = [
  "What services does CodEarn offer?",
  "How much does a project cost?",
  "Can I see your past work?",
];

export function getFollowUps(aiResponse: string): string[] {
  const lower = aiResponse.toLowerCase();
  for (const rule of RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule.followUps;
    }
  }
  return FALLBACK;
}