"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scale, Mail, Shield, Clock, Server, AlertTriangle, CheckCircle2,
  XCircle, MessageSquare, FileText, History, Lock, CreditCard, Users,
  ChevronDown, ChevronRight, Hammer, Menu, X, ArrowUp,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const P = {
  acceptanceTldr: {
    en: "By using our services, you agree to these terms. Don't agree? Don't use our services.",
    ar: "باستخدامك لخدماتنا، فإنك توافق على هذه الشروط. لا توافق؟ لا تستخدم خدماتنا.",
  },
  acceptanceBody: {
    en: "By accessing or using CodEarn's services, websites, or products, you agree to be bound by these Terms. If you are using our services on behalf of an organization, you confirm that you have the authority to bind that organization to these Terms.",
    ar: "من خلال الوصول إلى خدمات CodEarn أو مواقعها أو منتجاتها أو استخدامها، فإنك توافق على الالتزام بهذه الشروط. إذا كنت تستخدم خدماتنا نيابة عن مؤسسة، فإنك تؤكد أن لديك السلطة لإلزام تلك المؤسسة بهذه الشروط.",
  },
  ageRequirement: { en: "Age Requirement", ar: "متطلب العمر" },
  ageBody: {
    en: "You must be at least 13 years old, or the legal age in your jurisdiction if higher, to use our services.",
    ar: "يجب أن يكون عمرك 13 عامًا على الأقل، أو السن القانوني في نطاق اختصاصك إذا كان أعلى، لاستخدام خدماتنا.",
  },
  serviceTldr: {
    en: "We build software — SaaS products, web applications, custom tools, and automation systems. You own your data.",
    ar: "نبني برمجيات — منتجات SaaS وتطبيقات ويب وأدوات مخصصة وأنظمة أتمتة. بياناتك ملكك.",
  },
  serviceBody: {
    en: "CodEarn builds and operates software products — including SaaS platforms, web applications, internal tools, and automation systems — and provides software development services for clients.",
    ar: "تبني CodEarn وتشغّل منتجات برمجية — بما في ذلك منصات SaaS وتطبيقات ويب وأدوات داخلية وأنظمة أتمتة — وتقدم خدمات تطوير برمجيات للعملاء.",
  },
  whatWeProvide: { en: "What we provide", ar: "ما نقدمه" },
  provideList: {
    en: ["Access to our SaaS products", "Custom software development", "Web application services", "Technical support"],
    ar: ["الوصول إلى منتجات SaaS الخاصة بنا", "تطوير برمجيات مخصص", "خدمات تطبيقات الويب", "دعم تقني"],
  },
  whatWeDontProvide: { en: "What we don't provide", ar: "ما لا نقدمه" },
  dontProvideList: {
    en: ["Physical infrastructure", "Internet connectivity", "Hardware devices", "Third-party services"],
    ar: ["بنية تحتية مادية", "اتصال بالإنترنت", "أجهزة مادية", "خدمات أطراف ثالثة"],
  },
  accountsTldr: {
    en: "Keep your password safe. You're responsible for your account activity.",
    ar: "حافظ على كلمة مرورك آمنة. أنت مسؤول عن نشاط حسابك.",
  },
  securityLabel: { en: "Security", ar: "الأمان" },
  securityBody: {
    en: "You are responsible for maintaining the confidentiality of your credentials and for all activity that occurs under your account.",
    ar: "أنت مسؤول عن الحفاظ على سرية بيانات اعتمادك وعن جميع الأنشطة التي تحدث تحت حسابك.",
  },
  breachLabel: { en: "Breach Notification", ar: "إشعار الاختراق" },
  breachBody: {
    en: "Notify us promptly if you suspect unauthorized access to your account or a security incident involving your credentials.",
    ar: "أبلغنا على الفور إذا كنت تشك في وصول غير مصرح به إلى حسابك أو حادث أمني يتعلق ببيانات اعتمادك.",
  },
  acceptableTldr: {
    en: "Use our services responsibly. No illegal activity, abuse, or attempts to disrupt the platform.",
    ar: "استخدم خدماتنا بمسؤولية. لا نشاط غير قانوني أو إساءة أو محاولات لتعطيل المنصة.",
  },
  prohibited: { en: "Prohibited", ar: "محظور" },
  prohibitedItems: {
    en: ["Illegal activities", "Malware distribution", "Unauthorized access attempts", "Denial-of-service attacks", "Abuse or harassment"],
    ar: ["أنشطة غير قانونية", "توزيع برمجيات خبيثة", "محاولات وصول غير مصرح بها", "هجمات حجب الخدمة", "الإساءة أو التحرش"],
  },
  restricted: { en: "Restricted", ar: "مقيّد" },
  restrictedItems: {
    en: ["Spam or unsolicited messaging", "Excessive automated requests", "Reverse engineering", "Reselling without agreement"],
    ar: ["البريد العشوائي أو الرسائل غير المرغوب فيها", "طلبات آلية مفرطة", "الهندسة العكسية", "إعادة البيع دون اتفاق"],
  },
  acceptableFooter: {
    en: "We may suspend or terminate accounts that violate this policy.",
    ar: "قد نُعلّق أو ننهي الحسابات التي تنتهك هذه السياسة.",
  },
  paymentTldr: {
    en: "Paid services are billed in advance. Cancel anytime. We don't refund partial periods.",
    ar: "تُفوتر الخدمات المدفوعة مقدمًا. يمكنك الإلغاء في أي وقت. لا نسترد الفترات الجزئية.",
  },
  paymentBody: {
    en: "Where paid plans are offered, fees are billed in advance according to the plan you select. Prices and features for each product are listed on the product page at the time of purchase.",
    ar: "حيث تُقدَّم الخطط المدفوعة، تُفوتر الرسوم مقدمًا وفقًا للخطة التي تختارها. الأسعار والميزات لكل منتج مُدرجة في صفحة المنتج وقت الشراء.",
  },
  paymentList: {
    en: [
      "Fees are billed in advance on a recurring basis.",
      "You may cancel at any time; access continues until the end of the current billing period.",
      "Fees already paid are generally non-refundable except where required by law.",
      "You are responsible for applicable taxes in your jurisdiction.",
    ],
    ar: [
      "تُفوتر الرسوم مقدمًا على أساس متكرر.",
      "يمكنك الإلغاء في أي وقت؛ يستمر الوصول حتى نهاية فترة الفوترة الحالية.",
      "الرسوم المدفوعة عادةً غير قابلة للاسترداد إلا حيث يقتضي القانون ذلك.",
      "أنت مسؤول عن الضرائب المعمول بها في نطاق اختصاصك.",
    ],
  },
  intellectualTldr: {
    en: "We own our software and brand. You own the data and content you create.",
    ar: "نحن نملك برمجياتنا وعلامتنا التجارية. أنت تملك البيانات والمحتوى الذي تنشئه.",
  },
  weOwn: { en: "We own", ar: "نمثل" },
  weOwnList: {
    en: ["Our software and code", "Product designs and UI", "Documentation", "Brand and trademarks"],
    ar: ["برمجياتنا وكودنا", "تصاميم المنتج والواجهة", "الوثائق", "العلامة التجارية والعلامات المسجلة"],
  },
  youOwn: { en: "You own", ar: "أنت تملك" },
  youOwnList: {
    en: ["Your content and data", "Your account information", "Your custom configurations", "Anything you upload or create"],
    ar: ["محتواك وبياناتك", "معلومات حسابك", "تكويناتك المخصصة", "أي شيء ترفعه أو تنشئه"],
  },
  intellectualFooter: {
    en: "You grant us a limited license to process your content only as needed to provide the services you requested.",
    ar: "تمنحنا ترخيصًا محدودًا لمعالجة محتواك فقط حسب الحاجة لتقديم الخدمات التي طلبتها.",
  },
  terminationTldr: {
    en: "You can cancel anytime. We may suspend accounts that violate these terms.",
    ar: "يمكنك الإلغاء في أي وقت. قد نُعلّق الحسابات التي تنتهك هذه الشروط.",
  },
  terminationBody: {
    en: "You may stop using our services at any time. We may suspend or terminate access if these Terms are violated, if required by law, or if your account poses a risk to the platform or other users.",
    ar: "يمكنك التوقف عن استخدام خدماتنا في أي وقت. قد نُعلّق أو ننهي الوصول إذا انتهكت هذه الشروط، أو إذا تطلب القانون ذلك، أو إذا شكّل حسابك خطرًا على المنصة أو المستخدمين الآخرين.",
  },
  terminationFooter: {
    en: "When an account is closed, we retain data only as long as needed for legitimate business or legal purposes. You can request an export of your data before cancellation.",
    ar: "عند إغلاق حساب، نحتفظ بالبيانات فقط طالما دعت الحاجة لأغراض تجارية أو قانونية مشروعة. يمكنك طلب تصدير بياناتك قبل الإلغاء.",
  },
  liabilityTldr: {
    en: "We're not liable for indirect damages. Our total liability is limited to the amount you've paid us.",
    ar: "نحن غير مسؤولين عن الأضرار غير المباشرة. تقتصر مسؤوليتنا الإجمالية على المبلغ الذي دفعته لنا.",
  },
  liabilityCap: { en: "Liability Cap", ar: "سقف المسؤولية" },
  liabilityBody: {
    en: "To the extent permitted by law, our total liability for any claim arising from your use of our services is limited to the amount you paid us in the 12 months preceding the claim. We are not liable for indirect, incidental, or consequential damages.",
    ar: "بالقدر الذي يسمح به القانون، تقتصر مسؤوليتنا الإجمالية عن أي مطالبة ناشئة عن استخدامك لخدماتنا على المبلغ الذي دفعته لنا في الـ 12 شهرًا التي سبقت المطالبة. نحن غير مسؤولين عن الأضرار غير المباشرة أو العرضية أو التبعية.",
  },
  disputesTldr: {
    en: "Talk to us first. We'll work it out in good faith.",
    ar: "تحدّث معنا أولًا. سنحل الأمر بحسن نية.",
  },
  disputeStep1: {
    en: "Contact us directly — most issues are resolved quickly and informally.",
    ar: "اتصل بنا مباشرة — تُحل معظم المشكلات بسرعة وبشكل غير رسمي.",
  },
  disputeStep2: {
    en: "If unresolved, we'll work together in good faith to find a fair solution.",
    ar: "إذا لم يتم حلها، سنعمل معًا بحسن نية لإيجاد حل عادل.",
  },
  disputeStep3: {
    en: "Disputes are governed by the law and jurisdiction agreed in your written engagement contract.",
    ar: "تخضع النزاعات للقانون والاختصاص القضائي المتفق عليه في عقد المشاركة المكتوب الخاص بك.",
  },
  changesTldr: {
    en: "We may update these terms. Significant changes will be communicated clearly.",
    ar: "قد نحدّث هذه الشروط. سيتم الإبلاغ عن التغييرات المهمة بوضوح.",
  },
  changesBody: {
    en: "We may update these Terms as our products evolve or as legal requirements change. When we make significant changes, we'll notify users through email or an in-app notice.",
    ar: "قد نحدّث هذه الشروط مع تطور منتجاتنا أو تغير المتطلبات القانونية. عندما نُجري تغييرات مهمة، سنُخطر المستخدمين عبر البريد الإلكتروني أو إشعار داخل التطبيق.",
  },
  contactQuestions: {
    en: "Questions about these Terms?",
    ar: "أسئلة حول هذه الشروط؟",
  },
  contactBody: {
    en: "Our team answers directly — no legal department, no scripted responses.",
    ar: "فريقنا يجيب مباشرة — بلا قسم قانوني، بلا ردود مكتوبة مسبقًا.",
  },
};

