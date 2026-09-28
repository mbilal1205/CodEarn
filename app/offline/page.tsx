// app/offline/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "You're Offline | CodEarn Tech",
  robots: { index: false, follow: false },
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground px-6">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-2xl">📡</span>
        </div>
        <h1 className="text-3xl font-bold mb-3 tracking-tight">
          You&apos;re offline
        </h1>
        <p className="text-muted-foreground mb-8">
          Check your internet connection and try again. Some parts of CodEarn
          Tech are still available.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all"
        >
          Try Again
        </Link>
      </div>
    </main>
  );
}