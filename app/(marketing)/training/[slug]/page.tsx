import CourseDetailHero from "@/components/sections/academy/courses/coursesDeatilHero";
import CourseOverview from "@/components/sections/academy/courses/courseOverview";
import WhatYouWillBecome from "@/components/sections/academy/courses/whatYouWillBecome";
import WhyDifferent from "@/components/sections/academy/courses/whyDifferent";
import CourseRoadmap from "@/components/sections/academy/courses/courseRoadmap";
import ProjectsBuild from "@/components/sections/academy/courses/projectsBuild";
import PortfolioPreview from "@/components/sections/academy/courses/portfolioPreview";
import GithubTransformation from "@/components/sections/academy/courses/githubTransformation";
import CertificatePreview from "@/components/sections/academy/courses/certificatePreview";
import WhoShouldJoin from "@/components/sections/academy/courses/whoShouldJoin";
import ToolsUsed from "@/components/sections/academy/courses/toolsUsed";
import CourseRequirements from "@/components/sections/academy/courses/courseRequirements";
import SuccessPath from "@/components/sections/academy/courses/successPath";
import FinalEnrollment from "@/components/sections/academy/courses/finalEnrollment";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
} from "@/lib/seo/site";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Slug -> Course info mapping (aap apne data source se replace karein)
const courseMap: Record<
  string,
  { title: string; description: string; duration: string; mode: string }
> = {
  "full-stack-development": {
    title: "Full Stack Web Development",
    description:
      "Master frontend, backend, databases, and deployment with real-world projects and internship support.",
    duration: "P3M",
    mode: "online",
  },
  "backend-development": {
    title: "Backend Development",
    description:
      "Learn server-side engineering with Node.js, APIs, authentication, and scalable architecture.",
    duration: "P2M",
    mode: "online",
  },
  "data-modeling": {
    title: "Data Modeling & Databases",
    description:
      "Design efficient databases, master SQL & NoSQL, and learn real-world data modeling patterns.",
    duration: "P2M",
    mode: "online",
  },
};

function slugToTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courseMap[slug];

  const title = course
    ? `${course.title} Course | CodEarn Tech`
    : `${slugToTitle(slug)} | CodEarn Tech`;

  const description = course
    ? course.description
    : `Learn ${slugToTitle(slug)} with CodEarn Tech. Practical, project-based online training.`;

  return {
    title,
    description,
    keywords: [
      slug.replace(/-/g, " "),
      "online course",
      "IT training",
      "CodEarn Tech training",
      "coding course",
    ],
    alternates: { canonical: `/training/${slug}` },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/training/${slug}`,
      title,
      description,
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SITE_OG_IMAGE],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(courseMap).map((slug) => ({ slug }));
}

export default async function TrainingSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const course = courseMap[slug];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course?.title || slugToTitle(slug),
    description:
      course?.description ||
      `Learn ${slugToTitle(slug)} with CodEarn Tech.`,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    educationalLevel: "Beginner to Advanced",
    timeRequired: course?.duration || "P2M",
    inLanguage: ["en", "ur"],
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT15H",
      inLanguage: ["en", "ur"],
    },
    offers: {
      "@type": "Offer",
      category: "Paid",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <main className="w-full min-h-screen bg-background text-foreground">
      <JsonLd data={courseSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Training", path: "/training" },
          { name: course?.title || slugToTitle(slug), path: `/training/${slug}` },
        ])}
      />
      <CourseDetailHero slug={slug} />
      <CourseOverview slug={slug} />
      <WhatYouWillBecome slug={slug} />
      <WhyDifferent slug={slug} />
      <CourseRoadmap slug={slug} />
      <ProjectsBuild slug={slug} />
      <PortfolioPreview slug={slug} />
      <GithubTransformation slug={slug} />
      <CertificatePreview slug={slug} />
      <WhoShouldJoin slug={slug} />
      <ToolsUsed slug={slug} />
      <CourseRequirements slug={slug} />
      <SuccessPath slug={slug} />
      <FinalEnrollment slug={slug} />
    </main>
  );
}