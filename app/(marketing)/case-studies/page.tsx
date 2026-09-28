import CaseStudyPage from "@/components/sections/CaseStudyPage/CaseStudyPage";
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
  title: "Case Studies | SaaS, Web & AI Projects by CodEarn Tech",
  description:
    "Explore real case studies of SaaS platforms, web applications, and AI solutions built by CodEarn Tech for clients worldwide.",
  keywords: [
    "software case studies",
    "SaaS case study",
    "web development portfolio",
    "AI project case study",
    "software portfolio Dubai",
    "product engineering case studies",
  ],
  alternates: { canonical: "/case-studies" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/case-studies`,
    title: "Case Studies | CodEarn Tech",
    description:
      "Real SaaS, web, and AI projects delivered by CodEarn Tech.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Case Studies | CodEarn Tech",
    description: "Real projects, real results.",
    images: [SITE_OG_IMAGE],
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Case Studies | CodEarn Tech",
  url: `${SITE_URL}/case-studies`,
  isPartOf: { "@type": "WebSite", url: SITE_URL, name: SITE_NAME },
  about: "Software project case studies",
};

export default function CaseStudiesPage() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={collectionSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
        ])}
      />
      <CaseStudyPage />
    </div>
  );
}