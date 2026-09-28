"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Clock,
  Calendar,
  Twitter,
  Linkedin,
  Facebook,
  Link as LinkIcon,
  ChevronRight,
  Eye,
  ChevronLeft,
} from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  type BlogPost,
} from "@/lib/blogData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import SubscribeSection from "@/components/layout/subscription";

/* ------------------------------------------------------------------ */
/* ✅ Props interface — fixes the TS2322 error                          */
/* ------------------------------------------------------------------ */
interface BlogPostPageProps {
  slug?: string;
}

export default function BlogPostPage({ slug: slugProp }: BlogPostPageProps) {
  // URL se bhi nikaal lo (fallback), taake dono tareeqon se kaam kare
  const params = useParams<{ slug: string }>();
  const slug = slugProp || params?.slug;

  const post: BlogPost | undefined = slug ? getPostBySlug(slug) : undefined;
  const relatedPosts = slug ? getRelatedPosts(slug) : [];

  // --- Hydration Fix States ---
  const [mounted, setMounted] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // --- Reading Progress Bar ---
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setMounted(true);
    setShareUrl(window.location.href);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-4xl font-black tracking-tighter mb-4">
            Article Not Found
          </h1>
          <Button asChild variant="ghost">
            <Link href="/blogs">
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const shareLinks = [
    {
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl
      )}&text=${encodeURIComponent(post.title)}`,
      label: "Twitter",
    },
    {
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      label: "LinkedIn",
    },
    {
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      label: "Facebook",
    },
  ];

  return (
    <article className="relative min-h-screen bg-background text-foreground">
      {/* 1. Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX }}
      />

      {/* 2. Professional SaaS Grid Background */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <svg className="absolute inset-0 h-full w-full stroke-muted-foreground/10 mask-[radial-gradient(100%_60%_at_top_center,white,transparent)]">
          <defs>
            <pattern
              id="blog-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
              x="50%"
              y="-1"
            >
              <path d="M.5 40V.5H40" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" strokeWidth="0" fill="url(#blog-grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation / Breadcrumb */}
        <div className="pt-24 pb-8">
          <Button asChild variant="ghost" className="hover:bg-primary/5 -ml-4">
            <Link href="/blogs" className="flex items-center gap-2">
              <ChevronLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <header className="max-w-4xl mx-auto text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap justify-center items-center gap-3 mb-6"
          >
            <Badge
              variant="secondary"
              className="px-4 py-1 rounded-full bg-primary/10 text-primary border-primary/20"
            >
              {post.category}
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime} min read
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1.5">
              <Eye className="w-4 h-4" /> {post.views.toLocaleString()} views
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter mb-8 leading-[1.1] text-foreground"
          >
            {post.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground leading-relaxed italic"
          >
            &ldquo;{post.excerpt}&rdquo;
          </motion.p>
        </header>

        {/* Author Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto flex items-center justify-between py-6 border-y border-border/50 mb-12"
        >
          <div className="flex items-center gap-4">
            <Avatar className="w-12 h-12 border-2 border-primary/10">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-primary/5">
                {post.author.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-bold text-foreground leading-tight">
                {post.author.name}
              </p>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                {post.author.role}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground font-bold uppercase tracking-widest mb-1">
              Published
            </p>
            <p className="text-sm font-semibold flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </motion.div>

        {/* Cover Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-6xl mx-auto mb-16"
        >
          <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-border/50">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,300px] gap-16 pb-24">
          <div className="min-w-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="prose prose-lg dark:prose-invert max-w-none 
                prose-headings:font-black prose-headings:tracking-tighter 
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:border
                prose-code:before:content-none prose-code:after:content-none"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-16 pt-8 border-t border-border">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blogs?tag=${tag}`}>
                    <Badge
                      variant="outline"
                      className="px-4 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>

              {/* Shared Interaction Section */}
              <div className="mt-12 p-8 rounded-3xl bg-muted/30 border border-border/50 backdrop-blur-sm">
                <h3 className="text-2xl font-black mb-4 tracking-tight">
                  Enjoyed this article?
                </h3>
                <p className="text-muted-foreground mb-6 italic">
                  If you found this helpful, consider sharing it with your
                  network. It helps us grow.
                </p>
                <div className="flex flex-wrap gap-3">
                  {mounted &&
                    shareLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-background border hover:border-primary/50 hover:bg-primary/5 transition-all font-semibold"
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                      </a>
                    ))}
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all font-semibold"
                  >
                    <LinkIcon className="w-4 h-4" />
                    {copied ? "Link Copied!" : "Copy Link"}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Professional Sticky Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div className="p-6 rounded-3xl border border-border bg-card/50 backdrop-blur-sm">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary mb-6">
                  In this article
                </h3>
                <ul className="space-y-4 text-sm font-medium">
                  {[
                    "Introduction",
                    "Key Principles",
                    "Implementation",
                    "Technical Deep-Dive",
                    "Summary",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href="#"
                        className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                      >
                        <ChevronRight className="w-3 h-3" /> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Newsletter SaaS Card */}
              <SubscribeSection />
            </div>
          </aside>
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="py-24 border-t border-border/50">
            <h2 className="text-3xl font-black tracking-tighter mb-12">
              Read Next
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blogs/${relatedPost.slug}`}
                  className="group"
                >
                  <article className="h-full bg-card rounded-3xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <Badge
                        variant="secondary"
                        className="mb-4 text-[10px] font-bold uppercase tracking-widest"
                      >
                        {relatedPost.category}
                      </Badge>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}