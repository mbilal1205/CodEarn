// lib/codearn-ai/knowledge/company.ts

export const company = {
  name: "CodEarn",
  legalName: "CodEarn Technology Company",
  founded: "2024",
  founder: "Muhammad Bilal",
  website: "https://www.codearntech.com",
  location: "Pakistan — building globally",

  focus:
    "Software products, SaaS platforms, web applications, custom software development and AI integrations.",

  mission:
    "Building software, products and technology around real problems.",

  currentLiveProduct: "GigThink",

  productsInDevelopment: "Not publicly announced yet.",

  /**
   * Critical rules for the AI — these will be enforced in the system prompt.
   * Do not remove these.
   */
  importantRules: [
    "CodEarn currently has ONE publicly live product: GigThink.",
    "Do not claim any other product is live.",
    "Do not invent products, customers, revenue, team members or certifications.",
    "If information is not in this knowledge base, say 'I don't have verified information about that yet.'",
  ],

  socials: {
    linkedin: "https://linkedin.com/company/codearn",
    github: "https://github.com/mbilal1205",
    x: "https://x.com/mbial1205",
  },
};