import ProductsHero from "@/components/sections/products/ProductHero";
import LiveProduct from "@/components/sections/products/live-product";
import Problem from "@/components/sections/products/problem";
import ProductFlow from "@/components/sections/products/product-flow";
import HowItWorks from "@/components/sections/products/how-it-works";
import Capabilities from "@/components/sections/products/capabilities";
import ProductExperience from "@/components/sections/products/product-experience";
import WhoItsFor from "@/components/sections/products/who-its-for";
import WhyWeBuilt from "@/components/sections/products/why-we-built";
import ProductStatus from "@/components/sections/products/product-status";
import WhatsNext from "@/components/sections/products/whats-next";
import FinalCTA from "@/components/sections/products/final-cta";
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
  title: "SaaS Products | Innovative Software by CodEarn Tech",
  description:
    "Explore CodEarn Tech's SaaS products built to automate workflows, empower teams, and solve real business problems. Discover our roadmap and upcoming innovations.",
  keywords: [
    "SaaS products",
    "software products Dubai",
    "business automation tools",
    "cloud software",
    "enterprise SaaS",
    "CodEarn Tech products",
    "software innovation",
  ],
  alternates: { canonical: "/products" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/products`,
    title: "CodEarn Tech Products | SaaS & Software Solutions",
    description:
      "Discover our SaaS products portfolio and upcoming innovations.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodEarn Tech Products",
    description: "Innovative SaaS & software solutions.",
    images: [SITE_OG_IMAGE],
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CodEarn Tech SaaS Suite",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/products`,
  description:
    "Suite of SaaS products for business automation and digital transformation.",
  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "48",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available",
  },
};

export default function ProductsPage() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={softwareSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
      <ProductsHero />
      <LiveProduct />
      <Problem />
      <ProductFlow />
      <HowItWorks />
      <Capabilities />
      <ProductExperience />
      <WhoItsFor />
      <WhyWeBuilt />
      <ProductStatus />
      <WhatsNext />
      <FinalCTA />
    </div>
  );
}