// lib/seo/site.ts
// ✅ Professional SEO for CodEarn Tech
// ✅ Remote-first software engineering studio
// ✅ Serving UAE, Saudi Arabia, Bahrain & worldwide
// ✅ EN + AR bilingual (hreflang ready)
// ✅ AI / Answer Engine ready (Organization + OfferCatalog + FAQ)
//
// ⚠️  Do NOT add a physical address or LocalBusiness schema until a real
//     UAE trade licence is in place. See comments near localBusinessSchema.

/* ================================================================
   CORE SITE CONSTANTS
   ================================================================ */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://codearntech.com";

export const SITE_NAME = "CodEarn Tech";
export const SITE_SHORT_NAME = "CodEarn";
export const SITE_LEGAL_NAME = "CodEarn Tech";

export const SITE_LOCALE = "en_AE"; // default OG locale
export const SITE_LANGUAGE = "en";
export const SITE_TWITTER_HANDLE = "@codearntech";
export const SITE_FOUNDING_YEAR = "2020";

export const SITE_TAGLINE =
  "Software engineering studio for SaaS, web, mobile & AI";

export const SITE_DESCRIPTION =
  "CodEarn Tech is a remote-first software engineering studio. We design and build custom SaaS platforms, web and mobile applications, and business automation for companies across the UAE, Saudi Arabia, Bahrain and worldwide.";

export const SITE_SHORT_DESCRIPTION =
  "Custom SaaS platforms, web and mobile apps, and business automation — for companies across the Gulf and worldwide.";

/* ================================================================
   BRANDING / ASSETS
   ================================================================ */

export const SITE_LOGO = `${SITE_URL}/logo.webp`;
export const SITE_LOGO_WIDTH = 512;
export const SITE_LOGO_HEIGHT = 512;

export const SITE_OG_IMAGE = `${SITE_URL}/og-image.webp`;
export const SITE_OG_WIDTH = 1200;
export const SITE_OG_HEIGHT = 630;

export const SITE_FAVICON = `${SITE_URL}/favicon.ico`;
export const SITE_ICON_192 = `${SITE_URL}/icon-192x192.png`;
export const SITE_ICON_512 = `${SITE_URL}/icon-512x512.png`;

export const SITE_THEME_COLOR = "#0F172A";
export const SITE_BACKGROUND_COLOR = "#FFFFFF";

/* ================================================================
   SOCIAL LINKS (Organization.sameAs)
   ================================================================ */

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/codearntech",
  twitter: "https://twitter.com/codearntech",
  github: "https://github.com/codearntech",
  youtube: "https://www.youtube.com/@codearntech",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;

/* ================================================================
   LOCALES + HREFLANG
   ================================================================ */

