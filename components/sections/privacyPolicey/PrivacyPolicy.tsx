"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Eye,
  Trash2,
  Download,
  Cookie,
  Users,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Mail,
  ExternalLink,
  Fingerprint,
  Globe,
} from "lucide-react";

/* ============================================================
   ANIMATIONS
============================================================ */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ============================================================
   SECTIONS
============================================================ */
const sections = [
  { id: "introduction", title: "Introduction", icon: FileText },
  { id: "collection", title: "What We Collect", icon: Fingerprint },
  { id: "usage", title: "How We Use It", icon: Eye },
  { id: "cookies", title: "Cookies & Tracking", icon: Cookie },
  { id: "sharing", title: "Data Sharing", icon: Users },
  { id: "security", title: "Security Measures", icon: Lock },
  { id: "rights", title: "Your Rights", icon: Shield },
  { id: "third-party", title: "Third-Party Services", icon: Globe },
  { id: "children", title: "Children's Privacy", icon: Users },
  { id: "updates", title: "Policy Updates", icon: Clock },
  { id: "contact", title: "Contact Us", icon: Mail },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("introduction");
  const lastUpdated = "September 2026";

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />

        {/* Subtle grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            >
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Your Data, Your Control
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              Privacy Policy
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              We build software, not trust empires. Here&apos;s exactly how we
              handle your data — in plain language, without the legal fog.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Last updated: {lastUpdated}
              </span>
              <span className="hidden sm:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Version 1.0
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* SIDEBAR */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    On this page
                  </h3>
                </div>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-left">{section.title}</span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </button>
                  );
                })}

                {/* Sidebar Note */}
                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">
                        Zero Data Sales
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Never sold, never will
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We don&apos;t monetize your data. We build software that
                    solves real problems.
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-9">
              <div className="prose prose-lg max-w-none">
                {/* ============================================================
                    1. INTRODUCTION
                ============================================================ */}
                <motion.div
                  id="introduction"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Introduction
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      At{" "}
                      <strong className="text-foreground">CodEarn</strong>,
                      privacy isn&apos;t a compliance checkbox — it&apos;s a
                      core engineering principle. Trust is earned through
                      transparency, not buried in legal fine print.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      This policy explains, in plain English, what data we
                      collect, why we need it, how we protect it, and — most
                      importantly — your rights over your own information.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      We&apos;re a small team building software. We don&apos;t
                      have departments devoted to data harvesting. We collect
                      only what&apos;s needed to run our services, and nothing
                      more.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      {
                        label: "Data Minimization",
                        desc: "We collect only what is essential",
                      },
                      {
                        label: "Purpose Limitation",
                        desc: "Used only for stated purposes",
                      },
                      {
                        label: "User Control",
                        desc: "You can request access or deletion",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-muted/50 border border-border"
                      >
                        <div className="font-semibold text-foreground text-sm mb-1">
                          {item.label}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* ============================================================
                    2. WHAT WE COLLECT
                ============================================================ */}
                <motion.div
                  id="collection"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Fingerprint className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Information We Collect
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {/* Card 1 — Personal Info */}
                    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          1
                        </span>
                        Information You Provide
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        We collect personal data only when you explicitly
                        provide it through:
                      </p>
                      <ul className="space-y-3 mb-6">
                        {[
                          "Contact forms",
                          "Newsletter subscriptions",
                          "Product demo requests",
                          "Support inquiries",
                        ].map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-muted-foreground"
                          >
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">
                            What this includes:
                          </strong>{" "}
                          Your name, email address, and any message content you
                          choose to share. Company name is optional.
                        </p>
                      </div>
                    </div>

                    {/* Card 2 — Technical */}
                    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          2
                        </span>
                        Technical & Usage Data
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Automatically collected, aggregated technical data:
                      </p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {[
                          "Device type & operating system",
                          "Browser version",
                          "Pages visited (aggregated)",
                          "Approximate session duration",
                          "Performance metrics",
                          "Anonymized error logs",
                        ].map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4 inline mr-2 text-primary" />
                          <strong className="text-foreground">Note:</strong>{" "}
                          This data is aggregated and not used to identify
                          individual visitors.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* ============================================================
                    3. HOW WE USE IT
                ============================================================ */}
                <motion.div
                  id="usage"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Eye className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      How We Use Your Information
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">
                      Your data serves specific, legitimate purposes — never
                      marketing spam, never hidden profiling.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        {
                          title: "Product Improvement",
                          desc: "Enhancing features based on how people use them",
                        },
                        {
                          title: "User Experience",
                          desc: "Making the interface clearer and faster",
                        },
                        {
                          title: "Security Alerts",
                          desc: "Notifying you of critical account activity",
                        },
                        {
                          title: "Fraud Prevention",
                          desc: "Detecting unauthorized access attempts",
                        },
                        {
                          title: "Legal Compliance",
                          desc: "Meeting applicable regulatory obligations",
                        },
                        {
                          title: "Support",
                          desc: "Responding to your inquiries and requests",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm mb-1">
                              {item.title}
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                      <p className="text-sm text-destructive font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        We do not:
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 ml-6">
                        Sell your data • Share it with advertisers • Use it for
                        behavioral ad targeting • Send unsolicited marketing
                        emails
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ============================================================
                    4. COOKIES
                ============================================================ */}
                <motion.div
                  id="cookies"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Cookie className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Cookies & Tracking
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {[
                        {
                          type: "Essential",
                          desc: "Required for basic site functionality",
                          required: true,
                        },
                        {
                          type: "Analytics",
                          desc: "Aggregated, anonymous usage stats",
                          required: false,
                        },
                        {
                          type: "Preferences",
                          desc: "Remember your settings (theme, etc.)",
                          required: false,
                        },
                      ].map((cookie, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-xl bg-muted/50 border border-border"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground text-sm">
                              {cookie.type}
                            </span>
                            {cookie.required ? (
                              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                Required
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                Optional
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {cookie.desc}
                          </p>
                        </div>
                      ))}
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      We use minimal, non-intrusive cookies. No cross-site
                      tracking, no behavioral profiling. You can disable
                      optional cookies in your browser at any time, though some
                      features may behave differently.
                    </p>
                  </div>
                </motion.div>

                {/* ============================================================
                    5. DATA SHARING
                ============================================================ */}
                <motion.div
                  id="sharing"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Data Sharing Policy
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-8 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Our commitment
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          We do not sell, rent, or trade your personal data.
                          This includes aggregated or anonymized datasets.
                        </p>
                      </div>
                    </div>

                    <h4 className="font-semibold text-foreground mb-4">
                      Limited situations where data may be shared:
                    </h4>
                    <ul className="space-y-4">
                      {[
                        {
                          title: "Service Providers",
                          desc: "Trusted infrastructure partners (hosting, email delivery) that process data on our behalf under confidentiality agreements.",
                        },
                        {
                          title: "Legal Requirements",
                          desc: "Only when we are legally required to do so through a valid court order or regulatory mandate.",
                        },
                        {
                          title: "Business Transfers",
                          desc: "In case of a merger or acquisition, your data would remain protected under the same privacy commitments.",
                        },
                      ].map((item, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">
                              {idx + 1}
                            </span>
                          </div>
                          <div>
                            <span className="font-medium text-foreground text-sm">
                              {item.title}:
                            </span>
                            <span className="text-sm text-muted-foreground ml-1">
                              {item.desc}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* ============================================================
                    6. SECURITY — HONEST VERSION
                ============================================================ */}
                <motion.div
                  id="security"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Security Measures
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                      {[
                        {
                          icon: Lock,
                          label: "Encryption in Transit",
                          desc: "HTTPS/TLS on all connections",
                        },
                        {
                          icon: Shield,
                          label: "Access Controls",
                          desc: "Limited to who needs it",
                        },
                        {
                          icon: Clock,
                          label: "Regular Backups",
                          desc: "Redundancy for data safety",
                        },
                      ].map((item, idx) => {
                        const Icon = item.icon;
                        return (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-muted/50 border border-border text-center"
                          >
                            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                            <div className="font-semibold text-foreground text-sm">
                              {item.label}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.desc}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        <strong className="text-foreground">
                          Honest disclosure:
                        </strong>{" "}
                        We use industry-standard protections including HTTPS
                        encryption for all data in transit, controlled access to
                        production systems, and regular backups. That said, no
                        internet system is 100% secure. If we ever experience a
                        breach affecting your data, we will notify affected
                        users promptly and clearly.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ============================================================
                    7. YOUR RIGHTS
                ============================================================ */}
                <motion.div
                  id="rights"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Your Data Rights
                    </h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: Eye,
                        title: "Right to Access",
                        desc: "Request a copy of the data we hold about you",
                      },
                      {
                        icon: CheckCircle2,
                        title: "Right to Correction",
                        desc: "Fix inaccurate or outdated information",
                      },
                      {
                        icon: Trash2,
                        title: "Right to Deletion",
                        desc: "Request your data be permanently removed",
                      },
                      {
                        icon: Download,
                        title: "Right to Portability",
                        desc: "Receive your data in a standard format",
                      },
                    ].map((right, idx) => {
                      const Icon = right.icon;
                      return (
                        <div
                          key={idx}
                          className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                        >
                          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <Icon className="w-6 h-6 text-primary" />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2">
                            {right.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {right.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground text-center">
                      To exercise any of these rights, email us at{" "}
                      <a
                        href="mailto:hello@codearntech.com"
                        className="text-primary font-medium hover:underline"
                      >
                        hello@codearntech.com
                      </a>
                      . We&apos;ll respond within a reasonable time — usually
                      within a few business days.
                    </p>
                  </div>
                </motion.div>

                {/* ============================================================
                    8. THIRD-PARTY SERVICES
                ============================================================ */}
                <motion.div
                  id="third-party"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Third-Party Services
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">
                      CodEarn uses a small number of trusted third-party
                      services to operate. Each has its own privacy policy:
                    </p>

                    <div className="space-y-3">
                      {[
                        {
                          name: "Vercel",
                          purpose: "Website hosting & infrastructure",
                          link: "https://vercel.com/legal/privacy-policy",
                        },
                        {
                          name: "Email Provider",
                          purpose: "Transactional email delivery",
                          link: "#",
                        },
                        {
                          name: "Analytics Provider",
                          purpose: "Privacy-focused, aggregated analytics",
                          link: "#",
                        },
                      ].map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
                        >
                          <div>
                            <div className="font-medium text-foreground">
                              {service.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {service.purpose}
                            </div>
                          </div>
                          {service.link !== "#" ? (
                            <a
                              href={service.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary flex items-center gap-1 hover:underline"
                            >
                              Policy <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="text-xs text-muted-foreground">
                              — 
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <p className="text-xs text-muted-foreground mt-6 leading-relaxed">
                      We keep this list updated as our infrastructure evolves.
                      If you have questions about a specific provider, reach out
                      to us.
                    </p>
                  </div>
                </motion.div>

                {/* ============================================================
                    9. CHILDREN'S PRIVACY
                ============================================================ */}
                <motion.div
                  id="children"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Children&apos;s Privacy
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10 mb-4">
                      <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          Age Restriction
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Our services are not intended for users under 13
                          years of age. We do not knowingly collect personal
                          information from children.
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      If you believe we have inadvertently collected data from
                      a child under 13, please contact us at{" "}
                      <a
                        href="mailto:hello@codearntech.com"
                        className="text-primary font-medium hover:underline"
                      >
                        hello@codearntech.com
                      </a>{" "}
                      and we will delete the information promptly.
                    </p>
                  </div>
                </motion.div>

                {/* ============================================================
                    10. POLICY UPDATES
                ============================================================ */}
                <motion.div
                  id="updates"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Policy Updates
                    </h2>
                  </div>

                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">
                      We may update this policy as our products evolve or
                      legal requirements change. Significant changes will be
                      communicated through:
                    </p>

                    <div className="flex flex-wrap gap-3 mb-6">
                      {[
                        "Email notification",
                        "Website banner",
                        "Changelog entry",
                      ].map((method, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground border border-border"
                        >
                          {method}
                        </span>
                      ))}
                    </div>

                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground">
                        <strong className="text-foreground">
                          Current Version:
                        </strong>{" "}
                        1.0 — Effective {lastUpdated}
                        <br />
                        <span className="text-xs">
                          This is the initial version of this policy.
                        </span>
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* ============================================================
                    11. CONTACT
                ============================================================ */}
                <motion.div
                  id="contact"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground">
                      Contact Us
                    </h2>
                  </div>

                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 lg:p-12">
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        Questions about your privacy?
                      </h3>
                      <p className="text-muted-foreground mb-8">
                        Our team handles privacy inquiries directly. No bots,
                        no scripted responses — just the people building
                        CodEarn.
                      </p>

                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                          href="mailto:hello@codearntech.com"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                        >
                          <Mail className="w-4 h-4" />
                          hello@codearntech.com
                        </a>
                        <span className="text-sm text-muted-foreground">
                          Response time: usually within a few business days
                        </span>
                      </div>

                      <div className="mt-8 pt-8 border-t border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">CodEarn</strong>{" "}
                          • Pakistan — building globally
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FINAL STATEMENT
      ============================================================ */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-6">
            &ldquo;User data remains the property of the user.&rdquo;
          </blockquote>
          <p className="text-muted-foreground">
            We build software. We earn trust. We never sell it.
          </p>
        </div>
      </section>
    </div>
  );
}