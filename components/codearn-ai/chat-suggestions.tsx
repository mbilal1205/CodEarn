"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";

interface ChatSuggestionsProps {
  onSelect: (question: string) => void;
  disabled?: boolean;
  compact?: boolean;
  suggestions?: string[];
  variant?: "default" | "followup";
}

export default function ChatSuggestions({
  onSelect,
  disabled = false,
  compact = false,
  suggestions,
  variant = "default",
}: ChatSuggestionsProps) {
  const t = useTranslations("AI");
  const allSuggestions = t.raw("suggestions") as string[];

  const items =
    suggestions ||
    (compact ? allSuggestions.slice(0, 4) : allSuggestions);

  const isFollowUp = variant === "followup";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isFollowUp ? 0 : 0.2 }}
      className="flex flex-wrap gap-2"
    >
      {items.map((question, i) => (
        <motion.button
          key={question}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (isFollowUp ? 0 : 0.25) + i * 0.04 }}
          onClick={() => !disabled && onSelect(question)}
          disabled={disabled}
          className={`group inline-flex items-center gap-1.5 rounded-full border transition-all hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${
            isFollowUp
              ? "border-primary/20 bg-primary/5 px-3 py-1.5 text-[11px] font-medium text-primary hover:border-primary/40 hover:bg-primary/10"
              : "border-border bg-card/60 px-3.5 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-sm hover:border-primary/40 hover:bg-card hover:text-foreground"
          }`}
        >
          <span>{question}</span>
          <ArrowUpRight
            className={`h-3 w-3 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5 ${
              isFollowUp
                ? "text-primary"
                : "text-muted-foreground group-hover:text-primary"
            }`}
          />
        </motion.button>
      ))}
    </motion.div>
  );
}