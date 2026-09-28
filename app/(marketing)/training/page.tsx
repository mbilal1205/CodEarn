import AcademyComparison from "@/components/sections/academy/academy-comparison";
import AcademyHero from "@/components/sections/academy/academy-hero";
import AcademyRoadmap from "@/components/sections/academy/academy-roadmap";
import CoursesSection from "@/components/sections/academy/CoursesSection";
import FAQSection from "@/components/sections/academy/FAQSection";
import FinalCTA from "@/components/sections/academy/FinalCTA";
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
  title: "IT Training & Internship Programs | CodEarn Tech",
  description:
    "Learn Full Stack Development, Backend Engineering, and Data Modeling with CodEarn Tech's practical online programs. Real projects, expert mentors, internship support.",
  keywords: [
    "IT training online",
    "full stack developer course",
    "backend development training",
    "data modeling course",
    "online programming bootcamp",
    "software internship program",
    "web development course",
    "coding course online",
  ],
  alternates: { canonical: "/training" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/training`,
    title: "IT Training & Internship Programs | CodEarn Tech",
    description:
      "Practical online IT training with real projects and internship support.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "IT Training | CodEarn Tech",
    description: "Practical IT training with internship support.",
    images: [SITE_OG_IMAGE],
  },
};

const courseListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "CodEarn Tech Training Programs",
  url: `${SITE_URL}/training`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Course",
        name: "Full Stack Web Development",
        description:
          "Comprehensive training covering frontend, backend, databases, and deployment with internship support.",
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          sameAs: SITE_URL,
        },
        offers: {
          "@type": "Offer",
          category: "Paid",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
      },
    },
  ],
};

export default function Training() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={courseListSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Training", path: "/training" },
        ])}
      />
      <AcademyHero />
      <AcademyComparison />
      <CoursesSection />
      <AcademyRoadmap />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}