// lib/data.ts

export interface IResource {
  title: string;
  fileUrl: string;
  fileType: string;
}

export interface StudentCertificate {
  id: string;
  courseTitle: string;
  certificateNumber: string; // Required
  verificationUrl: string;   // Required
  grade: string;             // Required
  issueDate: string;
  downloadUrl: string;
  thumbnail?: string;        // Optional
}

export const myCertificates: StudentCertificate[] = [
  {
    id: "CET-0001",
    courseTitle: "Next.js Mastery",
    certificateNumber: "CET-2026-001",
    verificationUrl: "https://codearntech.com",
    grade: "A+",
    issueDate: "Feb 2026",
    downloadUrl: "/certs/nextjs.pdf"
  }
];

export interface ITopic {
  id: string;
  title: string;
  description: string;
  duration: string;
  isPreview: boolean;
  videoUrl?: string;
  resources?: IResource[];
}

export interface IModule {
  id: string;
  title: string;
  description: string;
  order: number;
  isPreview: boolean;
  topics: ITopic[];
}

export interface ICourse {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  totalModules: number;
  totalTopics: number;
  price: number;
  discountPrice?: number;
  thumbnail: string;
  icon: string;
  color: string;
  featured: boolean;
  modules: IModule[];
  whatYouWillLearn: string[];
  requirements: string[];
  tags: string[];
}

