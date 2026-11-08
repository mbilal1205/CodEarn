"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import {
  MapPin,
  Home,
  Search,
  ArrowRight,
  Grid3X3,
  Binary,
  Layers,
  Briefcase,
  FileQuestion,
} from "lucide-react";

function AnimatedGrid() {
  const [cells, setCells] = useState<{ id: number; active: boolean; delay: number }[]>([]);
  useEffect(() => {
    setCells(
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        active: Math.random() > 0.7,
        delay: Math.random() * 5,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 grid grid-cols-10 md:grid-cols-20 gap-1 opacity-[0.03]">
        {cells.map((cell) => (
          <div
            key={cell.id}
            className={`aspect-square rounded-sm transition-all duration-1000 ${
              cell.active ? "bg-primary animate-pulse" : "bg-transparent"
            }`}
            style={{ animationDelay: `${cell.delay}s` }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  );
}

function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
}

function LostExplorer() {
  return (
    <div className="relative w-56 h-56 md:w-72 md:h-72 mx-auto">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
      <svg viewBox="0 0 200 200" className="w-full h-full relative z-10 drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g className="animate-pulse opacity-30">
          <path d="M40 160 L160 160 L140 140 L60 140 Z" stroke="currentColor" strokeWidth="1" className="text-primary" />
          <path d="M60 140 L60 120 M80 145 L80 125 M100 148 L100 128 M120 145 L120 125 M140 140 L140 120" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
        </g>
        <g className="animate-float-slow">
          <rect x="85" y="120" width="12" height="30" rx="2" fill="currentColor" className="text-muted-foreground" />
          <rect x="103" y="120" width="12" height="30" rx="2" fill="currentColor" className="text-muted-foreground" />
          <rect x="80" y="80" width="40" height="45" rx="4" fill="currentColor" className="text-primary/80" />
          <rect x="65" y="85" width="15" height="35" rx="2" fill="currentColor" className="text-muted-foreground" transform="rotate(-20 72 102)" />
          <rect x="120" y="85" width="15" height="35" rx="2" fill="currentColor" className="text-muted-foreground" transform="rotate(20 127 102)" />
          <rect x="75" y="95" width="50" height="35" rx="2" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
          <circle cx="95" cy="112" r="3" fill="#dc2626" className="animate-pulse" />
          <path d="M85 105 L115 120 M90 125 L110 100" stroke="#92400e" strokeWidth="0.5" opacity="0.5" />
          <circle cx="100" cy="65" r="18" fill="#fdba74" />
          <ellipse cx="100" cy="50" rx="25" ry="5" fill="#d97706" />
          <path d="M85 50 L85 35 Q100 30 115 35 L115 50 Z" fill="#d97706" />
          <rect x="85" y="48" width="30" height="3" fill="#92400e" />
          <circle cx="94" cy="65" r="2" fill="#1f2937" className="animate-blink" />
          <circle cx="106" cy="65" r="2" fill="#1f2937" className="animate-blink" />
          <path d="M92 72 Q100 75 108 72" stroke="#1f2937" strokeWidth="1.5" fill="none" />
          <text x="130" y="40" fontSize="20" fill="#fbbf24" className="animate-bounce">?</text>
          <text x="140" y="55" fontSize="15" fill="#fbbf24" className="animate-bounce">?</text>
        </g>
        <g className="animate-pulse opacity-50">
          <path d="M150 60 Q160 50 170 60" stroke="#ef4444" strokeWidth="2" fill="none" />
          <path d="M145 55 Q160 40 175 55" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M140 50 Q160 30 180 50" stroke="#ef4444" strokeWidth="2" fill="none" opacity="0.3" />
        </g>
        <g className="animate-spin-slow opacity-20">
          <circle cx="100" cy="100" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary" />
        </g>
      </svg>
    </div>
  );
}

function GlitchText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const glitch = () => {
      setIsGlitching(true);
      let iterations = 0;
      const interval = setInterval(() => {
        setDisplayText(
          text.split("").map((char, index) => {
            if (index < iterations) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        iterations += 1 / 3;
        if (iterations >= 10) {
          clearInterval(interval);
          setDisplayText(text);
          setIsGlitching(false);
        }
      }, 30);
    };
    const timeout = setTimeout(glitch, 1000);
    const interval = setInterval(glitch, 5000);
    return () => { clearTimeout(timeout); clearInterval(interval); };
  }, [text]);
  return (
    <span className={`relative inline-block font-mono ${isGlitching ? "text-primary" : "text-white"}`}>
      {displayText}
      {isGlitching && (
        <>
          <span className="absolute top-0 start-0 -ms-0.5 text-red-500 opacity-70 animate-glitch-1">{displayText}</span>
          <span className="absolute top-0 start-0 ms-0.5 text-cyan-500 opacity-70 animate-glitch-2">{displayText}</span>
        </>
      )}
    </span>
  );
}

function SearchSuggestions() {
  const t = useTranslations("NotFound");
  const suggestions = t.raw("suggestions") as Array<{ path: string; label: string }>;
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4">
      {suggestions.map((item) => (
        <Link key={item.path} href={item.path} className="px-3 py-1 text-xs rounded-full bg-secondary/50 hover:bg-secondary text-secondary-foreground transition-colors flex items-center gap-1">
          <Search className="w-3 h-3" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default function LocaleNotFound() {
  const t = useTranslations("NotFound");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <AnimatedGrid />
      <FloatingParticles />
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 py-12 md:py-20 mt-10">
        <div className="mb-8 relative">
          <div className="bg-black/90 border border-border/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden min-w-[280px]">
            <div className="absolute top-0 start-0 w-full h-px bg-primary/50 animate-scan" />
            <div className="relative z-10 text-center space-y-2">
              <div className="flex items-center justify-center gap-2 text-destructive/80 text-xs font-mono mb-2">
                <FileQuestion className="w-3 h-3 animate-pulse" />
                <span>{t("status")}</span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black tracking-tighter"><GlitchText text="404" /></h1>
              <div className="text-muted-foreground font-mono text-sm">{t("tag")}</div>
            </div>
          </div>
        </div>

        <div className="mb-8"><LostExplorer /></div>

        <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="text-muted-foreground text-lg leading-relaxed">{t("description")}</p>
          <SearchSuggestions />
        </div>

        <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
          <Card className="group border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center text-primary-foreground shadow-lg">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{t("cards.services.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("cards.services.description")}</p>
                  <Link href="/services">
                    <Button className="w-full group/btn" size="sm">
                      {t("cards.services.cta")}
                      <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-border/50 bg-card/50 hover:bg-card/80 transition-all hover:shadow-xl hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center text-secondary-foreground shadow-lg">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">{t("cards.work.title")}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t("cards.work.description")}</p>
                  <Link href="/case-studies">
                    <Button variant="secondary" className="w-full group/btn" size="sm">
                      {t("cards.work.cta")}
                      <ArrowRight className="w-4 h-4 ms-2 rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-3">{t("backHomeHint")}</p>
          <Link href="/">
            <Button variant="outline" size="lg" className="rounded-full px-8">
              <Home className="w-4 h-4 me-2" />
              {t("backHome")}
            </Button>
          </Link>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground border-t border-border/50 pt-8">
          <div className="flex items-center gap-2"><Grid3X3 className="w-4 h-4" /><span className="font-mono">{t("stats.status")}</span></div>
          <div className="flex items-center gap-2"><Binary className="w-4 h-4" /><span className="font-mono">{t("stats.searched")}</span></div>
          <div className="hidden md:flex items-center gap-2"><MapPin className="w-4 h-4" /><span className="font-mono">{t("stats.location")}</span></div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(2deg); } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(400px); } }
        @keyframes glitch-1 { 0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); } 20% { clip-path: inset(20% 0 30% 0); transform: translate(-2px, 2px); } 40% { clip-path: inset(50% 0 20% 0); transform: translate(2px, -2px); } 60% { clip-path: inset(10% 0 60% 0); transform: translate(-2px, 0); } 80% { clip-path: inset(80% 0 5% 0); transform: translate(2px, 2px); } }
        @keyframes glitch-2 { 0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); } 20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -2px); } 40% { clip-path: inset(30% 0 40% 0); transform: translate(-2px, 2px); } 60% { clip-path: inset(10% 0 80% 0); transform: translate(2px, 0); } 80% { clip-path: inset(40% 0 30% 0); transform: translate(-2px, -2px); } }
        @keyframes blink { 0%, 90%, 100% { opacity: 1; } 95% { opacity: 0; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-scan { animation: scan 3s linear infinite; }
        .animate-glitch-1 { animation: glitch-1 0.3s infinite; }
        .animate-glitch-2 { animation: glitch-2 0.3s infinite; }
        .animate-blink { animation: blink 4s infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
      ` }} />
    </div>
  );
}