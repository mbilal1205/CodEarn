"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  Shield, Lock, Eye, Trash2, Download, Cookie, Users, Clock,
  FileText, CheckCircle2, AlertCircle, ChevronRight, Mail,
  ExternalLink, Fingerprint, Globe,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const P = {
  intro1: {
    en: "At CodEarn, privacy isn't a compliance checkbox — it's a core engineering principle. Trust is earned through transparency, not buried in legal fine print.",
    ar: "في CodEarn، الخصوصية ليست مجرد خانة امتثال — إنها مبدأ هندسي أساسي. الثقة تُكتسب بالشفافية، لا تُدفن في البنود القانونية الدقيقة.",
  },
  intro2: {
    en: "This policy explains, in plain language, what data we collect, why we need it, how we protect it, and — most importantly — your rights over your own information.",
    ar: "تشرح هذه السياسة، بلغة واضحة، ما البيانات التي نجمعها، ولماذا نحتاجها، وكيف نحميها، والأهم من ذلك — حقوقك على معلوماتك الخاصة.",
  },
  intro3: {
    en: "We're a small team building software. We don't have departments devoted to data harvesting. We collect only what's needed to run our services, and nothing more.",
    ar: "نحن فريق صغير يبني برمجيات. ليس لدينا أقسام مخصصة لجمع البيانات. نجمع فقط ما نحتاجه لتشغيل خدماتنا، ولا شيء أكثر.",
  },
  dataMin: { en: "Data Minimization", ar: "تقليل البيانات" },
  dataMinDesc: { en: "We collect only what is essential", ar: "نجمع فقط ما هو ضروري" },
  purposeLimit: { en: "Purpose Limitation", ar: "تحديد الغرض" },
  purposeLimitDesc: { en: "Used only for stated purposes", ar: "تُستخدم فقط للأغراض المعلنة" },
  userControl: { en: "User Control", ar: "تحكم المستخدم" },
  userControlDesc: { en: "You can request access or deletion", ar: "يمكنك طلب الوصول أو الحذف" },
  collectIntro: {
    en: "We collect personal data only when you explicitly provide it through:",
    ar: "نجمع البيانات الشخصية فقط عندما تقدّمها صراحةً عبر:",
  },
  collectList: {
    en: ["Contact forms", "Newsletter subscriptions", "Product demo requests", "Support inquiries"],
    ar: ["نماذج التواصل", "اشتراكات النشرة البريدية", "طلبات عرض المنتج", "استفسارات الدعم"],
  },
  collectWhat: {
    en: "What this includes:",
    ar: "ما يشمله ذلك:",
  },
  collectWhatBody: {
    en: "Your name, email address, and any message content you choose to share. Company name is optional.",
    ar: "اسمك، وبريدك الإلكتروني، وأي محتوى رسالة تختار مشاركته. اسم الشركة اختياري.",
  },
  techIntro: {
    en: "Automatically collected, aggregated technical data:",
    ar: "بيانات تقنية تُجمَع تلقائيًا وبشكل مجمّع:",
  },
  techList: {
    en: [
      "Device type & operating system",
      "Browser version",
      "Pages visited (aggregated)",
      "Approximate session duration",
      "Performance metrics",
      "Anonymized error logs",
    ],
    ar: [
      "نوع الجهاز ونظام التشغيل",
      "إصدار المتصفح",
      "الصفحات التي تمت زيارتها (مجمّعة)",
      "مدة الجلسة التقريبية",
      "مقاييس الأداء",
      "سجلات أخطاء مجهولة الهوية",
    ],
  },
  techNote: {
    en: "This data is aggregated and not used to identify individual visitors.",
    ar: "هذه البيانات مجمّعة ولا تُستخدم لتحديد هوية الزوار الأفراد.",
  },
  usageIntro: {
    en: "Your data serves specific, legitimate purposes — never marketing spam, never hidden profiling.",
    ar: "بياناتك تخدم أغراضًا محددة ومشروعة — لا رسائل تسويقية مزعجة، ولا تنميط خفي.",
  },
  usageItems: {
    en: [
      { title: "Product Improvement", desc: "Enhancing features based on how people use them" },
      { title: "User Experience", desc: "Making the interface clearer and faster" },
      { title: "Security Alerts", desc: "Notifying you of critical account activity" },
      { title: "Fraud Prevention", desc: "Detecting unauthorized access attempts" },
      { title: "Legal Compliance", desc: "Meeting applicable regulatory obligations" },
      { title: "Support", desc: "Responding to your inquiries and requests" },
    ],
    ar: [
      { title: "تحسين المنتج", desc: "تطوير الميزات بناءً على كيفية استخدام الناس لها" },
      { title: "تجربة المستخدم", desc: "جعل الواجهة أوضح وأسرع" },
      { title: "تنبيهات الأمان", desc: "إشعارك بنشاط الحساب الحرج" },
      { title: "مكافحة الاحتيال", desc: "اكتشاف محاولات الوصول غير المصرح بها" },
      { title: "الامتثال القانوني", desc: "تلبية الالتزامات التنظيمية المعمول بها" },
      { title: "الدعم", desc: "الرد على استفساراتك وطلباتك" },
    ],
  },
  weDoNot: {
    en: "Sell your data • Share it with advertisers • Use it for behavioral ad targeting • Send unsolicited marketing emails",
    ar: "نبيع بياناتك • نشاركها مع المعلنين • نستخدمها لاستهداف إعلاني سلوكي • نرسل رسائل تسويقية غير مرغوب فيها",
  },
  cookiesIntro: {
    en: "We use minimal, non-intrusive cookies. No cross-site tracking, no behavioral profiling. You can disable optional cookies in your browser at any time, though some features may behave differently.",
    ar: "نستخدم كوكيز بسيطة غير تدخلية. لا تتبع عبر المواقع، لا تنميط سلوكي. يمكنك تعطيل الكوكيز الاختيارية في متصفحك في أي وقت، على الرغم من أن بعض الميزات قد تتصرف بشكل مختلف.",
  },
  cookieTypes: {
    en: [
      { type: "Essential", desc: "Required for basic site functionality", required: true },
      { type: "Analytics", desc: "Aggregated, anonymous usage stats", required: false },
      { type: "Preferences", desc: "Remember your settings (theme, etc.)", required: false },
    ],
    ar: [
      { type: "أساسية", desc: "مطلوبة لوظائف الموقع الأساسية", required: true },
      { type: "تحليلية", desc: "إحصائيات استخدام مجمّعة ومجهولة", required: false },
      { type: "تفضيلات", desc: "تتذكر إعداداتك (السمة، إلخ)", required: false },
    ],
  },
  sharingCommitment: {
    en: "We do not sell, rent, or trade your personal data. This includes aggregated or anonymized datasets.",
    ar: "لا نبيع بياناتك الشخصية أو نؤجرها أو نتاجر بها. يشمل ذلك مجموعات البيانات المجمّعة أو المجهولة.",
  },
  sharingList: {
    en: [
      { title: "Service Providers", desc: "Trusted infrastructure partners (hosting, email delivery) that process data on our behalf under confidentiality agreements." },
      { title: "Legal Requirements", desc: "Only when we are legally required to do so through a valid court order or regulatory mandate." },
      { title: "Business Transfers", desc: "In case of a merger or acquisition, your data would remain protected under the same privacy commitments." },
    ],
    ar: [
      { title: "مزودو الخدمة", desc: "شركاء بنية تحتية موثوقون (استضافة، تسليم بريد إلكتروني) يعالجون البيانات نيابة عنا بموجب اتفاقيات سرية." },
      { title: "المتطلبات القانونية", desc: "فقط عندما يُطلب منا ذلك قانونيًا عبر أمر محكمة صالح أو تفويض تنظيمي." },
      { title: "تحويلات الأعمال", desc: "في حالة الاندماج أو الاستحواذ، تبقى بياناتك محمية بنفس التزامات الخصوصية." },
    ],
  },
  securityItems: {
    en: [
      { label: "Encryption in Transit", desc: "HTTPS/TLS on all connections" },
      { label: "Access Controls", desc: "Limited to who needs it" },
      { label: "Regular Backups", desc: "Redundancy for data safety" },
    ],
    ar: [
      { label: "تشفير أثناء النقل", desc: "HTTPS/TLS على جميع الاتصالات" },
      { label: "ضوابط الوصول", desc: "محدودة بمن يحتاجها" },
      { label: "نسخ احتياطية منتظمة", desc: "تكرار لسلامة البيانات" },
    ],
  },
  securityHonest: {
    en: "We use industry-standard protections including HTTPS encryption for all data in transit, controlled access to production systems, and regular backups. That said, no internet system is 100% secure. If we ever experience a breach affecting your data, we will notify affected users promptly and clearly.",
    ar: "نستخدم حماية معيارية في الصناعة بما في ذلك تشفير HTTPS لجميع البيانات أثناء النقل، والوصول المُتحكَّم به إلى أنظمة الإنتاج، والنسخ الاحتياطية المنتظمة. ومع ذلك، لا يوجد نظام إنترنت آمن بنسبة 100%. إذا تعرضنا لاختراق يؤثر على بياناتك، سنُخطر المستخدمين المتأثرين بسرعة ووضوح.",
  },
  rightsIntro: {
    en: "To exercise any of these rights, email us at hello@codearntech.com. We'll respond within one business day.",
    ar: "لممارسة أي من هذه الحقوق، راسلنا على hello@codearntech.com. سنرد خلال يوم عمل واحد.",
  },
  rights: {
    en: [
      { title: "Right to Access", desc: "Request a copy of the data we hold about you" },
      { title: "Right to Correction", desc: "Fix inaccurate or outdated information" },
      { title: "Right to Deletion", desc: "Request your data be permanently removed" },
      { title: "Right to Portability", desc: "Receive your data in a standard format" },
    ],
    ar: [
      { title: "حق الوصول", desc: "طلب نسخة من البيانات التي نحتفظ بها عنك" },
      { title: "حق التصحيح", desc: "تصحيح المعلومات غير الدقيقة أو القديمة" },
      { title: "حق الحذف", desc: "طلب إزالة بياناتك نهائيًا" },
      { title: "حق النقل", desc: "استلام بياناتك بتنسيق معياري" },
    ],
  },
  thirdPartyIntro: {
    en: "CodEarn uses a small number of trusted third-party services to operate. Each has its own privacy policy:",
    ar: "تستخدم CodEarn عددًا صغيرًا من خدمات الأطراف الثالثة الموثوقة لتشغيلها. لكل منها سياسة خصوصية خاصة:",
  },
  childrenRestriction: {
    en: "Our services are not intended for users under 13 years of age. We do not knowingly collect personal information from children.",
    ar: "خدماتنا غير موجهة للمستخدمين تحت 13 عامًا. لا نجمع معلومات شخصية من الأطفال عن علم.",
  },
  childrenContact: {
    en: "If you believe we have inadvertently collected data from a child under 13, please contact us at hello@codearntech.com and we will delete the information promptly.",
    ar: "إذا كنت تعتقد أننا جمعنا بيانات عن غير قصد من طفل تحت 13 عامًا، فيرجى الاتصال بنا على hello@codearntech.com وسنحذف المعلومات على الفور.",
  },
  updatesIntro: {
    en: "We may update this policy as our products evolve or legal requirements change. Significant changes will be communicated through:",
    ar: "قد نحدّث هذه السياسة مع تطوّر منتجاتنا أو تغيّر المتطلبات القانونية. سيتم الإبلاغ عن التغييرات المهمة من خلال:",
  },
  updatesMethods: {
    en: ["Email notification", "Website banner", "Changelog entry"],
    ar: ["إشعار بالبريد الإلكتروني", "لافتة على الموقع", "سجل التغييرات"],
  },
  currentVersion: {
    en: "Current Version: 1.0 — Effective January 2026. This is the initial version of this policy.",
    ar: "الإصدار الحالي: 1.0 — ساري المفعول يناير 2026. هذا هو الإصدار الأولي لهذه السياسة.",
  },
  contactQuestions: {
    en: "Questions about your privacy?",
    ar: "أسئلة حول خصوصيتك؟",
  },
  contactBody: {
    en: "Our team handles privacy inquiries directly. No bots, no scripted responses — just the people building CodEarn.",
    ar: "يتعامل فريقنا مع استفسارات الخصوصية مباشرة. لا روبوتات، لا ردود مكتوبة مسبقًا — فقط الأشخاص الذين يبنون CodEarn.",
  },
  responseTime: {
    en: "Response time: usually within one business day",
    ar: "وقت الاستجابة: عادةً خلال يوم عمل واحد",
  },
  companyLine: {
    en: "CodEarn Tech · Remote-first · Serving UAE, Saudi Arabia & Bahrain",
    ar: "CodEarn Tech · نعمل عن بُعد · نخدم الإمارات والسعودية والبحرين",
  },
};

