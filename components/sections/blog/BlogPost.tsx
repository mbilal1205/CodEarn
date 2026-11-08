"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, Clock, Tag, User, MessageCircle } from "lucide-react";
import type { BlogPost as BlogPostType } from "@/lib/blog-data";
import { getRelatedPosts } from "@/lib/blog-data";

const WHATSAPP_NUMBER = "971541757432";

export default function BlogPost({ post }: { post: BlogPostType }) {
  const t = useTranslations("Blog.post");
  const locale = useLocale();
  const isAr = locale === "ar";
  const L = (obj: { en: string; ar: string }) => (isAr ? obj.ar : obj.en);

  const related = getRelatedPosts(post.slug, 3);
  const published = new Date(post.publishedAt).toLocaleDateString(
    isAr ? "ar-AE" : "en-AE",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const shareText = encodeURIComponent(L(post.title));
  const shareUrl = encodeURIComponent(
    `https://www.codearntech.com/${locale}/blogs/${post.slug}`
  );
  const whatsappShare = `https://wa.me/${WHATSAPP_NUMBER}?text=${shareText}%20${shareUrl}`;

  return (
    <article className="relative w-full bg-background">
      {/* Back link */}
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl pt-28 md:pt-32">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
          {t("backToBlog")}
        </Link>
      </div>

      {/* Header */}
      <header className="container mx-auto px-6 lg:px-8 max-w-3xl pt-8 pb-12">
        <div className="flex items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <Tag className="w-3 h-3" />
            {L(post.category)}
          </span>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime} min read
          </span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight mb-6"
        >
          {L(post.title)}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
        >
          {L(post.excerpt)}
        </motion.p>

        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {post.author.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {L(post.author.role)} · {published}
              </p>
            </div>
          </div>

          <a
            href={whatsappShare}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            {t("share")}
          </a>
        </div>
      </header>

      {/* Cover image */}
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl mb-12">
        <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-muted">
          <Image
            src={post.coverImage}
            alt={L(post.title)}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 lg:px-8 max-w-3xl pb-16">
        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-strong:text-foreground prose-table:text-sm">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {L(post.content)}
          </ReactMarkdown>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="border-t border-border bg-muted/30 py-16">
          <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
              {t("relatedTitle")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blogs/${r.slug}`}
                  className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="relative aspect-[16/10] bg-muted">
                    <Image
                      src={r.coverImage}
                      alt={L(r.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold text-primary">
                      {L(r.category)}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {L(r.title)}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}