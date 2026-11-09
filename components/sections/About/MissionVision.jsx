"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Target,
  Eye,
  Rocket,
  Heart,
  Globe,
  Zap,
  ArrowRight,
  Quote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BELIEF_ICONS = [Zap, Heart, Globe];

/* SSR-safe animation variants */
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5 },
};

const fadeLeft = {
  initial: { opacity: 0, x: -30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

const fadeRight = {
  initial: { opacity: 0, x: 30 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

export function MissionVision() {
  const t = useTranslations("About.mission");

  const missionPoints = t.raw("missionPoints");
  const visionPoints = t.raw("visionPoints");
  const beliefs = t.raw("beliefs");

  return (
    <section className="py-20 lg:py-28 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-primary/20"
          >
            {t("badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {t("heading")}
          </h2>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {/* Mission */}
          <motion.div
            initial={fadeLeft.initial}
            whileInView={fadeLeft.whileInView}
            viewport={fadeLeft.viewport}
            transition={fadeLeft.transition}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/60 to-primary/30 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative h-full p-8 rounded-2xl bg-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {t("missionLabel")}
              </h3>
              <h4 className="text-2xl font-bold text-foreground mb-4">
                {t("missionTitle")}
              </h4>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("missionBody")}
              </p>

              <ul className="space-y-3">
                {missionPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Rocket className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={fadeRight.initial}
            whileInView={fadeRight.whileInView}
            viewport={fadeRight.viewport}
            transition={fadeRight.transition}
            className="group relative"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/40 to-primary/20 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative h-full p-8 rounded-2xl bg-card border border-border">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                {t("visionLabel")}
              </h3>
              <h4 className="text-2xl font-bold text-foreground mb-4">
                {t("visionTitle")}
              </h4>

              <p className="text-muted-foreground leading-relaxed mb-6">
                {t("visionBody")}
              </p>

              <ul className="space-y-3">
                {visionPoints.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Globe className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        <Separator className="my-16" />

        {/* Beliefs */}
        <motion.div
          className="mb-16"
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={fadeUp.transition}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-12">
            {t("beliefsHeading")}
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {beliefs.map((belief, i) => {
              const Icon = BELIEF_ICONS[i] || Zap;
              return (
                <motion.div
                  key={belief.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-colors text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">
                    {belief.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {belief.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative p-8 lg:p-12 rounded-3xl bg-primary/5 border border-primary/10 text-center"
        >
          <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
          <blockquote className="text-xl lg:text-2xl font-medium text-foreground max-w-3xl mx-auto mb-6 leading-relaxed">
            {t("quote")}
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-sm">
              CT
            </div>
            <div className="text-start">
              <div className="font-semibold text-foreground text-sm">
                {t("quoteAuthor")}
              </div>
              <div className="text-xs text-muted-foreground">
                {t("quoteRole")}
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={fadeUp.initial}
          whileInView={fadeUp.whileInView}
          viewport={fadeUp.viewport}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 text-center"
        >
          <p className="text-muted-foreground mb-4">{t("ctaText")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}