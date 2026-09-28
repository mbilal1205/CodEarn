"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FolderGit2,
  Package,
  Calendar,
  Users,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Metric = {
  value: string;
  label: string;
  icon: React.ElementType;
};

type Project = {
  name: string;
  category: string;
  description: string;
  tech: string[];
  status: "Live" | "Building" | "Archived";
  link?: string;
};

const metrics: Metric[] = [
  { value: "25+", label: "Projects Built", icon: FolderGit2 },
  { value: "8+", label: "Products & Experiments", icon: Package },
  { value: "6", label: "Years Building", icon: Calendar },
  { value: "5K+", label: "Developers Reached", icon: Users },
];

const projects: Project[] = [
  {
    name: "GigThink",
    category: "AI SaaS",
    description:
      "AI-powered workflow platform for freelancers and agencies — proposals, clients and delivery in one place.",
    tech: ["Next.js", "Node.js", "OpenAI", "MongoDB"],
    status: "Live",
    link: "gigthink.com",
  },
  {
    name: "CodEarn Platform",
    category: "Web Platform",
    description:
      "The flagship CodEarn website and product ecosystem — the digital home of the company.",
    tech: ["Next.js", "Tailwind", "MongoDB"],
    status: "Live",
    link: "https://www.codearntech.com",
  },
  {
    name: "Client SaaS Dashboard",
    category: "Business Tool",
    description:
      "Custom SaaS dashboard built for a business client — analytics, invoicing and team management.",
    tech: ["React", "Express", "PostgreSQL"],
    status: "Live",
  },
  {
    name: "Developer Tooling",
    category: "Open Source",
    description:
      "Small developer utilities and scripts used for automation and workflow efficiency.",
    tech: ["Node.js", "TypeScript"],
    status: "Archived",
  },
  {
    name: "E-commerce Module",
    category: "Full-Stack",
    description:
      "End-to-end e-commerce module with cart, checkout and payment integration.",
    tech: ["Next.js", "Stripe", "MongoDB"],
    status: "Live",
  },
  {
    name: "New SaaS Product",
    category: "In Development",
    description:
      "Currently in active development. Details will be shared once the beta is ready.",
    tech: ["Next.js", "Prisma"],
    status: "Building",
  },
];

const statusStyles: Record<Project["status"], string> = {
  Live: "border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400",
  Building: "border-primary/30 bg-primary/10 text-primary",
  Archived: "border-border bg-muted text-muted-foreground",
};

