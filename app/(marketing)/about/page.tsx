import { WhatWeDo } from "@/components/sections/About/WhatWeDo";
import { AboutHero } from "@/components/sections/About/abouthero";
import { WhoWeAre } from "@/components/sections/About/WhoWeAre";
import { LearningApproach } from "@/components/sections/About/LearningApproach";
import { WhyChooseUsSection } from "@/components/sections/About/WhyChooseUs";
import { MissionVision } from "@/components/sections/About/MissionVision";
import { FinalCTA } from "@/components/sections/About/aboutCta";
import SubscribeSection from "@/components/layout/subscription";
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
  title: "About Us | CodEarn Tech - Software, AI & IT Training",
  description:
    "CodEarn Tech is a Dubai-based technology company delivering SaaS products, web development, AI solutions, and professional IT training to businesses and learners worldwide.",
  keywords: [
    "about CodEarn Tech",
    "Dubai software company",
    "SaaS development Dubai",
    "IT training online",
    "AI solutions company",
    "web development company UAE",
    "software engineering team",
    "international IT training",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/about`,
    title: "About CodEarn Tech | Software, AI & IT Training",
    description:
      "Discover our mission, vision, and the team building modern SaaS products, web applications, and training programs for clients worldwide.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About CodEarn Tech",
    description:
      "Dubai-based software company delivering SaaS, web development, AI solutions, and IT training worldwide.",
    images: [SITE_OG_IMAGE],
  },
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About CodEarn Tech",
  description:
    "Learn about CodEarn Tech, our mission, vision, values, and the software & training services we deliver globally.",
  url: `${SITE_URL}/about`,
  mainEntity: organizationSchema(),
};

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={aboutPageSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <AboutHero />
      <WhoWeAre />
      <WhatWeDo />
      <LearningApproach />
      <WhyChooseUsSection />
      <MissionVision />
      <SubscribeSection />
      <FinalCTA />
    </div>
  );
}