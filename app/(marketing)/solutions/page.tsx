import ProcessSection from "@/components/sections/solution/ProcessSection";
import FinalCTA from "@/components/sections/solution/FinalCTA";
import ImpactSection from "@/components/sections/solution/ImpactSection";
import SolutionsHero from "@/components/sections/solution/SolutionsHero";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Solutions | Custom Software & AI for Business | CodEarn Tech",
  description:
    "Custom software, SaaS, AI, and cloud solutions engineered by CodEarn Tech to help businesses innovate, automate, and scale globally.",
  keywords: [
    "custom software solutions",
    "AI business solutions",
    "SaaS development services",
    "cloud solutions",
    "software consulting",
    "digital transformation",
    "enterprise software",
  ],
  alternates: { canonical: "/solutions" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/solutions`,
    title: "Solutions | CodEarn Tech",
    description:
      "Custom software & AI solutions engineered for growth.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solutions | CodEarn Tech",
    description: "Custom software & AI solutions.",
    images: [SITE_OG_IMAGE],
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Software Development & AI Solutions",
  provider: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  areaServed: "Worldwide",
  url: `${SITE_URL}/solutions`,
  description:
    "Custom software development, SaaS, AI, and cloud solutions for global clients.",
};

export default function SolutionsPage() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={serviceSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Solutions", path: "/solutions" },
        ])}
      />
      <SolutionsHero />
      <ProcessSection />
      <ImpactSection />
      <FinalCTA />
    </div>
  );
}