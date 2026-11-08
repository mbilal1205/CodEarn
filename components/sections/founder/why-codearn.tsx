"use client";

import { useTranslations } from "next-intl";
import { AlertCircle, Lightbulb, Rocket, ArrowDown } from "lucide-react";

const ICONS = [AlertCircle, Lightbulb, Rocket];

interface Step {
  number: string;
  label: string;
  heading: string;
  body: string;
  points: string[];
}

export default function WhyCodEarn() {
  const t = useTranslations("Founder.why");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="why"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 start-0 h-[350px] w-[350px] rounded-full bg-primary/5 blur-[120px]" />
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
        </div>

        <div className="mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = ICONS[index] ?? AlertCircle;
              return (
                <div key={step.number} className="relative">
                  <div className="group relative h-full overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-2xl hover:shadow-primary/10">
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-semibold tracking-widest text-muted-foreground/60 uppercase">
                        {step.number}
                      </span>
                    </div>

                    <p className="mt-6 text-xs font-medium tracking-[0.2em] text-primary uppercase">
                      {step.label}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-foreground md:text-2xl">
                      {step.heading}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                      {step.body}
                    </p>

                    <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                      {step.points.map((point) => (
                        <li
                          key={point}
                          className="flex items-start gap-3 text-sm text-foreground/80"
                        >
                          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {index < steps.length - 1 && (
                    <div className="absolute -end-4 top-1/2 hidden -translate-y-1/2 lg:block">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-md">
                        <ArrowDown className="h-3.5 w-3.5 rotate-[-90deg] text-primary rtl:rotate-90" />
                      </div>
                    </div>
                  )}
                  {index < steps.length - 1 && (
                    <div className="mt-6 flex justify-center lg:hidden">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-md">
                        <ArrowDown className="h-3.5 w-3.5 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-24 md:mt-32">
          <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
            <div className="h-64 w-3/4 rounded-full bg-primary/10 blur-[100px]" />
          </div>
          <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-border bg-card/50 px-8 py-14 text-center backdrop-blur-sm md:px-16 md:py-20">
            <div className="absolute start-6 top-6 h-3 w-3 rounded-full bg-primary/40" />
            <div className="absolute end-6 top-6 h-3 w-3 rounded-full bg-primary/40" />
            <div className="absolute start-6 bottom-6 h-3 w-3 rounded-full bg-primary/40" />
            <div className="absolute end-6 bottom-6 h-3 w-3 rounded-full bg-primary/40" />

            <p className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
              CODEARN
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-border" />
            <p className="mt-8 text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
              {t("statementLine1")}
            </p>
            <p className="mt-4 text-2xl font-semibold leading-snug tracking-tight text-foreground md:text-3xl">
              {t("statementLine2")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}