"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Check,
  X,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Calculator,
  Zap,
  Clock,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingCalculator from "./PricingCalculator";

const SAR_MULTIPLIER = 1.02; // 1 AED = ~1.02 SAR
const DISCOUNT = 0.20; // 20% off
const WHATSAPP_NUMBER = "971541757432"; // Aapka WhatsApp Number

type Currency = "AED" | "SAR";

export default function PricingContent() {
  const t = useTranslations("Pricing");
  const [currency, setCurrency] = useState<Currency>("AED");
  const [activeTab, setActiveTab] = useState<"websites" | "custom" | "maintenance">("websites");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isCalcOpen, setIsCalcOpen] = useState(false);

  // --- Helper to format price ---
  const formatPrice = (aedAmount: number, applyDiscount = false) => {
    let finalAmount = aedAmount;
    if (applyDiscount) finalAmount = aedAmount * (1 - DISCOUNT);
    const converted = currency === "SAR" ? finalAmount * SAR_MULTIPLIER : finalAmount;
    
    return new Intl.NumberFormat(currency === "SAR" ? "ar-SA" : "en-AE", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(converted);
  };

  // --- Direct WhatsApp Link Generator ---
  const handleDirectWhatsApp = (packageName: string, price: string) => {
    const message = `Hi CodEarn! 👋\n\nI am interested in the *${packageName}* package.\nEstimated Price: *${price}* + VAT.\n\nPlease share more details and how we can proceed.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const faqs = [
    { q: t("faq.q1"), a: t("faq.a1") },
    { q: t("faq.q2"), a: t("faq.a2") },
    { q: t("faq.q3"), a: t("faq.a3") },
    { q: t("faq.q4"), a: t("faq.a4") },
    { q: t("faq.q5"), a: t("faq.a5") },
  ];

  return (
    <div className="relative w-full bg-background overflow-hidden">
      <AnimatePresence>
        {isCalcOpen && <PricingCalculator onClose={() => setIsCalcOpen(false)} />}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-24 md:py-32">
        
        {/* --- HERO & CURRENCY SWITCHER --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest text-primary uppercase">
              {t("hero.badge")}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
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
            className="text-lg text-muted-foreground mb-4"
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 font-semibold text-sm mb-10"
          >
            🎉 {t("hero.discountText")}
          </motion.div>

          {/* Switchers & Calculator Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-3 p-1.5 rounded-full bg-muted border border-border"
            >
              <span className="text-xs font-medium text-muted-foreground px-2">
                {t("hero.currencyLabel")}
              </span>
              <button
                onClick={() => setCurrency("AED")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currency === "AED" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-background"
                }`}
              >
                AED
              </button>
              <button
                onClick={() => setCurrency("SAR")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  currency === "SAR" ? "bg-primary text-primary-foreground shadow-sm" : "text-foreground hover:bg-background"
                }`}
              >
                SAR
              </button>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => setIsCalcOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-foreground text-background font-bold text-sm hover:scale-105 transition-transform shadow-lg"
            >
              <Calculator className="w-4 h-4" />
              {t("calculator.openBtn")}
            </motion.button>
          </div>
        </div>

        {/* --- TABS --- */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-full bg-muted border border-border overflow-x-auto">
            {(["websites", "custom", "maintenance"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t(`tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        {/* --- WEBSITE PACKAGES (CARDS) --- */}
        {activeTab === "websites" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          >
            <PriceCard tier="starter" price={2900} formatPrice={formatPrice} t={t} handleWhatsApp={handleDirectWhatsApp} />
            <PriceCard tier="business" price={5900} formatPrice={formatPrice} t={t} isPopular handleWhatsApp={handleDirectWhatsApp} />
            <PriceCard tier="premium" price={9900} formatPrice={formatPrice} t={t} handleWhatsApp={handleDirectWhatsApp} />
            <PriceCard tier="ecommerce" price={7900} formatPrice={formatPrice} t={t} isFrom handleWhatsApp={handleDirectWhatsApp} />
          </motion.div>
        )}

        {/* --- CUSTOM DEVELOPMENT --- */}
        {activeTab === "custom" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <CustomCard
              title={t("custom.webapp.name")}
              desc={t("custom.webapp.desc")}
              price={formatPrice(15000)}
              features={t.raw("custom.webapp.features") as string[]}
              isFrom
              handleWhatsApp={handleDirectWhatsApp}
            />
            <CustomCard
              title={t("custom.mobile.name")}
              desc={t("custom.mobile.desc")}
              price={formatPrice(15000)}
              features={t.raw("custom.mobile.features") as string[]}
              isFrom
              handleWhatsApp={handleDirectWhatsApp}
            />
            <CustomCard
              title={t("custom.saas.name")}
              desc={t("custom.saas.desc")}
              price={formatPrice(25000)}
              features={t.raw("custom.saas.features") as string[]}
              isFrom
              handleWhatsApp={handleDirectWhatsApp}
            />
            
            {/* AI Automation Card */}
            <div className="p-8 rounded-3xl border border-border bg-card flex flex-col relative overflow-hidden">
              <div className="absolute top-0 end-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              <h3 className="text-xl font-bold text-foreground mb-2">{t("custom.ai.name")}</h3>
              <p className="text-sm text-muted-foreground mb-6">{t("custom.ai.desc")}</p>
              
              <div className="mb-6 p-4 rounded-2xl bg-muted/50 border border-border flex flex-col gap-2">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{t("custom.ai.setup")}</span>
                  <span className="text-2xl font-bold text-foreground">{formatPrice(3900)}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium text-muted-foreground">{t("custom.ai.monthly")}</span>
                  <span className="text-lg font-bold text-primary">{formatPrice(990)}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {(t.raw("custom.ai.features") as string[]).map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                onClick={() => handleDirectWhatsApp(t("custom.ai.name"), `${formatPrice(3900)} Setup + ${formatPrice(990)}/mo`)}
                className="w-full h-12 rounded-xl text-md font-semibold bg-[#25D366] hover:bg-[#20bd5a] text-white"
              >
                <MessageCircle className="w-4 h-4 me-2" />
                {t("badges.customQuote")}
              </Button>
            </div>
          </motion.div>
        )}

        {/* --- MAINTENANCE --- */}
        {activeTab === "maintenance" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <MaintenanceCard name={t("maintenance.basic.name")} price={formatPrice(199)} features={t.raw("maintenance.basic.features") as string[]} handleWhatsApp={handleDirectWhatsApp} />
            <MaintenanceCard name={t("maintenance.standard.name")} price={formatPrice(399)} features={t.raw("maintenance.standard.features") as string[]} isPopular handleWhatsApp={handleDirectWhatsApp} />
            <MaintenanceCard name={t("maintenance.premium.name")} price={formatPrice(799)} features={t.raw("maintenance.premium.features") as string[]} handleWhatsApp={handleDirectWhatsApp} />
          </motion.div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-8">
          * {t("hero.vatNote")}
        </p>

        {/* --- URGENCY / EXPRESS DELIVERY BANNER --- */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-amber-600 dark:text-amber-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{t("urgency.title")}</h3>
              <p className="text-sm text-muted-foreground">{t("urgency.desc")}</p>
            </div>
          </div>
          <div className="flex gap-4 text-sm font-semibold">
            <div className="px-4 py-2 bg-background rounded-xl border border-border flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" /> {t("urgency.standard")}
            </div>
            <div className="px-4 py-2 bg-amber-500 text-white rounded-xl flex items-center gap-2 shadow-lg">
              <Zap className="w-4 h-4" /> {t("urgency.express")} <span className="text-xs opacity-80">({t("urgency.expressFee")})</span>
            </div>
          </div>
        </div>

        {/* --- COMPARISON TABLE --- */}
        {activeTab === "websites" && (
          <div className="mt-24 md:mt-32">
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">{t("comparison.title")}</h2>
            <div className="overflow-x-auto rounded-3xl border border-border bg-card shadow-xl">
              <table className="w-full text-sm text-start">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="p-4 text-start font-semibold text-foreground">{t("comparison.features.pages")}</th>
                    <th className="p-4 text-center font-semibold text-foreground">Starter</th>
                    <th className="p-4 text-center font-semibold text-primary bg-primary/5">Business</th>
                    <th className="p-4 text-center font-semibold text-foreground">Premium</th>
                    <th className="p-4 text-center font-semibold text-foreground">E-comm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <TableRow label={t("comparison.features.pages")} vals={["5", "10", "15+", "50+"]} />
                  <TableRow label={t("comparison.features.bilingual")} vals={[false, true, true, true]} />
                  <TableRow label={t("comparison.features.cms")} vals={[false, false, true, true]} />
                  <TableRow label={t("comparison.features.blog")} vals={[false, false, true, false]} />
                  <TableRow label={t("comparison.features.ecommerce")} vals={[false, false, false, true]} />
                  <TableRow label={t("comparison.features.seo")} vals={["Basic", "Basic+", "Advanced", "Basic"]} />
                  <TableRow label={t("comparison.features.support")} vals={["14d", "30d", "60d", "30d"]} />
                  <TableRow label={t("comparison.features.revisions")} vals={["2", "3", "4", "3"]} />
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- FAQ SECTION --- */}
        <div className="mt-24 md:mt-32 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">{t("faq.title")}</h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-start"
                >
                  <span className="font-semibold text-foreground">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${openFaq === idx ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-sm text-muted-foreground leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* --- FINAL CTA --- */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">{t("cta.title")}</h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">{t("cta.desc")}</p>
          <Link href="/contact">
            <Button size="lg" className="rounded-full px-8 h-12 shadow-xl shadow-primary/20">
              {t("cta.button")}
              <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}

/* ---------------------------------- */
/* SUB-COMPONENTS                     */
/* ---------------------------------- */

function PriceCard({ tier, price, formatPrice, t, isPopular, isFrom, handleWhatsApp }: any) {
  const data = t.raw(`website.${tier}`);
  
  return (
    <div
      className={`group relative flex flex-col p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
        isPopular
          ? "bg-card border-primary shadow-xl shadow-primary/10 lg:-translate-y-4 hover:-translate-y-6 z-10"
          : "bg-card/80 border-border hover:border-primary/30"
      }`}
    >
      {/* Popular Glow Effect */}
      {isPopular && (
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl pointer-events-none" />
      )}

      {isPopular && (
        <div className="absolute top-0 start-1/2 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> {t("badges.popular")}
        </div>
      )}

      <h3 className="text-xl font-bold text-foreground mb-2">{data.name}</h3>
      <p className="text-sm text-muted-foreground mb-6 h-10">{data.desc}</p>

      <div className="mb-6 relative">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-muted-foreground line-through decoration-destructive/50">
            {formatPrice(price)}
          </span>
          <span className="text-[10px] font-bold text-white bg-green-500 px-2 py-0.5 rounded-full uppercase">
            -20%
          </span>
        </div>
        <div className="flex items-baseline gap-1">
          {isFrom && <span className="text-sm font-medium text-muted-foreground">From</span>}
          <span className="text-4xl font-extrabold text-foreground tracking-tight">
            {formatPrice(price, true)}
          </span>
        </div>
        <span className="text-xs text-green-500 font-medium">You save {formatPrice(price * DISCOUNT)}</span>
      </div>

      <ul className="space-y-3 mb-6 flex-1">
        {data.features.map((f: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3 h-3 text-primary" />
            </div>
            <span className="text-foreground/90 font-medium">{f}</span>
          </li>
        ))}
        {data.notIncluded?.map((f: string, i: number) => (
          <li key={`not-${i}`} className="flex items-start gap-3 text-sm opacity-50">
            <X className="w-4 h-4 text-muted-foreground shrink-0 mt-1" />
            <span className="text-muted-foreground line-through">{f}</span>
          </li>
        ))}
      </ul>

      <div className="pt-6 border-t border-border mb-6 flex items-center justify-between">
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" /> {data.timeline}
        </p>
        <p className="text-[10px] font-bold text-amber-600 dark:text-amber-500 uppercase">
          Express Available
        </p>
      </div>

      {/* 👇 Direct WhatsApp Button */}
      <Button
        onClick={() => handleWhatsApp(data.name, formatPrice(price, true))}
        className={`w-full h-12 rounded-xl text-md font-semibold transition-all ${
          isPopular 
            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl" 
            : "bg-foreground text-background hover:bg-foreground/90"
        }`}
      >
        <MessageCircle className="w-4 h-4 me-2" />
        {data.cta}
      </Button>
    </div>
  );
}

function CustomCard({ title, desc, price, features, isFrom, handleWhatsApp }: any) {
  return (
    <div className="p-8 rounded-3xl border border-border bg-card flex flex-col hover:border-primary/30 transition-colors shadow-sm hover:shadow-xl">
      <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6">{desc}</p>
      
      <div className="mb-6 pb-6 border-b border-border">
        {isFrom && <span className="text-sm font-medium text-muted-foreground">From </span>}
        <span className="text-4xl font-extrabold text-foreground tracking-tight">{price}</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground/80 font-medium">{f}</span>
          </li>
        ))}
      </ul>

      {/* 👇 Direct WhatsApp Button */}
      <Button 
        onClick={() => handleWhatsApp(title, price)}
        variant="outline" 
        className="w-full h-12 rounded-xl font-semibold border-primary/20 hover:bg-primary/5"
      >
        <MessageCircle className="w-4 h-4 me-2" />
        Request a Quote
      </Button>
    </div>
  );
}

