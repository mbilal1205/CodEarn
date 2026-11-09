"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Cloud, Code2, Smartphone, Zap, ArrowRight, Check, Layers } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SERVICE_ICONS = [Cloud, Code2, Smartphone, Zap];
const PROCESS_ICONS = [Layers, Code2, Zap, Check];

type ServiceItem = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  technologies: string[];
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export function WhatWeDo() {
  const t = useTranslations("About.whatWeDo");
  const ref = useRef(null);

  const services = t.raw("services") as ServiceItem[];
  const processSteps = t.raw("process") as ProcessStep[];

  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id ?? "saas");

  const currentService = services.find((s) => s.id === activeServiceId) ?? services[0];
  const currentIconIndex = services.findIndex((s) => s.id === activeServiceId);
  const CurrentIcon = SERVICE_ICONS[currentIconIndex] ?? Cloud;

  return (
    <section ref={ref} className="relative pt-16 pb-28 sm:pt-20 sm:pb-24 md:py-24 lg:py-28 bg-background overflow-hidden">
      <div className="container mx-auto px-5 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          className="max-w-3xl mb-10 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="outline" className="mb-4 px-3 py-1 text-xs font-semibold border-primary/30 text-primary bg-primary/[0.04]">
            {t("badge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-foreground leading-tight">
            {t("headingLine1")} <span className="text-primary">{t("headingLine2")}</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 mb-16 md:mb-24">
          <div className="lg:hidden -mx-5 px-5 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 pb-1 min-w-max">
              {services.map((service, i) => {
                const Icon = SERVICE_ICONS[i] ?? Cloud;
                const isActive = activeServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                      isActive ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/25" : "bg-card text-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    {service.title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 flex flex-col gap-2">
              {services.map((service, i) => {
                const Icon = SERVICE_ICONS[i] ?? Cloud;
                const isActive = activeServiceId === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`w-full text-start p-4 rounded-xl border transition-all duration-200 ${
                      isActive ? "bg-primary/5 border-primary/40 shadow-sm" : "bg-card border-border hover:border-primary/30 hover:bg-card/80"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-semibold text-sm leading-tight ${isActive ? "text-foreground" : "text-foreground/80"}`}>
                          {service.title}
                        </h3>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{service.tagline}</p>
                      </div>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl md:rounded-3xl border border-border bg-card p-5 sm:p-6 md:p-8 shadow-sm"
              >
                <div className="flex items-start gap-3 md:gap-4 mb-5 md:mb-6">
                  <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <CurrentIcon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-2xl font-bold text-foreground leading-tight">{currentService.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-0.5">{currentService.tagline}</p>
                  </div>
                </div>
                <div className="h-px bg-border mb-5 md:mb-6" />
                <p className="text-sm md:text-base text-foreground/85 leading-relaxed mb-6 md:mb-8">{currentService.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div>
                    <h4 className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t("whatYouGet")}</h4>
                    <ul className="space-y-2.5">
                      {currentService.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2.5 text-sm">
                          <div className="w-4 h-4 rounded-full bg-primary/15 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
                          </div>
                          <span className="text-foreground/80 leading-snug">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">{t("techStack")}</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {currentService.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 rounded-md text-xs font-medium border border-border bg-muted/50 text-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <Link href="/services" className="inline-flex items-center gap-1.5 mt-5 text-sm font-semibold text-primary hover:gap-2.5 transition-all group">
                      {t("learnMore")}
                      <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-12 md:mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{t("processHeading")}</h3>
            <p className="text-sm md:text-base text-muted-foreground">{t("processSubtitle")}</p>
          </div>

          <div className="md:hidden space-y-1">
            {processSteps.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? Check;
              const isLast = i === processSteps.length - 1;
              return (
                <div key={step.number} className="flex gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-primary/10 border-2 border-primary/25 flex items-center justify-center shadow-sm">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-border to-transparent min-h-[40px]" />}
                  </div>
                  <div className={`flex-1 ${isLast ? "pb-0" : "pb-6"}`}>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/[0.08] px-2 py-0.5 rounded mb-1.5">
                      Step {step.number}
                    </span>
                    <h4 className="text-base font-bold text-foreground mb-1.5">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? Check;
              return (
                <div key={step.number} className="relative p-5 lg:p-6 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-3xl font-black text-muted-foreground/15 leading-none">{step.number}</span>
                  </div>
                  <h4 className="text-base font-bold text-foreground mb-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-border bg-gradient-to-br from-primary/[0.05] via-card to-card p-6 md:p-10 text-center">
          <div className="pointer-events-none absolute -top-20 end-0 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
          <div className="relative">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">{t("ctaHeading")}</h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6 max-w-xl mx-auto leading-relaxed">{t("ctaDescription")}</p>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25 hover:opacity-95 hover:shadow-xl transition-all group">
              {t("ctaButton")}
              <ArrowRight className="w-4 h-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}