export const courses: ICourse[] = [
  {
    id: "1",
    slug: "ai-website-development-bootcamp",
    title: "30 Days AI Website Development Bootcamp",
    shortTitle: "AI Web Bootcamp",
    description: "Master the art of high-velocity web development augmented with AI. Build 10 real-world production projects, establish a flawless professional portfolio, optimize your GitHub footprint, and get career-ready in exactly 30 days.",
    shortDescription: "Become portfolio-ready and freelancing-ready in 30 days with AI-powered development workflows.",
    level: "Beginner",
    duration: "30 Days",
    totalModules: 4,
    totalTopics: 26,
    price: 25000,
    discountPrice: 2000,
    thumbnail: "/courses/ai-bootcamp.jpg",
    icon: "🤖",
    color: "from-blue-600 to-cyan-600",
    featured: true,
    whatYouWillLearn: [
      "AI-Powered Website Development Training",
      "10 Real-World Production Projects",
      "Professional Portfolio Website Architecture",
      "GitHub Profile Setup & Contribution Strategy",
      "LinkedIn Profile Optimization for Developers",
      "Fiverr Account Setup & High-Converting Gig Creation",
      "Client Communication & Premium Proposal Writing",
      "1 Month Scholarship Program Track (Top 10 Performers)",
      "Direct Remote Internship Opportunities at CodEarn"
    ],
    requirements: [
      "Basic computer literacy",
      "No prior coding experience required (Starts absolutely from scratch)",
      "Curiosity for high-velocity building and shipping"
    ],
    tags: ["AI-First", "Web-Development", "Tailwind-CSS", "Freelancing", "Bootcamp"],
    modules: [
      {
        id: "m1",
        title: "Week 1 — Foundations + AI Core",
        description: "Building the underlying core mental models and clean layout mechanics",
        order: 1,
        isPreview: true,
        topics: [
          { "id": "t1", "title": "Day 1: How the Internet Operations Work", "description": "Understanding client-server architecture, URLs, Domain & Hosting essentials", "duration": "45 min", "isPreview": true },
          { "id": "t2", "title": "Day 2: HTML5 Semantic Foundations", "description": "Writing semantic, structured layouts with standard web tags", "duration": "50 min", "isPreview": true },
          { "id": "t3", "title": "Day 3: Advanced HTML Structures", "description": "Building interactive forms, rich media setups, and accessibility elements", "duration": "45 min", "isPreview": false },
          { "id": "t4", "title": "Day 4: CSS3 Styling Fundamentals", "description": "Mastering the styling box model, cascades, typography, and absolute positions", "duration": "60 min", "isPreview": false },
          { "id": "t5", "title": "Day 5: Flexbox & Grid Masterclass", "description": "Designing flexible alignment configurations and dual-axis advanced grids", "duration": "70 min", "isPreview": false },
          { "id": "t6", "title": "Day 6: Responsive Mobile-First Framework", "description": "Implementing fluid media queries for flawless viewports across devices", "duration": "55 min", "isPreview": false },
          { "id": "t7", "title": "Day 7: Project #1 — High-Converting Commercial Landing Page", "description": "Building and structuring your first real-world marketing landing page layout", "duration": "90 min", "isPreview": false }
        ]
      },
      {
        id: "m2",
        title: "Week 2 — Modern Frontend & Automation",
        description: "Injecting functional logic, programmatic styling, and AI velocity",
        order: 2,
        isPreview: false,
        topics: [
          { "id": "t8", "title": "Day 8: JavaScript Programming Core Basics", "description": "Understanding reactive logic, variables, conditional statements, and data loops", "duration": "65 min", "isPreview": false },
          { "id": "t9", "title": "Day 9: Dynamic DOM Manipulation Mechanics", "description": "Binding interactive state logic, click events, and document content tracking", "duration": "60 min", "isPreview": false },
          { "id": "t10", "title": "Day 10: AI Tooling & Prompts for Fast Developers", "description": "Using industry AI environments to instantly synthesize modular boilerplate blocks", "duration": "50 min", "isPreview": false },
          { "id": "t11", "title": "Day 11: Production Git & GitHub Versioning", "description": "Configuring local repositories, commits, remotes, and branching strategies", "duration": "45 min", "isPreview": false },
          { "id": "t12", "title": "Day 12: Utility-First Styling with Tailwind CSS", "description": "Writing inline class configurations for high-end reactive layouts", "duration": "70 min", "isPreview": false },
          { "id": "t13", "title": "Day 13: UI/UX Structural Layout Design Basics", "description": "Grasping clear visual padding hierarchies, modern dark accents, and typography styles", "duration": "50 min", "isPreview": false },
          { "id": "t14", "title": "Day 14: Project #2 & #3 — Real Business & Personal Portfolio Sites", "description": "Designing premium showcase systems to establish an authentic professional identity", "duration": "120 min", "isPreview": false }
        ]
      },
      {
        id: "m3",
        title: "Week 3 — Real-World Commercial Client Pipeline",
        description: "Deploying production-grade practical architectures with absolute live verification",
        order: 3,
        isPreview: false,
        topics: [
          { "id": "t15", "title": "Project #4: Premium Fluid Restaurant Website", "description": "Structuring clean interactive menus and responsive customer booking rows", "duration": "80 min", "isPreview": false },
          { "id": "t16", "title": "Project #5: High-Performance Athletic Gym Website", "description": "Building dynamic schedule layout tables and modern feature grids", "duration": "85 min", "isPreview": false },
          { "id": "t17", "title": "Project #6: Multi-Tier Institutional School Website", "description": "Developing informational layout hierarchies and accessible asset setups", "duration": "90 min", "isPreview": false },
          { "id": "t18", "title": "Project #7: Sleek Apple-Inspired Creative Agency Website", "description": "Crafting premium dark mode cards and smooth typography micro-interactions", "duration": "95 min", "isPreview": false },
          { "id": "t19", "title": "Project #8: Comprehensive E-Commerce Frontend Platform", "description": "Designing robust product showcases with clean interactive item structures", "duration": "110 min", "isPreview": false },
          { "id": "t20", "title": "Deployment Engine: Live Serverless Launches & READMEs", "description": "Uploading final codebases to GitHub, generating professional documentation, and launching live URLs", "duration": "60 min", "isPreview": false }
        ]
      },
      {
        id: "m4",
        title: "Week 4 — Portfolio Optimization & Freelancing Velocity",
        description: "Setting up commercial scaling channels, Fiverr metrics, and the top scholarship track",
        order: 4,
        isPreview: false,
        topics: [
          { "id": "t21", "title": "Project #9: Micro-SaaS Premium Landing Page Architecture", "description": "Integrating conversion-focused CTA modules and high-end bento styles", "duration": "85 min", "isPreview": false },
          { "id": "t22", "title": "Project #10: High-Fidelity Personal Branding Web Ecosystem", "description": "Finalizing an authoritative elite hub linking your complete network of built items", "duration": "100 min", "isPreview": false },
          { "id": "t23", "title": "GitHub Profile Design & Green Contribution Strategies", "description": "Structuring pinned project showcases, descriptive bios, and clean repository flows", "duration": "55 min", "isPreview": false },
          { "id": "t24", "title": "Freelancing Framework: Fiverr Account Configuration & Gig Ranking", "description": "Analyzing search engine mechanics, designing custom layouts, and optimization tracking", "duration": "75 min", "isPreview": false },
          { "id": "t25", "title": "Client Acquisition, High-Yield Proposals & Communications", "description": "Writing clear targeted proposals, tracking deals, and managing operational metrics", "duration": "60 min", "isPreview": false },
          { "id": "t26", "title": "CodEarn Scholarship Launch & Final Reviews", "description": "Selecting the top 10 developers for advanced mentorship, real team pipelines, and internal certificates", "duration": "70 min", "isPreview": false }
        ]
      }
    ]
  }
];

// Helper functions
export const getCourseBySlug = (slug: string): ICourse | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getFeaturedCourses = (): ICourse[] => {
  return courses.filter(course => course.featured);
};

export const getCourseStats = () => {
  const totalCourses = courses.length;
  const totalModules = courses.reduce((acc, course) => acc + course.totalModules, 0);
  const totalTopics = courses.reduce((acc, course) => acc + course.totalTopics, 0);
  const avgPrice = Math.round(courses.reduce((acc, course) => acc + course.price, 0) / courses.length);
  
  return { totalCourses, totalModules, totalTopics, avgPrice };
};