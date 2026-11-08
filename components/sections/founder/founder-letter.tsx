"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FounderLetter() {
  const t = useTranslations("Founder.letter");
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section
      id="letter"
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
        </div>

        <div className="relative mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm md:p-12 lg:p-14">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />
                <div className="absolute end-6 top-6 h-12 w-12 rounded-full border border-primary/20 bg-primary/5" />
                <div className="absolute end-10 top-10 h-4 w-4 rounded-full bg-primary/20" />

                <div className="relative space-y-5 text-base leading-relaxed text-foreground/90 md:text-lg">
                  <p className="font-medium text-foreground">{t("greeting")}</p>

                  {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}

                  <div className="pt-6">
                    <p className="text-foreground/90">{t("closing")}</p>
                    <p className="mt-3 text-lg font-semibold tracking-tight text-foreground">
                      {t("signatureName")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {t("signatureRole")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <div className="relative">
                  <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-2xl" />

                  <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl">
                    <div
                      className="relative aspect-[4/5] w-full select-none"
                      onContextMenu={(e) => e.preventDefault()}
                    >
                      <Image
                        src="/founder-3.webp"
                        alt="Muhammad Bilal — Founder of CodEarn"
                        fill
                        className="object-cover pointer-events-none"
                        draggable={false}
                      />
                      <div className="absolute inset-0 z-10 bg-transparent" />
                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/70 to-transparent z-20" />
                      <div className="absolute bottom-5 start-5 end-5 z-30 select-text">
                        <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
                          {t("imageCaptionLabel")}
                        </p>
                        <p className="mt-1 text-sm font-medium text-white">
                          {t("imageCaptionText")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}