"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cookie,
  Shield,
  Clock,
  Settings,
  Trash2,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowUp,
  Lock,
  Globe,
  Server,
  BarChart3,
  Megaphone,
  Info,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

/* Prose content (EN / AR) */
const PROSE = {
  session: { en: "Session", ar: "الجلسة" },
  sessionDesc: { en: "Deleted when you close browser", ar: "تُحذف عند إغلاق المتصفح" },
  persistent: { en: "Persistent", ar: "دائمة" },
  persistentDesc: { en: "Stay for days / months / years", ar: "تبقى لأيام أو أشهر أو سنوات" },
  firstParty: { en: "First-Party", ar: "طرف أول" },
  firstPartyDesc: { en: "Set by us only", ar: "من إعدادنا فقط" },
  purposeAuth: { en: "Authentication", ar: "المصادقة" },
  purposeSecurity: { en: "Security", ar: "الأمان" },
  purposePrefs: { en: "Store preferences", ar: "حفظ التفضيلات" },
  durationSession: { en: "Session", ar: "الجلسة" },
  duration1Year: { en: "1 year", ar: "سنة واحدة" },
  purposeJourney: { en: "User journey", ar: "رحلة المستخدم" },
  duration2Years: { en: "2 years", ar: "سنتان" },
  purposeTheme: { en: "Dark/light mode", ar: "الوضع الداكن/الفاتح" },
  purposeLang: { en: "Language selection", ar: "اختيار اللغة" },
  noMarketing: { en: "We don't use marketing cookies", ar: "لا نستخدم كوكيز تسويقية" },
  na: { en: "N/A", ar: "غير منطبق" },
  thirdPartyIntro: {
    en: "We use a small number of trusted third-party services that may set cookies:",
    ar: "نستخدم عددًا محدودًا من خدمات الأطراف الثالثة الموثوقة التي قد تضع كوكيز:",
  },
  vercelPurpose: { en: "Hosting & Analytics", ar: "الاستضافة والتحليلات" },
  vercelCookies: { en: "None (server-side only)", ar: "لا شيء (من جهة الخادم فقط)" },
  gaPurpose: { en: "Aggregated analytics", ar: "تحليلات مجمّعة" },
  gaCookies: { en: "_ga, _ga_* (anonymized)", ar: "_ga و _ga_* (مجهولة الهوية)" },
  manageIntro: {
    en: "You can change your cookie preferences at any time:",
    ar: "يمكنك تغيير تفضيلات الكوكيز في أي وقت:",
  },
};

function useCookieSections() {
  const t = useTranslations("Legal.cookies");
  return [
    { id: "overview", title: t("overview.title"), icon: Info, shortTitle: t("overview.title") },
    { id: "essential", title: t("categories.essential.title"), icon: Lock, shortTitle: t("categories.essential.title") },
    { id: "analytics", title: t("categories.analytics.title"), icon: BarChart3, shortTitle: t("categories.analytics.title") },
    { id: "marketing", title: t("categories.marketing.title"), icon: Megaphone, shortTitle: t("categories.marketing.title") },
    { id: "preferences", title: t("categories.preferences.title"), icon: Settings, shortTitle: t("categories.preferences.title") },
    { id: "third-party", title: t("thirdPartyTitle"), icon: Globe, shortTitle: t("thirdPartyTitle") },
    { id: "manage", title: t("manageTitle"), icon: Shield, shortTitle: t("manageTitle") },
  ];
}

