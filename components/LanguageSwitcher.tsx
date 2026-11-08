"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { Check, Globe, Loader2, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOCALES = [
  { code: "en", native: "English", short: "EN", flag: "🇬🇧" },
  { code: "ar", native: "العربية", short: "AR", flag: "🇦🇪" },
] as const;

export default function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  /* Close on outside click */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  /* Close on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen]);

  function switchTo(nextLocale: string) {
    if (nextLocale === locale) {
      setIsOpen(false);
      return;
    }
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div ref={containerRef} className="relative">
      {/* ---------- TRIGGER BUTTON ---------- */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        disabled={isPending}
        aria-label={t("label")}
        aria-expanded={isOpen}
        className={`group inline-flex items-center gap-2 h-10 ps-3 pe-2.5 rounded-full border transition-all duration-300 ${
          isOpen
            ? "border-primary/50 bg-primary/5 shadow-sm shadow-primary/10"
            : "border-border/70 bg-background hover:border-primary/30 hover:bg-muted/50"
        } disabled:opacity-60 disabled:cursor-wait`}
      >
        {/* Icon / Spinner */}
        <div className="relative w-4 h-4 flex items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {isPending ? (
              <motion.span
                key="loader"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
              </motion.span>
            ) : (
              <motion.span
                key="globe"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
              >
                <Globe className="h-3.5 w-3.5 text-primary" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <span className="text-[11px] font-bold tracking-widest text-foreground">
          {current.short}
        </span>

        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* ---------- SHUTTER DROPDOWN ---------- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              scaleY: 0.4,
              scaleX: 0.9,
              y: -8,
            }}
            animate={{
              opacity: 1,
              scaleY: 1,
              scaleX: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scaleY: 0.4,
              scaleX: 0.9,
              y: -8,
            }}
            transition={{
              duration: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: "top right" }}
            className="absolute end-0 top-full mt-2 w-52 z-[60] origin-top-right rounded-2xl border border-border bg-popover shadow-2xl shadow-primary/10 overflow-hidden backdrop-blur-xl"
          >
            {/* Top accent line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="h-[2px] bg-gradient-to-r from-primary/0 via-primary to-primary/0 origin-left rtl:origin-right"
            />

            <div className="p-1.5">
              {LOCALES.map((l, idx) => {
                const isActive = l.code === locale;
                return (
                  <motion.button
                    key={l.code}
                    onClick={() => switchTo(l.code)}
                    disabled={isPending}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + idx * 0.05,
                      duration: 0.25,
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl transition-colors duration-200 ${
                      isActive
                        ? "bg-primary/8 text-primary"
                        : "text-foreground/80 hover:bg-muted/70 hover:text-foreground"
                    } disabled:opacity-50`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-base leading-none">
                        {l.flag}
                      </span>
                      <div className="flex flex-col items-start leading-tight">
                        <span
                          className={`text-sm font-semibold ${
                            l.code === "ar"
                              ? "font-[var(--font-arabic)]"
                              : ""
                          }`}
                        >
                          {l.native}
                        </span>
                        <span className="text-[9px] font-bold tracking-widest text-muted-foreground uppercase">
                          {l.short}
                        </span>
                      </div>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25,
                          }}
                          className="w-5 h-5 rounded-full bg-primary flex items-center justify-center shrink-0"
                        >
                          <Check className="h-3 w-3 text-primary-foreground" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}