import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations, getLocale } from "next-intl/server";
import { caseStudies } from "@/lib/case-studies";

export default async function CaseStudiesListing() {
  const t = await getTranslations("Work.listing");
  const locale = await getLocale();
  const isArabic = locale === "ar";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-32 pb-20 text-center md:text-start">
        <span className="text-primary font-mono tracking-widest text-sm uppercase block mb-3 font-semibold">
          {t("badge")}
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl leading-tight">
          {t("headingLine1")} <br className="hidden md:inline" />
          <span className="text-muted-foreground">
            {t("headingLine2")}
          </span>
        </h1>
        <p className="mt-6 text-xl text-muted-foreground max-w-2xl font-light">
          {t("description")}
        </p>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        {caseStudies.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">
            {t("emptyState")}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {caseStudies.map((project, index) => {
              const isLarge = index === 0;
              const title = isArabic ? project.title.ar : project.title.en;
              const subtitle = isArabic
                ? project.subtitle.ar
                : project.subtitle.en;
              const client = isArabic ? project.client.ar : project.client.en;

              return (
                <Link
                  href={`/case-studies/${project.id}`}
                  key={project.id}
                  className={`group relative rounded-[2rem] overflow-hidden border border-border/80 bg-card p-8 md:p-10 flex flex-col justify-between transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] hover:border-primary/20 hover:-translate-y-1 ${
                    isLarge ? "md:col-span-2 min-h-[32rem]" : "min-h-[26rem]"
                  }`}
                >
                  {/* Cover image (only if present) */}
                  {project.coverImage && (
                    <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-50 transition-opacity duration-500 mix-blend-luminosity dark:mix-blend-overlay">
                      <Image
                        src={project.coverImage}
                        alt={title}
                        fill
                        sizes={
                          isLarge
                            ? "(max-w-768px) 100vw, 66vw"
                            : "(max-w-768px) 100vw, 33vw"
                        }
                        priority={index === 0}
                        className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/90 to-transparent" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="relative z-10 w-full">
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-muted/60 dark:bg-muted/20 backdrop-blur-md px-3 py-1 rounded-full">
                        {client}
                      </span>
                      <span className="text-muted-foreground group-hover:text-primary transition-all duration-300 rtl:-scale-x-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-y-1 transition-transform"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                      </span>
                    </div>
                    <h3
                      className={`font-bold text-foreground mt-6 tracking-tight ${
                        isLarge ? "text-3xl md:text-5xl" : "text-2xl"
                      }`}
                    >
                      {title}
                    </h3>
                    <p className="mt-3 text-muted-foreground font-light text-base max-w-lg leading-relaxed">
                      {subtitle}
                    </p>
                  </div>

                  {/* Metrics (only factual deliverables) */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="relative z-10 mt-12 pt-6 border-t border-border/40 flex items-center gap-8">
                      {project.metrics.slice(0, 2).map((metric, idx) => (
                        <div key={idx} className="space-y-0.5">
                          <div className="text-2xl md:text-3xl font-bold tracking-tight text-primary">
                            {metric.value}
                          </div>
                          <div className="text-[10px] font-mono tracking-widest text-muted-foreground uppercase">
                            {isArabic ? metric.label.ar : metric.label.en}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}