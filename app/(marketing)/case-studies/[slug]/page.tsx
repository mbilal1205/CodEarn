import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { caseStudies } from "@/lib/studydata";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
} from "@/lib/seo/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find(
    (p) => p.id.toLowerCase() === slug.toLowerCase()
  );

  if (!project) {
    return { title: "Case Study Not Found", robots: { index: false } };
  }

  const title = `${project.title} — ${project.subtitle}`;
  const description = project.challenge?.slice(0, 160) || "";
  const image = project.coverImage || SITE_OG_IMAGE;
  const url = `${SITE_URL}/case-studies/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export async function generateStaticParams() {
  return caseStudies.map((p) => ({ slug: p.id }));
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = caseStudies.find(
    (p) => p.id.toLowerCase() === slug.toLowerCase()
  );
  if (!project) notFound();

  const url = `${SITE_URL}/case-studies/${slug}`;
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.challenge,
    url,
    image: project.coverImage,
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    about: project.services,
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <JsonLd data={caseStudySchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "Case Studies", path: "/case-studies" },
          { name: project.title, path: `/case-studies/${slug}` },
        ])}
      />

      <nav className="max-w-7xl mx-auto px-6 pt-12">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-primary transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          Back to Work
        </Link>
      </nav>

      <header className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <span className="text-primary font-mono tracking-widest text-xs uppercase block mb-4 font-semibold">
          Case Study // {project.client}
        </span>
        <h1 className="text-4xl md:text-6xl font-sans font-bold tracking-tight max-w-5xl leading-tight">
          {project.title}:{" "}
          <span className="text-muted-foreground font-light">
            {project.subtitle}
          </span>
        </h1>
      </header>

      {project.coverImage && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="relative w-full h-[40vh] md:h-[65vh] rounded-[2rem] overflow-hidden border border-border/60 shadow-xl">
            <Image
              src={project.coverImage}
              alt={`${project.title} platform showcase`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-12 border-y border-border/60">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Client
          </div>
          <div className="text-base font-semibold">{project.client}</div>
        </div>
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Timeline
          </div>
          <div className="text-base font-semibold">{project.timeline}</div>
        </div>
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Core Services
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {(project.services || []).map((service) => (
              <span
                key={service}
                className="text-[11px] bg-muted px-2.5 py-1 rounded-md font-medium text-foreground/80 border border-border/40"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            Tech Architecture
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {(project.techStack || []).map((tech) => (
              <span
                key={tech}
                className="text-[11px] bg-primary/10 text-primary px-2.5 py-1 rounded-md font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-24 space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-xl font-mono text-muted-foreground uppercase tracking-widest pt-1">
            01 / The Obstacle
          </h2>
          <div className="md:col-span-2 space-y-6 text-lg font-light leading-relaxed text-foreground/80">
            <p className="text-xl font-normal text-foreground leading-normal mb-4">
              {project.challenge}
            </p>
            {(project.detailedChallenge || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-xl font-mono text-primary uppercase tracking-widest pt-1">
            02 / Our Strategy
          </h2>
          <div className="md:col-span-2 space-y-6 text-lg font-light leading-relaxed text-foreground/80">
            <p className="text-xl font-normal text-foreground leading-normal mb-4">
              {project.solution}
            </p>
            {(project.detailedSolution || []).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/40">
            <h2 className="text-xl font-mono text-muted-foreground uppercase tracking-widest pt-1">
              03 / Key Milestones
            </h2>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.keyFeatures.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-muted/40 rounded-2xl border border-border/40"
                >
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-mono font-bold mt-0.5">
                    ✓
                  </span>
                  <span className="text-sm font-medium leading-tight text-foreground/90">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {project.metrics && project.metrics.length > 0 && (
        <section className="bg-muted/50 border-y border-border/40 py-20 my-12">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {project.metrics.map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-6xl md:text-8xl font-sans font-bold tracking-tighter text-primary">
                    {m.value}
                  </div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8 text-center md:text-left">
            Interface Previews & Architecture Schematics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.galleryImages.map((imgUrl, i) => (
              <div
                key={i}
                className="relative w-full h-64 rounded-2xl overflow-hidden border border-border/40 group shadow-md"
              >
                <Image
                  src={imgUrl}
                  alt={`${project.title} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {project.testimonial && (
        <section className="max-w-4xl mx-auto px-6 py-24 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-12 h-12 text-primary/20 mx-auto mb-8"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.85h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.85h4v10h-10z" />
          </svg>
          <blockquote className="text-2xl md:text-3xl font-sans font-light italic leading-normal text-foreground/90">
            &ldquo;{project.testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-8 flex flex-col items-center gap-3">
            {project.testimonial.avatarUrl && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-primary/20">
                <Image
                  src={project.testimonial.avatarUrl}
                  alt={project.testimonial.author}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="font-sans font-bold text-lg leading-snug">
                {project.testimonial.author}
              </div>
              <div className="text-sm font-mono text-muted-foreground">
                {project.testimonial.role}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="bg-foreground text-background dark:bg-card dark:text-foreground rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-sans font-bold tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to build something iconic together?
          </h2>
          <p className="mt-4 text-lg text-background/70 dark:text-muted-foreground max-w-md mx-auto font-light">
            Let&apos;s engineer your vision into high-performance architecture.
          </p>
          <div className="mt-10">
            <Link
              href="/book-call"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-sans font-semibold px-8 py-4 rounded-full transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20"
            >
              Book a Free Strategy Call
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}