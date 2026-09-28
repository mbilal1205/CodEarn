import { Hero } from "@/components/sections/home/hero"
import type { Metadata } from "next"
import { TrustedBy } from "@/components/sections/home/TrustedBy"
import { ProblemsWeSolve } from "@/components/sections/home/ProblemsWeSolve"
import { SolutionsEngine } from "@/components/sections/home/TechCanvasVisual"
import { CaseStudiesMatrix } from "@/components/sections/home/CaseStudiesMatrix"
import { WhyCodEarnPinned } from "@/components/sections/home/WhyCodEarn"
import { AcademyUniversalDeck } from "@/components/sections/home/AcademyPreview"
import { UnifiedTestimonials } from "@/components/sections/home/UnifiedTestimonials"
import { EliteQuantumCTA } from "@/components/sections/home/QuantumMobileCTA"
// ✅ PAGE-SPECIFIC METADATA
export const metadata: Metadata = {
  title: "CodEarn | SaaS Development & Software Solutions in Pakistan",
  description: "Leading software company in Samundri, Pakistan specializing in SaaS development, custom web apps, and practical training with guaranteed internships. 4+ years experience, 3-month project support.",
  keywords: [
    "SaaS development Pakistan",
    "software company Samundri",
    "web development services",
    "programming training internship",
    "custom software solutions",
    "backend development courses"
  ],
  openGraph: {
    title: "CodEarn | Transform Ideas Into Digital Reality",
    description: "SaaS development, custom web apps, and practical training with guaranteed internships. Start your journey today!",
    url: "https://www.codearntech.com",
    type: "website",
  },
  alternates: {
    canonical: "https://www.codearntech.com",
  },
}

export default function Home() {
  return (
    <>
      {/* ✅ Add structured data for homepage if needed */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "CodEarn - Home",
            description: "Leading software development company in Pakistan",
            url: "https://www.codearntech.com",
            mainEntity: {
              "@type": "Organization",
              name: "CodEarn",
            },
          }),
        }}
      />
      <Hero />
      <TrustedBy/>
      <ProblemsWeSolve/>
      <SolutionsEngine/>
      {/* <CaseStudiesMatrix/> */}
      <WhyCodEarnPinned/>
      <AcademyUniversalDeck/>
      {/* <UnifiedTestimonials/> */}
      <EliteQuantumCTA/>
    </>
  )
}