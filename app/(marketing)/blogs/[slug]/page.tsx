import BlogPostPage from "@/components/sections/blogs/blogID";
import {
  getPostBySlug,
  getAllPostSlugs,
  type BlogPost as BlogPostType,
} from "@/lib/blogData";
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
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

/* ------------------------------------------------------------------ */
/* ✅ DYNAMIC METADATA                                                 */
/* ------------------------------------------------------------------ */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post: BlogPostType | undefined = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | CodEarn Tech",
      description:
        "The article you are looking for could not be found. Explore our blog for software, AI, and engineering insights.",
      robots: { index: false, follow: false },
    };
  }

  const title = post.title;
  const description = post.excerpt;
  const image = post.coverImage || SITE_OG_IMAGE;
  const url = `${SITE_URL}/blogs/${slug}`;

  return {
    title,
    description,
    keywords: post.tags.length
      ? post.tags
      : ["software development", "AI", "SaaS", "CodEarn Tech"],
    authors: [{ name: post.author.name }],
    category: post.category,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@codearntech",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

/* ------------------------------------------------------------------ */
/* ✅ STATIC PARAMS (real slugs)                                       */
/* ------------------------------------------------------------------ */
export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

/* ------------------------------------------------------------------ */
/* ✅ MAIN PAGE                                                        */
/* ------------------------------------------------------------------ */
export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post: BlogPostType | undefined = getPostBySlug(slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blogs/${slug}`;
  const image = post.coverImage || SITE_OG_IMAGE;

  /* ---------------- Article Schema (BlogPosting) ---------------- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      image: post.author.avatar.startsWith("http")
        ? post.author.avatar
        : `${SITE_URL}${post.author.avatar}`,
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: SITE_LOGO,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
    wordCount: post.content.replace(/<[^>]+>/g, "").split(/\s+/).length,
  };

  /* ---------------- Breadcrumbs ---------------- */
  const breadcrumbData = buildBreadcrumbs([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blogs" },
    { name: post.title, path: `/blogs/${slug}` },
  ]);

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbData} />

      <BlogPostPage slug={slug} />
    </div>
  );
}