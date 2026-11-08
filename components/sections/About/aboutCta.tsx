"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  MessageSquare,
  Calendar,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function FinalCTA() {
  const t = useTranslations("About.finalCta");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const cardFeatures = t.raw("cardFeatures") as string[];

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="relative p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-muted/50 via-background to-muted/50 border border-border overflow-hidden"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="relative">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Badge className="mb-4 px-4 py-1.5 bg-primary/10 text-primary border-0">
                  <Zap className="w-3 h-3 me-2 inline" />
                  {t("badge")}
                </Badge>
              </motion.div>

              <motion.h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground"
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("headingLine1")}{" "}
                <span className="text-primary">{t("headingLine2")}</span>
              </motion.h2>

              <motion.p
                className="text-lg text-muted-foreground"
                initial={prefersReducedMotion ? {} : { opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t("description")}
              </motion.p>
            </div>

            {/* Single card — for businesses only */}
            <div className="max-w-2xl mx-auto">
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                whileHover={prefersReducedMotion ? {} : { y: -4 }}
                className="group"
              >
                <div className="h-full p-6 lg:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-primary/10 text-primary">
                    {t("cardBadge")}
                  </span>

                  <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
                    {t("cardTitle")}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {t("cardDescription")}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {cardFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-primary text-primary-foreground hover:opacity-90"
                  >
                    {t("cardCta")}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Trust line — honest */}
            <motion.div
              className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted-foreground"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>{t("trustLine1")}</span>
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{t("trustLine2")}</span>
              </div>
              <span className="hidden sm:inline text-border">|</span>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>{t("trustLine3")}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}