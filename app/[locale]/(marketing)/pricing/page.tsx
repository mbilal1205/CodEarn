import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PricingContent from "@/components/sections/pricing/PricingContent";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, buildBreadcrumbs, organizationSchema, SERVICES_CATALOG } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/pricing`,
      languages: {
        en: "/en/pricing",
        ar: "/ar/pricing",
        "x-default": "/en/pricing",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/pricing`,
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Pricing" });

  // Product Schema for SEO
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "CodEarn Software Development Services",
    description: t("metadata.description"),
    brand: { "@type": "Brand", name: "CodEarn Tech" },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      lowPrice: "2900",
      highPrice: "25000",
      offerCount: "4",
      offers: [
        { "@type": "Offer", name: "Starter Website", price: "2900", priceCurrency: "AED" },
        { "@type": "Offer", name: "Business Website", price: "5900", priceCurrency: "AED" },
        { "@type": "Offer", name: "Premium Website", price: "9900", priceCurrency: "AED" },
        { "@type": "Offer", name: "E-commerce Website", price: "7900", priceCurrency: "AED" },
      ],
    },
  };

  // FAQ Schema for rich results
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [1, 2, 3, 4, 5].map((num) => ({
      "@type": "Question",
      name: t(`faq.q${num}`),
      acceptedAnswer: { "@type": "Answer", text: t(`faq.a${num}`) },
    })),
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={pricingSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Pricing", path: `/${locale}/pricing` },
        ])}
      />

      <PricingContent />
    </div>
  );
}