import { redirect } from "next/navigation";

/**
 * Legacy /solutions URL — permanently redirected to /services.
 * Kept for backwards compatibility with old inbound links and search results.
 */
export default async function LegacySolutionsRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/services`);
}