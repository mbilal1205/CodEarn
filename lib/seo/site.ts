// lib/seo/site.ts
// ✅ Professional SEO configuration for CodEarn Tech
// ✅ Brand: CodEarn Tech | Domain: codearntech.com | Base: Dubai, UAE
// ✅ Serving clients worldwide | No physical location references

/* ------------------------------------------------------------------ */
/* CORE SITE CONSTANTS                                                  */
/* ------------------------------------------------------------------ */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://codearntech.com";

export const SITE_NAME = "CodEarn Tech";
export const SITE_SHORT_NAME = "CodEarn";
export const SITE_LEGAL_NAME = "CodEarn Tech";
export const SITE_LOCALE = "en_US";
export const SITE_LANGUAGE = "en-US";
export const SITE_TWITTER_HANDLE = "@codearntech";
export const SITE_FOUNDING_YEAR = "2021";

export const SITE_TAGLINE =
  "Software, AI & IT Training — Engineered for Growth";

export const SITE_DESCRIPTION =
  "CodEarn Tech is a Dubai-based software company delivering SaaS products, web development, AI solutions, and professional IT training to clients worldwide.";

export const SITE_SHORT_DESCRIPTION =
  "SaaS products, web development, AI solutions, and IT training — built for clients worldwide.";

/* ------------------------------------------------------------------ */
/* BRANDING / ASSETS                                                    */
/* ------------------------------------------------------------------ */

export const SITE_LOGO = `${SITE_URL}/logo.webp`;
export const SITE_LOGO_WIDTH = 512;
export const SITE_LOGO_HEIGHT = 512;

export const SITE_OG_IMAGE = `${SITE_URL}/og-image.webp`;
export const SITE_OG_WIDTH = 1200;
export const SITE_OG_HEIGHT = 630;

export const SITE_FAVICON = `${SITE_URL}/favicon.ico`;
export const SITE_ICON_192 = `${SITE_URL}/icon-192x192.png`;
export const SITE_ICON_512 = `${SITE_URL}/icon-512x512.png`;

export const SITE_THEME_COLOR = "#0f172a";
export const SITE_BACKGROUND_COLOR = "#ffffff";

/* ------------------------------------------------------------------ */
/* SOCIAL LINKS (used in Organization.sameAs)                          */
/* ------------------------------------------------------------------ */

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/codearntech",
  twitter: "https://twitter.com/codearntech",
  github: "https://github.com/codearntech",
  youtube: "https://www.youtube.com/@codearntech",
} as const;

export type SocialPlatform = keyof typeof SOCIAL_LINKS;

/* ------------------------------------------------------------------ */
/* CONTACT — Dubai HQ, worldwide service                               */
/* ------------------------------------------------------------------ */

export const CONTACT = {
  email: "hello@codearntech.com",
  supportEmail: "support@codearntech.com",
  salesEmail: "sales@codearntech.com",
  phone: "", // TODO: apna UAE number yahan daalein, e.g. "+971-4-XXX-XXXX"
  whatsapp: "", // TODO: apna WhatsApp number, e.g. "+971-XX-XXX-XXXX"

  // Registered / business base (Dubai)
  addressLocality: "Dubai",
  addressRegion: "Dubai",
  addressCountry: "AE",
  addressCountryName: "United Arab Emirates",
  postalCode: "", // optional

  areaServed: ["Worldwide", "Middle East", "Europe", "North America", "Asia"],
  availableLanguages: ["English", "Urdu", "Arabic"] as const,
} as const;

/* ------------------------------------------------------------------ */
/* HELPERS                                                              */
/* ------------------------------------------------------------------ */

/** Site ke andar kisi bhi path ka absolute URL */
export function absoluteUrl(path = "/"): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Non-empty social links only */
function socialLinks(): string[] {
  return Object.values(SOCIAL_LINKS).filter(
    (url) => typeof url === "string" && url.length > 0,
  );
}

/* ------------------------------------------------------------------ */
/* BREADCRUMBS SCHEMA                                                   */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* ORGANIZATION SCHEMA                                                  */
/* ------------------------------------------------------------------ */