export const LOCALES = ["en", "ar"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/**
 * hreflang map — English and Arabic pages, associated with the Gulf
 * region for Google's regional targeting. `x-default` points to EN.
 */
export const HREFLANG_MAP = {
  en: "/en",
  ar: "/ar",
  "en-AE": "/en",
  "ar-AE": "/ar",
  "en-SA": "/en",
  "ar-SA": "/ar",
  "en-BH": "/en",
  "ar-BH": "/ar",
  "en-KW": "/en",
  "ar-KW": "/ar",
  "en-QA": "/en",
  "ar-QA": "/ar",
  "en-OM": "/en",
  "ar-OM": "/ar",
  "en-US": "/en",
  "x-default": "/en",
} as const;

/* ================================================================
   GULF REGION DATA — areaServed + country codes
   ================================================================ */

export const GULF_COUNTRIES = [
  { code: "AE", name: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة" },
  { code: "SA", name: "Saudi Arabia", nameAr: "المملكة العربية السعودية" },
  { code: "BH", name: "Bahrain", nameAr: "البحرين" },
  { code: "KW", name: "Kuwait", nameAr: "الكويت" },
  { code: "QA", name: "Qatar", nameAr: "قطر" },
  { code: "OM", name: "Oman", nameAr: "عُمان" },
] as const;

/* ================================================================
   SERVICES CATALOG — used in Organization.hasOfferCatalog
   and Service schema on /services
   ================================================================ */

export const SERVICES_CATALOG = [
  {
    slug: "saas",
    name: "Custom SaaS Development",
    serviceType: "SaaS Development",
    description:
      "Multi-user SaaS platforms with authentication, subscriptions, admin dashboards and multi-tenant data design.",
  },
  {
    slug: "web-apps",
    name: "Web Applications & Websites",
    serviceType: "Web Application Development",
    description:
      "Fast, secure, SEO-friendly websites and business portals built with Next.js and React.",
  },
  {
    slug: "mobile-apps",
    name: "Mobile Applications",
    serviceType: "Mobile App Development",
    description:
      "Cross-platform iOS and Android apps with React Native, including offline-first support where needed.",
  },
  {
    slug: "automation-ai",
    name: "Automation & AI Integration",
    serviceType: "AI & Business Automation",
    description:
      "Workflow automation, system integrations, chat assistants and AI features where they actually help.",
  },
  {
    slug: "maintenance",
    name: "Maintenance & Support",
    serviceType: "Software Maintenance",
    description:
      "Ongoing monitoring, updates, bug fixes and improvements under a monthly plan.",
  },
] as const;

export type ServiceSlug = (typeof SERVICES_CATALOG)[number]["slug"];

/* ================================================================
   CONTACT
   ⚠️  No street address until UAE trade licence is active.
       When it is, add `address` to `CONTACT` and re-enable
       `localBusinessSchema`.
   ================================================================ */

export const CONTACT = {
  email: "hello@codearntech.com",
  supportEmail: "support@codearntech.com",
  salesEmail: "sales@codearntech.com",

  // TODO: business phone (E.164 format, e.g. "+971-4-XXX-XXXX")
  // Must be a business line, not a personal SIM.
  phone: "",
  whatsapp: "",

  // Languages this team supports (EN + AR only — Urdu removed)
  availableLanguages: ["English", "Arabic"] as const,

  // Countries we actively serve (GCC + worldwide)
  serviceCountries: ["AE", "SA", "BH", "KW", "QA", "OM"] as const,
} as const;

/* ================================================================
   HELPERS
   ================================================================ */

/** Absolute URL for any internal path. */
export function absoluteUrl(path = "/"): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Absolute URL for a page in a specific locale. */
export function localizedUrl(locale: Locale, path = ""): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  return absoluteUrl(cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`);
}

/** Non-empty social links (used in Organization.sameAs). */
function socialLinks(): string[] {
  return Object.values(SOCIAL_LINKS).filter(
    (url) => typeof url === "string" && url.length > 0,
  );
}

/** Gulf countries as schema.org Country objects. */
function areaServed() {
  return [
    ...GULF_COUNTRIES.map((c) => ({
      "@type": "Country" as const,
      name: c.name,
      identifier: c.code,
    })),
    {
      "@type": "Place" as const,
      name: "Worldwide",
    },
  ];
}

/* ================================================================
   BREADCRUMBS SCHEMA
   ================================================================ */

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function buildBreadcrumbs(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/* ================================================================
   ORGANIZATION SCHEMA — the core entity for Google + AI search
   ================================================================ */

export function organizationSchema() {
  const contactPoints: Record<string, unknown>[] = [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT.supportEmail || CONTACT.email,
      availableLanguage: [...CONTACT.availableLanguages],
      areaServed: [...CONTACT.serviceCountries],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.salesEmail,
      availableLanguage: [...CONTACT.availableLanguages],
      areaServed: [...CONTACT.serviceCountries],
    },
  ];

  if (CONTACT.phone) {
    contactPoints.push({
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: CONTACT.phone,
      availableLanguage: [...CONTACT.availableLanguages],
      areaServed: [...CONTACT.serviceCountries],
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    legalName: SITE_LEGAL_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: SITE_LOGO,
      contentUrl: SITE_LOGO,
      width: SITE_LOGO_WIDTH,
      height: SITE_LOGO_HEIGHT,
      caption: SITE_NAME,
    },
    image: SITE_OG_IMAGE,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    foundingDate: `${SITE_FOUNDING_YEAR}-01-01`,
    email: CONTACT.email,
    knowsLanguage: ["en", "ar"],
    areaServed: areaServed(),
    knowsAbout: [
      // Service areas
      "SaaS Development",
      "Software as a Service",
      "Multi-tenant Architecture",
      "Web Application Development",
      "Mobile App Development",
      "React Native",
      "Business Process Automation",
      "AI Integration",
      "AI Chatbot Development",
      "Custom Software Development",
      "Software Maintenance",
      // Tech stack (entity signals)
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Cloud Deployment",
      "API Development",
      // Regions
      "Software Development UAE",
      "Software Development Saudi Arabia",
      "Software Development Bahrain",
      "Software Development Middle East",
    ],
    serviceType: SERVICES_CATALOG.map((s) => s.serviceType),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: SERVICES_CATALOG.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          serviceType: service.serviceType,
          description: service.description,
          url: `${SITE_URL}/services#${service.slug}`,
          provider: { "@id": `${SITE_URL}/#organization` },
        },
      })),
    },
    currenciesAccepted: "AED, SAR, USD",
    paymentAccepted: "Bank Transfer, Credit Card",
    sameAs: socialLinks(),
    contactPoint: contactPoints,
    // NOTE: No `address` field — remote-first. When UAE trade licence is
    // ready, add a PostalAddress object here and in CONTACT.
  };
}

