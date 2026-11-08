import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";
import { caseStudies } from "@/lib/case-studies";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const locales = ["en", "ar"] as const;

  // Core static pages
  const staticPages = [
    { path: "", changeFrequency: "weekly", priority: 1.0 },
    { path: "/services", changeFrequency: "weekly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.9 },
    { path: "/case-studies", changeFrequency: "weekly", priority: 0.8 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/founder", changeFrequency: "monthly", priority: 0.7 },
    { path: "/codearn-ai", changeFrequency: "weekly", priority: 0.7 },
    { path: "/blogs", changeFrequency: "weekly", priority: 0.7 },
    { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.3 },
    { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.3 },
  ] as const;

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages (bilingual)
  staticPages.forEach((page) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${page.path}`,
            ar: `${SITE_URL}/ar${page.path}`,
          },
        },
      });
    });
  });

  // 2. Case Studies (bilingual)
  caseStudies.forEach((project) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${SITE_URL}/${locale}/case-studies/${project.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}/en/case-studies/${project.id}`,
            ar: `${SITE_URL}/ar/case-studies/${project.id}`,
          },
        },
      });
    });
  });

  return sitemapEntries;
}
