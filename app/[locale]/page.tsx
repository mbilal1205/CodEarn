import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/home/hero";
import { TrustedBy } from "@/components/sections/home/TrustedBy";
import { ProblemsWeSolve } from "@/components/sections/home/ProblemsWeSolve";
import { SolutionsEngine } from "@/components/sections/home/TechCanvasVisual";
import { WhyCodEarnPinned } from "@/components/sections/home/WhyCodEarn";
import { EliteQuantumCTA } from "@/components/sections/home/QuantumMobileCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  return {
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustedBy />
      <ProblemsWeSolve />
      <SolutionsEngine />
      <WhyCodEarnPinned />
      <EliteQuantumCTA />
    </>
  );
}