/* ================================================================
   WEBSITE SCHEMA — sitelinks search box
   ================================================================ */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    description: SITE_SHORT_DESCRIPTION,
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
}

/* ================================================================
   SERVICE SCHEMA — per service on /services page
   ================================================================ */

export interface ServiceInput {
  name: string;
  description: string;
  url?: string;
  serviceType?: string;
  /** Optional starting price (AEDA, but stored as number) */
  priceFrom?: number;
  priceCurrency?: string;
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  priceFrom,
  priceCurrency = "AED",
}: ServiceInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    url: url ? absoluteUrl(url) : SITE_URL,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: areaServed(),
    availableLanguage: [...CONTACT.availableLanguages],
  };

  if (typeof priceFrom === "number") {
    schema.offers = {
      "@type": "Offer",
      priceCurrency,
      price: priceFrom.toString(),
      availability: "https://schema.org/InStock",
      url: url ? absoluteUrl(url) : SITE_URL,
    };
  }

  return schema;
}

/* ================================================================
   HOWTO SCHEMA — "How we work" (process) for services page
   ================================================================ */

export interface HowToStep {
  name: string;
  text: string;
}

export function howToSchema({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    totalTime: "P4W",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

/* ================================================================
   ARTICLE SCHEMA — for blog posts
   ================================================================ */

export interface ArticleInput {
  headline: string;
  description: string;
  slug: string;
  locale?: Locale;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  tags?: string[];
  section?: string;
  wordCount?: number;
}

export function articleSchema({
  headline,
  description,
  slug,
  locale = DEFAULT_LOCALE,
  image,
  datePublished,
  dateModified,
  authorName = SITE_NAME,
  authorUrl = SITE_URL,
  tags = [],
  section,
  wordCount,
}: ArticleInput) {
  const url = localizedUrl(locale, `blogs/${slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: image ? [image] : [SITE_OG_IMAGE],
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: authorName, url: authorUrl },
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: tags.join(", "),
    ...(section ? { articleSection: section } : {}),
    ...(wordCount ? { wordCount } : {}),
    inLanguage: locale,
  };
}

/* ================================================================
   SOFTWARE APPLICATION SCHEMA — for Labs products
   ================================================================ */

export interface SoftwareInput {
  name: string;
  description: string;
  url?: string;
  category?: string;
  ratingValue?: number;
  ratingCount?: number;
}

export function softwareApplicationSchema({
  name,
  description,
  url,
  category = "BusinessApplication",
  ratingValue,
  ratingCount,
}: SoftwareInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: "Web",
    url: url ? absoluteUrl(url) : SITE_URL,
    author: { "@id": `${SITE_URL}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free trial available",
    },
  };

  if (ratingValue && ratingCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toString(),
      ratingCount: ratingCount.toString(),
    };
  }

  return schema;
}

/* ================================================================
   FAQ SCHEMA — huge win for AI / featured snippets
   ================================================================ */

export interface FAQItem {
  question: string;
  answer: string;
}

export function faqSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/* ================================================================
   PERSON SCHEMA — founder / team
   ================================================================ */

export interface PersonInput {
  name: string;
  jobTitle: string;
  description?: string;
  url?: string;
  image?: string;
  sameAs?: string[];
}

export function personSchema({
  name,
  jobTitle,
  description,
  url,
  image,
  sameAs = [],
}: PersonInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    worksFor: { "@id": `${SITE_URL}/#organization` },
  };
  if (description) schema.description = description;
  if (url) schema.url = absoluteUrl(url);
  if (image) schema.image = image;
  if (sameAs.length > 0) schema.sameAs = sameAs;
  return schema;
}

/* ================================================================
   LOCAL BUSINESS SCHEMA — ⚠️ DO NOT ENABLE until UAE trade
   licence is in place. Once it is:
     1. Add a full `address` to `CONTACT` above.
     2. Enable this function and render it in `app/[locale]/layout.tsx`.
     3. Add the same address to Google Business Profile.
   ================================================================ */

export function localBusinessSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: SITE_OG_IMAGE,
    url: SITE_URL,
    email: CONTACT.email,
    priceRange: "$$",
    areaServed: areaServed(),
    serviceType: SERVICES_CATALOG.map((s) => s.serviceType),
    availableLanguage: [...CONTACT.availableLanguages],
  };

  if (CONTACT.phone) schema.telephone = CONTACT.phone;

  // TODO when trade licence is active, uncomment and fill:
  // schema.address = {
  //   "@type": "PostalAddress",
  //   streetAddress: "...",
  //   addressLocality: "Dubai",
  //   addressRegion: "Dubai",
  //   postalCode: "...",
  //   addressCountry: "AE",
  // };

  return schema;
}

/* ================================================================
   COURSE SCHEMA — removed on purpose.
   Training / Academy is retired per CodEarn Tech positioning.
   ================================================================ */