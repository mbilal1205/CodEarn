import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { AboutHero } from "@/components/sections/About/abouthero";
import { WhoWeAre } from "@/components/sections/About/WhoWeAre";
import { WhatWeDo } from "@/components/sections/About/WhatWeDo";
import { WhyChooseUsSection } from "@/components/sections/About/WhyChooseUs";
import { MissionVision } from "@/components/sections/About/MissionVision";
import { FinalCTA } from "@/components/sections/About/aboutCta";
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
  const t = await getTranslations({ locale, namespace: "About.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "about CodEarn Tech",
      "software engineering studio",
      "remote software agency",
      "software development UAE",
      "software development Saudi Arabia",
      "software development Bahrain",
      "custom SaaS development",
      "web application development",
      "mobile app development",
      "AI automation company",
    ],
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        en: "/en/about",
        ar: "/ar/about",
        "x-default": "/en/about",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/about`,
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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "About.metadata" });

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: t("title"),
    description: t("description"),
    url: `${SITE_URL}/${locale}/about`,
    mainEntity: organizationSchema(),
    inLanguage: locale,
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={aboutPageSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "About", path: `/${locale}/about` },
        ])}
      />

      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <WhyChooseUsSection />
      <MissionVision />
      <FinalCTA />
    </div>
  );
}