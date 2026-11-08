"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JourneyItem {
  year: string;
  title: string;
  description: string;
  tag?: string;
  highlight?: boolean;
}

export default function Journey() {
  const t = useTranslations("Founder.journey");
  const items = t.raw("items") as JourneyItem[];

  return (
    <section
      id="journey"
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

        <div className="relative mt-20 md:mt-28">
          <div className="absolute start-4 top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:start-1/2 md:block md:-translate-x-1/2 rtl:md:translate-x-1/2" />
          <div className="absolute start-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-border to-transparent md:hidden" />

          <div className="space-y-12 md:space-y-20">
            {items.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.year}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-16"
                >
                  <div className="absolute start-4 top-2 z-10 -translate-x-1/2 md:start-1/2 md:top-6 rtl:translate-x-1/2 rtl:md:translate-x-1/2">
                    <div className="relative">
                      <div
                        className={`absolute inset-0 rounded-full ${
                          item.highlight ? "bg-primary/30" : "bg-primary/20"
                        } animate-ping`}
                      />
                      <div
                        className={`relative h-3.5 w-3.5 rounded-full border-2 ${
                          item.highlight
                            ? "border-primary bg-primary shadow-lg shadow-primary/50"
                            : "border-primary bg-background"
                        }`}
                      />
                    </div>
                  </div>

                  {isLeft && (
                    <div className="hidden md:block">
                      <JourneyCard item={item} align="end" />
                    </div>
                  )}
                  {isLeft && <div className="hidden md:block" />}
                  {!isLeft && <div className="hidden md:block" />}
                  {!isLeft && (
                    <div className="hidden md:block">
                      <JourneyCard item={item} align="start" />
                    </div>
                  )}

                  <div className="md:hidden ps-12">
                    <JourneyCard item={item} align="start" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-20 flex justify-center md:mt-28">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="group h-12 rounded-full border-border bg-transparent px-7 hover:bg-accent"
          >
            <Link href="/case-studies">
              {t("ctaButton")}
              <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function JourneyCard({
  item,
  align,
}: {
  item: JourneyItem;
  align: "start" | "end";
}) {
  const isEnd = align === "end";

  return (
    <div
      className={`group relative ${
        isEnd ? "md:pe-12 md:text-end" : "md:ps-12 md:text-start"
      }`}
    >
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 backdrop-blur-sm ${
          item.highlight ? "border-primary/40 bg-primary/10" : ""
        }`}
      >
        <Sparkles
          className={`h-3 w-3 ${
            item.highlight ? "text-primary" : "text-muted-foreground"
          }`}
        />
        <span
          className={`text-xs font-semibold tracking-widest uppercase ${
            item.highlight ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {item.year}
        </span>
        {item.tag && (
          <>
            <span className="text-muted-foreground/40">•</span>
            <span className="text-xs font-medium text-muted-foreground">
              {item.tag}
            </span>
          </>
        )}
      </div>

      <div
        className={`mt-4 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10 ${
          item.highlight ? "border-primary/30" : ""
        }`}
      >
        <h3 className="text-lg font-semibold text-foreground md:text-xl">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
          {item.description}
        </p>
      </div>
    </div>
  );
}