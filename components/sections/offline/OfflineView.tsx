"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  WifiOff,
  Wifi,
  RefreshCw,
  Home,
  CheckCircle2,
} from "lucide-react";

export default function OfflineView() {
  const t = useTranslations("Offline");
  const [isOnline, setIsOnline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set initial state — navigator.onLine is a good baseline.
    const online = navigator.onLine;
    setIsOnline(online);

    // Edge case: if we somehow landed here while online,
    // try to reload immediately (user may have reconnected before render).
    if (online) {
      const timer = setTimeout(() => window.location.reload(), 800);
      return () => clearTimeout(timer);
    }

    const handleOnline = () => {
      setIsOnline(true);
      // Give the UI ~900ms to show the "Back online" state, then reload.
      setTimeout(() => window.location.reload(), 900);
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleRetry = () => {
    setIsRetrying(true);
    // Small delay so the user sees the "Retrying…" state before reload
    setTimeout(() => window.location.reload(), 450);
  };

  /* Avoid hydration mismatch: don't render status pill until mounted */
  if (!mounted) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center bg-background text-foreground px-6 py-20">
        <div className="w-6 h-6 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] flex items-center justify-center bg-background text-foreground px-6 py-20">
      <div className="text-center max-w-md w-full">
        {/* Status pill */}
        <AnimatePresence mode="wait">
          {isOnline ? (
            <motion.div
              key="online"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 mb-8"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-600 dark:text-green-400">
                {t("status.backOnline")}
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="offline"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 mb-8"
            >
              <WifiOff className="w-3.5 h-3.5 text-destructive" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-destructive">
                {t("status.offline")}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center border ${
            isOnline
              ? "bg-green-500/10 border-green-500/20"
              : "bg-primary/10 border-primary/20"
          }`}
        >
          {isOnline ? (
            <Wifi className="w-8 h-8 text-green-600 dark:text-green-400" />
          ) : (
            <WifiOff className="w-8 h-8 text-primary" />
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="text-3xl font-bold mb-3 tracking-tight text-foreground"
        >
          {t("title")}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="text-muted-foreground mb-2 font-medium"
        >
          {t("subtitle")}
        </motion.p>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-muted-foreground text-sm leading-relaxed mb-8"
        >
          {t("body")}
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <RefreshCw
              className={`w-4 h-4 ${isRetrying ? "animate-spin" : ""}`}
            />
            {isRetrying ? t("retrying") : t("retry")}
          </button>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-border bg-background text-foreground font-semibold px-6 py-3 rounded-full hover:bg-secondary transition-all"
          >
            <Home className="w-4 h-4" />
            {t("backHome")}
          </Link>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="mt-8 text-[10px] text-muted-foreground/60 uppercase tracking-widest font-semibold"
        >
          {t("hint")}
        </motion.p>
      </div>
    </main>
  );
}