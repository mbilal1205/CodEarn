"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Play,
  Quote,
  MapPin,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutHero() {
  const t = useTranslations("About.hero");
  const containerRef = useRef(null);
  const trustBadges = t.raw("trustBadges") as string[];

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-background pt-28 pb-32 md:pt-40 md:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] max-w-[900px] h-[60vh] bg-primary/[0.06] dark:bg-primary/[0.08] rounded-full blur-[100px]" />
        <svg className="absolute inset-0 w-full h-full opacity-20 dark:opacity-30" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" className="stroke-primary/[0.08] dark:stroke-primary/[0.12]" strokeWidth="0.8" />
            </pattern>
            <radialGradient id="about-vignette" cx="50%" cy="30%" r="70%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="60%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="about-fade">
              <rect width="100%" height="100%" fill="url(#about-vignette)" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" mask="url(#about-fade)" />
        </svg>
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-muted-foreground mb-6 md:mb-8"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{t("location")}</span>
              </span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
              <span>{t("since")}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="font-extrabold tracking-tight text-foreground leading-[1.05] mb-6 md:mb-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <span className="block">{t("headingLine1")}</span>
              <span className="block text-muted-foreground/60 font-semibold">{t("headingLine2")}</span>
              <span className="block text-primary">{t("headingLine3")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 md:mb-10"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto"
            >
              <Button size="lg" asChild className="w-full sm:w-auto h-12 rounded-full px-7 gap-2 group bg-primary shadow-lg shadow-primary/25 hover:shadow-xl transition-shadow">
                <Link href="/contact">
                  {t("ctaPrimary")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="w-full sm:w-auto h-12 rounded-full px-7 gap-2 border-border hover:bg-muted">
                <Link href="/founder">
                  <Play className="w-4 h-4" />
                  {t("ctaSecondary")}
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-3 md:-inset-4 rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-2xl opacity-60 -z-10" />
            <div className="relative rounded-2xl md:rounded-3xl border border-border bg-card shadow-xl p-6 sm:p-7 md:p-8">
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] md:text-xs font-semibold text-green-600 dark:text-green-400">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                  </span>
                  {t("badgeAvailable")}
                </span>
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
              </div>
              <Quote className="w-8 h-8 md:w-10 md:h-10 text-primary/25 mb-3" />
              <blockquote className="text-lg sm:text-xl md:text-2xl font-medium text-foreground leading-relaxed mb-6">
                {t("quote")}
              </blockquote>
              <div className="flex items-center gap-3 pb-6 border-b border-border">
                <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-base shrink-0">
                  C
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-foreground text-sm md:text-base truncate">{t("quoteAuthor")}</div>
                  <div className="text-xs md:text-sm text-muted-foreground truncate">{t("quoteRole")}</div>
                </div>
              </div>
              <div className="pt-6 space-y-2.5">
                {trustBadges.map((badge) => (
                  <div key={badge} className="flex items-start gap-2.5 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground/80 leading-snug">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}