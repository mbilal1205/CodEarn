"use client"

import { useState, useEffect, memo } from "react"
import Image from "next/image"
import { Link, usePathname } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import {
  Layers,
  Briefcase,
  Info,
  PhoneCall,
  MoreHorizontal,
  X,
  BookOpen,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import LanguageSwitcher from "@/components/LanguageSwitcher"

/* -------------------- WHATSAPP -------------------- */
const WHATSAPP_NUMBER = "971541757432"
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi CodEarn, I'd like to discuss a project."
)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`

/* -------------------- NAV LINKS -------------------- */
const useNavLinks = () => {
  const t = useTranslations("Nav")
  return [
    { name: t("services"), href: "/services", icon: Layers },
    { name: t("work"), href: "/case-studies", icon: Briefcase },
    { name: t("about"), href: "/about", icon: Info },
    { name: t("blog"), href: "/blogs", icon: BookOpen },
    { name: t("contact"), href: "/contact", icon: PhoneCall },
  ] as const
}

/* -------------------- DESKTOP NAV LINK -------------------- */
const DesktopNavLink = memo(
  ({ href, name, isActive }: { href: string; name: string; isActive: boolean }) => (
    <Link
      href={href}
      className="relative px-3.5 py-2 text-[13px] font-normal tracking-wide transition-colors duration-300 group whitespace-nowrap"
    >
      <span
        className={`relative z-10 transition-colors duration-300 ${
          isActive
            ? "text-foreground font-medium"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        {name}
      </span>
      {isActive && (
        <motion.span
          layoutId="activeDesktopNav"
          className="absolute inset-0 bg-muted/60 rounded-full -z-0"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  )
)
DesktopNavLink.displayName = "DesktopNavLink"

/* -------------------- NAVBAR -------------------- */
export function Navbar() {
  const pathname = usePathname()
  const t = useTranslations("Nav")
  const navLinks = useNavLinks()
  const [isMounted, setIsMounted] = useState(false)
  const [isMobileSheetOpen, setIsMobileSheetOpen] = useState(false)

  const { scrollY } = useScroll()
  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(var(--background), 0)", "rgba(var(--background), 0.85)"]
  )
  const borderBottom = useTransform(
    scrollY,
    [0, 50],
    ["1px solid rgba(0, 0, 0, 0)", "1px solid var(--border)"]
  )

  useEffect(() => setIsMounted(true), [])
  useEffect(() => setIsMobileSheetOpen(false), [pathname])

  if (!isMounted) return null

  /* Mobile bottom bar: 4 primary tabs */
  const primaryMobileTabs = navLinks.slice(0, 4)
  const remainingMobileLinks = navLinks.slice(4)

  return (
    <>
      {/* ---------------- TOP HEADER ---------------- */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 inset-x-0 z-50 backdrop-blur-md"
        style={{ backgroundColor, borderBottom }}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
            {/* ---------- LOGO + TAG ---------- */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
            >
              <div className="relative shrink-0">
                <div className="absolute inset-0 bg-linear-to-r from-codearn-blue to-codearn-purple rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition" />
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-linear-to-br from-codearn-blue via-codearn-purple to-codearn-cyan flex items-center justify-center shadow-lg group-hover:scale-105 transition">
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

              {/* 👇 Tag ALWAYS visible now */}
              <div className="flex flex-col leading-none">
                <span className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-gradient">
                  CodEarn
                </span>
                <span className="mt-1 text-[8px] sm:text-[9px] md:text-[10px] tracking-[0.18em] text-muted-foreground uppercase font-medium whitespace-nowrap">
                  {t("tagline")}
                </span>
              </div>
            </Link>

            {/* ---------- DESKTOP CENTRAL LINKS ---------- */}
            <div className="hidden lg:flex items-center gap-0.5 bg-muted/30 border border-border/40 rounded-full p-1.5 backdrop-blur-lg shrink-0">
              {navLinks.map((link) => (
                <DesktopNavLink
                  key={link.href}
                  {...link}
                  isActive={pathname === link.href}
                />
              ))}
            </div>

            {/* ---------- RIGHT CONTROLS ---------- */}
            <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 shrink-0">
              <LanguageSwitcher />
              <ThemeToggle />

              {/* 👇 WhatsApp — icon only < xl, full text at xl+ */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex group"
                aria-label={t("chatWhatsApp")}
              >
                <Button
                  className="relative rounded-full h-10 px-3 xl:px-4 gap-2 text-xs font-semibold text-white whitespace-nowrap overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] bg-[#25D366] hover:bg-[#20bd5a] shadow-md shadow-[#25D366]/30 hover:shadow-lg hover:shadow-[#25D366]/40 ring-1 ring-white/10"
                >
                  {/* Live pulse dot */}
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>

                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />

                  {/* 👇 Text only at xl+ (1280px+) */}
                  <span className="hidden xl:inline">
                    {t("chatWhatsApp")}
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ---------------- MOBILE BOTTOM TABS ---------------- */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background/85 backdrop-blur-xl border-t border-border pb-safe-bottom shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
          {primaryMobileTabs.map((tab) => {
            const Icon = tab.icon
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className="relative flex flex-col items-center justify-center flex-1 h-full text-center group"
              >
                <div className="relative flex flex-col items-center gap-1 py-1 w-full">
                  <Icon
                    className={`h-[21px] w-[21px] transition-transform duration-200 group-active:scale-90 ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                    strokeWidth={isActive ? 2.2 : 1.8}
                  />
                  <span
                    className={`text-[10px] tracking-wide transition-colors ${
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground font-normal"
                    }`}
                  >
                    {tab.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeMobileTabLine"
                      className="absolute bottom-[-4px] w-5 h-[3px] bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </div>
              </Link>
            )
          })}

          <button
            onClick={() => setIsMobileSheetOpen(true)}
            className={`flex flex-col items-center justify-center flex-1 h-full text-center transition-colors group ${
              isMobileSheetOpen ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            <div className="flex flex-col items-center gap-1 py-1">
              <MoreHorizontal
                className="h-[21px] w-[21px] group-active:scale-90 transition-transform duration-200"
                strokeWidth={1.8}
              />
              <span className="text-[10px] tracking-wide font-normal">
                {t("more")}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ---------------- MOBILE SHEET ---------------- */}
      <AnimatePresence>
        {isMobileSheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSheetOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 340 }}
              className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-background rounded-t-3xl border-t border-border px-6 pt-4 pb-10 shadow-2xl max-w-lg mx-auto"
            >
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-5" />

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                  {t("menuLinks")}
                </h3>
                <Button
                  size="icon"
                  variant="ghost"
                  className="rounded-full h-8 w-8 bg-muted/60"
                  onClick={() => setIsMobileSheetOpen(false)}
                >
                  <X className="h-4 w-4 text-foreground" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-1.5 mb-6">
                {remainingMobileLinks.map((link) => {
                  const Icon = link.icon
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileSheetOpen(false)}
                      className={`flex items-center gap-4 p-3.5 rounded-xl transition-all ${
                        isActive
                          ? "bg-muted text-foreground font-medium"
                          : "hover:bg-muted/40 text-foreground/80"
                      }`}
                    >
                      <Icon
                        className="h-5 w-5 text-muted-foreground"
                        strokeWidth={1.8}
                      />
                      <span className="text-sm tracking-wide">{link.name}</span>
                    </Link>
                  )
                })}
              </div>

              {/* WhatsApp CTA — mobile */}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMobileSheetOpen(false)}
                className="block"
              >
                <Button className="w-full h-12 rounded-xl text-sm font-semibold text-white shadow-md shadow-[#25D366]/30 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <MessageCircle className="w-4 h-4" />
                  {t("chatWhatsApp")}
                </Button>
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}