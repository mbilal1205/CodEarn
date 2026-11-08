import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import Beliefs from "@/components/sections/founder/beliefs";
import FindOnline from "@/components/sections/founder/find-online";
import FounderLetter from "@/components/sections/founder/founder-letter";
import HeroSection from "@/components/sections/founder/founderHero";
import HumanStory from "@/components/sections/founder/human-story";
import Journey from "@/components/sections/founder/journey";
import KeepsMoving from "@/components/sections/founder/keeps-moving";
import LetsBuild from "@/components/sections/founder/lets-build";
import WhatsNext from "@/components/sections/founder/whats-next";
import WhyCodEarn from "@/components/sections/founder/why-codearn";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  SOCIAL_LINKS,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Founder.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "CodEarn Tech founder",
      "founder story software company",
      "software studio founder",
      "founder vision",
      "software engineering studio",
      "remote-first software agency",
      "Muhammad Bilal",
    ],
    alternates: {
      canonical: `/${locale}/founder`,
      languages: {
        en: "/en/founder",
        ar: "/ar/founder",
        "x-default": "/en/founder",
      },
    },
    openGraph: {
      type: "article",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/founder`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [
        { url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME },
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

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Founder.metadata" });
  const isArabic = locale === "ar";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: locale,
    mainEntity: {
      "@type": "Person",
      name: "Muhammad Bilal",
      jobTitle: isArabic ? "المؤسس ومهندس البرمجيات" : "Founder & Software Architect",
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
      description: t("description"),
      url: `${SITE_URL}/${locale}/founder`,
      sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter, SOCIAL_LINKS.github],
    },
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Founder", path: `/${locale}/founder` },
        ])}
      />

      <HeroSection />
      <HumanStory />
      <Journey />
      <WhyCodEarn />
      <Beliefs />
      <FindOnline />
      <FounderLetter />
      <KeepsMoving />
      <WhatsNext />
      <LetsBuild />
    </div>
  );
}