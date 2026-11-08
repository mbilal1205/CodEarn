"use client";

import { memo, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Cpu,
  TrendingUp,
  Globe,
  Layers,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const ICONS = [Cpu, TrendingUp, Globe, Layers];

type ProblemItem = {
  tag: string;
  problem: string;
  solution: string;
  description: string;
};

export const ProblemsWeSolve = memo(() => {
  const t = useTranslations("Home.problems");
  const items = t.raw("items") as ProblemItem[];
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 25 });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.25) setActiveIndex(0);
    else if (latest < 0.5) setActiveIndex(1);
    else if (latest < 0.75) setActiveIndex(2);
    else setActiveIndex(3);
  });

  return (
    <div ref={containerRef} className="relative h-auto md:h-[280vh] bg-background w-full">
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex items-center py-16 md:py-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[40vh] bg-primary/[0.015] rounded-full blur-[140px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
            {/* LEFT */}
            <div className="col-span-1 md:col-span-5 flex flex-col items-start w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
                  {t("badge")}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-5">
                {t("titleLine1")} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary/70 font-semibold">
                  {t("titleLine2")}
                </span>
              </h2>

              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
                {t("description")}
              </p>

              <div className="hidden md:flex relative items-center gap-4 w-full max-w-[240px] pt-5 border-t border-primary/10">
                <div className="absolute start-[7px] top-5 bottom-0 w-[2px] bg-primary/[0.06] rounded-full" />
                <motion.div
                  className="absolute start-[7px] top-5 w-[2px] bg-primary rounded-full origin-top"
                  style={{ scaleY, height: "calc(100% - 20px)" }}
                />
                <div className="flex flex-col gap-3.5 ps-6 w-full">
                  {items.map((item, idx) => (
                    <div
                      key={item.tag}
                      className={`text-[11px] font-semibold tracking-wide transition-all duration-300 ${
                        idx === activeIndex
                          ? "text-primary translate-x-1 rtl:-translate-x-1"
                          : "text-muted-foreground/30"
                      }`}
                    >
                      0{idx + 1} — {item.tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT — desktop */}
            <div className="col-span-1 md:col-span-7 w-full relative">
              <div className="hidden md:relative md:block w-full h-[360px] lg:h-[340px]">
                {items.map((item, index) => {
                  const isActive = index === activeIndex;
                  const Icon = ICONS[index] ?? Cpu;
                  return (
                    <motion.div
                      key={item.tag}
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        y: isActive ? 0 : -15,
                        scale: isActive ? 1 : 0.98,
                        pointerEvents: isActive ? "auto" : "none",
                      }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 p-8 lg:p-10 rounded-[24px] border border-primary/10 bg-background shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-6">
                          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-primary">
                            {item.tag}
                          </span>
                          <div className="p-2.5 rounded-xl bg-primary/[0.04] border border-primary/10 text-primary">
                            <Icon className="w-4 h-4" />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-2.5 opacity-40">
                          <XCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-xs font-medium tracking-wide text-muted-foreground line-through">
                            {item.problem}
                          </span>
                        </div>

                        <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-foreground mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>{item.solution}</span>
                        </h3>

                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 mt-4 text-primary">
                        <span className="text-[10px] font-bold tracking-wider uppercase">
                          CodEarn approach
                        </span>
                        <ArrowRight className="w-3 h-3 rtl:rotate-180" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Mobile */}
              <div className="flex flex-col gap-5 md:hidden w-full">
                {items.map((item, index) => {
                  const Icon = ICONS[index] ?? Cpu;
                  return (
                    <div
                      key={item.tag}
                      className="p-6 rounded-[20px] border border-primary/10 bg-background/50 backdrop-blur-sm flex flex-col"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-primary">
                          {item.tag}
                        </span>
                        <div className="p-2 rounded-lg bg-primary/[0.04] text-primary">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mb-2 opacity-40">
                        <span className="text-xs text-muted-foreground line-through">
                          {item.problem}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-foreground mb-2">
                        {item.solution}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
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
});

ProblemsWeSolve.displayName = "ProblemsWeSolve";