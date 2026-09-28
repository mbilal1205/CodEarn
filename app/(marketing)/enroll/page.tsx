import EnrollPage from "@/components/sections/enroll/enrollpage";
import PageLoader from "@/components/ui/page-loader";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Enroll Now | IT Training with Internship | CodEarn Tech",
  description:
    "Enroll in CodEarn Tech's practical IT training programs. Learn Full Stack Development, Backend Engineering, and Data Modeling with real projects and internship support.",
  keywords: [
    "enroll IT course",
    "online programming bootcamp",
    "full stack developer training",
    "backend development course",
    "software internship program",
    "learn coding online",
    "IT training enrollment",
    "online tech courses",
  ],
  alternates: { canonical: "/enroll" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/enroll`,
    title: "Enroll Now | CodEarn Tech Training",
    description:
      "Start your tech career with practical training and internship support.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enroll Now | CodEarn Tech Training",
    description: "Practical IT training with internship support.",
    images: [SITE_OG_IMAGE],
  },
};

export default function Enroll() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Training", path: "/training" },
          { name: "Enroll", path: "/enroll" },
        ])}
      />
      <Suspense fallback={<PageLoader message="Setting up your workspace..." />}>
        <EnrollPage />
      </Suspense>
    </div>
  );
}