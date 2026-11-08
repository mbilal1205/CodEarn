"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServicesCta() {
  const t = useTranslations("Services.cta");

  return (
    <section className="relative w-full bg-background py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 p-10 md:p-16 text-center"
        >
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
          <div className="pointer-events-none absolute -end-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-[100px]" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-bold uppercase tracking-widest text-primary mb-6">
              <Sparkles className="w-3 h-3" />
              {t("badge")}
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-5 leading-tight">
              {t("heading")}
            </h2>

            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto leading-relaxed">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/contact">
                <Button size="lg" className="h-13 rounded-full px-8 text-base font-semibold shadow-lg shadow-primary/25 group">
                  {t("primaryButton")}
                  <ArrowRight className="w-4 h-4 ms-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Button>
              </Link>
              <Link href="/case-studies">
                <Button size="lg" variant="outline" className="h-13 rounded-full px-8 text-base font-semibold border-border hover:bg-muted">
                  {t("secondaryButton")}
                </Button>
              </Link>
            </div>

            <p className="mt-8 text-xs text-muted-foreground uppercase tracking-widest font-semibold">
              {t("note")}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}