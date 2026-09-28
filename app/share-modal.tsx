"use client";

import { motion } from "framer-motion";
import { X, Copy, Check, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { ShareData } from "./types";
import { useState } from "react";

interface ShareModalProps {
  data: ShareData;
  onClose: () => void;
}

export default function ShareModal({ data, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareText = encodeURIComponent(data.message);
  const shareUrl = encodeURIComponent("https://www.codearntech.com");

  const handleCopy = () => {
    navigator.clipboard.writeText(data.message + " https://www.codearntech.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${shareText}%20${shareUrl}`,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
      color: "bg-sky-500 hover:bg-sky-600"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
      color: "bg-blue-600 hover:bg-blue-700"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Doston Ko Batao! 🚀</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-800/50 rounded-xl p-4 mb-6">
          <p className="text-sm text-muted-foreground mb-2">Aapki achievement:</p>
          <p className="text-lg font-semibold text-cyan-400">{data.message}</p>
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
          className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? "Copied!" : "Copy Text"}</span>
        </button>
      </motion.div>
    </div>
  );
}