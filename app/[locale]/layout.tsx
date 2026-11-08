import type { Metadata, Viewport } from "next";
import { Inter, Cairo } from "next/font/google";
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/site";
import ChatWidget from "@/components/codearn-ai/chat-widget";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";
import { routing } from "@/i18n/routing";

import "../globals.css";

/* ------------------------------------------------------------------ */
/* Analytics & Tag Manager                                             */
/* ------------------------------------------------------------------ */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-57JXSBCJRM";

const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID || "GTM-M7QZPDQQ";

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* Inter  → Latin (English)                                            */
/* Cairo  → Arabic (RTL, GCC-standard for business sites)              */
/* ------------------------------------------------------------------ */
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  display: "swap",
  variable: "--font-ibm-plex-arabic",
  weight: ["400", "500", "600", "700"],
});

/* ------------------------------------------------------------------ */
/* Static params                                                       */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/* ------------------------------------------------------------------ */
/* Viewport                                                            */
/* ------------------------------------------------------------------ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0F172A" },
  ],
};

/* ------------------------------------------------------------------ */
/* Metadata — locale-aware, Gulf-targeted SEO                          */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL(SITE_URL),

    title: {
      default: t("title"),
      template: `%s | ${SITE_NAME}`,
    },

    description: t("description"),

    applicationName: SITE_NAME,
    generator: "Next.js",

    /* -----------------------------------------------------------------
     * Gulf-focused keyword targeting.
     * NOTE: These are SEARCH TARGETS (what users type) — not claims.
     * Visual content stays "Remote-first, serving UAE, Saudi Arabia,
     * Bahrain" per cleanup doc until UAE trade licence is in place.
     * ----------------------------------------------------------------- */
    keywords: [
      // Brand
      "CodEarn Tech",
      "CodEarn",
      // Services — global
      "custom software development",
      "SaaS development",
      "SaaS platform development",
      "SaaS product development",
      "web application development",
      "web development company",
      "mobile app development",
      "React Native app development",
      "Next.js development",
      "React development",
      "TypeScript development",
      "AI integration",
      "AI automation",
      "AI chatbot development",
      "business process automation",
      "workflow automation",
      "software engineering studio",
      "remote software agency",
      // Gulf — UAE
      "software development UAE",
      "software company UAE",
      "custom software Dubai",
      "web development Dubai",
      "mobile app development Dubai",
      "SaaS development UAE",
      "AI automation UAE",
      "AI chatbot UAE",
      "software development Abu Dhabi",
      "digital transformation UAE",
      "hire developers UAE",
      // Gulf — Saudi Arabia
      "software development Saudi Arabia",
      "software company Saudi Arabia",
      "custom software Riyadh",
      "web development Riyadh",
      "mobile app development Saudi Arabia",
      "SaaS development Saudi Arabia",
      "AI automation Saudi Arabia",
      "software development Jeddah",
      "digital transformation Saudi Arabia",
      "hire developers Saudi Arabia",
      // Gulf — Bahrain
      "software development Bahrain",
      "software company Bahrain",
      "web development Bahrain",
      "mobile app development Bahrain",
      "AI automation Bahrain",
      "custom software Manama",
      // Region
      "software development Gulf",
      "Gulf software agency",
      "Middle East software studio",
      "software development company Middle East",
      "custom software GCC",
      // Tech
      "cloud deployment",
      "cloud solutions",
      "PostgreSQL development",
      "Node.js development",
      "headless CMS",
      "Stripe integration",
      "payment gateway integration",
    ],

    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "technology",
    classification:
      "Software Development, SaaS, Web & Mobile Apps, AI Automation — Serving UAE, Saudi Arabia, Bahrain & Worldwide",

    /* -------------------------------------------------------------
     * hreflang — country-specific alternates for Gulf SEO
     * ------------------------------------------------------------- */
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ar: "/ar",
        "en-AE": "/en",
        "ar-AE": "/ar",
        "en-SA": "/en",
        "ar-SA": "/ar",
        "en-BH": "/en",
        "ar-BH": "/ar",
        "en-US": "/en",
        "x-default": "/en",
      },
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      alternateLocale: isArabic
        ? ["ar_SA", "ar_BH", "en_AE", "en_US"]
        : ["en_SA", "en_BH", "ar_AE", "en_US"],
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: SITE_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Software Engineering Studio for UAE, Saudi Arabia & Bahrain`,
          type: "image/webp",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [SITE_OG_IMAGE],
      creator: "@codearntech",
      site: "@codearntech",
    },

    verification: {
      google: "_GZUOBwhCQ8T5t1ME4Xg46wwwo3o_WznYgcmBKM2PbY",
    },

    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
      ],
      shortcut: "/favicon.ico",
      apple: [
        {
          url: "/icon-192x192.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [{ rel: "mask-icon", url: "/logo.webp" }],
    },

    manifest: "/manifest.webmanifest",

    archives: [`${SITE_URL}/${locale}/blogs`],

    other: {
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": SITE_NAME,
      "mobile-web-app-capable": "yes",
      "msapplication-TileColor": "#0F172A",
      "msapplication-config": "/browserconfig.xml",
      /* Geo meta signals (soft hints — not a ranking guarantee) */
      "geo.region": "AE",
      "geo.placename": "Dubai",
      "content-language": isArabic ? "ar" : "en",
    },
  };
}

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        {/* GTM */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema(),
              websiteSchema(),
            ]),
          }}
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://sc-static.net" />
      </head>

      {/* NOTE: font-sans class removed — fonts applied via globals.css on html[lang] */}
      <body
         className={`${plusJakarta.variable} ${ibmPlexArabic.variable} antialiased`}
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        <Script
          id="ga-script"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>

        <Script id="snapchat-pixel" strategy="afterInteractive">
          {`
            (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
            {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
            a.queue=[];var s='script';var r=t.createElement(s);r.async=!0;
            r.src=n;var u=t.getElementsByTagName(s)[0];
            u.parentNode.insertBefore(r,u)})(window,document,
            'https://sc-static.net/scevent.min.js');

            snaptr('init', 'aeb326d3-6533-4cac-bc69-ba0c7f2f3fbf', {
              'user_email': '__INSERT_USER_EMAIL__'
            });

            snaptr('track', 'PAGE_VIEW');
          `}
        </Script>

        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <LayoutWrapper>{children}</LayoutWrapper>

            <ChatWidget />
            <ServiceWorkerRegister />

            <Toaster position="top-center" richColors closeButton />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}