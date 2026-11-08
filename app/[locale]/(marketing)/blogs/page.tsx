import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import BlogListing from "@/components/sections/blog/BlogListing";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";
import { blogPosts } from "@/lib/blog-data";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog.metadata" });
  const isArabic = locale === "ar";

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/blogs`,
      languages: {
        en: "/en/blogs",
        ar: "/ar/blogs",
        "x-default": "/en/blogs",
      },
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AE" : "en_AE",
      url: `${SITE_URL}/${locale}/blogs`,
      siteName: SITE_NAME,
      title: t("title"),
      description: t("description"),
      images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [SITE_OG_IMAGE],
    },
  };
}

export default async function BlogsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog.metadata" });

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: t("title"),
    description: t("description"),
    url: `${SITE_URL}/${locale}/blogs`,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: locale === "ar" ? post.title.ar : post.title.en,
      description: locale === "ar" ? post.excerpt.ar : post.excerpt.en,
      url: `${SITE_URL}/${locale}/blogs/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
      image: `${SITE_URL}${post.coverImage}`,
    })),
  };

  return (
    <div className="bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={blogSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Blog", path: `/${locale}/blogs` },
        ])}
      />
      <BlogListing />
    </div>
  );
}