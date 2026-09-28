"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Users,
  Zap,
  Calendar,
  ChevronDown,
  ChevronRight,
  X,
  Menu,
  Upload,
  Loader2,
  ArrowUpRight,
  Rocket,
  LifeBuoy,
  MonitorPlay,
  Handshake,
  GraduationCap,
} from "lucide-react";
import SubscribeSection from "@/components/layout/subscription";

/* ============================================================
   DATA — All from single source (moved here for clarity)
============================================================ */

const contactMethods = [
  {
    id: "new-project",
    title: "Start a New Project",
    description: "Have a product idea or problem worth solving?",
    icon: Rocket,
    color: "blue" as const,
    responseTime: "Within 24 hours",
    availability: "Business days",
    action: "Start a Conversation",
    email: "hello@codearntech.com",
    features: [
      "Product development",
      "Custom software",
      "AI integration",
      "Technical consulting",
    ],
  },
  {
    id: "existing-client",
    title: "Existing Client Support",
    description: "Already working with us? Get help here.",
    icon: LifeBuoy,
    color: "green" as const,
    responseTime: "Within 24 hours",
    availability: "Business days",
    action: "Get Support",
    email: "hello@codearntech.com",
    features: [
      "Bug reports",
      "Feature requests",
      "Account help",
      "Project updates",
    ],
  },
  {
    id: "demo",
    title: "Product Demo",
    description: "Want to see GigThink or our products in action?",
    icon: MonitorPlay,
    color: "purple" as const,
    responseTime: "Within 48 hours",
    availability: "Business days",
    action: "Book a Demo",
    email: "hello@codearntech.com",
    features: [
      "Live walkthrough",
      "Technical Q&A",
      "Use-case discussion",
      "Pricing overview",
    ],
  },
  {
    id: "partnership",
    title: "Partnership",
    description: "Interested in collaborating or building together?",
    icon: Handshake,
    color: "orange" as const,
    responseTime: "Within 48 hours",
    availability: "Business days",
    action: "Partner With Us",
    email: "hello@codearntech.com",
    features: [
      "Technology partnerships",
      "Integration requests",
      "Joint products",
      "Co-marketing",
    ],
  },
  {
    id: "training",
    title: "Training & Mentorship",
    description: "Want to learn to build products like ours?",
    icon: GraduationCap,
    color: "teal" as const,
    responseTime: "Within 48 hours",
    availability: "Business days",
    action: "Learn More",
    email: "hello@codearntech.com",
    features: [
      "Developer mentorship",
      "Product building guidance",
      "Code reviews",
      "Career advice",
    ],
  },
  {
    id: "general",
    title: "General Inquiry",
    description: "Anything else — questions, feedback, or just hello.",
    icon: Mail,
    color: "slate" as const,
    responseTime: "Within 24–48 hours",
    availability: "Business days",
    action: "Send a Message",
    email: "hello@codearntech.com",
    features: [
      "General questions",
      "Feedback",
      "Press & media",
      "Other inquiries",
    ],
  },
];

const faqs = [
  {
    question: "How quickly do you respond to messages?",
    answer:
      "We aim to respond within 24 hours on business days. For urgent matters, mention it in the subject line and we'll prioritize it. All emails go to hello@codearntech.com.",
  },
  {
    question: "Do you build custom software for clients?",
    answer:
      "Yes. We work with founders, businesses, and teams to build real products — web apps, SaaS platforms, internal tools, and AI integrations. Every project starts with understanding the problem, not the tech stack.",
  },
  {
    question: "Can I see a demo of GigThink or your products?",
    answer:
      "Absolutely. We offer live walkthroughs of GigThink and our products — handled by the team that actually built them, not a salesperson. Book a demo through the form above.",
  },
  {
    question: "Do you offer mentorship or training for developers?",
    answer:
      "Yes, on a limited basis. We occasionally take on mentorship for builders who want to grow from learning to shipping. Reach out with what you're working on and where you're stuck.",
  },
  {
    question: "What information should I include in my message?",
    answer:
      "Be clear about what you need — your goal, timeline, and any relevant context. If it's about an existing project, include your project name. The more specific, the faster we can help.",
  },
  {
    question: "Where is CodEarn based?",
    answer:
      "CodEarn is based in Pakistan and works with clients globally. Most communication happens over email and scheduled video calls.",
  },
];

const teamMembers = [
  {
    name: "Muhammad Bilal",
    role: "Founder & Software Architect",
    avatar: "MB",
  },
  {
    name: "CodEarn Engineering",
    role: "Product & Engineering Team",
    avatar: "CE",
  },
];

const contactInfo = {
  email: "hello@codearntech.com",
  website: "https://www.codearntech.com",
  location: "Pakistan — building globally",
  responseTime: "Usually within 24 hours",
};

