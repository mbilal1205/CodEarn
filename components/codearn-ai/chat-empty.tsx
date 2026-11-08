"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles } from "lucide-react";
import ChatSuggestions from "./chat-suggestions";

interface ChatEmptyProps {
  onSelectSuggestion: (question: string) => void;
  compact?: boolean;
}

export default function ChatEmpty({
  onSelectSuggestion,
  compact = false,
}: ChatEmptyProps) {
  const t = useTranslations("AI.empty");

  if (compact) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 py-8 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            {t("compactTitle")}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("compactSubtitle")}
          </p>
        </div>
        <ChatSuggestions onSelect={onSelectSuggestion} compact />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center px-6 pt-8 text-center md:pt-12"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
        <Sparkles className="h-6 w-6 text-primary" />
      </div>

      <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {t("title")}
      </h2>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {t("subtitle")}
      </p>

      <div className="mt-10 w-full max-w-xl">
        <ChatSuggestions onSelect={onSelectSuggestion} />
      </div>
    </motion.div>
  );
}