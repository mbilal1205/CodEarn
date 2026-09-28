"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Sparkles, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LetsBuild() {
  return (
    <section
      id="lets-build"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow — strong, this is the finale */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[160px] dark:bg-primary/15" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/10" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Finale Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
          {/* Top accent line */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

          {/* Inner glow */}
          <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="pointer-events-none absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-primary/15 blur-[120px]" />

          <div className="relative grid grid-cols-1 gap-12 p-8 md:p-14 lg:grid-cols-12 lg:gap-16 lg:p-20">
            {/* ============================================================
                LEFT — Content
            ============================================================ */}
            <div className="lg:col-span-7">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
                  Let&apos;s Build Something Meaningful
                </span>
              </div>

              {/* Heading */}
              <h2 className="mt-7 text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-[4rem]">
                Have a problem{" "}
                <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  worth solving?
                </span>
              </h2>

              {/* Description */}
              <p className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Whether you&apos;re building a product, exploring an idea, or
                looking for a technology partner — let&apos;s start with the
                problem. Everything good begins there.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                {/* Primary — Start a Conversation */}
                <Button
                  asChild
                  size="lg"
                  className="group h-14 rounded-full bg-primary px-8 text-base text-primary-foreground shadow-xl shadow-primary/25 transition-all hover:shadow-2xl hover:shadow-primary/40"
                >
                  <Link href="mailto:hello@codearntech.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Start a Conversation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>

                {/* Secondary — Explore CodEarn */}
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group h-14 rounded-full border-border bg-transparent px-8 text-base hover:bg-accent"
                >
                  <Link
                    href="https://www.codearntech.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Explore CodEarn
                    <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>

              {/* Trust line */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-border pt-6">
                <TrustItem label="Response within 24h" />
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <TrustItem label="Open to projects & collabs" />
                <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
                <TrustItem label="Based in Pakistan, building globally" />
              </div>
            </div>

            {/* ============================================================
                RIGHT — Founder Visual
            ============================================================ */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md">
                {/* Glow */}
                <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-tr from-primary/30 via-primary/10 to-transparent blur-2xl" />

                {/* Rotating dashed ring */}
                <div className="absolute -inset-8 -z-10 hidden rounded-full border border-dashed border-primary/20 [animation:spin_50s_linear_infinite] md:block" />

                {/* Founder Photo Frame */}
                <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl shadow-primary/10">
  <div 
    className="relative aspect-[4/5] w-full select-none"
    onContextMenu={(e) => e.preventDefault()} // 👈 Right-click menu block karne ke liye
  >
    {/* Actual Image */}
    <Image
      src="/founder-4.webp"
      alt="Muhammad Bilal — Founder of CodEarn"
      fill
      className="object-cover pointer-events-none" // 👈 Image drag aur click block karne ke liye
      draggable={false}
    />

    {/* Invisible Protection Layer */}
    <div className="absolute inset-0 z-10 bg-transparent" />

    {/* Bottom gradient */}
    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20" />

    {/* Info on image (Z-index high rakha hai taake text copy ho sakay) */}
    <div className="absolute bottom-6 left-6 right-6 z-30 select-text">
      <p className="text-xs font-medium tracking-widest text-white/70 uppercase">
        Founder
      </p>
      <p className="mt-1 text-lg font-semibold text-white">
        Muhammad Bilal
      </p>
      <p className="text-xs text-white/70">
        Founder &amp; Software Architect, CodEarn
      </p>
    </div>
  </div>
</div>


                {/* Floating status chip — top right */}
                <div className="absolute -right-4 top-6 flex items-center gap-2 rounded-full border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-xs font-medium text-foreground">
                    Available for projects
                  </span>
                </div>

                {/* Floating chip — bottom left */}
                <div className="absolute -left-6 bottom-24 hidden rounded-xl border border-border bg-card/90 px-3 py-2 shadow-lg backdrop-blur-md sm:block">
                  <p className="text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
                    Currently
                  </p>
                  <p className="mt-0.5 text-xs font-semibold text-foreground">
                    Building • Learning • Shipping
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

/* -------------------------------------------------------------------------- */

function TrustItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
      <span>{label}</span>
    </div>
  );
}