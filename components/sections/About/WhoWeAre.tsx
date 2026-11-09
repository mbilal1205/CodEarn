"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Target, Users, Lightbulb, Heart, ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const ICONS = [Target, Users, Lightbulb, Heart];

export function WhoWeAre() {
  const t = useTranslations("About.whoWeAre");
  const cards = t.raw("cards") as Array<{ title: string; description: string; point: string }>;
  const differentiators = t.raw("differentiators") as string[];

  return (
    <section className="pt-24 pb-32 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="max-w-3xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-sm font-medium border-primary/20">
            {t("badge")}
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-foreground">
            {t("headingLine1")} <span className="text-primary">{t("headingLine2")}</span>{t("headingLine3")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t("description")}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {cards.map((card, i) => {
            const Icon = ICONS[i] ?? Target;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-300"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">{card.description}</p>
                    <div className="flex items-center gap-2 text-sm font-medium text-primary">
                      <CheckCircle2 className="w-4 h-4" />
                      {card.point}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <Separator className="my-16" />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{t("differentiatorsHeading")}</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">{t("differentiatorsDescription")}</p>
            <ul className="space-y-4">
              {differentiators.map((item) => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-3xl blur-2xl" />
            <div className="relative p-8 rounded-2xl bg-card border border-border space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{t("promiseTitle")}</h4>
                <p className="text-muted-foreground leading-relaxed">{t("promiseBody")}</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                {t("promiseLink")}
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}