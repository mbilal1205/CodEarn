"use client";

import Link from "next/link";
import {
  Linkedin,
  Github,
  Twitter,
  Globe,
  Building2,
  User,
  MapPin,
  Rocket,
  Users,
  GitBranch,
  Code2,
  Code,
  MessageCircle,
  Facebook,
  Instagram,
  Youtube,
  UserCircle,
  Mail,
  ArrowUpRight,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Profile = {
  name: string;
  handle: string;
  purpose: string;
  icon: React.ElementType;
  link: string;
  comingSoon?: boolean;
};

/* ============================================================
   FEATURED — 4 major profiles
============================================================ */
const featured: Profile[] = [
  {
    name: "LinkedIn",
    handle: "in/mbilal1205",
    purpose: "Founder & professional network",
    icon: Linkedin,
    link: "https://linkedin.com/in/mbilal1205",
  },
  {
    name: "GitHub",
    handle: "@mbilal1205",
    purpose: "Code & open-source work",
    icon: Github,
    link: "https://github.com/mbilal1205",
  },
  {
    name: "X",
    handle: "@mbilal1205",
    purpose: "Founder thoughts / build in public",
    icon: Twitter,
    link: "https://x.com/mbilal1205",
  },
  {
    name: "Website",
    handle: "codearntech.com",
    purpose: "Complete professional identity",
    icon: Globe,
    link: "https://www.codearntech.com",
  },
];

/* ============================================================
   PROFESSIONAL & BUSINESS
============================================================ */
const professional: Profile[] = [
  {
    name: "LinkedIn Company",
    handle: "CodEarn",
    purpose: "Company page",
    icon: Building2,
    link: "#",
    comingSoon: true,
  },
  {
    name: "About.me",
    handle: "@mbilal1205",
    purpose: "Professional profile",
    icon: User,
    link: "https://about.me/mbilal1205",
  },
  {
    name: "Product Hunt",
    handle: "@mbilal1205",
    purpose: "Products & launches",
    icon: Rocket,
    link: "https://www.producthunt.com/mbilal1205",
  },
  {
    name: "Indie Hackers",
    handle: "@mbilal1205",
    purpose: "Founder & startup community",
    icon: Users,
    link: "https://www.indiehackers.com/mbilal1205",
  },
];

/* ============================================================
   DEVELOPER & TECH
============================================================ */
const developer: Profile[] = [
  {
    name: "GitHub",
    handle: "@mbilal1205",
    purpose: "Code & repositories",
    icon: Github,
    link: "https://github.com/mbilal1205",
  },
  {
    name: "GitLab",
    handle: "@mbilal1205",
    purpose: "Code hosting & collaboration",
    icon: GitBranch,
    link: "https://gitlab.com/mbilal1205",
  },
  {
    name: "Stack Overflow",
    handle: "users/muhammad-bilal",
    purpose: "Developer profile & contributions",
    icon: Code2,
    link: "https://stackoverflow.com/users/33140468/muhammad-bilal",
  },
];

/* ============================================================
   SOCIAL & COMMUNITY
============================================================ */
const social: Profile[] = [
  {
    name: "X",
    handle: "@mbilal1205",
    purpose: "Founder thoughts",
    icon: Twitter,
    link: "https://x.com/mbilal1205",
  },
  {
    name: "Reddit",
    handle: "u/mbilal1205",
    purpose: "Tech & community participation",
    icon: MessageCircle,
    link: "https://reddit.com/mbilal1205",
  },
  {
    name: "Facebook",
    handle: "CodEarn",
    purpose: "Page & updates",
    icon: Facebook,
    link: "https://facebook.com/",
  },
  {
    name: "Instagram",
    handle: "@mbilal1205",
    purpose: "Founder & company content",
    icon: Instagram,
    link: "https://instagram.com/mbilal12051",
  },
  {
    name: "YouTube",
    handle: "@mbilal1205",
    purpose: "Videos & educational content",
    icon: Youtube,
    link: "https://youtube.com/mbilal12051",
  },
];

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function FindOnline() {
  return (
    <section
      id="connect"
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
            07 — Find Me Online
          </span>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Connect, follow,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              explore.
            </span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            Find my work, ideas, code and professional journey across the
            platforms where I build and share.
          </p>
        </div>

        {/* ============================================================
            FEATURED PROFILES
        ============================================================ */}
        <div className="mt-20 md:mt-28">
          <CategoryHeading
            label="Featured"
            title="Start here"
            icon={Sparkles}
          />

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((profile) => (
              <FeaturedCard key={profile.name + profile.handle} profile={profile} />
            ))}
          </div>
        </div>

        {/* ============================================================
            PROFESSIONAL & BUSINESS
        ============================================================ */}
        <div className="mt-20 md:mt-24">
          <CategoryHeading
            label="Professional & Business"
            title="Where I work & build"
          />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {professional.map((profile) => (
              <StandardCard key={profile.name + profile.handle} profile={profile} />
            ))}
          </div>
        </div>

        {/* ============================================================
            DEVELOPER & TECH
        ============================================================ */}
        <div className="mt-20 md:mt-24">
          <CategoryHeading
            label="Developer & Tech"
            title="Code & contributions"
          />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {developer.map((profile) => (
              <StandardCard key={profile.name + profile.handle} profile={profile} />
            ))}
          </div>
        </div>

        {/* ============================================================
            SOCIAL & COMMUNITY
        ============================================================ */}
        <div className="mt-20 md:mt-24">
          <CategoryHeading
            label="Social & Community"
            title="Follow the journey"
          />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {social.map((profile) => (
              <StandardCard key={profile.name + profile.handle} profile={profile} />
            ))}
          </div>
        </div>

        

        {/* ============================================================
            CONTACT — Final CTA
        ============================================================ */}
        <div className="mt-20 md:mt-28">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-card via-card to-primary/5 p-8 backdrop-blur-sm md:p-12 lg:p-16">
            {/* Top accent line */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

            {/* Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-[300px] w-[300px] rounded-full bg-primary/20 blur-[100px]" />

            <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-12">
              {/* Left — Info */}
              <div className="md:col-span-8">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <Mail className="h-3 w-3 text-primary" />
                  <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                    Contact
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
                  Want to talk business, products or technology?
                </h3>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
                  Whether you have a project, a collaboration idea, or just want
                  to say hello — my inbox is open.
                </p>
              </div>

              {/* Right — CTA */}
              <div className="md:col-span-4 md:text-right">
                <Button
                  asChild
                  size="lg"
                  className="group h-12 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                >
                  <Link href="https://www.codearntech.com/contact">
                    Start a Conversation
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SUB-COMPONENTS
============================================================ */

function CategoryHeading({
  label,
  title,
  icon: Icon,
}: {
  label: string;
  title: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="flex flex-col gap-2 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 bg-primary/10">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        )}
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase">
            {label}
          </p>
          <h3 className="mt-1 text-lg font-semibold tracking-tight text-foreground md:text-xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}

function FeaturedCard({ profile }: { profile: Profile }) {
  const Icon = profile.icon;
  const isDisabled = profile.comingSoon;

  const content = (
    <>
      {/* Top gradient strip on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon + Arrow row */}
      <div className="flex items-start justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
          <Icon className="h-6 w-6 text-primary" />
        </div>

        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/50 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
        </div>
      </div>

      {/* Name */}
      <h4 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
        {profile.name}
      </h4>

      {/* Handle */}
      <p className="mt-1 font-mono text-xs text-primary">{profile.handle}</p>

      {/* Purpose */}
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {profile.purpose}
      </p>
    </>
  );

  if (isDisabled) {
    return (
      <div className="group relative flex h-full cursor-not-allowed flex-col overflow-hidden rounded-2xl border border-border bg-card/30 p-6 opacity-60 backdrop-blur-sm">
        {content}
        <div className="absolute right-4 top-4 rounded-full border border-border bg-background px-2.5 py-0.5 text-[10px] font-semibold tracking-widest text-muted-foreground uppercase">
          Coming Soon
        </div>
      </div>
    );
  }

  return (
    <Link
      href={profile.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-xl hover:shadow-primary/10"
    >
      {content}
    </Link>
  );
}

function StandardCard({ profile }: { profile: Profile }) {
  const Icon = profile.icon;
  const isDisabled = profile.comingSoon;

  const content = (
    <>
      {/* Top gradient strip on hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Icon + Arrow */}
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-105 group-hover:border-primary/40">
          <Icon className="h-4.5 w-4.5 text-primary" />
        </div>

        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
      </div>

      {/* Name */}
      <h4 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
        {profile.name}
      </h4>

      {/* Handle */}
      <p className="mt-0.5 truncate font-mono text-[11px] text-primary">
        {profile.handle}
      </p>

      {/* Purpose */}
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {profile.purpose}
      </p>
    </>
  );

  if (isDisabled) {
    return (
      <div className="group relative flex h-full cursor-not-allowed flex-col overflow-hidden rounded-xl border border-border bg-card/30 p-5 opacity-60 backdrop-blur-sm">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={profile.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-card hover:shadow-lg hover:shadow-primary/10"
    >
      {content}
    </Link>
  );
}