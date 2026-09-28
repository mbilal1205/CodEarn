"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale,
  Mail,
  Shield,
  Clock,
  Server,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MessageSquare,
  FileText,
  GitBranch,
  History,
  Lock,
  CreditCard,
  Users,
  ChevronDown,
  ChevronRight,
  Hammer,
  Menu,
  X,
  ArrowUp,
} from "lucide-react";

/* ============================================================
   ANIMATIONS
============================================================ */
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

/* ============================================================
   SECTIONS
============================================================ */
const sections = [
  {
    id: "acceptance",
    title: "Acceptance",
    icon: CheckCircle2,
    shortTitle: "Acceptance",
  },
  {
    id: "service",
    title: "Service Description",
    icon: Server,
    shortTitle: "Service",
  },
  { id: "accounts", title: "Account Terms", icon: Users, shortTitle: "Accounts" },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    icon: Shield,
    shortTitle: "Use Policy",
  },
  { id: "payment", title: "Payment", icon: CreditCard, shortTitle: "Billing" },
  {
    id: "intellectual",
    title: "Intellectual Property",
    icon: FileText,
    shortTitle: "IP Rights",
  },
  {
    id: "termination",
    title: "Termination",
    icon: XCircle,
    shortTitle: "Termination",
  },
  {
    id: "liability",
    title: "Liability",
    icon: Scale,
    shortTitle: "Liability",
  },
  {
    id: "disputes",
    title: "Disputes",
    icon: MessageSquare,
    shortTitle: "Disputes",
  },
  {
    id: "changes",
    title: "Changes",
    icon: History,
    shortTitle: "Updates",
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState<string | null>(
    "acceptance"
  );
  const lastUpdated = "September 2026";
  const version = "1.0";
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsNavOpen(false);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (id: string) => {
    setActiveSection((prev) => (prev === id ? null : id));

    if (isMobile && activeSection !== id) {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const yOffset = -80;
          const y =
            element.getBoundingClientRect().top +
            window.pageYOffset +
            yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
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
            className="max-w-4xl mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 mb-4 lg:mb-6"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Scale className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 lg:mb-6 text-center"
            >
              Terms of Service
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs lg:text-sm text-muted-foreground mb-6 lg:mb-8"
            >
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <GitBranch className="w-3 h-3 lg:w-3.5 lg:h-3.5" />v{version}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {lastUpdated}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                Current
              </span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-8"
            >
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <Hammer className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm lg:text-base mb-1 lg:mb-2">
                    Readable Legal
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                    Legal documents should be readable. Each section has a{" "}
                    <span className="text-primary font-medium">TL;DR</span>{" "}
                    summary. No corporate fog, no hidden clauses.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          MAIN CONTENT
      ============================================================ */}
      <section className="pb-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    Sections
                  </h3>
                </div>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 ${
                          isActive ? "text-primary" : "text-muted-foreground"
                        }`}
                      />
                      <span className="text-left truncate">
                        {section.title}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-primary ml-auto" />
                      )}
                    </button>
                  );
                })}

                <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    Info
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Read time</span>
                      <span className="font-medium text-foreground">
                        ~7 min
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sections</span>
                      <span className="font-medium text-foreground">
                        {sections.length}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-9 space-y-3 lg:space-y-4">
              {/* 1. ACCEPTANCE */}
              <ClauseCard
                id="acceptance"
                title="1. Acceptance of Terms"
                icon={CheckCircle2}
                tldr="By using our services, you agree to these terms. Don't agree? Don't use our services."
                isActive={activeSection === "acceptance"}
                onToggle={() => toggleSection("acceptance")}
                isMobile={isMobile}
              >
                <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>
                    By accessing or using CodEarn&apos;s services, websites, or
                    products, you agree to be bound by these Terms. If you are
                    using our services on behalf of an organization, you
                    confirm that you have the authority to bind that
                    organization to these Terms.
                  </p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border">
                    <h4 className="font-semibold text-foreground text-sm mb-1.5">
                      Age Requirement
                    </h4>
                    <p className="text-sm">
                      You must be at least 13 years old, or the legal age in
                      your jurisdiction if higher, to use our services.
                    </p>
                  </div>
                </div>
              </ClauseCard>

              {/* 2. SERVICE */}
              <ClauseCard
                id="service"
                title="2. Service Description"
                icon={Server}
                tldr="We build software — SaaS products, web applications, custom tools, and automation systems. You own your data."
                isActive={activeSection === "service"}
                onToggle={() => toggleSection("service")}
                isMobile={isMobile}
              >
                <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>
                    CodEarn builds and operates software products — including
                    SaaS platforms, web applications, internal tools, and
                    automation systems — and provides software development
                    services for clients.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> What we provide
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Access to our SaaS products</li>
                        <li>• Custom software development</li>
                        <li>• Web application services</li>
                        <li>• Technical support</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <h4 className="font-semibold text-destructive text-sm mb-2 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" /> What we don&apos;t
                        provide
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Physical infrastructure</li>
                        <li>• Internet connectivity</li>
                        <li>• Hardware devices</li>
                        <li>• Third-party services</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* 3. ACCOUNTS */}
              <ClauseCard
                id="accounts"
                title="3. Account Terms"
                icon={Users}
                tldr="Keep your password safe. You're responsible for your account activity."
                isActive={activeSection === "accounts"}
                onToggle={() => toggleSection("accounts")}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="space-y-2">
                    <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          Security
                        </h4>
                        <p className="text-xs lg:text-sm">
                          You are responsible for maintaining the
                          confidentiality of your credentials and for all
                          activity that occurs under your account.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-foreground text-sm">
                          Breach Notification
                        </h4>
                        <p className="text-xs lg:text-sm">
                          Notify us promptly if you suspect unauthorized
                          access to your account or a security incident
                          involving your credentials.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* 4. ACCEPTABLE USE */}
              <ClauseCard
                id="acceptable-use"
                title="4. Acceptable Use Policy"
                icon={Shield}
                tldr="Use our services responsibly. No illegal activity, abuse, or attempts to disrupt the platform."
                isActive={activeSection === "acceptable-use"}
                onToggle={() => toggleSection("acceptable-use")}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <SeverityBadge
                    level="critical"
                    title="Prohibited"
                    items={[
                      "Illegal activities",
                      "Malware distribution",
                      "Unauthorized access attempts",
                      "Denial-of-service attacks",
                      "Abuse or harassment",
                    ]}
                  />
                  <SeverityBadge
                    level="warning"
                    title="Restricted"
                    items={[
                      "Spam or unsolicited messaging",
                      "Excessive automated requests",
                      "Reverse engineering",
                      "Reselling without agreement",
                    ]}
                  />
                  <p className="text-xs lg:text-sm">
                    We may suspend or terminate accounts that violate this
                    policy.
                  </p>
                </div>
              </ClauseCard>

              {/* 5. PAYMENT */}
              <ClauseCard
                id="payment"
                title="5. Payment & Billing"
                icon={CreditCard}
                tldr="Paid services are billed in advance. Cancel anytime. We don't refund partial periods."
                isActive={activeSection === "payment"}
                onToggle={() => toggleSection("payment")}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <p className="text-xs lg:text-sm">
                    Where paid plans are offered, fees are billed in advance
                    according to the plan you select. Prices and features for
                    each product are listed on the product page at the time of
                    purchase.
                  </p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border text-xs lg:text-sm">
                    <ul className="space-y-1.5">
                      <li>
                        • Fees are billed in advance on a recurring basis.
                      </li>
                      <li>
                        • You may cancel at any time; access continues until
                        the end of the current billing period.
                      </li>
                      <li>
                        • Fees already paid are generally non-refundable
                        except where required by law.
                      </li>
                      <li>
                        • You are responsible for applicable taxes in your
                        jurisdiction.
                      </li>
                    </ul>
                  </div>
                </div>
              </ClauseCard>

              {/* 6. INTELLECTUAL PROPERTY */}
              <ClauseCard
                id="intellectual"
                title="6. Intellectual Property"
                icon={FileText}
                tldr="We own our software and brand. You own the data and content you create."
                isActive={activeSection === "intellectual"}
                onToggle={() => toggleSection("intellectual")}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-primary text-sm mb-2">
                        We own
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Our software and code</li>
                        <li>• Product designs and UI</li>
                        <li>• Documentation</li>
                        <li>• Brand and trademarks</li>
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2">
                        You own
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        <li>• Your content and data</li>
                        <li>• Your account information</li>
                        <li>• Your custom configurations</li>
                        <li>• Anything you upload or create</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm">
                    You grant us a limited license to process your content
                    only as needed to provide the services you requested.
                  </p>
                </div>
              </ClauseCard>

              {/* 7. TERMINATION */}
              <ClauseCard
                id="termination"
                title="7. Termination"
                icon={XCircle}
                tldr="You can cancel anytime. We may suspend accounts that violate these terms."
                isActive={activeSection === "termination"}
                onToggle={() => toggleSection("termination")}
                isMobile={isMobile}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <p className="text-xs lg:text-sm">
                    You may stop using our services at any time. We may
                    suspend or terminate access if these Terms are violated,
                    if required by law, or if your account poses a risk to the
                    platform or other users.
                  </p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border text-xs lg:text-sm">
                    <p>
                      When an account is closed, we retain data only as long
                      as needed for legitimate business or legal purposes.
                      You can request an export of your data before
                      cancellation.
                    </p>
                  </div>
                </div>
              </ClauseCard>

              {/* 8. LIABILITY */}
              <ClauseCard
                id="liability"
                title="8. Limitation of Liability"
                icon={Scale}
                tldr="We're not liable for indirect damages. Our total liability is limited to the amount you've paid us."
                isActive={activeSection === "liability"}
                onToggle={() => toggleSection("liability")}
                isMobile={isMobile}
              >
                <div className="p-3 lg:p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-sm lg:text-base text-muted-foreground">
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-500 text-sm mb-2">
                    Liability Cap
                  </h4>
                  <p className="text-xs lg:text-sm">
                    To the extent permitted by law, our total liability for
                    any claim arising from your use of our services is limited
                    to the amount you paid us in the 12 months preceding the
                    claim. We are not liable for indirect, incidental, or
                    consequential damages.
                  </p>
                </div>
              </ClauseCard>

              {/* 9. DISPUTES */}
              <ClauseCard
                id="disputes"
                title="9. Dispute Resolution"
                icon={MessageSquare}
                tldr="Talk to us first. We'll work it out in good faith."
                isActive={activeSection === "disputes"}
                onToggle={() => toggleSection("disputes")}
                isMobile={isMobile}
              >
                <div className="flex flex-col gap-2 text-sm lg:text-base text-muted-foreground">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      1
                    </span>
                    <span className="text-sm">
                      Contact us directly — most issues are resolved quickly
                      and informally.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      2
                    </span>
                    <span className="text-sm">
                      If unresolved, we&apos;ll work together in good faith to
                      find a fair solution.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                    <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                      3
                    </span>
                    <span className="text-sm">
                      Disputes are governed by the laws applicable in
                      Pakistan, where CodEarn is based.
                    </span>
                  </div>
                </div>
              </ClauseCard>

              {/* 10. CHANGES */}
              <ClauseCard
                id="changes"
                title="10. Changes to Terms"
                icon={History}
                tldr="We may update these terms. Significant changes will be communicated clearly."
                isActive={activeSection === "changes"}
                onToggle={() => toggleSection("changes")}
                isMobile={isMobile}
              >
                <div className="text-sm lg:text-base text-muted-foreground">
                  <p className="mb-3">
                    We may update these Terms as our products evolve or as
                    legal requirements change. When we make significant
                    changes, we&apos;ll notify users through email or an
                    in-app notice.
                  </p>
                  <div className="flex items-center gap-2 text-xs lg:text-sm p-2 rounded-lg bg-muted/50">
                    <GitBranch className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      Current: v{version} — Effective {lastUpdated}
                    </span>
                  </div>
                </div>
              </ClauseCard>

              {/* CONTACT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mt-8 lg:mt-12"
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl lg:rounded-2xl p-6 lg:p-12">
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-3 lg:mb-4">
                      Questions about these Terms?
                    </h3>
                    <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
                      Our team answers directly — no legal department, no
                      scripted responses.
                    </p>
                    <a
                      href="mailto:hello@codearntech.com"
                      className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 bg-primary text-primary-foreground text-sm lg:text-base font-semibold rounded-lg lg:rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      hello@codearntech.com
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MOBILE FLOATING NAV
      ============================================================ */}
      <AnimatePresence>
        {isMobile && (
          <>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsNavOpen(true)}
              aria-label="Open sections navigation"
              className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </motion.button>

            <AnimatePresence>
              {isNavOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsNavOpen(false)}
                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                  />
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{
                      type: "spring",
                      damping: 25,
                      stiffness: 300,
                    }}
                    className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 max-h-[70vh] overflow-hidden lg:hidden"
                  >
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">
                        Jump to Section
                      </h3>
                      <button
                        onClick={() => setIsNavOpen(false)}
                        aria-label="Close navigation"
                        className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="overflow-y-auto max-h-[50vh] p-2">
                      {sections.map((section) => {
                        const Icon = section.icon;
                        const isActive = activeSection === section.id;
                        return (
                          <button
                            key={section.id}
                            onClick={() => {
                              toggleSection(section.id);
                              setIsNavOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                              isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${
                                isActive
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            />
                            <span className="text-left">
                              {section.shortTitle}
                            </span>
                            {isActive && (
                              <ChevronRight className="w-4 h-4 ml-auto" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-4 border-t border-border bg-muted/30">
                      <button
                        onClick={() => {
                          scrollToTop();
                          setIsNavOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground"
                      >
                        <ArrowUp className="w-4 h-4" />
                        Back to Top
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   CLAUSE CARD
============================================================ */
function ClauseCard({
  id,
  title,
  icon: Icon,
  tldr,
  children,
  isActive,
  onToggle,
  isMobile,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  tldr: string;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
  isMobile: boolean;
}) {
  return (
    <div
      id={id}
      className={`bg-card border rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive
          ? "border-primary/30 shadow-lg shadow-primary/5"
          : "border-border hover:border-primary/20"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-3 lg:gap-4 p-4 lg:p-6 text-left"
      >
        <div
          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border ${
            isActive
              ? "bg-primary/10 border-primary/20"
              : "bg-muted border-border"
          }`}
        >
          <Icon
            className={`w-5 h-5 lg:w-6 lg:h-6 ${
              isActive ? "text-primary" : "text-muted-foreground"
            }`}
          />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-base lg:text-xl font-bold text-foreground mb-1.5 lg:mb-2 pr-8 relative">
            {title}
            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              {isActive ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              )}
            </span>
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] lg:text-xs font-bold">
              TL;DR
            </span>
            <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">
              {tldr}
            </p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden will-change-transform"
          >
            <div className="px-4 lg:px-6 pb-4 lg:pb-6 pt-2 border-t border-border">
              <div className="mt-3 lg:mt-4">{children}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   SEVERITY BADGE
============================================================ */
function SeverityBadge({
  level,
  title,
  items,
}: {
  level: "critical" | "warning";
  title: string;
  items: string[];
}) {
  const colors = {
    critical:
      "bg-destructive/5 border-destructive/20 text-destructive",
    warning:
      "bg-yellow-500/5 border-yellow-500/20 text-yellow-600 dark:text-yellow-500",
  };

  return (
    <div className={`p-3 lg:p-4 rounded-lg border ${colors[level]}`}>
      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
        <AlertTriangle className="w-4 h-4" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="text-xs px-2 py-1 rounded-full bg-background/50 border border-current/20"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}