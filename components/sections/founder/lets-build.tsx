"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, ArrowUpRight, Sparkles, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span>{label}</span>
    </div>
  );
}

export default function LetsBuild() {
  const t = useTranslations("Founder.letsBuild");

  return (
    <section
      id="lets-build"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px]" />
        <div className="absolute bottom-0 start-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 end-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
          <div className="pointer-events-none absolute -end-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="pointer-events-none absolute -start-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />

          <div className="relative grid grid-cols-1 gap-12 p-8 md:p-14 lg:grid-cols-12 lg:gap-16 lg:p-20">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  {t("badge")}
                </span>
              </div>

              <h2 className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
                {t("headingLine1")}{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  {t("headingLine2")}
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t("description")}
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="group h-14 rounded-full bg-primary px-8 text-base text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/40"
                >
                  <Link href="/contact">
                    <Mail className="me-2 h-4 w-4" />
                    {t("ctaPrimary")}
                    <ArrowRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group h-14 rounded-full border-border bg-transparent px-8 text-base hover:bg-accent"
                >
                  <Link href="/services">
                    <Globe className="me-2 h-4 w-4" />
                    {t("ctaSecondary")}
                    <ArrowUpRight className="ms-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
                  </Link>
                </Button>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
                <TrustItem label={t("trustLine1")} />
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <TrustItem label={t("trustLine2")} />
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <TrustItem label={t("trustLine3")} />
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-2xl" />
                <div className="absolute -inset-8 -z-10 hidden rounded-full border border-dashed border-primary/20 [animation:spin_50s_linear_infinite] md:block" />

                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
                  <div
                    className="relative aspect-[4/5] w-full select-none"
                    onContextMenu={(e) => e.preventDefault()}
                  >
                    <Image
                      src="/founder-4.webp"
                      alt="Muhammad Bilal — Founder of CodEarn"
                      fill
                      className="object-cover pointer-events-none"
                      draggable={false}
                    />
                    <div className="absolute inset-0 z-10 bg-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />
                    <div className="absolute bottom-6 start-6 end-6 z-30 select-text">
                      <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
                        {t("imageCaptionLabel")}
                      </p>
                      <p className="mt-1 text-lg font-semibold text-white">
                        {t("imageCaptionName")}
                      </p>
                      <p className="text-xs text-white/70">
                        {t("imageCaptionRole")}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute -end-4 top-6 flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    {t("statusChip")}
                  </span>
                </div>

                <div className="absolute -start-6 bottom-24 hidden rounded-xl border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md sm:block">
                  <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    {t("currentlyChipLabel")}
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-foreground">
                    {t("currentlyChipText")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}