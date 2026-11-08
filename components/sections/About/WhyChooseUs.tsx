"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Code2,
  FileCheck2,
  RefreshCw,
  MessageSquare,
  Clock,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";

const ICONS = [Code2, FileCheck2, RefreshCw, MessageSquare, Clock, CheckCircle2];

type Pillar = {
  category: string;
  title: string;
  description: string;
};

export function WhyChooseUsSection() {
  const t = useTranslations("About.why");
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const pillars = t.raw("pillars") as Pillar[];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(
      pillars.length - 1,
      Math.floor(latest * pillars.length),
    );
    setActiveIndex(idx);
  });

  return (
    <div
      ref={containerRef}
      className="relative h-auto md:h-[450vh] bg-background w-full"
    >
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex items-center py-20 md:py-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] bg-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="col-span-1 md:col-span-5 flex flex-col items-start w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  {t("badge")}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6">
                {t("headingLine1")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary/90 to-primary/60 font-semibold">
                  {t("headingLine2")}
                </span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-sm mb-8">
                {t("description")}
              </p>

              <div className="hidden md:flex relative items-center gap-4 w-full max-w-[240px] pt-5 border-t border-primary/10">
                <div className="absolute start-[7px] top-5 bottom-0 w-[2px] bg-primary/[0.06] rounded-full" />
                <motion.div
                  className="absolute start-[7px] top-5 w-[2px] bg-primary rounded-full origin-top"
                  style={{ scaleY, height: "calc(100% - 20px)" }}
                />
                <div className="flex flex-col gap-3 ps-6 w-full">
                  {pillars.map((item, idx) => (
                    <div
                      key={item.title}
                      className={`text-[10px] font-mono font-bold tracking-wider transition-all duration-300 ${
                        idx === activeIndex
                          ? "text-primary translate-x-1 rtl:-translate-x-1"
                          : "text-muted-foreground/20"
                      }`}
                    >
                      0{idx + 1} — {item.category}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="col-span-1 md:col-span-7 w-full relative">
              <div className="hidden md:relative md:block w-full h-[340px] lg:h-[320px]">
                <AnimatePresence mode="wait">
                  {pillars.map((item, index) => {
                    if (index !== activeIndex) return null;
                    const Icon = ICONS[index] ?? Code2;
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, scale: 0.97, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97, y: -12 }}
                        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 p-8 lg:p-10 rounded-[24px] border border-primary/10 bg-background shadow-lg flex flex-col justify-between overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-transparent pointer-events-none" />
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-primary">
                              // {item.category}
                            </span>
                            <div className="p-2.5 rounded-xl border border-primary/10 bg-primary/[0.04] text-primary">
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>
                          <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-3">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                        <div className="relative z-10 flex items-center gap-1.5 mt-4 text-primary">
                          <span className="text-[10px] font-bold tracking-wider uppercase">
                            CodEarn practice
                          </span>
                          <ArrowUpRight className="w-3 h-3 rtl:-scale-x-100" />
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-5 md:hidden w-full">
                {pillars.map((item, idx) => {
                  const Icon = ICONS[idx] ?? Code2;
                  return (
                    <div
                      key={item.title}
                      className="p-6 rounded-[22px] border border-primary/10 bg-background/60 backdrop-blur-sm flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-primary">
                          0{idx + 1} // {item.category}
                        </span>
                        <div className="p-2 rounded-lg bg-primary/[0.04] text-primary">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold tracking-tight text-foreground mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}