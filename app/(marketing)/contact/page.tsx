import ContactPage from "@/components/sections/contect/contactmain";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOGO,
  SITE_OG_IMAGE,
  CONTACT,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact CodEarn Tech | Get a Free Consultation",
  description:
    "Contact CodEarn Tech for SaaS development, web applications, AI solutions, or IT training. Serving clients worldwide from Dubai, UAE. Free consultation available.",
  keywords: [
    "contact CodEarn Tech",
    "software company Dubai contact",
    "hire developers online",
    "SaaS development quote",
    "AI solutions contact",
    "IT training inquiry",
    "free software consultation",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/contact`,
    title: "Contact CodEarn Tech",
    description:
      "Get in touch for software, AI, and training inquiries. Worldwide service.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact CodEarn Tech",
    description: "Software, AI, and training inquiries. Worldwide service.",
    images: [SITE_OG_IMAGE],
  },
};

const contactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact CodEarn Tech",
  url: `${SITE_URL}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: SITE_LOGO,
    areaServed: "Worldwide",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT.email,
        availableLanguage: ["English", "Urdu", "Arabic"],
        areaServed: "Worldwide",
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: CONTACT.supportEmail,
        availableLanguage: ["English", "Urdu", "Arabic"],
        areaServed: "Worldwide",
      },
    ],
  },
};

export default function Contact() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={contactSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ContactPage />
    </div>
  );
}