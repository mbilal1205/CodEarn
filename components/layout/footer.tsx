"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  Code2,
  MessageSquare,
  FileCheck2,
  Clock,
} from "lucide-react";

/* ================= TYPES ================= */
type FooterLink = { name: string; href: string; desc?: string };
type FooterSection = { title: string; links: FooterLink[] };

/* ================= FOOTER DATA (i18n-aware builder) ================= */
function useFooterSections(): Record<string, FooterSection> {
  const t = useTranslations("Footer");
  return {
    services: {
      title: t("sections.services"),
      links: [
     { name: t("services.saas"), href: "/services#saas" },
{ name: t("services.webApps"), href: "/services#web-apps" },
{ name: t("services.mobileApps"), href: "/services#mobile" },
{ name: t("services.automation"), href: "/services#automation-ai" },
{ name: t("services.maintenance"), href: "/services#maintenance" },
      ],
    },
    company: {
      title: t("sections.company"),
      links: [
        { name: t("company.about"), href: "/about" },
        { name: t("company.work"), href: "/case-studies" },
        { name: t("company.labs"), href: "/products" },
        { name: t("company.blog"), href: "/blogs" },
        { name: t("company.contact"), href: "/contact" },
      ],
    },
    legal: {
      title: t("sections.legal"),
      links: [
        { name: t("legal.privacy"), href: "/privacy-policy" },
        { name: t("legal.terms"), href: "/terms" },
        { name: t("legal.cookies"), href: "/cookies" },
      ],
    },
  };
}

/* ================= TRUST BADGES (REAL claims only) ================= */
function useTrustBadges() {
  const t = useTranslations("Footer.badges");
  return [
    { icon: Code2, label: t("ownCode") },
    { icon: MessageSquare, label: t("directAccess") },
    { icon: FileCheck2, label: t("writtenScope") },
    { icon: Clock, label: t("responseTime") },
  ];
}

/* ================= MOBILE ACCORDION ================= */
const MobileAccordionSection = memo(
  ({ section }: { section: FooterSection }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-border/60 py-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between text-start text-[13px] font-medium tracking-wide text-foreground py-1"
        >
          <span>{section.title}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="text-muted-foreground"
          >
            <ChevronDown className="h-4 w-4 stroke-[1.5]" />
          </motion.div>
        </button>

        <div className="overflow-hidden">
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "collapsed"}
            variants={{
              open: { height: "auto", marginTop: 10, opacity: 1 },
              collapsed: { height: 0, marginTop: 0, opacity: 0 },
            }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="space-y-3 ps-1 pb-2">
              {section.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="flex flex-col gap-0.5 text-[13px] text-muted-foreground active:text-foreground transition-colors"
                  >
                    <span className="font-normal">{link.name}</span>
                    {link.desc && (
                      <span className="text-[11px] text-muted-foreground/60">
                        {link.desc}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    );
  }
);
MobileAccordionSection.displayName = "MobileAccordionSection";

/* ================= MAIN FOOTER ================= */
export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const footerSections = useFooterSections();
  const trustBadges = useTrustBadges();

  return (
    <footer className="border-t border-border bg-background text-foreground relative overflow-hidden pb-16 lg:pb-0">
      <div className="absolute inset-0 bg-linear-to-b from-muted/10 to-transparent pointer-events-none" />

      {/* ---------------- TRUST BAR (real claims only) ---------------- */}
      <div className="border-b border-border/50 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {trustBadges.map((item) => (
              <div key={item.label} className="flex items-center gap-3 group">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-muted/40 border border-border/40 transition-colors">
                  <item.icon
                    className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-foreground transition-colors"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---------------- MAIN BODY ---------------- */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-12 lg:py-16 relative">
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Brand column */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-codearn-blue to-codearn-purple rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition" />
                <div className="relative w-12 h-12 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition">
                  <Image
                    src="/logo.webp"
                    alt="CodEarn Logo"
                    fill
                    sizes="(max-width: 768px) 100px, 150px"
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="text-gradient">CodEarn</span>
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  {tNav("tagline")}
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-sm font-light">
              {t("tagline")}
            </p>

            {/* Contact */}
            <div className="space-y-2.5 pt-1">
              <a
                href="mailto:hello@codearntech.com"
                className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors group"
              >
                <Mail className="h-4 w-4 stroke-[1.5]" />
                <span>hello@codearntech.com</span>
              </a>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground font-light">
                <MapPin className="h-4 w-4 stroke-[1.5]" />
                <span>{t("location")}</span>
              </div>
            </div>

            {/* Real-status badge */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border/60">
                <ShieldCheck className="h-3 w-3 text-muted-foreground" />
                <span className="text-[10px] font-normal text-muted-foreground uppercase tracking-tight">
                  {t("badges.writtenScope")}
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 w-full">
            {/* Desktop columns */}
            <div className="hidden md:grid grid-cols-3 gap-8">
              {Object.entries(footerSections).map(([key, section]) => (
                <div key={key} className="space-y-4">
                  <h4 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="group flex flex-col text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
                        >
                          <span className="flex items-center gap-0.5 font-normal">
                            {link.name}
                            <ChevronRight className="h-2.5 w-2.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 rtl:rotate-180 rtl:translate-x-1 rtl:group-hover:translate-x-0" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Mobile accordions */}
            <div className="md:hidden flex flex-col border-t border-border/60 mt-2">
              {Object.entries(footerSections).map(([key, section]) => (
                <MobileAccordionSection key={key} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- BOTTOM BAR ---------------- */}
      <div className="border-t border-border/40 bg-muted/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 order-2 md:order-1 font-light text-center sm:text-start">
              <span>
                © {new Date().getFullYear()} CodEarn. {t("rights")}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 order-1 md:order-2">
              {footerSections.legal.links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="hover:text-foreground transition-colors text-[11px] font-normal tracking-wide"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}