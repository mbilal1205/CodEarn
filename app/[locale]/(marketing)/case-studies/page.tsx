import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CaseStudiesListing from "@/components/sections/CaseStudyPage/CaseStudyPage";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Work.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "software case studies",
      "Next.js case study",
      "bilingual website case study",
      "software agency Bahrain",
      "software development UAE",
      "web application case study",
      "CodEarn Tech work",
    ],
    alternates: {
      canonical: `/${locale}/case-studies`,
      languages: {
        en: "/en/case-studies",
        ar: "/ar/case-studies",
        "x-default": "/en/case-studies",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/case-studies`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [SITE_OG_IMAGE],
    },
  };
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Work.metadata" });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t("title"),
    description: t("description"),
    url: `${SITE_URL}/${locale}/case-studies`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      url: SITE_URL,
      name: SITE_NAME,
    },
    about: "Software case studies",
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={collectionSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Work", path: `/${locale}/case-studies` },
        ])}
      />

      <CaseStudiesListing />
    </div>
  );
}