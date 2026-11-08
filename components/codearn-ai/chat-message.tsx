"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Sparkles,
  Check,
  Copy,
  CheckCheck,
  RefreshCw,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCopy } from "@/lib/codearn-ai/use-copy";
import type { ChatMessage as ChatMessageType } from "@/lib/codearn-ai/types";

interface ChatMessageProps {
  message: ChatMessageType;
  index: number;
  isLast?: boolean;
  onRegenerate?: () => void;
  showActions?: boolean;
}

export default function ChatMessage({
  message,
  index,
  isLast = false,
  onRegenerate,
  showActions = false,
}: ChatMessageProps) {
  const t = useTranslations("AI.message");
  const isUser = message.role === "user";
  const { copy, copied } = useCopy();
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const messageId = `msg-${index}`;

  /* USER MESSAGE — justify-end auto-flips in RTL (flex direction end) */
  if (isUser) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex justify-end"
      >
        <div className="max-w-[85%] rounded-2xl rounded-te-sm border border-primary/30 bg-primary px-4 py-2.5 text-sm leading-relaxed text-primary-foreground shadow-sm">
          {message.content}
        </div>
      </motion.div>
    );
  }

  /* AI MESSAGE */
  const isCopied = copied === messageId;

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="group flex justify-start"
    >
      <div className="flex w-full items-start gap-3">
        <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>

        <div className="min-w-0 flex-1 space-y-2 pt-0.5">
          <div className="codearn-ai-content text-sm leading-relaxed text-foreground/90">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-3 leading-relaxed last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-foreground">
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-foreground/85">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="break-all font-medium text-primary underline decoration-primary/40 underline-offset-2 transition-colors hover:decoration-primary"
                  >
                    {children}
                  </a>
                ),
                ul: ({ children }) => (
                  <ul className="my-2 ms-5 list-disc space-y-1.5 marker:text-primary">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="my-2 ms-5 list-decimal space-y-1.5 marker:text-primary">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  if (isInline) {
                    return (
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-primary">
                        {children}
                      </code>
                    );
                  }
                  return (
                    <code className="block overflow-x-auto rounded-lg border border-border bg-muted/50 p-3 font-mono text-xs" dir="ltr">
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="mb-2 mt-4 text-base font-bold text-foreground">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="mb-2 mt-3 text-sm font-bold text-foreground">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="mb-1.5 mt-2 text-sm font-semibold text-foreground">
                    {children}
                  </h3>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-2 border-s-2 border-primary/40 ps-3 italic text-muted-foreground">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-3 border-border" />,
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
            <Check className="h-2.5 w-2.5 text-primary" />
            <span>{t("basedOn")}</span>
          </div>

          {showActions && isLast && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex items-center gap-1 pt-1"
            >
              <button
                onClick={() => copy(message.content, messageId)}
                aria-label={t("copy")}
                className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {isCopied ? (
                  <>
                    <CheckCheck className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">{t("copied")}</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    <span>{t("copy")}</span>
                  </>
                )}
              </button>

              {onRegenerate && (
                <button
                  onClick={onRegenerate}
                  aria-label={t("regenerate")}
                  className="flex h-7 items-center gap-1.5 rounded-md px-2 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>{t("regenerate")}</span>
                </button>
              )}

              <div className="mx-1 h-4 w-px bg-border" />

              <button
                onClick={() => setFeedback("up")}
                aria-label={t("helpful")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                  feedback === "up"
                    ? "bg-green-500/10 text-green-500"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <ThumbsUp className="h-3 w-3" />
              </button>
              <button
                onClick={() => setFeedback("down")}
                aria-label={t("notHelpful")}
                className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
                  feedback === "down"
                    ? "bg-destructive/10 text-destructive"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                <ThumbsDown className="h-3 w-3" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}