export default function TermsOfService() {
  const t = useTranslations("Legal.terms");
  const tShared = useTranslations("Legal.shared");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const tx = (key: keyof typeof P) => (isArabic ? (P[key] as any).ar : (P[key] as any).en);
  const lastUpdated = isArabic ? "يناير 2026" : "January 2026";
  const version = "1.0";

  const sections = [
    { id: "acceptance", title: t("sections.acceptance"), icon: CheckCircle2, shortTitle: t("sections.acceptance") },
    { id: "service", title: t("sections.service"), icon: Server, shortTitle: t("sections.service") },
    { id: "accounts", title: t("sections.accounts"), icon: Users, shortTitle: t("sections.accounts") },
    { id: "acceptable-use", title: t("sections.acceptableUse"), icon: Shield, shortTitle: t("sections.acceptableUse") },
    { id: "payment", title: t("sections.payment"), icon: CreditCard, shortTitle: t("sections.payment") },
    { id: "intellectual", title: t("sections.intellectual"), icon: FileText, shortTitle: t("sections.intellectual") },
    { id: "termination", title: t("sections.termination"), icon: XCircle, shortTitle: t("sections.termination") },
    { id: "liability", title: t("sections.liability"), icon: Scale, shortTitle: t("sections.liability") },
    { id: "disputes", title: t("sections.disputes"), icon: MessageSquare, shortTitle: t("sections.disputes") },
    { id: "changes", title: t("sections.changes"), icon: History, shortTitle: t("sections.changes") },
  ];

  const [activeSection, setActiveSection] = useState<string | null>("acceptance");
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
          const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* HERO */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-4xl mx-auto">
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Scale className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-4 lg:mb-6 text-center"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-xs lg:text-sm text-muted-foreground mb-6 lg:mb-8"
            >
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <span className="w-3 h-3 lg:w-3.5 lg:h-3.5">v</span>
                {version}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {lastUpdated}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {t("hero.current")}
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
                    {t("hero.readableLegal")}
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                    {t("hero.readableBody")}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <section className="pb-12 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
            {/* SIDEBAR */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <div className="mb-4">
                  <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">
                    {tShared("sections")}
                  </h3>
                </div>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => toggleSection(section.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-start truncate flex-1">{section.title}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />}
                    </button>
                  );
                })}

                <div className="mt-6 p-3 rounded-lg bg-muted/50 border border-border">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                    {tShared("info")}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{tShared("readTime")}</span>
                      <span className="font-medium text-foreground">
                        {isArabic ? "~7 دقائق" : "~7 min"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{tShared("sections")}</span>
                      <span className="font-medium text-foreground">{sections.length}</span>
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
                title={`1. ${t("sections.acceptance")}`}
                icon={CheckCircle2}
                tldr={tx("acceptanceTldr")}
                isActive={activeSection === "acceptance"}
                onToggle={() => toggleSection("acceptance")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>{tx("acceptanceBody")}</p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border">
                    <h4 className="font-semibold text-foreground text-sm mb-1.5">{tx("ageRequirement")}</h4>
                    <p className="text-sm">{tx("ageBody")}</p>
                  </div>
                </div>
              </ClauseCard>

              {/* 2. SERVICE */}
              <ClauseCard
                id="service"
                title={`2. ${t("sections.service")}`}
                icon={Server}
                tldr={tx("serviceTldr")}
                isActive={activeSection === "service"}
                onToggle={() => toggleSection("service")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 lg:space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>{tx("serviceBody")}</p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        {tx("whatWeProvide")}
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        {(isArabic ? P.provideList.ar : P.provideList.en).map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <h4 className="font-semibold text-destructive text-sm mb-2 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4" />
                        {tx("whatWeDontProvide")}
                      </h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        {(isArabic ? P.dontProvideList.ar : P.dontProvideList.en).map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* 3. ACCOUNTS */}
              <ClauseCard
                id="accounts"
                title={`3. ${t("sections.accounts")}`}
                icon={Users}
                tldr={tx("accountsTldr")}
                isActive={activeSection === "accounts"}
                onToggle={() => toggleSection("accounts")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <Lock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{tx("securityLabel")}</h4>
                      <p className="text-xs lg:text-sm">{tx("securityBody")}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 p-3 rounded-lg bg-muted/50">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{tx("breachLabel")}</h4>
                      <p className="text-xs lg:text-sm">{tx("breachBody")}</p>
                    </div>
                  </div>
                </div>
              </ClauseCard>

              {/* 4. ACCEPTABLE USE */}
              <ClauseCard
                id="acceptable-use"
                title={`4. ${t("sections.acceptableUse")}`}
                icon={Shield}
                tldr={tx("acceptableTldr")}
                isActive={activeSection === "acceptable-use"}
                onToggle={() => toggleSection("acceptable-use")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <SeverityBadge level="critical" title={tx("prohibited")} items={isArabic ? P.prohibitedItems.ar : P.prohibitedItems.en} />
                  <SeverityBadge level="warning" title={tx("restricted")} items={isArabic ? P.restrictedItems.ar : P.restrictedItems.en} />
                  <p className="text-xs lg:text-sm">{tx("acceptableFooter")}</p>
                </div>
              </ClauseCard>

              {/* 5. PAYMENT */}
              <ClauseCard
                id="payment"
                title={`5. ${t("sections.payment")}`}
                icon={CreditCard}
                tldr={tx("paymentTldr")}
                isActive={activeSection === "payment"}
                onToggle={() => toggleSection("payment")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <p className="text-xs lg:text-sm">{tx("paymentBody")}</p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border text-xs lg:text-sm">
                    <ul className="space-y-1.5">
                      {(isArabic ? P.paymentList.ar : P.paymentList.en).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ClauseCard>

              {/* 6. INTELLECTUAL PROPERTY */}
              <ClauseCard
                id="intellectual"
                title={`6. ${t("sections.intellectual")}`}
                icon={FileText}
                tldr={tx("intellectualTldr")}
                isActive={activeSection === "intellectual"}
                onToggle={() => toggleSection("intellectual")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                      <h4 className="font-semibold text-primary text-sm mb-2">{tx("weOwn")}</h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        {(isArabic ? P.weOwnList.ar : P.weOwnList.en).map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/20">
                      <h4 className="font-semibold text-green-600 dark:text-green-400 text-sm mb-2">{tx("youOwn")}</h4>
                      <ul className="text-xs lg:text-sm space-y-1">
                        {(isArabic ? P.youOwnList.ar : P.youOwnList.en).map((item, i) => (
                          <li key={i}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <p className="text-xs lg:text-sm">{tx("intellectualFooter")}</p>
                </div>
              </ClauseCard>

              {/* 7. TERMINATION */}
              <ClauseCard
                id="termination"
                title={`7. ${t("sections.termination")}`}
                icon={XCircle}
                tldr={tx("terminationTldr")}
                isActive={activeSection === "termination"}
                onToggle={() => toggleSection("termination")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                  <p className="text-xs lg:text-sm">{tx("terminationBody")}</p>
                  <div className="p-3 lg:p-4 rounded-lg bg-muted/50 border border-border text-xs lg:text-sm">
                    <p>{tx("terminationFooter")}</p>
                  </div>
                </div>
              </ClauseCard>

              {/* 8. LIABILITY */}
              <ClauseCard
                id="liability"
                title={`8. ${t("sections.liability")}`}
                icon={Scale}
                tldr={tx("liabilityTldr")}
                isActive={activeSection === "liability"}
                onToggle={() => toggleSection("liability")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="p-3 lg:p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 text-sm lg:text-base text-muted-foreground">
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-500 text-sm mb-2">{tx("liabilityCap")}</h4>
                  <p className="text-xs lg:text-sm">{tx("liabilityBody")}</p>
                </div>
              </ClauseCard>

              {/* 9. DISPUTES */}
              <ClauseCard
                id="disputes"
                title={`9. ${t("sections.disputes")}`}
                icon={MessageSquare}
                tldr={tx("disputesTldr")}
                isActive={activeSection === "disputes"}
                onToggle={() => toggleSection("disputes")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="flex flex-col gap-2 text-sm lg:text-base text-muted-foreground">
                  {[tx("disputeStep1"), tx("disputeStep2"), tx("disputeStep3")].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                      <span className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </ClauseCard>

              {/* 10. CHANGES */}
              <ClauseCard
                id="changes"
                title={`10. ${t("sections.changes")}`}
                icon={History}
                tldr={tx("changesTldr")}
                isActive={activeSection === "changes"}
                onToggle={() => toggleSection("changes")}
                isMobile={isMobile}
                tldrLabel={tShared("tldr")}
              >
                <div className="text-sm lg:text-base text-muted-foreground">
                  <p className="mb-3">{tx("changesBody")}</p>
                  <div className="flex items-center gap-2 text-xs lg:text-sm p-2 rounded-lg bg-muted/50">
                    <History className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      {isArabic ? "الحالي" : "Current"}: v{version} — {lastUpdated}
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
                      {tx("contactQuestions")}
                    </h3>
                    <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
                      {tx("contactBody")}
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

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isMobile && (
          <>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => setIsNavOpen(true)}
              aria-label={tShared("openNav")}
              className="fixed bottom-6 end-4 z-40 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center lg:hidden"
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
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed bottom-0 inset-x-0 bg-card border-t border-border rounded-t-2xl z-50 max-h-[70vh] overflow-hidden lg:hidden"
                  >
                    <div className="p-4 border-b border-border flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{tShared("jumpToSection")}</h3>
                      <button
                        onClick={() => setIsNavOpen(false)}
                        aria-label={tShared("closeNav")}
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
                            <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                            <span className="text-start flex-1">{section.shortTitle}</span>
                            {isActive && <ChevronRight className="w-4 h-4 ms-auto rtl:rotate-180" />}
                          </button>
                        );
                      })}
                    </div>
                    <div className="p-4 border-t border-border bg-muted/30">
                      <button
                        onClick={() => {
                          window.scrollTo({ top: 0, behavior: "smooth" });
                          setIsNavOpen(false);
                        }}
                        className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-muted-foreground"
                      >
                        <ArrowUp className="w-4 h-4" />
                        {tShared("backToTop")}
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

function ClauseCard({
  id, title, icon: Icon, tldr, children, isActive, onToggle, isMobile, tldrLabel,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  tldr: string;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
  isMobile: boolean;
  tldrLabel: string;
}) {
  return (
    <div
      id={id}
      className={`bg-card border rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-300 ${
        isActive ? "border-primary/30 shadow-lg shadow-primary/5" : "border-border hover:border-primary/20"
      }`}
    >
      <button onClick={onToggle} className="w-full flex items-start gap-3 lg:gap-4 p-4 lg:p-6 text-start">
        <div
          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border ${
            isActive ? "bg-primary/10 border-primary/20" : "bg-muted border-border"
          }`}
        >
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-base lg:text-xl font-bold text-foreground mb-1.5 lg:mb-2 pe-8 relative text-start">
            {title}
            <span className="absolute end-0 top-1/2 -translate-y-1/2">
              {isActive ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground rtl:rotate-180" />
              )}
            </span>
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[10px] lg:text-xs font-bold">
              {tldrLabel}
            </span>
            <p className="text-xs lg:text-sm text-muted-foreground line-clamp-2">{tldr}</p>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
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

function SeverityBadge({ level, title, items }: { level: "critical" | "warning"; title: string; items: string[] }) {
  const colors = {
    critical: "bg-destructive/5 border-destructive/20 text-destructive",
    warning: "bg-yellow-500/5 border-yellow-500/20 text-yellow-600 dark:text-yellow-500",
  };
  return (
    <div className={`p-3 lg:p-4 rounded-lg border ${colors[level]}`}>
      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
        <AlertTriangle className="w-4 h-4" />
        {title}
      </h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item, idx) => (
          <span key={idx} className="text-xs px-2 py-1 rounded-full bg-background/50 border border-current/20">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}