export default function CookiePolicy() {
  const t = useTranslations("Legal.cookies");
  const tShared = useTranslations("Legal.shared");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const tx = (key: keyof typeof PROSE) => (isArabic ? PROSE[key].ar : PROSE[key].en);
  const sections = useCookieSections();

  const [activeSection, setActiveSection] = useState<string | null>("overview");
  const [consents, setConsents] = useState({
    essential: true,
    analytics: false,
    marketing: false,
    preferences: true,
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);

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

  const toggleConsent = (type: keyof typeof consents) => {
    if (type === "essential") return;
    setConsents((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const savePreferences = () => {
    setShowSaveConfirmation(true);
    setTimeout(() => setShowSaveConfirmation(false), 3000);
  };

  const acceptAll = () => {
    setConsents({ essential: true, analytics: true, marketing: true, preferences: true });
    savePreferences();
  };

  const rejectAll = () => {
    setConsents({ essential: true, analytics: false, marketing: false, preferences: false });
    savePreferences();
  };

  const cookieCategories = [
    {
      id: "essential",
      title: t("categories.essential.title"),
      icon: Lock,
      color: "green",
      required: true,
      description: t("categories.essential.description"),
      cookies: [
        { name: "session_id", purpose: tx("purposeAuth"), duration: tx("durationSession") },
        { name: "csrf_token", purpose: tx("purposeSecurity"), duration: tx("durationSession") },
        { name: "cookie_consent", purpose: tx("purposePrefs"), duration: tx("duration1Year") },
      ],
    },
    {
      id: "analytics",
      title: t("categories.analytics.title"),
      icon: BarChart3,
      color: "blue",
      required: false,
      description: t("categories.analytics.description"),
      cookies: [
        {
          name: "_ga",
          purpose: tx("purposeJourney"),
          duration: tx("duration2Years"),
          provider: "Google",
        },
      ],
    },
    {
      id: "marketing",
      title: t("categories.marketing.title"),
      icon: Megaphone,
      color: "purple",
      required: false,
      description: t("categories.marketing.description"),
      cookies: [
        { name: "—", purpose: tx("noMarketing"), duration: "—", provider: "—" },
      ],
    },
    {
      id: "preferences",
      title: t("categories.preferences.title"),
      icon: Settings,
      color: "orange",
      required: false,
      description: t("categories.preferences.description"),
      cookies: [
        { name: "theme_mode", purpose: tx("purposeTheme"), duration: tx("duration1Year") },
        { name: "NEXT_LOCALE", purpose: tx("purposeLang"), duration: tx("duration1Year") },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* HERO */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-3 mb-4 lg:mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Cookie className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
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
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-green-500/10 text-green-600 border border-green-500/20">
                <CheckCircle2 className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {t("hero.noWalls")}
              </span>
              <span className="flex items-center gap-1.5 lg:gap-2 px-2 lg:px-3 py-1 rounded-full bg-muted border border-border">
                <Clock className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                {t("hero.updatedLabel")} {t("hero.updatedDate")}
              </span>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="bg-card border border-border rounded-xl lg:rounded-2xl p-4 lg:p-8"
            >
              <div className="flex items-start gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4 lg:w-5 lg:h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm lg:text-base mb-1 lg:mb-2">
                    {t("hero.transparencyTitle")}
                  </h3>
                  <p className="text-muted-foreground text-xs lg:text-sm leading-relaxed">
                    {t("hero.transparencyBody")}
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
            {/* DESKTOP SIDEBAR */}
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
                    {t("yourConsent")}
                  </div>
                  <div className="space-y-1.5 text-xs">
                    {Object.entries(consents).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <span className="text-muted-foreground capitalize">{key}</span>
                        <span className={value ? "text-green-500" : "text-destructive"}>
                          {value ? t("on") : t("off")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="lg:col-span-9 space-y-3 lg:space-y-4">
              {/* OVERVIEW */}
              <motion.div
                id="overview"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <ClauseCard
                  id="overview"
                  title={t("overview.title")}
                  icon={Info}
                  isActive={activeSection === "overview"}
                  onToggle={() => toggleSection("overview")}
                  isMobile={isMobile}
                >
                  <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                    <p>{t("overview.body")}</p>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm">{tx("session")}</div>
                        <div className="text-xs text-muted-foreground">{tx("sessionDesc")}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm">{tx("persistent")}</div>
                        <div className="text-xs text-muted-foreground">{tx("persistentDesc")}</div>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50 text-center">
                        <Server className="w-5 h-5 text-primary mx-auto mb-2" />
                        <div className="font-medium text-foreground text-sm">{tx("firstParty")}</div>
                        <div className="text-xs text-muted-foreground">{tx("firstPartyDesc")}</div>
                      </div>
                    </div>
                  </div>
                </ClauseCard>
              </motion.div>

              {/* CATEGORIES */}
              {cookieCategories.map((category) => (
                <motion.div
                  key={category.id}
                  id={category.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="scroll-mt-24"
                >
                  <ClauseCard
                    id={category.id}
                    title={category.title}
                    icon={category.icon}
                    isActive={activeSection === category.id}
                    onToggle={() => toggleSection(category.id)}
                    isMobile={isMobile}
                    badge={category.required ? t("table.required") : t("table.optional")}
                    badgeColor={
                      category.required
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    <div className="space-y-4 text-sm lg:text-base text-muted-foreground">
                      <p>{category.description}</p>

                      <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
                        <table className="w-full text-xs lg:text-sm">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-start py-2 text-foreground font-medium">{t("table.cookieName")}</th>
                              <th className="text-start py-2 text-foreground font-medium">{t("table.purpose")}</th>
                              <th className="text-start py-2 text-foreground font-medium">{t("table.duration")}</th>
                              {category.cookies[0] && "provider" in category.cookies[0] && (
                                <th className="text-start py-2 text-foreground font-medium">{t("table.provider")}</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {category.cookies.map((cookie, idx) => (
                              <tr key={idx} className="border-b border-border/50">
                                <td className="py-2 font-mono text-xs">{cookie.name}</td>
                                <td className="py-2">{cookie.purpose}</td>
                                <td className="py-2">{cookie.duration}</td>
                                {"provider" in cookie && <td className="py-2">{cookie.provider}</td>}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {!category.required && (
                        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                          <span className="text-sm font-medium text-foreground">
                            {t("table.enableCategory", { category: category.title })}
                          </span>
                          <ToggleSwitch
                            enabled={consents[category.id as keyof typeof consents]}
                            onToggle={() => toggleConsent(category.id as keyof typeof consents)}
                          />
                        </div>
                      )}
                    </div>
                  </ClauseCard>
                </motion.div>
              ))}

              {/* THIRD PARTY */}
              <motion.div
                id="third-party"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <ClauseCard
                  id="third-party"
                  title={t("thirdPartyTitle")}
                  icon={Globe}
                  isActive={activeSection === "third-party"}
                  onToggle={() => toggleSection("third-party")}
                  isMobile={isMobile}
                >
                  <div className="space-y-3 text-sm lg:text-base text-muted-foreground">
                    <p>{tx("thirdPartyIntro")}</p>
                    <div className="space-y-2">
                      {[
                        { name: "Vercel", purpose: tx("vercelPurpose"), cookies: tx("vercelCookies") },
                        { name: "Google Analytics", purpose: tx("gaPurpose"), cookies: tx("gaCookies") },
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <Server className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <div className="flex-1">
                            <span className="font-medium text-foreground">{service.name}</span>
                            <p className="text-xs text-muted-foreground">{service.purpose}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {t("table.cookieName")}: {service.cookies}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </ClauseCard>
              </motion.div>

              {/* MANAGE */}
              <motion.div
                id="manage"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="scroll-mt-24"
              >
                <ClauseCard
                  id="manage"
                  title={t("manageTitle")}
                  icon={Shield}
                  isActive={activeSection === "manage"}
                  onToggle={() => toggleSection("manage")}
                  isMobile={isMobile}
                >
                  <div className="space-y-4 text-sm lg:text-base text-muted-foreground">
                    <p>{tx("manageIntro")}</p>

                    <div className="space-y-3 bg-muted/30 rounded-xl p-4">
                      {cookieCategories.map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                              <category.icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="font-medium text-foreground text-sm">{category.title}</div>
                              <div className="text-xs text-muted-foreground">
                                {category.required ? t("table.alwaysActive") : t("table.yourChoice")}
                              </div>
                            </div>
                          </div>
                          {category.required ? (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                              {t("table.required")}
                            </span>
                          ) : (
                            <ToggleSwitch
                              enabled={consents[category.id as keyof typeof consents]}
                              onToggle={() => toggleConsent(category.id as keyof typeof consents)}
                            />
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={savePreferences}
                        className="flex-1 px-4 py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-primary/25 transition-all"
                      >
                        {t("savePreferences")}
                      </button>
                      <button
                        onClick={acceptAll}
                        className="flex-1 px-4 py-2.5 bg-green-500/10 text-green-600 border border-green-500/20 text-sm font-medium rounded-lg hover:bg-green-500/20 transition-all"
                      >
                        {t("acceptAll")}
                      </button>
                      <button
                        onClick={rejectAll}
                        className="flex-1 px-4 py-2.5 bg-muted text-muted-foreground border border-border text-sm font-medium rounded-lg hover:bg-muted/80 transition-all"
                      >
                        {t("rejectOptional")}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showSaveConfirmation && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm text-center"
                        >
                          <CheckCircle2 className="w-4 h-4 inline me-2" />
                          {t("preferencesSaved")}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="pt-4 border-t border-border">
                      <button className="flex items-center gap-2 text-destructive text-sm hover:underline">
                        <Trash2 className="w-4 h-4" />
                        {t("clearAll")}
                      </button>
                    </div>
                  </div>
                </ClauseCard>
              </motion.div>

              {/* CONTACT */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 lg:mt-12"
              >
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl lg:rounded-2xl p-6 lg:p-12">
                  <div className="max-w-2xl mx-auto text-center">
                    <h3 className="text-lg lg:text-2xl font-bold text-foreground mb-3 lg:mb-4">
                      {t("contactTitle")}
                    </h3>
                    <p className="text-muted-foreground text-sm lg:text-base mb-6 lg:mb-8">
                      {t("contactBody")}
                    </p>
                    <a
                      href="mailto:hello@codearntech.com"
                      className="inline-flex items-center gap-2 px-5 py-2.5 lg:px-6 lg:py-3 bg-primary text-primary-foreground text-sm lg:text-base font-semibold rounded-lg lg:rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
                    >
                      {t("contactButton")}
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
                      <h3 className="font-semibold text-foreground">{t("mobileSections")}</h3>
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
  id,
  title,
  icon: Icon,
  children,
  isActive,
  onToggle,
  isMobile,
  badge,
  badgeColor,
}: {
  id: string;
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  isActive: boolean;
  onToggle: () => void;
  isMobile: boolean;
  badge?: string;
  badgeColor?: string;
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
      <button onClick={onToggle} className="w-full flex items-start gap-3 lg:gap-4 p-4 lg:p-6 text-start">
        <div
          className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isActive ? "bg-primary/10" : "bg-muted"
          }`}
        >
          <Icon className={`w-5 h-5 lg:w-6 lg:h-6 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2 mb-1.5 lg:mb-2">
            <h3 className="text-base lg:text-xl font-bold text-foreground pe-8 relative flex-1 text-start">
              {title}
            </h3>
            {badge && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] lg:text-xs font-medium shrink-0 ${badgeColor}`}>
                {badge}
              </span>
            )}
            <span className="absolute end-0 top-1/2 -translate-y-1/2">
              {isActive ? (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronRight className="w-5 h-5 text-muted-foreground rtl:rotate-180" />
              )}
            </span>
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

function ToggleSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <motion.div
        initial={false}
        animate={{ x: enabled ? 24 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute top-1 start-0 w-4 h-4 bg-white rounded-full shadow-sm"
      />
    </button>
  );
}