"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Copy, Check, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { SITE_URL } from "@/lib/seo/site";
import { ShareData } from "./types";

interface ShareModalProps {
  data: ShareData;
  onClose: () => void;
}

export default function ShareModal({ data, onClose }: ShareModalProps) {
  const t = useTranslations("Share");
  const [copied, setCopied] = useState(false);

  // Use dynamic origin for sharing, fallback to SITE_URL
  const shareUrl = typeof window !== "undefined" ? window.location.href : SITE_URL;
  const shareText = encodeURIComponent(data.message);
  const encodedUrl = encodeURIComponent(shareUrl);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${data.message} ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: t("whatsapp"),
      icon: MessageCircle,
      url: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: t("twitter"),
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: t("linkedin"),
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-card border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {t("title")}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-muted/50 border border-border rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            {t("subtitle")}
          </p>
          <p className="text-lg font-semibold text-primary">{data.message}</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {shareLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white p-3 rounded-xl flex flex-col items-center gap-2 transition-colors`}
            >
              <link.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{link.name}</span>
            </a>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="w-full py-3 bg-muted hover:bg-muted/80 text-foreground rounded-xl flex items-center justify-center gap-2 transition-colors border border-border"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
          <span className="font-medium">
            {copied ? t("copied") : t("copy")}
          </span>
        </button>
      </motion.div>
    </div>
  );
}