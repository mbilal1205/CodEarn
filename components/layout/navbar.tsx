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
  Coins,
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
    { name: t("pricing"), href: "/pricing", icon: Coins },
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

/* -------------------- MOBILE TAB ITEM -------------------- */
const MobileTabItem = memo(
  ({
    href,
    name,
    icon: Icon,
    isActive,
  }: {
    href: string
    name: string
    icon: typeof Layers
    isActive: boolean
  }) => (
    <Link
      href={href}
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
          {name}
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
)
MobileTabItem.displayName = "MobileTabItem"

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

  /* ---------- MOBILE LAYOUT LOGIC ---------- */
  // Left side: Services, About
  const leftMobileTabs = [navLinks[0], navLinks[2]] 
  // Right side: Pricing
  const rightMobileTabs = [navLinks[3]] 
  // More menu: Work, Blog, Contact
  const moreMobileLinks = [navLinks[1], navLinks[4], navLinks[5]] 

  return (
    <>
      {/* ==================== TOP HEADER ==================== */}
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

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex group"
                aria-label={t("chatWhatsApp")}
              >
                <Button className="relative rounded-full h-10 px-3 xl:px-4 gap-2 text-xs font-semibold text-white whitespace-nowrap overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] bg-[#25D366] hover:bg-[#20bd5a] shadow-md shadow-[#25D366]/30 hover:shadow-lg hover:shadow-[#25D366]/40 ring-1 ring-white/10">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                  </span>
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden xl:inline">{t("chatWhatsApp")}</span>
                </Button>
              </a>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* ==================== MOBILE BOTTOM BAR ==================== */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-50">
        <div className="relative">
          {/* ───── BAR ───── */}
          <div className="relative bg-background/90 backdrop-blur-xl border-t border-border shadow-[0_-4px_24px_rgba(0,0,0,0.06)] pb-safe-bottom">
            {/* Notch cutouts */}
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
              aria-hidden="true"
            >
              <div className="flex items-center">
                <div className="w-5 h-5 rounded-full bg-background translate-x-1/2" />
                <div className="w-5 h-5 rounded-full bg-background -translate-x-1/2" />
              </div>
            </div>

            {/* Tab bar */}
            <div className="flex items-center h-16 px-2 max-w-md mx-auto">
              {/* Left tabs (Services, About) */}
              {leftMobileTabs.map((tab) => (
                <MobileTabItem
                  key={tab.href}
                  href={tab.href}
                  name={tab.name}
                  icon={tab.icon}
                  isActive={pathname === tab.href}
                />
              ))}

              {/* Center spacer for raised WhatsApp button */}
              <div className="w-14 shrink-0" aria-hidden="true" />

              {/* Right tab (Pricing) */}
              {rightMobileTabs.map((tab) => (
                <MobileTabItem
                  key={tab.href}
                  href={tab.href}
                  name={tab.name}
                  icon={tab.icon}
                  isActive={pathname === tab.href}
                />
              ))}

              {/* More (Dots) */}
              <button
                onClick={() => setIsMobileSheetOpen(true)}
                className={`flex flex-col items-center justify-center flex-1 h-full text-center transition-colors group ${
                  isMobileSheetOpen ? "text-foreground" : "text-muted-foreground"
                }`}
                aria-label={t("more")}
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

          {/* ───── RAISED WHATSAPP BUTTON ───── */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 22,
              delay: 0.25,
            }}
            className="absolute left-1/2 -translate-x-1/2 -top-6 z-10"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("chatWhatsApp")}
              className="group relative flex items-center justify-center"
            >
              <div className="relative w-[52px] h-[52px] rounded-full bg-[#25D366] flex items-center justify-center shadow-md shadow-[#25D366]/30 ring-[5px] ring-background group-active:scale-95 transition-transform duration-150">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent pointer-events-none"
                />
                <MessageCircle
                  className="relative w-[22px] h-[22px] text-white"
                  strokeWidth={2.2}
                />
                <span className="absolute -bottom-0.5 -end-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-background" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ==================== MOBILE SHEET ==================== */}
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

              <div className="grid grid-cols-1 gap-1.5">
                {moreMobileLinks.map((link) => {
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
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}