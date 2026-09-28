import Beliefs from "@/components/sections/founder/beliefs";
import Building from "@/components/sections/founder/building";
import FindOnline from "@/components/sections/founder/find-online";
import FounderLetter from "@/components/sections/founder/founder-letter";
import HeroSection from "@/components/sections/founder/founderHero";
import HumanStory from "@/components/sections/founder/human-story";
import Journey from "@/components/sections/founder/journey";
import KeepsMoving from "@/components/sections/founder/keeps-moving";
import LetsBuild from "@/components/sections/founder/lets-build";
import Shipped from "@/components/sections/founder/shipped";
import WhatsNext from "@/components/sections/founder/whats-next";
import WhyCodEarn from "@/components/sections/founder/why-codearn";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  SOCIAL_LINKS,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Founder Story | The Journey Behind CodEarn Tech",
  description:
    "Discover the journey behind CodEarn Tech — how a passion for software, AI, and education turned into a global technology company serving clients worldwide.",
  keywords: [
    "CodEarn Tech founder",
    "founder story software company",
    "tech entrepreneur story",
    "software company origin",
    "founder vision",
    "Dubai tech founder",
  ],
  alternates: { canonical: "/founder" },
  openGraph: {
    type: "article",
    url: `${SITE_URL}/founder`,
    title: "The Founder Story Behind CodEarn Tech",
    description:
      "The journey, mission, and vision behind CodEarn Tech.",
    images: [
      { url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founder Story | CodEarn Tech",
    description: "The journey behind CodEarn Tech.",
    images: [SITE_OG_IMAGE],
  },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Muhammad Bilal", // apna actual naam daalein
    jobTitle: "Founder & CEO",
    worksFor: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    description:
      "Founder of CodEarn Tech, leading software, AI, and training initiatives for clients worldwide.",
    url: `${SITE_URL}/founder`,
    sameAs: [SOCIAL_LINKS.linkedin, SOCIAL_LINKS.twitter],
  },
};

export default function FounderPage() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={personSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Founder", path: "/founder" },
        ])}
      />
      <HeroSection />
      <HumanStory />
      <Journey />
      <WhyCodEarn />
      <Beliefs />
      <Building />
      <Shipped />
      <FindOnline />
      <FounderLetter />
      <KeepsMoving />
      <WhatsNext />
      <LetsBuild />
    </div>
  );
}