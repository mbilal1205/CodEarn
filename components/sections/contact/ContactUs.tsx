"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

// ⚠️ TODO: Replace with your actual WhatsApp number (international format, no spaces or dashes)
// Example: "971501234567"
const WHATSAPP_NUMBER = "971XXXXXXXXX";
const CONTACT_EMAIL = "hello@codearntech.com";

export default function ContactUs() {
  const t = useTranslations("Contact");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const serviceOptions = t.raw("form.serviceOptions") as string[];
  const regions = [
    { key: "uae", icon: MapPin },
    { key: "saudi", icon: MapPin },
    { key: "bahrain", icon: MapPin },
    { key: "worldwide", icon: MapPin },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    
    // TODO: Connect to your API route here
    // Example: await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });
    
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", company: "", service: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi CodEarn, I'd like to discuss a project.")}`;

  return (
    <section className="relative w-full py-24 md:py-32 bg-background overflow-hidden">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 end-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/[0.03] border border-primary/10 mb-6"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6"
          >
            {t("hero.headingLine1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
              {t("hero.headingLine2")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            {t("hero.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Email */}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="group flex items-start gap-4 p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-primary/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {t("channels.emailTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {t("channels.emailDescription")}
                </p>
                <span className="text-sm font-medium text-primary">
                  {CONTACT_EMAIL}
                </span>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm hover:border-green-500/40 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                <MessageCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {t("channels.whatsappTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {t("channels.whatsappDescription")}
                </p>
                <span className="text-sm font-medium text-green-600 dark:text-green-400 flex items-center gap-1">
                  {t("channels.whatsappCta")}
                  <Send className="w-3 h-3 rtl:-scale-x-100" />
                </span>
              </div>
            </a>

            {/* Location / Regions */}
            <div className="flex items-start gap-4 p-6 rounded-2xl border border-border bg-card/60 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div className="w-full">
                <h3 className="font-semibold text-foreground text-lg mb-1">
                  {t("channels.locationTitle")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("channels.locationDescription")}
                </p>
                <div className="flex flex-wrap gap-2">
                  {regions.map((region) => (
                    <span
                      key={region.key}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-muted border border-border text-xs font-medium text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {t(`regions.${region.key}`)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7"
          >
            <div className="p-8 md:p-10 rounded-3xl border border-border bg-card/60 backdrop-blur-sm shadow-xl shadow-primary/5">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {t("form.title")}
              </h2>
              <p className="text-muted-foreground mb-8 text-sm">
                {t("form.description")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("form.name")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("form.namePlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      {t("form.email")}
                    </label>
                    <input
                      id="email"
                      name="email"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("form.emailPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Company */}
                  <div className="space-y-1.5">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      {t("form.company")}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t("form.companyPlaceholder")}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Service */}
                  <div className="space-y-1.5">
                    <label htmlFor="service" className="text-sm font-medium text-foreground">
                      {t("form.service")}
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none"
                    >
                      <option value="" disabled>
                        —
                      </option>
                      {serviceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t("form.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("form.messagePlaceholder")}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all resize-none"
                  />
                </div>

                {/* Status Messages */}
                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{t("form.success")}</span>
                  </div>
                )}
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    <span>{t("form.error")}</span>
                  </div>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full h-12 rounded-xl text-base font-semibold"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 me-2 animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      {t("form.submit")}
                      <Send className="w-4 h-4 ms-2 rtl:-scale-x-100" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}