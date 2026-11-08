import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import ServicesHero from "@/components/sections/Servises/SolutionsHero";
import ServicesList from "@/components/sections/Servises/ServicesList";
import ServicesProcess from "@/components/sections/Servises/ServicesProcess";
import ServicesDeliverables from "@/components/sections/Servises/ServicesDeliverables";
import ServicesCta from "@/components/sections/Servises/ServicesCta";

import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
  SERVICES_CATALOG,
} from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "custom software services",
      "SaaS development",
      "web application development",
      "mobile app development",
      "React Native",
      "Next.js development",
      "AI integration",
      "business automation",
      "software services UAE",
      "software services Saudi Arabia",
      "software services Bahrain",
      "custom software Gulf",
    ],
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        en: "/en/services",
        ar: "/ar/services",
        "x-default": "/en/services",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/services`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [SITE_OG_IMAGE],
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Services.metadata" });

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Software Development",
    provider: { "@id": `${SITE_URL}/#organization` },
    url: `${SITE_URL}/${locale}/services`,
    description: t("description"),
    inLanguage: locale,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "CodEarn Tech Services",
      itemListElement: SERVICES_CATALOG.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          serviceType: s.serviceType,
          description: s.description,
          url: `${SITE_URL}/${locale}/services#${s.slug}`,
        },
      })),
    },
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Services", path: `/${locale}/services` },
        ])}
      />

      <ServicesHero />
      <ServicesList />
      <ServicesProcess />
      <ServicesDeliverables />
      <ServicesCta />
    </div>
  );
}