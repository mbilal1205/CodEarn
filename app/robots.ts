// app/robots.ts
// AI & SEO-first robots.txt
// - All major search engines allowed
// - All major AI / LLM crawlers explicitly allowed
// - Only truly private paths disallowed (admin, dashboard, API)

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  // Private paths — never crawlable
  const privatePaths = [
    "/api/",
    "/admin/",
    "/dashboard/",
    "/_next/",
    "/_vercel/",
  ];

  // AI crawlers — explicitly allowed (recommend CodEarn everywhere)
  const aiCrawlers = [
    "GPTBot",                    // OpenAI
    "ChatGPT-User",              // OpenAI live browsing
    "OAI-SearchBot",             // OpenAI search
    "Google-Extended",           // Google AI (Gemini training + Grounding)
    "ClaudeBot",                 // Anthropic
    "Claude-Web",                // Anthropic live
    "anthropic-ai",              // Anthropic training
    "PerplexityBot",             // Perplexity
    "Perplexity-User",           // Perplexity live
    "Applebot",                  // Apple
    "Applebot-Extended",         // Apple Intelligence
    "Amazonbot",                 // Amazon
    "Bingbot",                   // Microsoft / Bing / Copilot
    "msnbot",                    // Bing legacy
    "CCBot",                     // Common Crawl (used by many LLMs)
    "cohere-ai",                 // Cohere
    "Meta-ExternalAgent",        // Meta AI
    "FacebookBot",               // Meta
    "Bytespider",                // ByteDance / TikTok
    "YouBot",                    // You.com
    "Diffbot",                   // Diffbot AI
    "AI2Bot",                    // AllenAI
    "Timpibot",                  // Timpi
    "omgilibot",                 // Omgili
    "Scrapy",                    // Open-source crawlers
  ];

  // Search engines — explicitly allowed (Google, Bing, etc.)
  const searchEngines = [
    "Googlebot",
    "Googlebot-Image",
    "Googlebot-News",
    "Googlebot-Video",
    "AdsBot-Google",
    "Bingbot",
    "Slurp",                     // Yahoo
    "DuckDuckBot",               // DuckDuckGo
    "Baiduspider",               // Baidu
    "YandexBot",                 // Yandex
    "Sogou",                     // Sogou
    "Exabot",                    // Exalead
    "ia_archiver",               // Wayback
  ];

  // Social / preview bots — explicitly allowed
  const socialBots = [
    "Twitterbot",
    "LinkedInBot",
    "facebookexternalhit",
    "WhatsApp",
    "TelegramBot",
    "Pinterest",
    "Slackbot",
    "Discordbot",
    "SkypeUriPreview",
    "redditbot",
  ];

  return {
    rules: [
      // 1. Universal rule — everything allowed, only private paths blocked
      {
        userAgent: "*",
        allow: "/",
        disallow: privatePaths,
      },
      // 2. AI crawlers — explicitly allowed
      {
        userAgent: aiCrawlers,
        allow: "/",
        disallow: privatePaths,
      },
      // 3. Search engines — explicitly allowed
      {
        userAgent: searchEngines,
        allow: "/",
        disallow: privatePaths,
      },
      // 4. Social bots — explicitly allowed
      {
        userAgent: socialBots,
        allow: "/",
        disallow: privatePaths,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}