import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ChatContainer from "@/components/codearn-ai/chat-container";
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
  const t = await getTranslations({ locale, namespace: "AI.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "CodEarn AI",
      "AI assistant",
      "software company AI",
      "AI chatbot CodEarn",
      "AI assistant Gulf",
    ],
    alternates: {
      canonical: `/${locale}/codearn-ai`,
      languages: {
        en: "/en/codearn-ai",
        ar: "/ar/codearn-ai",
        "x-default": "/en/codearn-ai",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/codearn-ai`,
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

export default async function CodEarnAIPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "AI" });

  const aiSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CodEarn AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/${locale}/codearn-ai`,
    inLanguage: locale,
    description: t("metadata.description"),
    author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={aiSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "CodEarn AI", path: `/${locale}/codearn-ai` },
        ])}
      />

      <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-hover:translate-x-0.5" />
            {t("page.back")}
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {t("page.live")}
            </span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ChatContainer variant="page" />
      </div>
    </main>
  );
}