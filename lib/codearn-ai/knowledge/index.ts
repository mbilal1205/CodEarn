// lib/codearn-ai/knowledge/index.ts

import { company } from "./company";
import { founder } from "./founder";
import { services } from "./services";
import { contact } from "./contact";
import { policies } from "./policies";
import { faqs } from "./faqs";
import { routes, externalLinks } from "./routes";

/**
 * CodEarn AI Knowledge Base — Single Source of Truth
 *
 * This is the ONLY data the AI is allowed to use.
 * No GigThink. No training. No Pakistan. Gulf-focused.
 * All prices, services, and routes reflect the current site.
 */
export const codearnKnowledge = {
  company,
  founder,
  services,
  contact,
  policies,
  faqs,
  routes,
  externalLinks,
};

export type CodEarnKnowledge = typeof codearnKnowledge;