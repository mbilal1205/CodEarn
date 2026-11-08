"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import {
  Server,
  Code2,
  Smartphone,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Users,
  Tag,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ICONS = [Server, Code2, Smartphone, Cpu, ShieldCheck];

interface ServiceItem {
  id: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  typicalFor: string;
  timeline: string;
  startingPrice: string;
  cta: string;
}

export default function ServicesList() {
  const t = useTranslations("Services.list");
  const services = t.raw("services") as ServiceItem[];

  return (
    <section className="relative w-full bg-background py-20 md:py-28">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Quick nav chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground me-2">
            {t("quickNav")}:
          </span>
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-muted border border-border text-xs font-medium text-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all"
            >
              {s.name}
            </a>
          ))}
        </div>

        {/* Service sections */}
        <div className="space-y-20 md:space-y-28">
          {services.map((service, index) => {
            const Icon = ICONS[index] ?? Server;
            return (
              <motion.section
                key={service.id}
                id={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="scroll-mt-28 relative"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                  {/* Left: icon + number */}
                  <div className="lg:col-span-4 lg:sticky lg:top-28">
                    <div className="flex items-center gap-4 mb-5">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 border border-primary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <span className="font-mono text-4xl font-black text-primary/15">
                        {service.number}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-3">
                      {service.name}
                    </h3>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {service.tagline}
                    </p>
                  </div>

                  {/* Right: content */}
                  <div className="lg:col-span-8">
                    <p className="text-base md:text-lg text-foreground/85 leading-relaxed mb-8">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">
                        {t("whatYouGet")}
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm md:text-base text-foreground/85">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Meta strip */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-muted/40 border border-border mb-8">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          <Users className="w-3.5 h-3.5" />
                          {t("typicalFor")}
                        </div>
                        <p className="text-xs md:text-sm text-foreground/85 leading-relaxed">
                          {service.typicalFor}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {t("timelineLabel")}
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {service.timeline}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                          <Tag className="w-3.5 h-3.5" />
                          {t("priceLabel")}
                        </div>
                        <p className="text-sm font-bold text-primary">
                          {service.startingPrice}
                        </p>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link href="/contact">
                      <Button className="rounded-full px-6 h-12 group">
                        {service.cta}
                        <ArrowRight className="w-4 h-4 ms-2 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Divider (not after last) */}
                {index < services.length - 1 && (
                  <div className="mt-20 md:mt-28 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                )}
              </motion.section>
            );
          })}
        </div>
      </div>
    </section>
  );
}