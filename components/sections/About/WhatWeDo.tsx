"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Cloud,
  Code2,
  Smartphone,
  Zap,
  ArrowRight,
  Check,
  Layers,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();

  const services = t.raw("services") as ServiceItem[];
  const processSteps = t.raw("process") as ProcessStep[];

  const [activeServiceId, setActiveServiceId] = useState(services[0]?.id ?? "saas");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentService =
    services.find((s) => s.id === activeServiceId) ?? services[0];
  const currentIconIndex = services.findIndex((s) => s.id === activeServiceId);
  const CurrentIcon = SERVICE_ICONS[currentIconIndex] ?? Cloud;

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          className="max-w-3xl mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs sm:text-sm font-medium border-primary/20"
          >
            {t("badge")}
          </Badge>
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight mb-4 sm:mb-6 text-foreground">
            {t("headingLine1")}{" "}
            <span className="text-primary">{t("headingLine2")}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 mb-16 sm:mb-24">
          {/* Selector */}
          <div className="lg:col-span-4">
            <div className="flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 lg:overflow-visible snap-x snap-mandatory">
              {services.map((service, i) => {
                const isActive = activeServiceId === service.id;
                const Icon = SERVICE_ICONS[i] ?? Cloud;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveServiceId(service.id)}
                    className={`flex-shrink-0 lg:w-full text-start p-4 sm:p-5 rounded-xl border-2 transition-colors duration-200 snap-start w-[280px] sm:w-auto ${
                      isActive
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border hover:border-primary/20"
                    }`}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-primary/10" : "bg-muted"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${
                            isActive ? "text-primary" : "text-muted-foreground"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3
                          className={`font-semibold text-sm sm:text-base ${
                            isActive ? "text-foreground" : "text-muted-foreground"
                          }`}
                        >
                          {service.title}
                        </h3>
                        <p
                          className={`text-xs sm:text-sm mt-1 ${
                            isActive
                              ? "text-muted-foreground"
                              : "text-muted-foreground/60"
                          }`}
                        >
                          {service.tagline}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentService.id}
                initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="h-full p-6 sm:p-8 rounded-2xl border-2 border-primary/20 bg-primary/5"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-card shadow-sm flex items-center justify-center">
                      <CurrentIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                        {currentService.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {currentService.tagline}
                      </p>
                    </div>
                  </div>
                </div>

                <Separator className="my-6 border-primary/20" />

                <p className="text-foreground leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
                  {currentService.description}
                </p>

                <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                      {t("whatYouGet")}
                    </h4>
                    <ul className="space-y-2 sm:space-y-3">
                      {currentService.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm"
                        >
                          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 bg-primary/10">
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider mb-3 sm:mb-4">
                      {t("techStack")}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {currentService.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium border bg-card border-primary/20 text-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/services"
                      className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-xs sm:text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      {t("learnMore")}
                      <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Separator className="my-12 sm:my-16" />

        {/* Process */}
        <motion.div
          className="mb-12 sm:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground mb-3 sm:mb-4">
              {t("processHeading")}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground px-4">
              {t("processSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {processSteps.map((step, i) => {
              const Icon = PROCESS_ICONS[i] ?? Check;
              return (
                <div key={step.number} className="relative">
                  {i < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-6 start-full w-full h-px bg-gradient-to-r from-border to-transparent" />
                  )}
                  <div className="p-4 sm:p-6 rounded-xl bg-card border border-border h-full">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-2xl sm:text-3xl font-bold text-muted-foreground/20">
                        {step.number}
                      </span>
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-muted flex items-center justify-center">
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-foreground mb-1 sm:mb-2">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <div className="p-6 sm:p-8 rounded-2xl bg-muted/50 border border-border text-center">
          <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 sm:mb-3">
            {t("ctaHeading")}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto px-4">
            {t("ctaDescription")}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-primary text-primary-foreground text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity"
          >
            {t("ctaButton")}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}