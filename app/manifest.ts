// app/manifest.ts
import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    // ---- Identity ----
    name: "CodEarn Tech — Software, AI & IT Training",
    short_name: "CodEarn Tech",
    description: SITE_DESCRIPTION,

    // ---- PWA Basics ----
    id: "/?source=pwa",
    start_url: "/?source=pwa",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone", "minimal-ui"],
    orientation: "portrait-primary",

    // ---- Branding / Theme ----
    background_color: "#0f172a", // dark navy (aapka theme)
    theme_color: "#0f172a",

    // ---- Language & Direction ----
    lang: "en-US",
    dir: "ltr",

    // ---- Category ----
    categories: [
      "business",
      "productivity",
      "education",
      "developer",
      "technology",
    ],

    // ---- Icons (multiple sizes for all platforms) ----
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],

    // ---- Screenshots (Google Play / App Store rich listing) ----
    screenshots: [
      {
        src: "/og-image.webp",
        sizes: "1200x630",
        type: "image/webp",
        form_factor: "wide",
        label: "CodEarn Tech Homepage",
      },
      {
        src: "/products-og.webp",
        sizes: "1200x630",
        type: "image/webp",
        form_factor: "wide",
        label: "CodEarn Tech Products",
      },
    ],

    // ---- App Shortcuts (long-press on icon) ----
    shortcuts: [
      {
        name: "Book a Free Call",
        short_name: "Book Call",
        description:
          "Schedule a free 30-minute strategy call with CodEarn Tech",
        url: "/book-call?source=pwa",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Our Products",
        short_name: "Products",
        description: "Explore CodEarn Tech SaaS products",
        url: "/products?source=pwa",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "Training Programs",
        short_name: "Training",
        description:
          "Practical IT training with internship support",
        url: "/training?source=pwa",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
      {
        name: "CodEarn AI",
        short_name: "AI Assistant",
        description: "Chat with CodEarn AI",
        url: "/codearn-ai?source=pwa",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    ],

    // ---- Related Applications ----
    related_applications: [],
    prefer_related_applications: false,

    // ---- Launch Handler (Chromium) ----
    launch_handler: {
      client_mode: ["navigate-existing", "auto"],
    },

    // ---- Share Target (mobile share menu) ----
    share_target: {
      action: "/contact",
      method: "GET",
      enctype: "application/x-www-form-urlencoded",
      params: {
        title: "title",
        text: "text",
        url: "url",
      },
    },

    // ---- Protocol Handlers ----
    protocol_handlers: [
      {
        protocol: "web+codearntech",
        url: "/?url=%s",
      },
    ],
  };
}