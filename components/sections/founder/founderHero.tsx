"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FounderHero() {
  const t = useTranslations("Founder.hero");
  const trustLine = t.raw("trustLine") as string[];
  const buildingList = t.raw("buildingList") as string[];

  return (
    <section className="relative w-full overflow-hidden bg-background pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -start-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute top-1/2 end-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_60%,var(--background))]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* LEFT */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {t("badge")}
              </span>
            </div>

            <h1 className="mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl">
              {t("firstName")}{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t("lastName")}
              </span>
            </h1>

            <p className="mt-4 text-xl font-medium text-foreground/80 md:text-2xl">
              {t("role")}
            </p>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("positioning")}
            </p>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{t("location")}</span>
            </div>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
              >
                <Link
                  href="https://www.linkedin.com/in/mbilal1205/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("ctaPrimary")}
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="group h-12 rounded-full border-border bg-transparent px-7 hover:bg-accent"
              >
                <Link href="/contact">
                  {t("ctaSecondary")}
                  <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
              {trustLine.map((item, idx) => (
                <span key={item} className="flex items-center gap-3">
                  {item}
                  {idx < trustLine.length - 1 && (
                    <span className="text-primary">•</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -inset-6 -z-10 rounded-full border border-dashed border-primary/20 [animation:spin_40s_linear_infinite]" />
              <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
                <div
                  className="relative aspect-[4/5] w-full select-none"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  <Image
                    src="/founder.webp"
                    alt={`${t("firstName")} ${t("lastName")} — Founder of CodEarn`}
                    fill
                    priority
                    className="object-cover pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 z-10 bg-transparent" />
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-20" />
                  <div className="absolute bottom-5 start-5 end-5 z-30 select-text">
                    <p className="text-sm font-semibold text-white">
                      {t("imageCaptionName")}
                    </p>
                    <p className="text-xs text-white/70">
                      {t("imageCaptionRole")}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -start-4 top-8 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                <span className="text-primary">●</span> {t("badgeFounder")}
              </div>

              <div className="absolute -end-4 top-24 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                <span className="text-primary">●</span> {t("badgeArchitect")}
              </div>

              <div className="absolute -start-6 bottom-24 rounded-xl border border-border bg-card/80 px-3 py-2 text-xs font-medium backdrop-blur-md shadow-lg">
                <span className="text-primary">●</span> {t("badgeBuilder")}
              </div>

              <div className="absolute -bottom-6 -end-4 w-56 rounded-2xl border border-border bg-card/90 p-4 shadow-xl backdrop-blur-md">
                <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {t("currentlyBuilding")}
                </p>
                <div className="mt-3 space-y-1.5">
                  {buildingList.map((item, idx) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm font-medium text-foreground"
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          idx === 0 ? "bg-green-500" : "bg-primary"
                        }`}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}