/* ============================================================
   COLOR MAP — Tailwind safe dynamic classes
============================================================ */
const colorMap = {
  blue: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    border: "border-green-500/20",
  },
  purple: {
    bg: "bg-purple-500/10",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500/20",
  },
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
    border: "border-orange-500/20",
  },
  teal: {
    bg: "bg-teal-500/10",
    text: "text-teal-600 dark:text-teal-400",
    border: "border-teal-500/20",
  },
  slate: {
    bg: "bg-muted",
    text: "text-muted-foreground",
    border: "border-border",
  },
};

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
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function ContactPage() {
  const [activeMethod, setActiveMethod] = useState("new-project");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
    priority: "normal",
    budget: "",
    timeline: "",
    partnershipType: "",
    website: "",
    file: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const currentMethod =
    contactMethods.find((m) => m.id === activeMethod) || contactMethods[0];
  const currentColors = colorMap[currentMethod.color];

  /* ----------------------------------------------------------
     SUBMIT HANDLER — Uses mailto as fallback (no backend needed)
  ---------------------------------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // Simulate submission (replace with actual API later)
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // Build mailto as primary channel (until backend is ready)
      const subjectLine = formData.subject || currentMethod.title;
      const bodyLines = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.company ? `Company: ${formData.company}` : "",
        `Method: ${currentMethod.title}`,
        formData.priority ? `Priority: ${formData.priority}` : "",
        formData.budget ? `Budget: ${formData.budget}` : "",
        formData.timeline ? `Timeline: ${formData.timeline}` : "",
        formData.partnershipType
          ? `Partnership Type: ${formData.partnershipType}`
          : "",
        formData.website ? `Website: ${formData.website}` : "",
        "",
        "Message:",
        formData.message,
      ].filter(Boolean);

      const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      // Open email client (works without backend)
      window.location.href = mailtoLink;

      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
        priority: "normal",
        budget: "",
        timeline: "",
        partnershipType: "",
        website: "",
        file: null,
      });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      console.error("Submit error:", err);
      setError(
        `Failed to send message. Please email us directly at ${contactInfo.email}.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > 10 * 1024 * 1024) {
      alert("File size should be less than 10MB");
      return;
    }
    setFormData({ ...formData, file: file || null });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ----------------------------------------------------------
     METHOD-SPECIFIC FIELDS
  ---------------------------------------------------------- */
  const renderMethodFields = () => {
    switch (activeMethod) {
      case "existing-client":
        return (
          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Priority Level
            </label>
            <div className="flex gap-2 flex-wrap">
              {["low", "normal", "high", "urgent"].map((priority) => (
                <button
                  key={priority}
                  type="button"
                  onClick={() => setFormData({ ...formData, priority })}
                  className={`flex-1 min-w-[70px] py-2 px-3 rounded-lg text-xs font-medium capitalize transition-all border ${
                    formData.priority === priority
                      ? priority === "urgent"
                        ? "bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400"
                        : "bg-primary/10 text-primary border-primary/30"
                      : "bg-muted text-muted-foreground border-border hover:border-primary/20"
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>
        );

      case "new-project":
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Budget Range (Optional)
              </label>
              <select
                value={formData.budget}
                onChange={(e) =>
                  setFormData({ ...formData, budget: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select budget</option>
                <option value="< $1k">Less than $1,000</option>
                <option value="$1k-$5k">$1,000 - $5,000</option>
                <option value="$5k-$20k">$5,000 - $20,000</option>
                <option value="$20k-$50k">$20,000 - $50,000</option>
                <option value="> $50k">More than $50,000</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Timeline (Optional)
              </label>
              <select
                value={formData.timeline}
                onChange={(e) =>
                  setFormData({ ...formData, timeline: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select timeline</option>
                <option value="immediate">Immediate</option>
                <option value="1-3 months">1-3 months</option>
                <option value="3-6 months">3-6 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>
        );

      case "partnership":
        return (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Partnership Type
              </label>
              <select
                value={formData.partnershipType}
                onChange={(e) =>
                  setFormData({ ...formData, partnershipType: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              >
                <option value="">Select type</option>
                <option value="Technology Partnership">
                  Technology Partnership
                </option>
                <option value="Integration">Integration</option>
                <option value="Joint Product">Joint Product</option>
                <option value="Co-marketing">Co-marketing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Company Website
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://company.com"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden">
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
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              variants={fadeInUp}
              className="flex items-center justify-center gap-3 mb-4 lg:mb-6"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 lg:mb-6"
            >
              Let&apos;s{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Talk
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-base lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto"
            >
              Whether you have a project, want to see our products, or just
              want to say hello — we&apos;re here.
            </motion.p>

            {/* Trust Badges — REAL ONLY */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-3 lg:gap-4 text-xs lg:text-sm"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Usually within 24 hours
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground">
                <Users className="w-3.5 h-3.5" />
                Founder-led team
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted border border-border text-muted-foreground">
                <Zap className="w-3.5 h-3.5" />
                Building globally
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CONTACT METHOD CARDS
      ============================================================ */}
      <section className="pb-12 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-12">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              const isActive = activeMethod === method.id;
              const colors = colorMap[method.color];

              return (
                <motion.button
                  key={method.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setActiveMethod(method.id)}
                  className={`relative text-left p-5 lg:p-6 rounded-xl lg:rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? "bg-card border-primary/30 shadow-lg shadow-primary/5"
                      : "bg-muted/30 border-border hover:border-primary/20 hover:bg-muted/50"
                  }`}
                >
                  {isActive && (
                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary" />
                  )}

                  <div
                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-4 border transition-colors ${
                      isActive
                        ? `${colors.bg} ${colors.border}`
                        : "bg-muted border-border"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 lg:w-6 lg:h-6 ${
                        isActive ? colors.text : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <h3 className="text-base lg:text-lg font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground mb-4">
                    {method.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>
                        Response:{" "}
                        <span className="text-foreground font-medium">
                          {method.responseTime}
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Zap className="w-3.5 h-3.5" />
                      <span>
                        Available:{" "}
                        <span className="text-foreground font-medium">
                          {method.availability}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {method.features.slice(0, 2).map((feature, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* ============================================================
              FORM + SIDEBAR
          ============================================================ */}
          <div className="grid lg:grid-cols-5 gap-6 lg:gap-12">
            {/* FORM */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-8"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
                  <div>
                    <h2 className="text-lg lg:text-xl font-bold text-foreground">
                      Send a Message
                    </h2>
                    <p className="text-xs lg:text-sm text-muted-foreground">
                      {currentMethod.description}
                    </p>
                  </div>
                  <div
                    className={`self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium border ${currentColors.bg} ${currentColors.text} ${currentColors.border}`}
                  >
                    {currentMethod.responseTime}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Message Ready!
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Your email client should have opened. Send it and
                        we&apos;ll reply {currentMethod.responseTime.toLowerCase()}.
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Not opened? Email us directly at{" "}
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary hover:underline"
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {error && (
                        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          {error}
                        </div>
                      )}

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-1.5">
                            Email *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="Your company or brand"
                        />
                      </div>

                      {renderMethodFields()}

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                          placeholder="How can we help?"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Message *
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2.5 rounded-lg bg-muted border border-border text-foreground text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                          placeholder="Tell us about your project, question, or idea..."
                        />
                      </div>

                      {/* File Upload */}
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">
                          Attachments (optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                          />
                          <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/30 transition-colors bg-muted/30"
                          >
                            {formData.file ? (
                              <div className="flex items-center gap-2 text-sm text-foreground">
                                <CheckCircle2 className="w-4 h-4 text-green-500" />
                                <span className="truncate max-w-[240px]">
                                  {formData.file.name}
                                </span>
                              </div>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-muted-foreground mb-1" />
                                <p className="text-xs text-muted-foreground">
                                  Drop files here or click to upload
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-1">
                                  Max 10MB • Screenshots, docs, etc.
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </button>

                      <p className="text-xs text-center text-muted-foreground">
                        Or email us directly at{" "}
                        <a
                          href={`mailto:${contactInfo.email}`}
                          className="text-primary hover:underline"
                        >
                          {contactInfo.email}
                        </a>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* SIDEBAR */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Contact */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
              >
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  Other Ways to Reach Us
                </h3>

                <div className="space-y-3">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        Email
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {contactInfo.email}
                      </div>
                    </div>
                  </a>

                  <a
                    href={contactInfo.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ArrowUpRight className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        Website
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        codearntech.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="/founder"
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-foreground text-sm">
                        Founder Story
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        Meet Muhammad Bilal
                      </div>
                    </div>
                  </a>
                </div>
              </motion.div>

              {/* Team */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
              >
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                  You&apos;ll Talk to Humans
                </h3>

                <div className="space-y-3">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
                  No call centers. No bots. Just the team that actually builds
                  CodEarn products, replying to you directly.
                </p>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-card border border-border rounded-xl lg:rounded-2xl p-5 lg:p-6"
              >
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground text-sm mb-1">
                      Based In
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Pakistan — building globally.
                      <br />
                      Most communication over email &amp; scheduled calls.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FAQ
      ============================================================ */}
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 lg:mb-12"
          >
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-sm lg:text-base">
              Quick answers to common questions
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-4 lg:p-5 text-left"
                >
                  <span className="font-medium text-foreground text-sm lg:text-base pr-4">
                    {faq.question}
                  </span>
                  {openFaq === idx ? (
                    <ChevronDown className="w-5 h-5 text-muted-foreground shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 lg:px-5 pb-4 lg:pb-5 pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MOBILE FLOATING NAV
      ============================================================ */}
      {isMobile && (
        <>
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={() => setIsNavOpen(true)}
            aria-label="Open quick contact"
            className="fixed bottom-6 right-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center"
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
                  className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                />
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "100%" }}
                  className="fixed bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-2xl z-50 p-4 max-h-[80vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">Quick Contact</h3>
                    <button
                      onClick={() => setIsNavOpen(false)}
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {contactMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <button
                          key={method.id}
                          onClick={() => {
                            setActiveMethod(method.id);
                            setIsNavOpen(false);
                            scrollToTop();
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                        >
                          <Icon className="w-5 h-5 text-primary shrink-0" />
                          <div>
                            <span className="text-sm font-medium block">
                              {method.title}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {method.responseTime}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}

      <SubscribeSection />
    </div>
  );
}