export default function Shipped() {
  return (
    <section
      id="work"
      className="relative w-full overflow-hidden bg-background py-24 md:py-32"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/10" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-primary/5 blur-[120px] dark:bg-primary/10" />
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
            06 — Built / Shipped
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Things I&apos;ve{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              actually built.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Not concepts. Not ideas. Real work that shipped, solved problems and
            left evidence behind.
          </p>
        </div>

        {/* ============================================================
            METRICS
        ============================================================ */}
        <div className="mt-20 md:mt-24">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10 md:p-8"
              >
                {/* Top strip on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                  <metric.icon className="h-4 w-4 text-primary" />
                </div>

                {/* Value */}
                <p className="mt-5 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {metric.value}
                </p>

                {/* Label */}
                <p className="mt-1 text-xs font-medium tracking-wider text-muted-foreground uppercase md:text-sm">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>

          {/* Verified note */}
          <p className="mt-6 text-center text-xs text-muted-foreground/70">
            * Numbers updated as new work ships.
          </p>
        </div>

        {/* ============================================================
            PROJECTS GRID
        ============================================================ */}
        <div className="mt-24 md:mt-32">
          {/* Sub-heading */}
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                Selected Work
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                A snapshot of products, tools and platforms I&apos;ve built.
              </p>
            </div>
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {projects.length} Projects
            </span>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>

        {/* ============================================================
            FEATURED CASE STUDY — GIGTHINK
        ============================================================ */}
        <div className="mt-24 md:mt-32">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 backdrop-blur-sm">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

            {/* Glow */}
            <div className="pointer-events-none absolute -left-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />

            <div className="grid grid-cols-1 gap-10 p-8 md:grid-cols-12 md:gap-12 md:p-12 lg:p-16">
              {/* Left — Info */}
              <div className="md:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                    Featured Case Study
                  </span>
                </div>

                <h3 className="mt-6 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  GigThink
                </h3>

                <p className="mt-2 text-sm font-medium tracking-wider text-muted-foreground uppercase">
                  AI SaaS • Freelancers &amp; Agencies
                </p>

                <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                  GigThink started from a simple frustration — freelancers
                  spending more time managing clients than doing the work they
                  love. The product turned that frustration into an AI-powered
                  workflow platform.
                </p>

                {/* Tech stack */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Next.js", "Node.js", "OpenAI", "MongoDB", "Stripe"].map(
                    (tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Button
                    asChild
                    size="lg"
                    className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    <Link href="https://www.codearntech.com/case-studies">
                      Read Case Study
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right — Case Study Flow */}
              <div className="md:col-span-7">
                <div className="space-y-4">
                  <CaseStep
                    number="01"
                    label="Problem"
                    text="Freelancers were drowning in admin work — proposals, follow-ups, invoices, project tracking — instead of doing the work they were paid for."
                  />
                  <CaseStep
                    number="02"
                    label="What I Built"
                    text="An AI workflow platform that handles client communication, proposals and delivery tracking in one unified workspace."
                  />
                  <CaseStep
                    number="03"
                    label="How It Works"
                    text="Users define their workflow once. GigThink's AI handles repetitive tasks, drafts responses and keeps everything organized in real time."
                  />
                  <CaseStep
                    number="04"
                    label="Outcome"
                    text="Freelancers reclaim hours every week. Clients get faster, cleaner communication. The work finally feels like work again."
                    highlight
                  />
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10">
      {/* Top gradient strip on hover */}
      <div className="absolute inset-x-0 top-0 z-10 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Project visual / placeholder */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-border bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
        {/* Grid inside */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Center icon */}
        <div className="relative flex h-full items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/30 bg-background/70 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
            <Layers className="h-6 w-6 text-primary" />
          </div>
        </div>

        {/* Status chip */}
        <div className="absolute right-3 top-3">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase backdrop-blur-sm ${
              statusStyles[project.status]
            }`}
          >
            {project.status}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        {/* Category */}
        <p className="text-xs font-medium tracking-wider text-primary uppercase">
          {project.category}
        </p>

        {/* Name */}
        <h4 className="mt-2 text-lg font-semibold tracking-tight text-foreground">
          {project.name}
        </h4>

        {/* Description */}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border bg-background/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-5 border-t border-border pt-4">
  {project.link ? (
    <Link
      // Agar link "http" se shuru nahi hota, to "https://" khud laga dega taake localhost ka masla na aaye
      href={project.link.startsWith("http") ? project.link : `https://${project.link}`}
      target="_blank" // 👈 Hamesha naye tab mein open karne ke liye
      rel="noopener noreferrer" // 👈 Security aur performance ke liye
      className="group/link inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-primary uppercase transition-colors hover:text-primary/80"
    >
      View Project
      <ArrowRight className="h-3 w-3 transition-transform group-hover/link:translate-x-1" />
    </Link>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-muted-foreground/60 uppercase">
      {project.status === "Building" ? "In Progress" : "Private"}
    </span>
  )}
</div>

      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */

function CaseStep({
  number,
  label,
  text,
  highlight,
}: {
  number: string;
  label: string;
  text: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative flex gap-4 rounded-2xl border p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 ${
        highlight
          ? "border-primary/30 bg-primary/5 hover:bg-primary/10"
          : "border-border bg-card/40 hover:border-primary/30 hover:bg-card/70"
      }`}
    >
      {/* Number */}
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-xs font-bold text-primary">
        {number}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p
          className={`text-xs font-semibold tracking-widest uppercase ${
            highlight ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {label}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-foreground/90 md:text-base">
          {text}
        </p>
      </div>
    </div>
  );
}