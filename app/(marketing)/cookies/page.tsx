import CookiePolicy from "@/components/sections/cookies/cookie";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, buildBreadcrumbs } from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | CodEarn Tech",
  description:
    "Learn how CodEarn Tech uses cookies to improve your browsing experience, and how you can manage your cookie preferences.",
  keywords: [
    "cookie policy",
    "CodEarn Tech cookies",
    "website cookies",
    "cookie consent",
    "browser cookies",
    "cookie preferences",
  ],
  alternates: { canonical: "/cookies" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/cookies`,
    title: "Cookie Policy | CodEarn Tech",
    description: "How we use cookies and how to manage them.",
  },
  robots: { index: true, follow: true },
};

export default function Cookies() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Cookie Policy", path: "/cookies" },
        ])}
      />
      <CookiePolicy />
    </div>
  );
}