// components/layout/layout-wrapper.tsx

"use client";

import { usePathname } from "@/i18n/navigation";
import { shouldHideGlobalLayout } from "@/lib/route-config";
import {Navbar} from "@/components/layout/navbar";   // ← tumhara actual path
import {Footer} from "@/components/layout/footer";   // ← tumhara actual path
// baaki imports...

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  /* ============================================================
     FULLSCREEN ROUTES — hide navbar + footer
  ============================================================ */
  if (shouldHideGlobalLayout(pathname)) {
    return <main className="min-h-screen">{children}</main>;
  }

  /* ============================================================
     NORMAL LAYOUT — with navbar + footer
  ============================================================ */
  return (
    <>
      <Navbar />
      {/* tumhara existing structure jaisa tha waisa hi rakho */}
      {children}
      <Footer />
    </>
  );
}