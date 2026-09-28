import BookCallPage from "@/components/sections/bookCall/bookCallmain";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  CONTACT,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call | CodEarn Tech",
  description:
    "Schedule a free 30-minute strategy call with CodEarn Tech. Discuss your SaaS idea, web application, AI project, or training needs. No obligation.",
  keywords: [
    "book free consultation",
    "strategy call software company",
    "SaaS consultation",
    "AI project consultation",
    "web development consultation Dubai",
    "hire software developers",
    "free tech consultation",
  ],
  alternates: { canonical: "/book-call" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/book-call`,
    title: "Book a Free Strategy Call | CodEarn Tech",
    description:
      "Discuss your project with our experts. Free 30-minute consultation.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Strategy Call | CodEarn Tech",
    description: "Free 30-minute consultation with CodEarn Tech experts.",
    images: [SITE_OG_IMAGE],
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Book a Call | CodEarn Tech",
  url: `${SITE_URL}/book-call`,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: CONTACT.email,
      availableLanguage: ["English", "Urdu", "Arabic"],
      areaServed: "Worldwide",
    },
  },
};

export default function BookCall() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={contactPageSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Book a Call", path: "/book-call" },
        ])}
      />
      <BookCallPage />
    </div>
  );
}