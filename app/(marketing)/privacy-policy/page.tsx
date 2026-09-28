import PrivacyPolicyContent from "@/components/sections/privacyPolicey/PrivacyPolicy";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, buildBreadcrumbs } from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CodEarn Tech",
  description:
    "Read CodEarn Tech's Privacy Policy to understand how we collect, use, and protect your personal information across our website and services.",
  keywords: [
    "privacy policy",
    "data protection",
    "CodEarn Tech privacy",
    "GDPR",
    "user data security",
    "privacy practices",
  ],
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/privacy-policy`,
    title: "Privacy Policy | CodEarn Tech",
    description: "How we protect your personal data.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ])}
      />
      <PrivacyPolicyContent />
    </div>
  );
}