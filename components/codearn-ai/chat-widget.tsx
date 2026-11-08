"use client";

import { useEffect, useState } from "react";
import { usePathname, Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Maximize2 } from "lucide-react";
import ChatContainer from "./chat-container";

export default function ChatWidget() {
  const pathname = usePathname();
  const t = useTranslations("AI.widget");
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState(false);

  const isFullPageRoute =
    pathname === "/codearn-ai" || pathname?.startsWith("/codearn-ai/");

  useEffect(() => {
    if (!isOpen) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasOpenedOnce(true);
  };

  if (isFullPageRoute) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            onClick={handleOpen}
            aria-label={t("openLabel")}
            className="group fixed z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/40 end-5 md:end-6 md:h-15 md:w-15"
            style={{
              bottom: "calc(5rem + env(safe-area-inset-bottom, 0px))",
            }}
          >
            {!hasOpenedOnce && (
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
            )}

            <Sparkles className="relative h-6 w-6" />

            <span className="absolute -top-0.5 -end-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-background bg-green-500 text-[8px] font-bold text-white">
              AI
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="fixed inset-x-3 bottom-3 top-3 z-50 flex flex-col overflow-hidden rounded-3xl border border-border bg-background shadow-2xl shadow-primary/20 md:inset-auto md:bottom-6 md:end-6 md:h-[600px] md:w-[400px]"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-border bg-card/50 px-4 py-3 backdrop-blur-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold leading-tight text-foreground">
                      {t("title")}
                    </p>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                      </span>
                      <p className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                        {t("online")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Link
                    href="/codearn-ai"
                    onClick={() => setIsOpen(false)}
                    aria-label={t("expand")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    aria-label={t("close")}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1">
                <ChatContainer variant="widget" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}