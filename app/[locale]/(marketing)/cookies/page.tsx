import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CookiePolicy from "@/components/sections/cookies/cookie";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, buildBreadcrumbs } from "@/lib/seo/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Legal.cookies.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/cookies`,
      languages: {
        en: "/en/cookies",
        ar: "/ar/cookies",
        "x-default": "/en/cookies",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/cookies`,
      title: t("title"),
      description: t("description"),
    },
    robots: { index: true, follow: true },
  };
}

export default async function CookiesPage({
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
          { name: "Cookie Policy", path: `/${locale}/cookies` },
        ])}
      />
      <CookiePolicy />
    </div>
  );
}