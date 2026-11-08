import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import BlogPost from "@/components/sections/blog/BlogPost";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  buildBreadcrumbs,
} from "@/lib/seo/site";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.flatMap((locale) =>
    blogPosts.map((p) => ({ locale, slug: p.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Article not found", robots: { index: false } };
  }

  const isArabic = locale === "ar";
  const title = isArabic ? post.title.ar : post.title.en;
  const description = isArabic ? post.excerpt.ar : post.excerpt.en;
  const url = `${SITE_URL}/${locale}/blogs/${slug}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    keywords: post.tags,
    alternates: {
      canonical: `/${locale}/blogs/${slug}`,
      languages: {
        en: `/en/blogs/${slug}`,
        ar: `/ar/blogs/${slug}`,
        "x-default": `/en/blogs/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: isArabic ? "ar_AE" : "en_AE",
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: `${SITE_URL}${post.coverImage}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}${post.coverImage}`],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const isArabic = locale === "ar";
  const title = isArabic ? post.title.ar : post.title.en;
  const description = isArabic ? post.excerpt.ar : post.excerpt.en;
  const url = `${SITE_URL}/${locale}/blogs/${slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url,
    inLanguage: locale,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    keywords: post.tags.join(", "),
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={articleSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Blog", path: `/${locale}/blogs` },
          { name: title, path: `/${locale}/blogs/${slug}` },
        ])}
      />
      <BlogPost post={post} />
    </div>
  );
}