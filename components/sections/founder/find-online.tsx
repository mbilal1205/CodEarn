"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Linkedin,
  Github,
  Globe,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURED_ICONS = [Linkedin, Github, Globe];
const FEATURED_LINKS = [
  "https://linkedin.com/in/mbilal1205",
  "https://github.com/mbilal1205",
  "https://www.codearntech.com",
];

interface Featured {
  name: string;
  handle: string;
  purpose: string;
}

export default function FindOnline() {
  const t = useTranslations("Founder.findOnline");
  const featured = t.raw("featured") as Featured[];

  return (
    <section
      id="connect"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 end-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            {t("badge")}
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            {t("headingLine1")}{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("headingLine2")}
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {t("description")}
          </p>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
                  {t("featuredLabel")}
                </p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {t("featuredTitle")}
                </h3>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((profile, idx) => {
              const Icon = FEATURED_ICONS[idx] ?? Globe;
              const link = FEATURED_LINKS[idx] ?? "#";
              return (
                <Link
                  key={profile.name}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/50 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                    </div>
                  </div>

                  <h4 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
                    {profile.name}
                  </h4>
                  <p className="mt-1 font-mono text-xs text-primary">
                    {profile.handle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {profile.purpose}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 backdrop-blur-sm md:p-12 lg:p-16">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            <div className="pointer-events-none absolute -end-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />

            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <Mail className="h-3 w-3 text-primary" />
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                    {t("contactBadge")}
                  </span>
                </div>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  {t("contactHeading")}
                </h3>
                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  {t("contactBody")}
                </p>
              </div>
              <div className="md:col-span-4 md:text-end">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  <Link href="/contact">
                    {t("contactCta")}
                    <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}