export function organizationSchema() {
  const contactPoints: Record<string, unknown>[] = [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: CONTACT.supportEmail || CONTACT.email,
      availableLanguage: [...CONTACT.availableLanguages],
      areaServed: [...CONTACT.areaServed],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.salesEmail,
      availableLanguage: [...CONTACT.availableLanguages],
      areaServed: [...CONTACT.areaServed],
    },
  ];

  if (CONTACT.phone) {
    contactPoints.push({
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: CONTACT.phone,
      availableLanguage: [...CONTACT.availableLanguages],
      areaServed: [...CONTACT.areaServed],
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
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: CONTACT.addressLocality,
        addressRegion: CONTACT.addressRegion,
        addressCountry: CONTACT.addressCountry,
      },
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      addressCountry: CONTACT.addressCountry,
    },
    email: CONTACT.email,
    areaServed: CONTACT.areaServed.map((region) => ({
      "@type": "AdministrativeArea",
      name: region,
    })),
    knowsAbout: [
      "SaaS Development",
      "Web Development",
      "Full Stack Engineering",
      "AI Solutions",
      "Cloud Architecture",
      "Software Engineering",
      "IT Training",
      "Programming Education",
      "Backend Development",
      "Frontend Development",
      "System Design",
    ],
    sameAs: socialLinks(),
    contactPoint: contactPoints,
  };
}

/* ------------------------------------------------------------------ */
/* WEBSITE SCHEMA (with sitelinks search box)                          */
/* ------------------------------------------------------------------ */

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    alternateName: SITE_SHORT_NAME,
    url: SITE_URL,
    description: SITE_SHORT_DESCRIPTION,
    inLanguage: SITE_LANGUAGE,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/* ------------------------------------------------------------------ */
/* OPTIONAL: LOCAL BUSINESS (Dubai base)                               */
/* ------------------------------------------------------------------ */

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
    address: {
      "@type": "PostalAddress",
      addressLocality: CONTACT.addressLocality,
      addressRegion: CONTACT.addressRegion,
      addressCountry: CONTACT.addressCountry,
    },
    areaServed: [...CONTACT.areaServed],
    serviceType: [
      "Software Development",
      "SaaS Development",
      "AI Solutions",
      "IT Training",
    ],
  };

  if (CONTACT.phone) schema.telephone = CONTACT.phone;

  return schema;
}

/* ------------------------------------------------------------------ */
/* SERVICE SCHEMA                                                      */
/* ------------------------------------------------------------------ */

export interface ServiceInput {
  name: string;
  description: string;
  url?: string;
  serviceType?: string;
}

export function serviceSchema({
  name,
  description,
  url,
  serviceType,
}: ServiceInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: serviceType || name,
    url: url ? absoluteUrl(url) : SITE_URL,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: [...CONTACT.areaServed],
  };
}

/* ------------------------------------------------------------------ */
/* COURSE SCHEMA (for training pages)                                  */
/* ------------------------------------------------------------------ */

export interface CourseInput {
  name: string;
  description: string;
  slug: string;
  duration?: string; // ISO 8601 duration, e.g. "P3M"
  level?: string;
  mode?: "online" | "onsite" | "hybrid";
  price?: number;
  currency?: string;
}

export function courseSchema({
  name,
  description,
  slug,
  duration = "P3M",
  level = "Beginner to Advanced",
  mode = "online",
  price,
  currency = "USD",
}: CourseInput) {
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    category: price ? "Paid" : "Contact",
    availability: "https://schema.org/InStock",
    url: absoluteUrl(`/training/${slug}`),
  };
  if (typeof price === "number") {
    offers.price = price;
    offers.priceCurrency = currency;
  }

  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: absoluteUrl(`/training/${slug}`),
    provider: { "@id": `${SITE_URL}/#organization` },
    educationalLevel: level,
    inLanguage: CONTACT.availableLanguages,
    timeRequired: duration,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: mode,
      courseWorkload: "PT15H",
      inLanguage: CONTACT.availableLanguages,
    },
    offers,
  };
}

/* ------------------------------------------------------------------ */
/* ARTICLE SCHEMA (for blog posts)                                     */
/* ------------------------------------------------------------------ */

export interface ArticleInput {
  headline: string;
  description: string;
  slug: string;
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
  image,
  datePublished,
  dateModified,
  authorName = SITE_NAME,
  authorUrl = SITE_URL,
  tags = [],
  section,
  wordCount,
}: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url: absoluteUrl(`/blogs/${slug}`),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(`/blogs/${slug}`),
    },
    image: image ? [image] : [SITE_OG_IMAGE],
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: tags.join(", "),
    ...(section ? { articleSection: section } : {}),
    ...(wordCount ? { wordCount } : {}),
    inLanguage: SITE_LANGUAGE,
  };
}

/* ------------------------------------------------------------------ */
/* PRODUCT / SOFTWARE APPLICATION SCHEMA                               */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* FAQ SCHEMA                                                          */
/* ------------------------------------------------------------------ */

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
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/* ------------------------------------------------------------------ */
/* PERSON SCHEMA (founder / team)                                      */
/* ------------------------------------------------------------------ */

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