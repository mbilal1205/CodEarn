import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import PrivacyPolicyContent from "@/components/sections/privacyPolicey/PrivacyPolicy";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, buildBreadcrumbs } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.privacy.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/privacy-policy`,
      languages: {
        en: "/en/privacy-policy",
        ar: "/ar/privacy-policy",
        "x-default": "/en/privacy-policy",
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/privacy-policy`,
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-background text-foreground">
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Privacy Policy", path: `/${locale}/privacy-policy` },
        ])}
      />
      <PrivacyPolicyContent />
    </div>
  );
}