import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryProvider } from "@/providers/query-provider";
import { Toaster } from "sonner";
import LayoutWrapper from "@/components/layout/layout-wrapper";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SITE_OG_IMAGE,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo/site";
import SecurityGuard from "@/components/SecurityGuard";
import ChatWidget from "@/components/codearn-ai/chat-widget";
import { ServiceWorkerRegister } from "@/components/ServiceWorkerRegister";

/* ------------------------------------------------------------------ */
/* Analytics & Tag Manager Configuration                                */
/* ------------------------------------------------------------------ */
const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID || "G-57JXSBCJRM";

const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID || "GTM-M7QZPDQQ";

/* ------------------------------------------------------------------ */
/* Font Optimization                                                    */
/* ------------------------------------------------------------------ */
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

/* ------------------------------------------------------------------ */
/* Viewport                                                             */
/* ------------------------------------------------------------------ */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default:
      "CodEarn Tech — SaaS Development, AI Solutions & IT Training",
    template: "%s | CodEarn Tech",
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,
  generator: "Next.js",

  keywords: [
    "CodEarn Tech",
    "CodEarn",
    "SaaS development Dubai",
    "software company Dubai",
    "AI solutions company",
    "web development UAE",
    "custom software development",
    "IT training online",
    "full stack development course",
    "backend development training",
    "software engineering Dubai",
    "cloud solutions worldwide",
    "hire software developers",
    "Next.js development company",
    "React development Dubai",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  classification: "Software Development, AI Solutions, IT Training",

  alternates: {
    canonical: "/",
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
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "CodEarn Tech — SaaS Development, AI & IT Training",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "CodEarn Tech — Software, AI & IT Training Company",
        type: "image/webp",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "CodEarn Tech — SaaS Development, AI & IT Training",
    description: SITE_DESCRIPTION,
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
    other: [
      {
        rel: "mask-icon",
        url: "/logo.webp",
      },
    ],
  },

  manifest: "/manifest.webmanifest",

  archives: [`${SITE_URL}/blogs`],

  other: {
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
    "apple-mobile-web-app-title": SITE_NAME,
    "mobile-web-app-capable": "yes",
    "msapplication-TileColor": "#0f172a",
    "msapplication-config": "/browserconfig.xml",
  },
};

/* ------------------------------------------------------------------ */
/* Root Layout                                                          */
/* ------------------------------------------------------------------ */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* ---------------- Google Tag Manager (script) ---------------- */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>

        {/* ---------------- Structured Data (Site-wide) ---------------- */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              organizationSchema(),
              websiteSchema(),
            ]),
          }}
        />

        {/* ---------------- Preconnect for performance ---------------- */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://sc-static.net" />
      </head>

      <body
        className={`${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {/* ---------------- Google Tag Manager (noscript) ---------------- */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* ---------------- Google Analytics (GA4) ---------------- */}
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

        {/* ---------------- Snapchat Pixel ---------------- */}
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

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>
            <QueryProvider>
              <SecurityGuard />
              <LayoutWrapper>{children}</LayoutWrapper>

              <ChatWidget />
              <ServiceWorkerRegister />

              <Toaster position="top-center" richColors closeButton />
            </QueryProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}