import BlogPage from "@/components/sections/blogs/blogmain";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_LOGO,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Software Development, AI & Tech Insights",
  description:
    "Expert articles on SaaS development, web engineering, AI, cloud, and modern software practices from the CodEarn Tech team.",
  keywords: [
    "software development blog",
    "SaaS development articles",
    "AI tutorials",
    "web development insights",
    "programming best practices",
    "tech blog Dubai",
    "engineering blog",
    "startup technology articles",
  ],
  alternates: { canonical: "/blogs" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/blogs`,
    title: "CodEarn Tech Blog | Software, AI & Engineering",
    description:
      "Deep dives into SaaS, web engineering, AI, and modern software development from CodEarn Tech.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CodEarn Tech Blog",
    description: "Software, AI & engineering insights.",
    images: [SITE_OG_IMAGE],
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "CodEarn Tech Blog",
  description:
    "Software development insights, AI, SaaS, and engineering articles",
  url: `${SITE_URL}/blogs`,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    logo: { "@type": "ImageObject", url: SITE_LOGO },
  },
};

export default function Blogs() {
  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={blogSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blogs" },
        ])}
      />
      <BlogPage />
    </div>
  );
}