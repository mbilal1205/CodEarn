"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

interface Step {
  number: string;
  title: string;
  description: string;
}

export default function ServicesProcess() {
  const t = useTranslations("Services.process");
  const steps = t.raw("steps") as Step[];

  return (
    <section className="relative w-full bg-background py-20 md:py-28 border-y border-border/50">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
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

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-5">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="text-4xl font-black text-primary/15 mb-3 font-mono">
                {step.number}
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}