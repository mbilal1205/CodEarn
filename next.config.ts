import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* ------------------------------------------------------------------ */
  /* Performance                                                         */
  /* ------------------------------------------------------------------ */
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  compiler: {
    // Production mein console logs hatao (TBT reduce)
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  /* ------------------------------------------------------------------ */
  /* Images                                                              */
  /* ------------------------------------------------------------------ */
  images: {
    qualities: [70, 75, 80, 85, 90, 95],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  /* Redirects (www -> non-www + old domain)                             */
  /* ------------------------------------------------------------------ */
  async redirects() {
    return [
      // www -> non-www (primary domain)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.codearntech.com" }],
        destination: "https://codearntech.com/:path*",
        permanent: true,
      },
      // Old domain redirect — replace OLD_DOMAIN.com with your previous domain
      {
        source: "/:path*",
        has: [{ type: "host", value: "OLD_DOMAIN.com" }],
        destination: "https://codearntech.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.OLD_DOMAIN.com" }],
        destination: "https://codearntech.com/:path*",
        permanent: true,
      },
      // Legacy route fixes
      {
        source: "/blog",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog/:slug",
        destination: "/blogs/:slug",
        permanent: true,
      },
    ];
  },

  /* ------------------------------------------------------------------ */
  /* Headers (Security + PWA caching)                                    */
  /* ------------------------------------------------------------------ */
  async headers() {
    return [
      // ---------- Manifest caching ----------
      {
        source: "/manifest.webmanifest",
        headers: [
          { key: "Content-Type", value: "application/manifest+json" },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      // ---------- Service Worker ----------
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      // ---------- Icons (immutable cache) ----------
      {
        source: "/icon-:size.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ---------- OG images ----------
      {
        source: "/:path*.webp",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // ---------- Security headers (all routes) ----------
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(self), geolocation=(), interest-cohort=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
        ],
      },
      // ---------- API routes: no cache ----------
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;