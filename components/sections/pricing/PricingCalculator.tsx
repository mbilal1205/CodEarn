"use client";

import { useState, useMemo } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { X, Check, Zap, Info, MessageCircle, ArrowRight, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";

const SAR_MULTIPLIER = 1.02;
const EXPRESS_MULTIPLIER = 1.3;
const WHATSAPP_NUMBER = "971541757432"; // Aapka WhatsApp Number

type Currency = "AED" | "SAR";

interface PricingCalculatorProps {
  onClose: () => void;
}

export default function PricingCalculator({ onClose }: PricingCalculatorProps) {
  const t = useTranslations("Pricing.calculator");
  
  const [currency, setCurrency] = useState<Currency>("AED");
  const [base, setBase] = useState<"starter" | "business" | "premium" | "ecommerce" | "webapp" | "mobile" | "saas">("starter");
  const [addons, setAddons] = useState<string[]>([]);
  const [isExpress, setIsExpress] = useState(false);
  
  // User Info for WhatsApp
  const [userName, setUserName] = useState("");
  const [userBudget, setUserBudget] = useState("");

  // --- Updated Fast Timelines (in Weeks) ---
  const basePrices = {
    starter: 2900,
    business: 5900,
    premium: 9900,
    ecommerce: 7900,
    webapp: 15000,
    mobile: 15000,
    saas: 25000,
  };
  
  const baseWeeks = {
    starter: 0.5,     // ~4 Days
    business: 1,      // 1 Week
    premium: 2,       // 2 Weeks
    ecommerce: 2,     // 2 Weeks
    webapp: 3,        // 3 Weeks
    mobile: 4,        // 4 Weeks
    saas: 6,          // 6 Weeks
  };

  const addonPrices: Record<string, number> = {
    cms: 2500,
    bilingual: 1500,
    ecommerce: 3500,
    seo: 1000,
    maintenance: 1200,
  };
  
  const addonWeeks: Record<string, number> = {
    cms: 0.5, bilingual: 0.5, ecommerce: 1, seo: 0.2, maintenance: 0,
  };

  const toggleAddon = (id: string) => {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // --- Calculations ---
  const { totalPrice, totalWeeks, finalPrice, expressWeeks, isBudgetLow } = useMemo(() => {
    let price = basePrices[base];
    let weeks = baseWeeks[base];

    addons.forEach((addon) => {
      price += addonPrices[addon];
      weeks += addonWeeks[addon];
    });

    const expressWeeksCalc = weeks * 0.6; // 40% faster

    if (isExpress) {
      price *= EXPRESS_MULTIPLIER;
    }

    const converted = currency === "SAR" ? price * SAR_MULTIPLIER : price;
    const formatted = new Intl.NumberFormat(currency === "SAR" ? "ar-SA" : "en-AE", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(converted);

    const budgetNum = parseFloat(userBudget);
    const isLow = !isNaN(budgetNum) && budgetNum > 0 && budgetNum < converted;

    return { 
      totalPrice: price, 
      totalWeeks: weeks, 
      finalPrice: formatted,
      expressWeeks: expressWeeksCalc,
      isBudgetLow: isLow
    };
  }, [base, addons, isExpress, currency, userBudget]);

  // --- WhatsApp Message Generator ---
  const handleWhatsApp = () => {
    const baseNames: Record<string, string> = {
      starter: "Starter Website", business: "Business Website", premium: "Premium Website",
      ecommerce: "E-commerce", webapp: "Web Application", mobile: "Mobile App", saas: "SaaS Platform"
    };

    const message = `
*New Project Estimate from CodEarn Calculator*
----------------------------------------
*Name:* ${userName || "Not provided"}
*Budget:* ${userBudget ? `${userBudget} ${currency}` : "Not specified"}
----------------------------------------
*Base Package:* ${baseNames[base]}
*Add-ons:* ${addons.length > 0 ? addons.map(a => `- ${a}`).join('\n') : "None"}
*Delivery:* ${isExpress ? "Express (40% faster)" : "Standard"}
----------------------------------------
*Estimated Cost:* ${finalPrice} (+ VAT)
*Estimated Time:* ${isExpress ? Math.ceil(expressWeeks * 7) + " days" : (totalWeeks <= 1 ? Math.ceil(totalWeeks * 7) + " days" : Math.ceil(totalWeeks) + " weeks")}
----------------------------------------
I'd like to discuss this project!
    `.trim();

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-card/90 backdrop-blur-md border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{t("title")}</h2>
            <p className="text-sm text-muted-foreground">{t("desc")}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT SIDE: Options */}
          <div className="lg:col-span-7 space-y-8">
            {/* 1. User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t("nameLabel")}</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5" /> {t("budgetLabel")}
                </label>
                <input
                  type="number"
                  value={userBudget}
                  onChange={(e) => setUserBudget(e.target.value)}
                  placeholder={t("budgetPlaceholder")}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:ring-2 focus:ring-primary/30 outline-none"
                />
              </div>
            </div>

            {/* 2. Base Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{t("baseTitle")}</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(Object.keys(basePrices) as Array<keyof typeof basePrices>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setBase(key)}
                    className={`p-3 text-xs sm:text-sm font-medium rounded-xl border text-start transition-all ${
                      base === key ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    {t(`baseOptions.${key}` as any)}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Add-ons */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{t("addonsTitle")}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {Object.keys(addonPrices).map((key) => (
                  <button
                    key={key}
                    onClick={() => toggleAddon(key)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm transition-all ${
                      addons.includes(key) ? "border-primary bg-primary/5" : "border-border bg-background hover:bg-muted"
                    }`}
                  >
                    <span className="flex items-center gap-3 text-start">
                      <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${addons.includes(key) ? "bg-primary border-primary" : "border-muted-foreground/30"}`}>
                        {addons.includes(key) && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className="font-medium">{t(`addons.${key}` as any)}</span>
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Speed Selection */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">{t("speedTitle")}</h3>
              <div className="flex p-1 bg-muted rounded-xl border border-border">
                <button
                  onClick={() => setIsExpress(false)}
                  className={`flex-1 p-2 text-sm font-medium rounded-lg transition-all ${!isExpress ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                >
                  {t("standardSpeed")}
                </button>
                <button
                  onClick={() => setIsExpress(true)}
                  className={`flex-1 p-2 text-sm font-medium rounded-lg flex items-center justify-center gap-1.5 transition-all ${isExpress ? "bg-amber-500 text-white shadow-sm" : "text-muted-foreground hover:text-amber-600"}`}
                >
                  <Zap className="w-4 h-4" /> {t("expressSpeed")}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Estimate Summary */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="p-6 md:p-8 rounded-3xl bg-muted/30 border border-border flex-1 flex flex-col justify-between sticky top-28">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-foreground">{t("summaryTitle")}</h3>
                  <div className="flex bg-background rounded-lg p-1 border border-border">
                    <button onClick={() => setCurrency("AED")} className={`px-3 py-1 text-xs font-bold rounded-md ${currency === "AED" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>AED</button>
                    <button onClick={() => setCurrency("SAR")} className={`px-3 py-1 text-xs font-bold rounded-md ${currency === "SAR" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>SAR</button>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{t("estCost")}</p>
                  <div className="text-4xl md:text-5xl font-black text-primary tracking-tight">
                    {finalPrice}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> {t("vatNote")}
                  </p>
                </div>

                <div className="mb-6 p-4 rounded-xl bg-background border border-border">
                  <p className="text-xs text-muted-foreground mb-1">{t("estTime")}</p>
                  <p className={`text-lg font-bold ${isExpress ? "text-amber-600 line-through opacity-50" : "text-foreground"}`}>
                    {totalWeeks <= 1 ? Math.ceil(totalWeeks * 7) + " " + t("days") : Math.ceil(totalWeeks) + " " + t("weeks")}
                  </p>
                  {isExpress && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-xs font-bold text-amber-600 flex items-center gap-1">
                        <Zap className="w-3 h-3" /> {t("expressTime")}
                      </p>
                      <p className="text-lg font-bold text-amber-600">
                        {expressWeeks <= 1 ? Math.ceil(expressWeeks * 7) + " " + t("days") : Math.ceil(expressWeeks) + " " + t("weeks")}
                      </p>
                    </div>
                  )}
                </div>

                {isBudgetLow && (
                  <div className="p-3 mb-6 rounded-lg bg-destructive/10 border border-destructive/20 text-xs text-destructive font-medium">
                    {t("budgetWarning")}
                  </div>
                )}
              </div>

              <div className="space-y-3 mt-8">
                <Button 
                  onClick={handleWhatsApp}
                  className="w-full h-14 rounded-xl text-md font-bold bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-lg shadow-green-500/20 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("whatsappSubmit")}
                </Button>
                <p className="text-[10px] text-center text-muted-foreground">
                  You will be redirected to WhatsApp to confirm your project details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}