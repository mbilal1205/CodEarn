"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Play,
  Quote,
  MapPin,
  Rocket,
  Users,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function AboutHero() {
  const t = useTranslations("About.hero");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const trustBadges = t.raw("trustBadges") as string[];

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-background overflow-hidden pt-20"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 end-0 w-2/3 h-full bg-muted/30 skew-x-12 transform origin-top-right" />
        <div className="absolute bottom-0 start-0 w-1/2 h-1/2 bg-linear-to-tr from-primary/5 to-transparent" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="absolute top-32 end-20 w-64 h-64 rounded-full bg-linear-to-br from-primary/10 to-primary/5 blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="min-h-[calc(100vh-5rem)] flex items-center">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full py-12">
            {/* Left content */}
            <motion.div
              className="lg:col-span-7 space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{t("location")}</span>
                <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                <span>{t("since")}</span>
              </div>

              <div className="space-y-2">
                <motion.h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 }}
                >
                  {t("headingLine1")}
                </motion.h1>
                <motion.h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] text-muted-foreground/40"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 }}
                >
                  {t("headingLine2")}
                </motion.h1>
                <motion.h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 }}
                >
                  <span className="text-primary">{t("headingLine3")}</span>
                </motion.h1>
              </div>

              <motion.p
                className="text-xl text-muted-foreground max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.5 }}
              >
                {t("subtitle")}
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <Button size="lg" asChild className="rounded-full px-8 gap-2 group">
                  <Link href="/contact">
                    {t("ctaPrimary")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </Button>
                <Button variant="ghost" size="lg" asChild className="rounded-full gap-2">
                  <Link href="/founder">
                    <Play className="w-4 h-4" />
                    {t("ctaSecondary")}
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right card */}
            <motion.div
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-linear-to-r from-primary/20 to-primary/10 rounded-3xl blur-2xl opacity-50" />

                <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
                  <Quote className="w-10 h-10 text-primary/20 mb-6" />

                  <blockquote className="text-2xl font-medium text-foreground leading-relaxed mb-6">
                    {t("quote")}
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-lg">
                      C
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {t("quoteAuthor")}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t("quoteRole")}
                      </div>
                    </div>
                  </div>

                  {/* Honest trust badges — replaces fake stats */}
                  <div className="mt-8 pt-8 border-t border-border space-y-2.5">
                    {trustBadges.map((badge) => (
                      <div key={badge} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-muted-foreground">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="absolute -bottom-6 -start-6 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Rocket className="w-4 h-4" />
                  <span className="text-sm font-semibold">
                    {t("badgeAvailable")}
                  </span>
                </motion.div>

                <div className="absolute -top-4 -end-4 bg-card border border-border px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}