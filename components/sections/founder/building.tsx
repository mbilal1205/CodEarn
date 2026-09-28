"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, Sparkles, Code2, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

type ProductStatus = "LIVE" | "BUILDING" | "EXPERIMENT" | "COMING SOON";

type Product = {
  name: string;
  category: string;
  description: string;
  status: ProductStatus;
  icon: React.ElementType;
  link?: string;
};

const products: Product[] = [
  {
    name: "GigThink",
    category: "AI Workflow Platform",
    description:
      "AI-powered workflow built for freelancers and agencies — proposals, clients and delivery in one place.",
    status: "LIVE",
    icon: Zap,
    link: "www.gigthink.com",
  },
  {
    name: "SaaS Product #2",
    category: "Software Product",
    description:
      "A new SaaS product currently in active development. Details coming soon.",
    status: "BUILDING",
    icon: Code2,
  },
  {
    name: "Product Experiment #3",
    category: "R&D / Experiment",
    description:
      "An experimental product exploring a new idea. Currently validating the problem.",
    status: "EXPERIMENT",
    icon: Sparkles,
  },
  {
    name: "Community Platform",
    category: "Developer Community",
    description:
      "A space for developers to learn, build and grow together. In planning phase.",
    status: "COMING SOON",
    icon: Users,
  },
];

const statusStyles: Record<ProductStatus, string> = {
  LIVE: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  BUILDING: "border-primary/30 bg-primary/10 text-primary",
  EXPERIMENT: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "COMING SOON": "border-border bg-muted text-muted-foreground",
};

export default function Building() {
  return (
    <section
      id="building"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.25em] text-primary uppercase">
            05 — What I&apos;m Building
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Ideas are easy.{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Building is the interesting part.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            From the flagship company to the products in development — here&apos;s
            what&apos;s actually being built right now.
          </p>
        </div>

        {/* ============================================================
            FEATURE CARD — CODEARN
        ============================================================ */}
        <div className="relative mt-20 md:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

            {/* Glow inside */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />

            <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-12 md:gap-12 md:p-12 lg:p-16">
              {/* Left — Info */}
              <div className="md:col-span-7">
                {/* Flag */}
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                    Flagship
                  </span>
                </div>

                {/* Name */}
                <h3 className="mt-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                  Cod<span className="text-primary">Earn</span>
                </h3>

                {/* Type */}
                <p className="mt-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  Technology • Software • Products
                </p>

                {/* Description */}
                <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  A technology company built around real problems — developing
                  software products, tools and opportunities for builders,
                  businesses and the next generation of developers.
                </p>

                {/* Meta grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-border pt-6 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Status
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                      Active
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Founded
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      2024
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                      Role
                    </p>
                    <p className="mt-1 text-sm font-semibold text-foreground">
                      Founder
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Link href="https://www.codearntech.com" target="_blank">
                      Visit CodEarn
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right — Visual */}
              <div className="md:col-span-5">
                <div className="relative h-full min-h-[240px] overflow-hidden rounded-2xl border border-border bg-card">
                  {/* CodEarn brand visual — gradient + wordmark */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />

                  {/* Grid inside */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Center wordmark */}
                  <div className="relative flex h-full flex-col items-center justify-center p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 backdrop-blur-sm">
                      <Code2 className="h-8 w-8 text-primary" />
                    </div>
                    <p className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                      Cod<span className="text-primary">Earn</span>
                    </p>
                    <p className="mt-1 text-xs tracking-widest text-muted-foreground uppercase">
                      Technologies
                    </p>
                  </div>

                  {/* Corner tags */}
                  <div className="absolute bottom-4 left-4 rounded-lg border border-border bg-background/80 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase backdrop-blur">
                    Est. 2024
                  </div>
                  <div className="absolute right-4 top-4 rounded-lg border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-primary uppercase backdrop-blur">
                    Live
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
            PRODUCT GRID
        ============================================================ */}
        <div className="mt-20 md:mt-28">
          {/* Sub-heading */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Products &amp; Experiments
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Things currently being built, tested and shipped.
              </p>
            </div>
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {products.length} Active
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>

        {/* ============================================================
            BOTTOM NOTE
        ============================================================ */}
        <div className="mt-20 md:mt-28">
          <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-border bg-card/30 p-6 text-center backdrop-blur-sm md:p-8">
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              This list is intentionally honest —{" "}
              <span className="font-medium text-foreground">
                only what&apos;s actually being built
              </span>{" "}
              is shown here. Some ideas will grow, some will be replaced.
              That&apos;s the reality of building.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

function ProductCard({ product }: { product: Product }) {
  const Icon = product.icon;
  const isLive = product.status === "LIVE";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10">
      {/* Top gradient strip on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Header row — Icon + Status */}
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>

        <span
          className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase ${statusStyles[product.status]}`}
        >
          {product.status}
        </span>
      </div>

      {/* Name */}
      <h4 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
        {product.name}
      </h4>

      {/* Category */}
      <p className="mt-1 text-xs font-medium tracking-wider text-muted-foreground uppercase">
        {product.category}
      </p>

      {/* Description */}
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      {/* Footer CTA */}
      <div className="mt-5 border-t border-border pt-4">
  {product.link ? (
    <Link
      // Agar link "http" se shuru nahi hota, to "https://" khud laga dega
      href={product.link.startsWith('http') ? product.link : `https://${product.link}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group/link inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:text-primary/80"
    >
      Explore
      <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
    </Link>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground/60 uppercase">
      {isLive ? "Live" : "In Progress"}
    </span>
  )}
</div>


    </div>
  );
}