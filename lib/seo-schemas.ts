// lib/seo-schemas.ts
// Clean, Gulf-focused structured data (no physical address until UAE licence).

import { SITE_URL, SITE_NAME, SITE_OG_IMAGE, SOCIAL_LINKS, CONTACT, SERVICES_CATALOG } from "@/lib/seo/site";

/* ================================================================
   1. ORGANIZATION SCHEMA
   ================================================================ */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "CodEarn",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.webp`,
  image: SITE_OG_IMAGE,
  description:
    "CodEarn Tech is a remote-first software engineering studio building custom SaaS platforms, web and mobile apps, and business automation for companies across the UAE, Saudi Arabia, Bahrain and worldwide.",
  foundingDate: "2020",
  founders: [
    {
      "@type": "Person",
      name: "Muhammad Bilal",
      jobTitle: "Founder & Software Architect",
    },
  ],
  email: CONTACT.email,
  knowsLanguage: ["en", "ar"],
  knowsAbout: [
    "Custom SaaS Development",
    "Web Application Development",
    "Mobile App Development",
    "React Native",
    "AI Integration",
    "Business Automation",
    "Software Engineering",
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
  ],
  areaServed: [
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Bahrain" },
  ],
  makesOffer: SERVICES_CATALOG.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      serviceType: service.serviceType,
    },
  })),
  sameAs: [
    SOCIAL_LINKS.linkedin,
    SOCIAL_LINKS.twitter,
    SOCIAL_LINKS.github,
    SOCIAL_LINKS.youtube,
  ].filter(Boolean),
};

/* ================================================================
   2. WEBSITE SCHEMA
   ================================================================ */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "Custom SaaS platforms, web and mobile apps, and business automation for companies across the Gulf and worldwide.",
  inLanguage: ["en", "ar"],
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/en/blogs?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

/* ================================================================
   3. LOCAL BUSINESS SCHEMA
   ⚠️ DO NOT ENABLE until you hold a valid UAE trade licence.
   Once you have one, fill in the physical address and enable this.
   ================================================================ */
export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#localbusiness`,
  name: SITE_NAME,
  image: SITE_OG_IMAGE,
  url: SITE_URL,
  email: CONTACT.email,
  priceRange: "$$",
  // address: { ... } -> Add UAE address here when licence is ready
  areaServed: ["AE", "SA", "BH"],
  serviceType: SERVICES_CATALOG.map((s) => s.serviceType),
  availableLanguage: ["English", "Arabic"],
};