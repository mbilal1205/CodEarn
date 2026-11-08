import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { caseStudies } from "@/lib/case-studies";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
} from "@/lib/seo/site";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = ["en", "ar"];
  return locales.flatMap((locale) =>
    caseStudies.map((p) => ({ locale, slug: p.id })),
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = caseStudies.find(
    (p) => p.id.toLowerCase() === slug.toLowerCase(),
  );

  if (!project) {
    return { title: "Case Study Not Found", robots: { index: false } };
  }

  const isArabic = locale === "ar";
  const title = isArabic ? project.title.ar : project.title.en;
  const subtitle = isArabic ? project.subtitle.ar : project.subtitle.en;
  const description =
    (isArabic ? project.challenge.ar : project.challenge.en).slice(0, 160);
  const image = project.coverImage || SITE_OG_IMAGE;
  const url = `${SITE_URL}/${locale}/case-studies/${slug}`;

  return {
    title: `${title} — ${SITE_NAME}`,
    description,
    alternates: {
      canonical: `/${locale}/case-studies/${slug}`,
      languages: {
        en: `/en/case-studies/${slug}`,
        ar: `/ar/case-studies/${slug}`,
        "x-default": `/en/case-studies/${slug}`,
      },
    },
    openGraph: {
      type: "article",
      locale: isArabic ? "ar_AE" : "en_AE",
      url,
      siteName: SITE_NAME,
      title: `${title} — ${subtitle}`,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function CaseStudyDetailPage({
  params,
}: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = caseStudies.find(
    (p) => p.id.toLowerCase() === slug.toLowerCase(),
  );
  if (!project) notFound();

  const t = await getTranslations({ locale, namespace: "Work.detail" });
  const isArabic = locale === "ar";
  const title = isArabic ? project.title.ar : project.title.en;
  const subtitle = isArabic ? project.subtitle.ar : project.subtitle.en;
  const client = isArabic ? project.client.ar : project.client.en;
  const timeline = isArabic ? project.timeline.ar : project.timeline.en;
  const challenge = isArabic ? project.challenge.ar : project.challenge.en;
  const detailedChallenge = isArabic
    ? project.detailedChallenge.ar
    : project.detailedChallenge.en;
  const solution = isArabic ? project.solution.ar : project.solution.en;
  const detailedSolution = isArabic
    ? project.detailedSolution.ar
    : project.detailedSolution.en;
  const keyFeatures = isArabic
    ? project.keyFeatures.ar
    : project.keyFeatures.en;
  const services = project.services.map((s) => (isArabic ? s.ar : s.en));

  const url = `${SITE_URL}/${locale}/case-studies/${slug}`;
  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description: challenge,
    url,
    inLanguage: locale,
    image: project.coverImage || SITE_OG_IMAGE,
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    about: services,
    keywords: project.techStack.join(", "),
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <JsonLd data={caseStudySchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: `/${locale}` },
          { name: "Work", path: `/${locale}/case-studies` },
          { name: title, path: `/${locale}/case-studies/${slug}` },
        ])}
      />

      {/* Back nav */}
      <nav className="max-w-7xl mx-auto px-6 pt-28 md:pt-32">
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
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:translate-x-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          {t("backToWork")}
        </Link>
      </nav>

      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 pt-10 pb-16">
        <span className="text-primary font-mono tracking-widest text-xs uppercase block mb-4 font-semibold">
          {t("caseStudyLabel")} // {client}
        </span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight max-w-5xl leading-tight">
          {title}:{" "}
          <span className="text-muted-foreground font-light">{subtitle}</span>
        </h1>

        {project.liveUrl && (
          <div className="mt-6">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
            >
              {t("liveSite")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5 rtl:-scale-x-100"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        )}
      </header>

      {/* Cover image (only if present) */}
      {project.coverImage && (
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="relative w-full h-[40vh] md:h-[65vh] rounded-[2rem] overflow-hidden border border-border/60 shadow-xl">
            <Image
              src={project.coverImage}
              alt={title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          </div>
        </section>
      )}

      {/* Meta strip */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 py-12 border-y border-border/60">
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            {t("client")}
          </div>
          <div className="text-base font-semibold">{client}</div>
        </div>
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            {t("timeline")}
          </div>
          <div className="text-base font-semibold">{timeline}</div>
        </div>
        <div>
          <div className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-1">
            {t("services")}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {services.map((service) => (
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
            {t("techStack")}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {project.techStack.map((tech) => (
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

      {/* Challenge / Solution / Features */}
      <section className="max-w-5xl mx-auto px-6 py-24 space-y-24">
        {/* Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-xl font-mono text-muted-foreground uppercase tracking-widest pt-1">
            01 / {t("challengeHeading")}
          </h2>
          <div className="md:col-span-2 space-y-6 text-lg font-light leading-relaxed text-foreground/80">
            <p className="text-xl font-normal text-foreground leading-normal mb-4">
              {challenge}
            </p>
            {detailedChallenge.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Solution */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <h2 className="text-xl font-mono text-primary uppercase tracking-widest pt-1">
            02 / {t("solutionHeading")}
          </h2>
          <div className="md:col-span-2 space-y-6 text-lg font-light leading-relaxed text-foreground/80">
            <p className="text-xl font-normal text-foreground leading-normal mb-4">
              {solution}
            </p>
            {detailedSolution.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>

        {/* Key features */}
        {keyFeatures.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border/40">
            <h2 className="text-xl font-mono text-muted-foreground uppercase tracking-widest pt-1">
              03 / {t("featuresHeading")}
            </h2>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {keyFeatures.map((feature, i) => (
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

      {/* Metrics (only if real and factual) */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="bg-muted/50 border-y border-border/40 py-20 my-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center">
              {project.metrics.map((m, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-6xl md:text-8xl font-bold tracking-tighter text-primary">
                    {m.value}
                  </div>
                  <div className="text-sm font-mono text-muted-foreground uppercase tracking-widest">
                    {isArabic ? m.label.ar : m.label.en}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery (only if present) */}
      {project.galleryImages && project.galleryImages.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-8">
            {t("galleryHeading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.galleryImages.map((imgUrl, i) => (
              <div
                key={i}
                className="relative w-full h-64 rounded-2xl overflow-hidden border border-border/40 group shadow-md"
              >
                <Image
                  src={imgUrl}
                  alt={`${title} — screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-32 pt-12">
        <div className="bg-foreground text-background dark:bg-card dark:text-foreground rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 end-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
            {t("ctaHeading")}
          </h2>
          <p className="mt-4 text-lg text-background/70 dark:text-muted-foreground max-w-md mx-auto font-light">
            {t("ctaDescription")}
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all hover:bg-primary/90 hover:scale-[1.02] shadow-lg shadow-primary/20"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}