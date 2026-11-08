"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Zap, CheckCircle2 } from "lucide-react";

type ServiceItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  features: string[];
};

const TechCanvasVisual = ({ id }: { id: string }) => {
  return (
    <div className="relative w-full h-48 bg-primary/[0.02] rounded-xl border border-primary/5 flex items-center justify-center overflow-hidden font-mono text-[10px] text-primary/40 p-4">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--color-primary),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--color-primary),0.02)_1px,transparent_1px)] bg-[size:16px_16px]" />

      {id === "01" && (
        <div className="w-full flex flex-col gap-2 relative z-10">
          <div className="flex justify-between items-center px-3 py-1.5 rounded-md border border-primary/10 bg-background/80">
            <span className="text-primary font-bold">tenant_router</span>
            <span className="text-green-500/70 animate-pulse">● active</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 border border-primary/5 bg-background/40 rounded">tenant_A</div>
            <div className="p-2 border border-primary/5 bg-background/40 rounded">tenant_B</div>
            <div className="p-2 border border-primary/10 bg-primary/[0.03] text-primary rounded">tenant_C</div>
          </div>
        </div>
      )}

      {id === "02" && (
        <div className="relative flex items-center justify-between w-full max-w-xs z-10">
          <div className="p-2 rounded-lg border border-primary/10 bg-background">trigger</div>
          <motion.div
            animate={{ x: [0, 120], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="h-0.5 w-4 bg-primary absolute start-16"
          />
          <div className="p-2 rounded-lg border border-primary/10 bg-primary/[0.04] text-primary font-bold">
            workflow_engine
          </div>
        </div>
      )}

      {id === "03" && (
        <div className="w-full flex flex-col gap-1 relative z-10 px-4">
          <div className="text-[9px] text-muted-foreground/60">// EDGE_RENDER</div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">GET</span>
            <span className="text-foreground font-semibold">/services/web-apps</span>
          </div>
          <div className="w-full bg-primary/[0.05] h-1.5 rounded-full mt-2 overflow-hidden">
            <motion.div
              animate={{ width: ["0%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="bg-primary h-full w-1/2 rounded-full"
            />
          </div>
        </div>
      )}

      {id === "04" && (
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-28 border border-primary/20 rounded-xl bg-background/80 p-2 flex flex-col gap-1 justify-between">
            <div className="w-full h-2 bg-primary/20 rounded-sm" />
            <div className="w-full h-12 bg-primary/[0.03] border border-primary/5 rounded-sm flex items-center justify-center">
              <span className="text-primary/30 text-[8px]">iOS · Android</span>
            </div>
            <div className="w-full h-2 bg-primary rounded-sm animate-pulse" />
          </div>
          <div className="flex flex-col gap-1 text-[9px]">
            <div className="text-primary font-bold">⚡ offline_sync</div>
            <div>[OK] Cached records</div>
            <div className="text-muted-foreground/40">[IDLE] Background worker</div>
          </div>
        </div>
      )}
    </div>
  );
};

export const SolutionsEngine = memo(() => {
  const t = useTranslations("Home.services");
  const items = t.raw("items") as ServiceItem[];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative w-full py-20 sm:py-32 bg-background border-b border-primary/[0.03] overflow-hidden">
      <div className="absolute top-0 right-0 w-[40vw] h-[60vh] bg-primary/[0.01] rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-8 lg:px-12 max-w-6xl w-full relative z-10">
        <div className="mb-16 md:mb-24 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 mb-4">
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              {t("badge")}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
            {t("titleLine1")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-muted-foreground/40 font-normal">
              {t("titleLine2")}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Desktop list */}
          <div className="hidden md:flex md:col-span-5 flex-col w-full relative">
            <div className="absolute start-0 top-0 bottom-0 w-[1px] bg-primary/[0.05]" />
            {items.map((item, idx) => {
              const isSelected = idx === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => setActiveTab(idx)}
                  className="relative flex flex-col items-start text-start ps-6 py-6 border-b border-primary/[0.03] group outline-none"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="horizonActiveIndicator"
                      className="absolute start-0 top-0 bottom-0 w-[2px] bg-primary shadow-lg"
                      transition={{ type: "spring", stiffness: 140, damping: 22 }}
                    />
                  )}
                  <span
                    className={`text-[10px] font-mono font-semibold tracking-wider mb-1 transition-colors ${
                      isSelected ? "text-primary" : "text-muted-foreground/30"
                    }`}
                  >
                    {item.id} // {item.label.toUpperCase()}
                  </span>
                  <h3
                    className={`text-lg lg:text-xl font-bold tracking-tight transition-all ${
                      isSelected
                        ? "text-foreground translate-x-1 rtl:-translate-x-1"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {item.title}
                  </h3>
                </button>
              );
            })}
          </div>

          {/* Desktop canvas */}
          <div className="hidden md:block md:col-span-7 w-full h-[540px] lg:h-[490px] relative">
            <AnimatePresence mode="wait">
              {items.map((item, index) => {
                if (index !== activeTab) return null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.98, x: 10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.98, x: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 p-8 lg:p-10 rounded-[24px] border border-primary/10 bg-background shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6 pb-4 border-b border-primary/5">
                        <div className="flex items-center gap-2">
                          <Zap className="w-3.5 h-3.5 text-primary" />
                          <span className="text-[11px] font-mono font-bold tracking-widest text-primary uppercase">
                            {item.label}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-2xl font-extrabold tracking-tight text-foreground mb-3">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {item.description}
                      </p>

                      <TechCanvasVisual id={item.id} />
                    </div>

                    <div className="pt-5 border-t border-primary/5 mt-4">
                      <ul className="flex flex-col gap-1.5">
                        {item.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2 text-[11px] text-muted-foreground"
                          >
                            <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Mobile */}
          <div className="flex flex-col gap-6 md:hidden w-full">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-6 rounded-[22px] border border-primary/10 bg-background shadow-sm flex flex-col gap-5"
              >
                <div>
                  <span className="text-[9px] font-mono font-bold tracking-widest text-primary uppercase block mb-1">
                    {item.id} // {item.label}
                  </span>
                  <h3 className="text-xl font-bold tracking-tight text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <TechCanvasVisual id={item.id} />

                <ul className="flex flex-col gap-1.5 pt-4 border-t border-primary/5">
                  {item.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-[11px] text-muted-foreground"
                    >
                      <CheckCircle2 className="w-3 h-3 text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

SolutionsEngine.displayName = "SolutionsEngine";