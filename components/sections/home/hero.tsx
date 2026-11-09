"use client";

import { useEffect, useState, memo } from "react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  Box,
  Layers,
  Smartphone,
  Cpu,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

/* ============================================================
   WHATSAPP
============================================================ */
const WHATSAPP_NUMBER = "971541757432";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi CodEarn, I'd like to discuss a project."
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

/* ============================================================
   LIGHTWEIGHT GRID BACKGROUND
============================================================ */
const GridBackground = memo(() => (
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.35] dark:opacity-[0.5]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="gulf-grid"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            className="stroke-primary/[0.07] dark:stroke-primary/[0.1]"
            strokeWidth="0.8"
          />
        </pattern>
        <radialGradient id="gulf-vignette" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="55%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="gulf-fade">
          <rect width="100%" height="100%" fill="url(#gulf-vignette)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#gulf-grid)"
        mask="url(#gulf-fade)"
      />
    </svg>

    <div className="absolute top-[8%] left-1/2 -translate-x-1/2 w-[70vw] h-[45vh] max-w-[800px] bg-primary/[0.06] dark:bg-primary/[0.08] rounded-full blur-[100px]" />
    <div className="absolute bottom-0 right-0 w-[40vw] h-[30vh] max-w-[500px] bg-primary/[0.03] dark:bg-primary/[0.05] rounded-full blur-[100px]" />
  </div>
));
GridBackground.displayName = "GridBackground";

/* ============================================================
   TYPING ANIMATION HOOK
============================================================ */
function useTyping(words: string[], speed = 75, deleteSpeed = 40, pause = 1900) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const currentWord = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, speed);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), pause);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, deleteSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed, deleteSpeed, pause]);

  return displayText;
}

/* ============================================================
   SERVICE ICONS
============================================================ */
const SERVICE_ICONS = [Box, Layers, Smartphone, Cpu];

/* ============================================================
   HERO
============================================================ */
export function Hero() {
  const t = useTranslations("Home.hero");
  const words = t.raw("words") as string[];
  const badges = t.raw("trustBadges") as string[];
  const services = t.raw("services") as Array<{
    title: string;
    description: string;
  }>;

  const typedWord = useTyping(words);

  /* 👇 THE FIX: Longest word reserves exact width — no layout shift */
  const longestWord = words.reduce(
    (a, b) => (a.length > b.length ? a : b),
    words[0] || ""
  );

  return (
    <section className="relative w-full overflow-hidden bg-background pt-28 pb-16 md:pt-40 md:pb-24">
      <GridBackground />

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 relative z-10 w-full max-w-5xl">
        {/* ========== BADGE ========== */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex justify-center mb-7 md:mb-8"
        >
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/[0.04] border border-primary/20 backdrop-blur-md hover:bg-primary/[0.08] hover:border-primary/30 transition-all duration-300"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            <span className="text-[11px] md:text-xs font-semibold tracking-wide text-foreground/85 flex items-center gap-1">
              {t("badge")}
              <ChevronRight className="w-3 h-3 text-muted-foreground group-hover:translate-x-0.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
            </span>
          </Link>
        </motion.div>

        {/* ========== HEADING with TYPING (NO LAYOUT SHIFT) ========== */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.6 }}
          className="text-center font-extrabold tracking-tight text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] mb-5 md:mb-6"
        >
          {t("headingLine1")}{" "}
          <br className="hidden sm:block" />
          <span className="font-semibold text-muted-foreground">
            {t("headingLine2")}{" "}
          </span>

          {/* 👇 FIXED-WIDTH TYPING WORD */}
          <span className="relative inline-flex items-baseline align-baseline">
            {/* Invisible longest word — reserves exact width */}
            <span
              className="invisible font-extrabold whitespace-nowrap"
              aria-hidden="true"
            >
              {longestWord}
            </span>

            {/* Typed text — absolutely positioned so it grows from start */}
            <span className="absolute inset-y-0 start-0 flex items-baseline whitespace-nowrap">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary to-primary/80 font-extrabold">
                {typedWord}
              </span>
              {/* Blinking cursor — CSS only (cheap) */}
              <span
                aria-hidden="true"
                className="inline-block w-[2px] md:w-[3px] h-[0.85em] ms-0.5 bg-primary align-middle animate-pulse"
              />
            </span>
          </span>
        </motion.h1>

        {/* ========== SUBHEADING ========== */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.5 }}
          className="text-center text-sm sm:text-base md:text-lg text-muted-foreground mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          {t("subheading")}
        </motion.p>

        {/* ========== CTAs ========== */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-10 md:mb-12 max-w-md sm:max-w-none mx-auto"
        >
          <Link href="/contact" className="block w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-6 md:px-8 rounded-full bg-primary text-primary-foreground font-semibold text-sm md:text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
            >
              {t("primaryCta")}
            </Button>
          </Link>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full sm:w-auto"
          >
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto h-12 px-6 md:px-8 rounded-full border-green-500/30 bg-green-500/[0.04] hover:bg-green-500/[0.1] hover:border-green-500/50 text-sm md:text-base font-semibold text-foreground gap-2 transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              {t("whatsappCta")}
            </Button>
          </a>
        </motion.div>

        {/* ========== TRUST BADGES ========== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2.5 mb-14 md:mb-16"
        >
          {badges.map((text) => (
            <div key={text} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-[11px] md:text-xs font-medium text-foreground/70 tracking-wide">
                {text}
              </span>
            </div>
          ))}
        </motion.div>

        {/* ========== SERVICES GRID ========== */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.6 }}
          className="pt-8 md:pt-10 border-t border-border/60"
        >
          <div className="flex items-center justify-center gap-2 mb-5 md:mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {t("servicesHeading")}
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {services.map((service, i) => {
              const Icon = SERVICE_ICONS[i] ?? Box;
              return (
                <Link
                  key={service.title}
                  href="/services"
                  className="group flex flex-col items-start p-4 md:p-5 rounded-xl md:rounded-2xl border border-border/80 bg-card/40 hover:bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary/[0.08] group-hover:bg-primary/[0.14] flex items-center justify-center text-primary mb-3 transition-colors">
                    <Icon className="w-4 h-4 md:w-5 md:h-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="text-xs md:text-sm font-bold text-foreground mb-1 text-start leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-[11px] md:text-xs text-muted-foreground leading-relaxed text-start line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[10px] md:text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    {t("learnMore")}
                    <ArrowUpRight className="w-3 h-3 rtl:-scale-x-100" />
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}