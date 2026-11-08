"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Package, Building2, Megaphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ICONS = [Package, Building2, Megaphone];

interface Direction {
  number: string;
  label: string;
  body: string;
  highlights: string[];
  featured?: boolean;
}

export default function WhatsNext() {
  const t = useTranslations("Founder.whatsNext");
  const directions = t.raw("directions") as Direction[];

  return (
    <section
      id="next"
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
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {directions.map((direction, index) => {
              const Icon = ICONS[index] ?? Package;
              const isFeatured = direction.featured;
              return (
                <div
                  key={direction.number}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10 md:p-10 ${
                    isFeatured
                      ? "border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 lg:-mt-4"
                      : "border-border bg-card/50 hover:border-primary/40 hover:bg-card"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {isFeatured && (
                    <div className="pointer-events-none absolute -end-16 -top-16 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
                  )}

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 group-hover:scale-105 ${
                        isFeatured
                          ? "border-primary/40 bg-primary/15"
                          : "border-primary/20 bg-primary/10 group-hover:border-primary/40"
                      }`}
                    >
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground/60">
                      {direction.number}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {direction.label}
                  </h3>
                  <div className="relative mt-4 h-px w-12 bg-primary/40 transition-all duration-500 group-hover:w-20" />
                  <p className="relative mt-5 flex-1 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {direction.body}
                  </p>
                  <ul className="relative mt-6 space-y-2 border-t border-border pt-5">
                    {direction.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-3 text-sm text-foreground/80"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
            <div className="pointer-events-none absolute -start-20 -bottom-20 h-[280px] w-[280px] rounded-full bg-primary/15 blur-[100px]" />

            <div className="relative flex flex-col items-center gap-8 p-8 md:flex-row md:justify-between md:p-12 lg:p-14">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/30 opacity-75" />
                  <span className="relative h-3 w-3 rounded-full bg-primary" />
                </div>
                <div className="text-center md:text-start">
                  <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                    {t("currentlyLabel")}
                  </p>
                  <p className="mt-2 text-xl font-bold tracking-tight text-foreground md:text-2xl">
                    {t("currentlyText")}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row md:shrink-0">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  <Link
                    href="https://x.com/mbilal1205"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("currentlyCta")}
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