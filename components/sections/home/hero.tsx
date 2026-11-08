"use client";

import { useEffect, useRef, useState, memo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  Box,
  Layers,
  Smartphone,
  Cpu,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ---- BACKGROUND ---- */
export const SaaSBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 22, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width, height } = container.getBoundingClientRect();
    mouseX.set(width / 2);
    mouseY.set(height / 2);

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = container.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const glowBackground = useMotionTemplate`radial-gradient(
    450px circle at ${smoothX}px ${smoothY}px,
    rgba(var(--color-primary), 0.13),
    transparent 80%
  )`;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-background"
    >
      <svg className="absolute inset-0 w-full h-full opacity-[0.35] dark:opacity-[0.55]">
        <defs>
          <pattern
            id="elite-subtle-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              className="stroke-primary/[0.05] dark:stroke-primary/[0.11]"
              strokeWidth="0.6"
            />
          </pattern>
          <radialGradient id="grid-vignette" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="45%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-fade-mask">
            <rect width="100%" height="100%" fill="url(#grid-vignette)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#elite-subtle-grid)"
          mask="url(#grid-fade-mask)"
        />
      </svg>

      <motion.div
        className="absolute inset-0 pointer-events-none mix-blend-screen dark:mix-blend-normal"
        style={{ background: glowBackground }}
      />
      <div className="absolute top-[12%] left-1/2 -translate-x-1/2 w-[65vw] h-[40vh] bg-primary/8 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};

/* ---- MAGNETIC WRAPPER ---- */
const MagneticWrapper = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.35, y: y * 0.35 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className="w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
};

/* ---- HERO ---- */
export function Hero() {
  const t = useTranslations("Home.hero");
  const [wordIndex, setWordIndex] = useState(0);
  const words = t.raw("words") as string[];
  const badges = t.raw("trustBadges") as string[];
  const services = t.raw("services") as Array<{
    title: string;
    description: string;
  }>;

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [words.length]);

  const serviceIcons = [Box, Layers, Smartphone, Cpu];

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pb-24">
      <SaaSBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full">
        <div className="text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mb-8"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/[0.02] border border-primary/15 backdrop-blur-md hover:bg-primary/[0.05] transition-all duration-300"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[11px] font-medium tracking-wide text-foreground/80 flex items-center gap-1">
                {t("badge")}
                <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              </span>
            </Link>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[1.2] text-foreground text-center"
          >
            {t("headingLine1")}{" "}
            <br className="hidden sm:inline" />
            <span className="font-medium text-muted-foreground">
              {t("headingLine2")}{" "}
            </span>
            <span className="relative inline-flex flex-col h-[50px] sm:h-[70px] md:h-[85px] lg:h-[105px] overflow-hidden align-middle justify-center min-w-[150px] sm:min-w-[250px] text-center ms-2 sm:ms-0">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-transparent bg-clip-text bg-gradient-to-b from-primary via-primary to-primary/80 font-semibold block whitespace-nowrap"
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {t("subheading")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16 w-full sm:w-auto"
          >
            <MagneticWrapper>
              <Link href="/contact" className="block w-full h-full">
                <Button
                  size="lg"
                  className="relative w-full sm:w-auto h-12 px-8 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-md hover:opacity-95 transition-all duration-200 overflow-hidden group"
                >
                  <motion.div
                    initial={{ left: "-100%" }}
                    animate={{ left: "200%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 2.2,
                      ease: "linear",
                      repeatDelay: 0.8,
                    }}
                    className="absolute top-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/20 dark:via-background/30 to-transparent -skew-x-12 pointer-events-none"
                  />
                  <span className="relative z-10">{t("primaryCta")}</span>
                </Button>
              </Link>
            </MagneticWrapper>

            <MagneticWrapper>
              <Link href="/services" className="block w-full h-full">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto h-12 px-8 rounded-full border border-primary/20 bg-primary/[0.01] dark:bg-background/40 backdrop-blur-md text-sm font-medium hover:bg-primary/[0.05] transition-all duration-200 flex items-center justify-center gap-1.5 group"
                >
                  <span>{t("secondaryCta")}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform rtl:-scale-x-100" />
                </Button>
              </Link>
            </MagneticWrapper>
          </motion.div>

          {/* Trust badges — honest claims only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-16"
          >
            {badges.map((text) => (
              <div
                key={text}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/[0.03] border border-primary/10 backdrop-blur-md"
              >
                <span className="text-[10px] font-medium tracking-wide text-primary uppercase">
                  {text}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Service cards — replaces fake stats */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full pt-12 border-t border-primary/10"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {services.map((service, i) => {
                const Icon = serviceIcons[i] ?? Box;
                return (
                  <div
                    key={service.title}
                    className="group flex flex-col items-start p-5 rounded-2xl border border-primary/10 bg-primary/[0.01] hover:bg-primary/[0.04] transition-all text-start"
                  >
                    <div className="p-2 rounded-lg bg-primary/[0.05] text-primary mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-semibold text-foreground mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}