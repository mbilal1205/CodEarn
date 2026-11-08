"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code2, MessageSquare, FileCheck2, Clock } from "lucide-react";

const ICONS = [Code2, MessageSquare, FileCheck2, Clock];

interface Item {
  title: string;
  description: string;
}

export default function ServicesDeliverables() {
  const t = useTranslations("Services.deliverables");
  const items = t.raw("items") as Item[];

  return (
    <section className="relative w-full bg-muted/30 py-20 md:py-28 border-b border-border/50">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/[0.05] border border-primary/15 text-[10px] font-bold uppercase tracking-widest text-primary mb-5">
            {t("badge")}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {t("heading")}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Code2;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-bold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}