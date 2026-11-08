import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import OfflineView from "@/components/sections/offline/OfflineView";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Offline.metadata" });

  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
    // Note: no canonical, no hreflang, no OG — this page should never rank.
  };
}

export default async function OfflinePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <OfflineView />;
}