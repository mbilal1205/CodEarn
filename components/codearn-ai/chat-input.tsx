"use client";

import { useRef, useState, useEffect, KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { Send, Loader2 } from "lucide-react";

const MAX_LENGTH = 500;

interface ChatInputProps {
  onSend: (text: string) => void;
  isLoading: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  placeholder?: string;
}

export default function ChatInput({
  onSend,
  isLoading,
  disabled = false,
  autoFocus = false,
  placeholder,
}: ChatInputProps) {
  const t = useTranslations("AI.input");
  const finalPlaceholder = placeholder || t("placeholder");

  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 140)}px`;
  }, [value]);

  useEffect(() => {
    if (autoFocus) textareaRef.current?.focus();
  }, [autoFocus]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading || disabled) return;
    onSend(trimmed);
    setValue("");
    setTimeout(() => textareaRef.current?.focus(), 50);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isOverLimit = value.length > MAX_LENGTH;
  const canSend =
    value.trim().length > 0 && !isLoading && !disabled && !isOverLimit;

  return (
    <div className="relative">
      <div
        className={`group relative flex items-end gap-2 rounded-2xl border bg-card/80 p-2 shadow-sm backdrop-blur-sm transition-all focus-within:border-primary/40 focus-within:shadow-md focus-within:shadow-primary/5 ${
          disabled || isLoading ? "border-border opacity-70" : "border-border"
        }`}
      >
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={finalPlaceholder}
          rows={1}
          disabled={disabled || isLoading}
          className="max-h-[140px] min-h-[24px] flex-1 resize-none border-0 bg-transparent px-3 py-2 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground/70 disabled:cursor-not-allowed"
        />

        <button
          type="button"
          onClick={handleSend}
          disabled={!canSend}
          aria-label={t("send")}
          className={`mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all ${
            canSend
              ? "bg-primary text-primary-foreground shadow-sm shadow-primary/25 hover:shadow-md hover:shadow-primary/30"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4 rtl:-scale-x-100" />
          )}
        </button>
      </div>

      {value.length > MAX_LENGTH * 0.8 && (
        <div className="mt-1.5 flex justify-end pe-1">
          <span
            className={`text-[10px] font-medium tabular-nums ${
              isOverLimit ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {value.length} / {MAX_LENGTH}
          </span>
        </div>
      )}
    </div>
  );
}