function MaintenanceCard({ name, price, features, isPopular, handleWhatsApp }: any) {
  return (
    <div className={`p-8 rounded-3xl border flex flex-col hover:-translate-y-1 transition-all ${isPopular ? "border-primary/50 bg-primary/5 shadow-xl shadow-primary/10" : "border-border bg-card"}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground">{name}</h3>
        {isPopular && <span className="bg-primary text-primary-foreground text-[10px] px-2 py-0.5 rounded-full uppercase font-bold">Best Value</span>}
      </div>
      <div className="mb-6 flex items-baseline gap-1">
        <span className="text-4xl font-extrabold text-foreground">{price}</span>
        <span className="text-sm font-medium text-muted-foreground">/mo</span>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <li key={i} className="flex items-start gap-3 text-sm">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span className="text-foreground/80 font-medium">{f}</span>
          </li>
        ))}
      </ul>
      
      {/* 👇 Direct WhatsApp Button */}
      <Button 
        onClick={() => handleWhatsApp(name, price + " /mo")}
        variant={isPopular ? "default" : "outline"} 
        className="w-full rounded-xl h-11"
      >
        <MessageCircle className="w-4 h-4 me-2" />
        Choose {name}
      </Button>
    </div>
  );
}

function TableRow({ label, vals }: { label: string; vals: (string | boolean)[] }) {
  return (
    <tr className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
      <td className="p-4 text-sm font-medium text-foreground">{label}</td>
      {vals.map((v, i) => (
        <td key={i} className={`p-4 text-center ${i === 1 ? "bg-primary/5" : ""}`}>
          {typeof v === "boolean" ? (
            v ? <Check className="w-5 h-5 text-primary mx-auto" /> : <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />
          ) : (
            <span className="text-sm font-medium text-foreground/80">{v}</span>
          )}
        </td>
      ))}
    </tr>
  );
}