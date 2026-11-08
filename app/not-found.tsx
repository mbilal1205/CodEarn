// app/not-found.tsx
import Link from "next/link";

export const metadata = {
  title: "Page not found | CodEarn Tech",
  robots: { index: false, follow: false },
};

export default function RootNotFound() {
  return (
    <div
      style={{
        minHeight: "100vh", // 👈 White space khatam karne ke liye 100vh kiya
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem 1rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        background: "#0F172A", // Dark background fixed
        color: "#F8FAFC",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem", margin: "0 auto" }}>
        <p
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#94A3B8",
            marginBottom: "1rem",
          }}
        >
          Page not found
        </p>

        <h1
          style={{
            fontSize: "5rem",
            fontWeight: 800,
            letterSpacing: "-0.05em",
            margin: "0 0 1rem 0",
            color: "#F8FAFC",
          }}
        >
          404
        </h1>

        <p
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            color: "#94A3B8",
            marginBottom: "2rem",
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.75rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/en"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "#2563EB",
              color: "#F8FAFC",
              borderRadius: "9999px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            English home
          </Link>

          <Link
            href="/ar"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              background: "transparent",
              color: "#F8FAFC",
              border: "1px solid #334155",
              borderRadius: "9999px",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.875rem",
            }}
          >
            الصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}