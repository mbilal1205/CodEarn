// lib/codearn-ai/knowledge/routes.ts

/**
 * All public routes on the CodEarn website (English + Arabic).
 * The AI uses this to give users accurate, clickable links.
 */

export interface SiteRoute {
  path: string;
  title: string;
  description: string;
  keywords: string[];
}

export const routes: SiteRoute[] = [
  /* ── Home ─────────────────────────────────────────────── */
  {
    path: "/",
    title: "Home",
    description:
      "CodEarn homepage — remote-first software engineering studio for SaaS, web, mobile, and AI automation.",
    keywords: ["home", "main", "landing"],
  },

  /* ── Company ──────────────────────────────────────────── */
  {
    path: "/about",
    title: "About",
    description:
      "Who CodEarn is, how we work, and the team behind the studio.",
    keywords: ["about", "company", "who we are", "team", "mission"],
  },
  {
    path: "/founder",
    title: "Founder Story",
    description:
      "Muhammad Bilal's journey, beliefs, and why he built CodEarn.",
    keywords: ["founder", "muhammad bilal", "bilal", "story", "journey"],
  },
  {
    path: "/contact",
    title: "Contact",
    description:
      "Get in touch with CodEarn via email or WhatsApp for projects, partnerships, and support.",
    keywords: ["contact", "email", "whatsapp", "reach out", "get in touch"],
  },

  /* ── Services ─────────────────────────────────────────── */
  {
    path: "/services",
    title: "Services",
    description:
      "Custom SaaS platforms, web and mobile apps, AI & automation, and maintenance — what we actually build.",
    keywords: [
      "services",
      "solutions",
      "development",
      "custom software",
      "saas",
      "web apps",
      "mobile apps",
      "ai",
      "automation",
    ],
  },
  {
    path: "/pricing",
    title: "Pricing",
    description:
      "Transparent pricing for websites, web apps, mobile apps, SaaS, AI automation, and maintenance plans.",
    keywords: [
      "pricing",
      "cost",
      "price",
      "how much",
      "budget",
      "quote",
    ],
  },
  {
    path: "/case-studies",
    title: "Case Studies",
    description:
      "Real projects delivered by CodEarn — including Buzzly Publicity (Bahrain) and Hassan Digital Skills.",
    keywords: [
      "case studies",
      "portfolio",
      "work",
      "clients",
      "projects",
      "buzzly",
      "hds",
    ],
  },

  /* ── Content ──────────────────────────────────────────── */
  {
    path: "/blogs",
    title: "Blog",
    description:
      "Notes from the CodEarn team — engineering, product, and founder thoughts.",
    keywords: ["blog", "articles", "posts", "writing", "insights"],
  },

  /* ── AI ───────────────────────────────────────────────── */
  {
    path: "/codearn-ai",
    title: "CodEarn AI",
    description:
      "The official AI assistant for CodEarn — ask anything about services, pricing, and the studio.",
    keywords: ["ai", "assistant", "chat", "codearn ai"],
  },

  /* ── Legal ────────────────────────────────────────────── */
  {
    path: "/privacy-policy",
    title: "Privacy Policy",
    description: "How CodEarn collects, uses, and protects your data.",
    keywords: ["privacy", "data", "policy"],
  },
  {
    path: "/terms",
    title: "Terms of Service",
    description: "Terms governing the use of CodEarn's website and services.",
    keywords: ["terms", "service", "legal"],
  },
  {
    path: "/cookies",
    title: "Cookie Policy",
    description: "Information about cookies and tracking on CodEarn websites.",
    keywords: ["cookies", "tracking"],
  },
];

/* ============================================================
   EXTERNAL LINKS — public URLs outside codearntech.com
============================================================ */
export const externalLinks = {
  whatsapp: {
    url: "https://wa.me/971541757432",
    title: "WhatsApp",
    description:
      "Chat with the CodEarn team directly on WhatsApp — quickest way to start a project conversation.",
  },
  linkedin: {
    url: "https://www.linkedin.com/company/codearntech",
    title: "LinkedIn",
    description: "CodEarn's LinkedIn — company updates and founder posts.",
  },
  github: {
    url: "https://github.com/codearntech",
    title: "GitHub",
    description: "CodEarn's public code and open-source work.",
  },
};

/* ============================================================
   HELPERS
============================================================ */
export function findRouteByKeyword(query: string): SiteRoute | null {
  const lower = query.toLowerCase();
  return (
    routes.find((r) =>
      r.keywords.some((kw) => lower.includes(kw.toLowerCase()))
    ) || null
  );
}

export function getSiteSummary(): string {
  return routes
    .map((r) => `• ${r.path} — ${r.title}: ${r.description}`)
    .join("\n");
}