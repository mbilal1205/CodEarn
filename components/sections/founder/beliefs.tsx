"use client";

import { useTranslations } from "next-intl";
import { Hammer, Target, RefreshCw, Layers, Gem, Quote } from "lucide-react";

const ICONS = [Hammer, Target, RefreshCw, Layers, Gem];

interface Principle {
  title: string;
  body: string;
}

export default function Beliefs() {
  const t = useTranslations("Founder.beliefs");
  const principles = t.raw("principles") as Principle[];

  return (
    <section
      id="beliefs"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 end-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-1/4 start-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px]" />
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

        <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:mt-28">
          {principles.map((principle, index) => {
            const Icon = ICONS[index] ?? Hammer;
            const isFeature = index === 0;
            return (
              <div
                key={principle.title}
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/10 ${
                  isFeature ? "sm:col-span-2 lg:col-span-2" : ""
                }`}
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <span className="absolute end-6 top-6 text-5xl font-bold leading-none text-muted-foreground/10 transition-colors duration-300 group-hover:text-primary/20 md:text-6xl">
                  0{index + 1}
                </span>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                <h3
                  className={`mt-6 font-semibold tracking-tight text-foreground ${
                    isFeature ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
                  }`}
                >
                  {principle.title}
                </h3>
                <p
                  className={`mt-3 leading-relaxed text-muted-foreground ${
                    isFeature ? "max-w-lg text-base md:text-lg" : "text-sm md:text-base"
                  }`}
                >
                  {principle.body}
                </p>
                <div className="mt-6 h-px w-12 bg-primary/40 transition-all duration-500 group-hover:w-20" />
              </div>
            );
          })}
        </div>

        <div className="relative mt-24 md:mt-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10">
              <Quote className="h-5 w-5 text-primary" />
            </div>
            <blockquote className="mt-8">
              <p className="text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl">
                &ldquo;{t("quote")}&rdquo;
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