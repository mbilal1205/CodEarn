"use client";

import { useTranslations } from "next-intl";
import { Heart, Compass, BookOpen } from "lucide-react";

const ICONS = [Heart, Compass, BookOpen];

interface Pillar {
  label: string;
  body: string;
  quote: string;
}

export default function KeepsMoving() {
  const t = useTranslations("Founder.keepsMoving");
  const pillars = t.raw("pillars") as Pillar[];

  return (
    <section
      id="grounded"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]" />
        <div className="absolute bottom-0 start-0 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[120px]" />
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
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {pillars.map((pillar, index) => {
              const Icon = ICONS[index] ?? Heart;
              const isMiddle = index === 1;
              return (
                <div
                  key={pillar.label}
                  className={`group relative overflow-hidden rounded-3xl border bg-card/50 p-8 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 md:p-10 ${
                    isMiddle
                      ? "border-primary/30 md:-mt-4"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  {isMiddle && (
                    <div className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
                  )}

                  <span className="absolute end-8 top-8 font-mono text-xs font-medium tracking-widest text-muted-foreground/50">
                    0{index + 1}
                  </span>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl border transition-all duration-300 ${
                      isMiddle
                        ? "border-primary/40 bg-primary/15"
                        : "border-primary/20 bg-primary/10 group-hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-primary" />
                  </div>

                  <h3 className="mt-8 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {pillar.label}
                  </h3>

                  <div className="mt-4 h-px w-10 bg-primary/40 transition-all duration-500 group-hover:w-16" />

                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {pillar.body}
                  </p>

                  <div className="mt-6 border-s-2 border-primary/30 ps-4">
                    <p className="text-sm font-medium italic leading-snug text-foreground/80">
                      &ldquo;{pillar.quote}&rdquo;
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-24 md:mt-32">
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-40 w-2/3 rounded-full bg-primary/10 blur-[100px]" />
          </div>
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto flex items-center justify-center gap-2">
              <div className="h-px w-12 bg-border" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/50" />
              <div className="h-px w-12 bg-border" />
            </div>
            <blockquote className="mt-8">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {t("quote")}
              </p>
              <footer className="mt-8 flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-border" />
                <span className="text-sm font-medium text-muted-foreground">
                  {t("quoteAuthor")}
                </span>
                <div className="h-px w-8 bg-border" />
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}