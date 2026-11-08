import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactUs from "@/components/sections/contact/ContactUs";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "contact CodEarn Tech",
      "software development company contact",
      "hire developers UAE",
      "custom software Saudi Arabia",
      "software agency Bahrain",
      "SaaS development inquiry",
    ],
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        en: "/en/contact",
        ar: "/ar/contact",
        "x-default": "/en/contact",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/contact`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Contact.metadata" });

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: t("title"),
    description: t("description"),
    url: `${SITE_URL}/${locale}/contact`,
    inLanguage: locale,
    mainEntity: organizationSchema(),
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={contactPageSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Contact", path: `/${locale}/contact` },
        ])}
      />

      <ContactUs />
    </div>
  );
}