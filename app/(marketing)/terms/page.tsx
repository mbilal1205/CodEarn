import TermsOfService from "@/components/sections/terms/terms";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, buildBreadcrumbs } from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | CodEarn Tech",
  description:
    "Read CodEarn Tech's Terms of Service to understand the rules governing the use of our website, software services, and training programs.",
  keywords: [
    "terms of service",
    "user agreement",
    "service terms",
    "CodEarn Tech terms",
    "legal terms",
  ],
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/terms`,
    title: "Terms of Service | CodEarn Tech",
    description: "Rules and guidelines for using our services.",
  },
};

export default function Terms() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Terms of Service", path: "/terms" },
        ])}
      />
      <TermsOfService />
    </div>
  );
}