export default function PrivacyPolicy() {
  const t = useTranslations("Legal.privacy");
  const tShared = useTranslations("Legal.shared");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const tx = (key: keyof typeof P) => (isArabic ? (P[key] as any).ar : (P[key] as any).en);
  const lastUpdated = isArabic ? "يناير 2026" : "January 2026";

  const sections = [
    { id: "introduction", title: t("sections.introduction"), icon: FileText },
    { id: "collection", title: t("sections.collection"), icon: Fingerprint },
    { id: "usage", title: t("sections.usage"), icon: Eye },
    { id: "cookies", title: t("sections.cookies"), icon: Cookie },
    { id: "sharing", title: t("sections.sharing"), icon: Users },
    { id: "security", title: t("sections.security"), icon: Lock },
    { id: "rights", title: t("sections.rights"), icon: Shield },
    { id: "third-party", title: t("sections.thirdParty"), icon: Globe },
    { id: "children", title: t("sections.children"), icon: Users },
    { id: "updates", title: t("sections.updates"), icon: Clock },
    { id: "contact", title: t("sections.contact"), icon: Mail },
  ];

  const [activeSection, setActiveSection] = useState("introduction");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HERO */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
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
              <span className="text-sm font-medium text-primary">{t("hero.badge")}</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground mb-6"
            >
              {t("hero.title")}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg lg:text-xl text-muted-foreground mb-8 leading-relaxed"
            >
              {t("hero.intro")}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground"
            >
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t("hero.updatedLabel")}: {lastUpdated}
              </span>
              <span className="hidden sm:inline text-border">|</span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                {t("hero.version")}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* MAIN */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* SIDEBAR */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-1">
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                    {t("sidebar.onThisPage")}
                  </h3>
                </div>
                {sections.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-start flex-1">{section.title}</span>
                      {isActive && <ChevronRight className="w-4 h-4 ms-auto rtl:rotate-180" />}
                    </button>
                  );
                })}

                <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Lock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground text-sm">{t("sidebar.zeroSales")}</div>
                      <div className="text-xs text-muted-foreground">{t("sidebar.zeroSalesSub")}</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t("sidebar.zeroSalesBody")}</p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-9">
              <div className="prose prose-lg max-w-none">
                {/* 1. INTRODUCTION */}
                <motion.div
                  id="introduction"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={FileText} title={t("sections.introduction")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8 mb-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">{tx("intro1")}</p>
                    <p className="text-muted-foreground leading-relaxed mb-4">{tx("intro2")}</p>
                    <p className="text-muted-foreground leading-relaxed">{tx("intro3")}</p>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { label: tx("dataMin"), desc: tx("dataMinDesc") },
                      { label: tx("purposeLimit"), desc: tx("purposeLimitDesc") },
                      { label: tx("userControl"), desc: tx("userControlDesc") },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="font-semibold text-foreground text-sm mb-1">{item.label}</div>
                        <div className="text-xs text-muted-foreground">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* 2. WHAT WE COLLECT */}
                <motion.div
                  id="collection"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Fingerprint} title={t("sections.collection")} />
                  <div className="space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">1</span>
                        {isArabic ? "معلومات تقدّمها" : "Information You Provide"}
                      </h3>
                      <p className="text-muted-foreground mb-4">{tx("collectIntro")}</p>
                      <ul className="space-y-3 mb-6">
                        {(isArabic ? P.collectList.ar : P.collectList.en).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-4 rounded-xl bg-muted/50 border border-border">
                        <p className="text-sm text-muted-foreground">
                          <strong className="text-foreground">{tx("collectWhat")}</strong>{" "}
                          {tx("collectWhatBody")}
                        </p>
                      </div>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                      <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">2</span>
                        {isArabic ? "بيانات تقنية واستخدام" : "Technical & Usage Data"}
                      </h3>
                      <p className="text-muted-foreground mb-4">{tx("techIntro")}</p>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {(isArabic ? P.techList.ar : P.techList.en).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                            {item}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                        <p className="text-sm text-muted-foreground">
                          <AlertCircle className="w-4 h-4 inline me-2 text-primary" />
                          {tx("techNote")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 3. HOW WE USE IT */}
                <motion.div
                  id="usage"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Eye} title={t("sections.usage")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">{tx("usageIntro")}</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {(isArabic ? P.usageItems.ar : P.usageItems.en).map((item: any, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-foreground text-sm mb-1">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                      <p className="text-sm text-destructive font-medium flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {isArabic ? "نحن لا:" : "We do not:"}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">{tx("weDoNot")}</p>
                    </div>
                  </div>
                </motion.div>

                {/* 4. COOKIES */}
                <motion.div
                  id="cookies"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Cookie} title={t("sections.cookies")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      {(isArabic ? P.cookieTypes.ar : P.cookieTypes.en).map((cookie: any, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-foreground text-sm">{cookie.type}</span>
                            {cookie.required ? (
                              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                                {isArabic ? "مطلوبة" : "Required"}
                              </span>
                            ) : (
                              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                {isArabic ? "اختيارية" : "Optional"}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{cookie.desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{tx("cookiesIntro")}</p>
                  </div>
                </motion.div>

                {/* 5. SHARING */}
                <motion.div
                  id="sharing"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Users} title={t("sections.sharing")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="flex items-start gap-4 mb-8 p-4 rounded-xl bg-green-500/5 border border-green-500/20">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                      <p className="text-sm text-muted-foreground">{tx("sharingCommitment")}</p>
                    </div>
                    <h4 className="font-semibold text-foreground mb-4">
                      {isArabic ? "حالات محدودة قد تُشارك فيها البيانات:" : "Limited situations where data may be shared:"}
                    </h4>
                    <ul className="space-y-4">
                      {(isArabic ? P.sharingList.ar : P.sharingList.en).map((item: any, idx) => (
                        <li key={idx} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-primary">{idx + 1}</span>
                          </div>
                          <div>
                            <span className="font-medium text-foreground text-sm">{item.title}: </span>
                            <span className="text-sm text-muted-foreground">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* 6. SECURITY */}
                <motion.div
                  id="security"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Lock} title={t("sections.security")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="grid sm:grid-cols-3 gap-4 mb-8">
                      {(isArabic ? P.securityItems.ar : P.securityItems.en).map((item: any, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-muted/50 border border-border text-center">
                          <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="font-semibold text-foreground text-sm">{item.label}</div>
                          <div className="text-xs text-muted-foreground">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground leading-relaxed">{tx("securityHonest")}</p>
                    </div>
                  </div>
                </motion.div>

                {/* 7. RIGHTS */}
                <motion.div
                  id="rights"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Shield} title={t("sections.rights")} />
                  <div className="grid sm:grid-cols-2 gap-4">
                    {(isArabic ? P.rights.ar : P.rights.en).map((right: any, idx) => (
                      <div key={idx} className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                          <Shield className="w-6 h-6 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground mb-2">{right.title}</h4>
                        <p className="text-sm text-muted-foreground">{right.desc}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
                    <p className="text-sm text-muted-foreground text-center">
                      {isArabic ? P.rightsIntro.ar.split("hello@codearntech.com")[0] : P.rightsIntro.en.split("hello@codearntech.com")[0]}
                      <a href="mailto:hello@codearntech.com" className="text-primary font-medium hover:underline">
                        hello@codearntech.com
                      </a>
                      {isArabic ? P.rightsIntro.ar.split("hello@codearntech.com")[1] : P.rightsIntro.en.split("hello@codearntech.com")[1]}
                    </p>
                  </div>
                </motion.div>

                {/* 8. THIRD PARTY */}
                <motion.div
                  id="third-party"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Globe} title={t("sections.thirdParty")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">{tx("thirdPartyIntro")}</p>
                    <div className="space-y-3">
                      {[
                        { name: "Vercel", purpose: isArabic ? "استضافة الموقع والبنية التحتية" : "Website hosting & infrastructure", link: "https://vercel.com/legal/privacy-policy" },
                        { name: "Google Analytics", purpose: isArabic ? "تحليلات مجهولة ومجمّعة" : "Aggregated, anonymous analytics", link: "https://policies.google.com/privacy" },
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                          <div>
                            <div className="font-medium text-foreground">{service.name}</div>
                            <div className="text-xs text-muted-foreground">{service.purpose}</div>
                          </div>
                          <a
                            href={service.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary flex items-center gap-1 hover:underline"
                          >
                            {isArabic ? "السياسة" : "Policy"}
                            <ExternalLink className="w-3 h-3 rtl:-scale-x-100" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* 9. CHILDREN */}
                <motion.div
                  id="children"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Users} title={t("sections.children")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <div className="flex items-start gap-4 p-4 rounded-xl bg-destructive/5 border border-destructive/10 mb-4">
                      <AlertCircle className="w-6 h-6 text-destructive shrink-0" />
                      <p className="text-sm text-muted-foreground">{tx("childrenRestriction")}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {isArabic ? P.childrenContact.ar.split("hello@codearntech.com")[0] : P.childrenContact.en.split("hello@codearntech.com")[0]}
                      <a href="mailto:hello@codearntech.com" className="text-primary font-medium hover:underline">
                        hello@codearntech.com
                      </a>
                      {isArabic ? P.childrenContact.ar.split("hello@codearntech.com")[1] : P.childrenContact.en.split("hello@codearntech.com")[1]}
                    </p>
                  </div>
                </motion.div>

                {/* 10. UPDATES */}
                <motion.div
                  id="updates"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="mb-16 scroll-mt-24"
                >
                  <SectionHeader icon={Clock} title={t("sections.updates")} />
                  <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                    <p className="text-muted-foreground mb-6">{tx("updatesIntro")}</p>
                    <div className="flex flex-wrap gap-3 mb-6">
                      {(isArabic ? P.updatesMethods.ar : P.updatesMethods.en).map((method, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground border border-border">
                          {method}
                        </span>
                      ))}
                    </div>
                    <div className="p-4 rounded-xl bg-muted/50 border border-border">
                      <p className="text-sm text-muted-foreground">{tx("currentVersion")}</p>
                    </div>
                  </div>
                </motion.div>

                {/* 11. CONTACT */}
                <motion.div
                  id="contact"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="scroll-mt-24"
                >
                  <SectionHeader icon={Mail} title={t("sections.contact")} />
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-8 lg:p-12">
                    <div className="max-w-2xl mx-auto text-center">
                      <h3 className="text-2xl font-bold text-foreground mb-4">{tx("contactQuestions")}</h3>
                      <p className="text-muted-foreground mb-8">{tx("contactBody")}</p>
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a
                          href="mailto:hello@codearntech.com"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                        >
                          <Mail className="w-4 h-4" />
                          hello@codearntech.com
                        </a>
                        <span className="text-sm text-muted-foreground">{tx("responseTime")}</span>
                      </div>
                      <div className="mt-8 pt-8 border-t border-primary/10">
                        <p className="text-sm text-muted-foreground">{tx("companyLine")}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER QUOTE */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-6">
            &ldquo;{t("footer.quote")}&rdquo;
          </blockquote>
          <p className="text-muted-foreground">{t("footer.subline")}</p>
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h2 className="text-3xl font-bold text-foreground">{title}</h2>
    </div>
  );
}