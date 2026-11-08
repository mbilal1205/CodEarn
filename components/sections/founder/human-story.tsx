"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";

export default function HumanStory() {
  const t = useTranslations("Founder.story");
  const blocks = t.raw("blocks") as Array<{ title: string; body: string }>;

  return (
    <section
      id="story"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/3 -start-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 end-0 h-[380px] w-[380px] rounded-full bg-primary/5 blur-[120px]" />
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

        <div className="mt-20 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
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
                      src="/founder-2.webp"
                      alt="Muhammad Bilal — the journey"
                      fill
                      className="object-cover pointer-events-none"
                      draggable={false}
                    />
                    <div className="absolute inset-0 z-10 bg-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent z-20" />
                    <div className="absolute bottom-6 start-6 end-6 z-30 select-text">
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

          <div className="lg:col-span-7">
            <div className="space-y-10">
              {blocks.map((block, idx) => (
                <div
                  key={block.title}
                  className="group relative border-s-2 border-border ps-6 transition-colors hover:border-primary"
                >
                  <div className="absolute -start-[11px] top-0 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border bg-background text-[9px] font-bold text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground md:text-xl">
                    {block.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base leading-relaxed text-muted-foreground">
                    {block.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-24 md:mt-32">
          <div className="mx-auto max-w-4xl text-center">
            <Quote className="mx-auto h-8 w-8 text-primary/40" />
            <blockquote className="mt-6">
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