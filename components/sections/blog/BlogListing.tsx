"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Tag, Sparkles } from "lucide-react";
import { blogPosts, getFeaturedPost, getRecentPosts } from "@/lib/blog-data";

export default function BlogListing() {
  const t = useTranslations("Blog.listing");
  const locale = useLocale();
  const isAr = locale === "ar";

  const featured = getFeaturedPost();
  const recent = getRecentPosts().filter((p) => p.slug !== featured.slug);

  const L = (obj: { en: string; ar: string }) => (isAr ? obj.ar : obj.en);

  return (
    <div className="relative w-full bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        </div>

        <div className="container mx-auto px-6 lg:px-8 max-w-5xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.05] border border-primary/15 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-widest text-primary uppercase">
              {t("badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground leading-tight mb-5"
          >
            {t("headingLine1")}{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              {t("headingLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>
      </section>

      {/* Featured post */}
      <section className="pb-16">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href={`/blogs/${featured.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8 rounded-3xl border border-border bg-card hover:border-primary/30 hover:shadow-2xl transition-all duration-500 overflow-hidden"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={featured.coverImage}
                  alt={L(featured.title)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 start-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  {t("featuredLabel")}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <Tag className="w-3.5 h-3.5" />
                    {L(featured.category)}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime} {t("minRead")}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight group-hover:text-primary transition-colors">
                  {L(featured.title)}
                </h2>

                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  {L(featured.excerpt)}
                </p>

                <div className="inline-flex items-center gap-2 text-sm font-bold text-primary uppercase tracking-widest group-hover:gap-3 transition-all">
                  {t("readMore")}
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest posts grid */}
      <section className="pb-24">
        <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("recentLabel")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recent.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/blogs/${post.slug}`}
                  className="group flex flex-col h-full rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                    <Image
                      src={post.coverImage}
                      alt={L(post.title)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-semibold text-primary">
                        {L(post.category)}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} {t("minRead")}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {L(post.title)}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1 mb-4">
                      {L(post.excerpt)}
                    </p>

                    <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary uppercase tracking-widest group-hover:gap-2.5 transition-all">
                      {t("readMore")}
                      <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}