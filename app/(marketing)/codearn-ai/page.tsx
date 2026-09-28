import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ChatContainer from "@/components/codearn-ai/chat-container";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  SITE_URL,
  SITE_NAME,
  SITE_OG_IMAGE,
  buildBreadcrumbs,
  organizationSchema,
} from "@/lib/seo/site";

export const metadata: Metadata = {
  title: "CodEarn AI — Ask Anything About CodEarn Tech",
  description:
    "Chat with CodEarn AI, the official assistant. Ask about our SaaS products, services, training programs, and everything CodEarn Tech builds.",
  keywords: [
    "CodEarn AI",
    "AI assistant",
    "software company AI",
    "AI chatbot CodEarn",
    "tech assistant",
  ],
  alternates: { canonical: "/codearn-ai" },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/codearn-ai`,
    title: "CodEarn AI — Official Assistant",
    description: "Ask anything about CodEarn Tech.",
    images: [{ url: SITE_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
};

const aiSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CodEarn AI",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: `${SITE_URL}/codearn-ai`,
  description:
    "Official AI assistant for CodEarn Tech. Answers questions about products, services, and training.",
  author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
};

export default function CodEarnAIPage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <JsonLd data={organizationSchema()} />
      <JsonLd data={aiSchema} />
      <JsonLd
        data={buildBreadcrumbs([
          { name: "Home", path: "/" },
          { name: "CodEarn AI", path: "/codearn-ai" },
        ])}
      />

      <div className="shrink-0 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back
          </Link>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
              Live
            </span>
          </div>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ChatContainer variant="page" />
      </div>
    </main>
  );
}