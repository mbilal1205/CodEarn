// lib/case-studies.ts
// Real case studies only — per cleanup doc §10.
// • Buzzly Publicity (Bahrain) — top of the list
// • Hassan Digital Skills (HDS) — web application case study
// • GigThink — NOT featured (per cleanup doc: "Do not feature while it underperforms")
//
// Rule: only publish what we actually built. Do not attribute the client's own
// marketing numbers (users, revenue, growth) to our work unless verified.

export type LocalizedText = {
  en: string;
  ar: string;
};

export type LocalizedStringArray = {
  en: string[];
  ar: string[];
};

export interface CaseStudyMetric {
  value: string;
  label: LocalizedText;
}

export interface CaseStudyTestimonial {
  quote: LocalizedText;
  author: LocalizedText;
  role: LocalizedText;
  avatarUrl?: string;
}

export interface CaseStudy {
  id: string;
  /** Client display name (with country) */
  client: LocalizedText;
  /** Project title */
  title: LocalizedText;
  /** One-line subtitle */
  subtitle: LocalizedText;
  /** Delivery timeline, e.g. "6 weeks" */
  timeline: LocalizedText;
  /** Human-readable service labels (also mirrored in schema) */
  services: LocalizedText[];
  /** Tech stack (language-agnostic) */
  techStack: string[];
  /** Optional cover image — leave empty until a real screenshot is ready */
  coverImage?: string;
  /** Optional gallery screenshots */
  galleryImages?: string[];
  /** Live URL if public */
  liveUrl?: string;
  /** Short challenge paragraph */
  challenge: LocalizedText;
  /** Extra challenge paragraphs */
  detailedChallenge: LocalizedStringArray;
  /** Short solution paragraph */
  solution: LocalizedText;
  /** Extra solution paragraphs */
  detailedSolution: LocalizedStringArray;
  /** Key deliverables / features (factual, not marketing numbers) */
  keyFeatures: LocalizedStringArray;
  /** Optional quantitative deliverables (not revenue/user metrics) */
  metrics?: CaseStudyMetric[];
  /** Optional real testimonial — do NOT invent */
  testimonial?: CaseStudyTestimonial;
  /** Ordering flag — Buzzly stays first */
  featured: boolean;
}

export const caseStudies: CaseStudy[] = [
  /* ================================================================
     01. Buzzly Publicity (Bahrain)
     Next.js website with EN/AR language switcher, multi-page structure,
     WhatsApp, process section, FAQ, legal pages.
     Live: buzzlypublicity.com/en
     ================================================================ */
  {
    id: "buzzly-publicity",
    client: {
      en: "Buzzly Publicity & Advertising W.L.L — Bahrain",
      ar: "بَزلي للدعاية والإعلان ذ.م.م — البحرين",
    },
    title: {
      en: "Bilingual agency website",
      ar: "موقع وكالة ثنائي اللغة",
    },
    subtitle: {
      en: "A bilingual (English / Arabic) website for a Bahrain-based creative and digital marketing agency — built with Next.js and a full right-to-left Arabic experience.",
      ar: "موقع ثنائي اللغة (إنجليزي / عربي) لوكالة إبداعية وتسويق رقمي مقرّها البحرين — مبني بـ Next.js مع تجربة عربية كاملة من اليمين إلى اليسار.",
    },
    timeline: {
      en: "Business-tier delivery",
      ar: "تسليم ضمن باقة Business",
    },
    services: [
      { en: "Web design & development", ar: "تصميم وتطوير الويب" },
      { en: "Bilingual (EN / AR)", ar: "ثنائي اللغة (إنجليزي / عربي)" },
      { en: "RTL support", ar: "دعم RTL" },
      { en: "Next.js", ar: "Next.js" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    liveUrl: "https://buzzlypublicity.com/en",
    coverImage: "",
    galleryImages: [],
    challenge: {
      en: "A Bahrain-based creative agency needed a bilingual site that could present its services clearly to both Arabic- and English-speaking audiences, and route new enquiries through multiple channels.",
      ar: "احتاجت وكالة إبداعية في البحرين إلى موقع ثنائي اللغة يعرض خدماتها بوضوح لجمهور عربي وإنجليزي، ويوجّه الاستفسارات الجديدة عبر قنوات متعددة.",
    },
    detailedChallenge: {
      en: [
        "The site had to work as one coherent experience in two languages — not as two separate sites with broken navigation and mismatched layouts.",
        "Arabic content needs a true right-to-left layout (navigation, icons, forms, arrows), not just translated text.",
        "The agency wanted an accessible first impression for prospects: portfolio pieces, pricing, a process overview and clear contact paths.",
      ],
      ar: [
        "كان على الموقع أن يعمل كتجربة واحدة متماسكة بلغتين — لا كموقعين منفصلين بتصميم متناقض وتنقل مكسور.",
        "المحتوى العربي يتطلّب تخطيطًا حقيقيًا من اليمين إلى اليسار (التنقل، الأيقونات، النماذج، الأسهم)، وليس مجرد نص مترجم.",
        "أرادت الوكالة انطباعًا أوليًا قويًا للعملاء المحتملين: نماذج أعمال، أسعار، نظرة على عملية العمل، ومسارات تواصل واضحة.",
      ],
    },
    solution: {
      en: "We designed and shipped a Next.js site with a full English / Arabic language switcher, a complete right-to-left Arabic experience, and clean page structure for services, work, pricing and contact.",
      ar: "صممنا وسلّمنا موقعًا بـ Next.js مع مبدّل لغة كامل (إنجليزي / عربي)، وتجربة عربية كاملة من اليمين إلى اليسار، وبُنية صفحات واضحة للخدمات والأعمال والتسعير والتواصل.",
    },
    detailedSolution: {
      en: [
        "Delivered Home, About, Services, Work, Pricing and Contact pages, plus Privacy and Terms legal pages.",
        "Built 'Book a Call' and WhatsApp entry points so prospects could reach the agency through whichever channel they prefer.",
        "Designed a process section and an FAQ block to answer the questions that usually come up before a first call.",
        "Full responsiveness across mobile and desktop — every layout, form and card was checked in both languages.",
      ],
      ar: [
        "سلّمنا صفحات الرئيسية، من نحن، الخدمات، الأعمال، التسعير، والتواصل — بالإضافة إلى صفحتي الخصوصية والشروط.",
        "أضفنا نقاط وصول 'احجز مكالمة' و'واتساب' ليصل العملاء المحتملون إلى الوكالة عبر القناة التي يفضّلونها.",
        "صممنا قسمًا لسير العمل وقسم أسئلة شائعة للإجابة عن الأسئلة التي تظهر عادة قبل المكالمة الأولى.",
        "تصميم متجاوب بالكامل على الجوال وسطح المكتب — كل تخطيط ونموذج وبطاقة تم اختبارها في اللغتين.",
      ],
    },
    keyFeatures: {
      en: [
        "Bilingual site (English + Arabic) with language switcher",
        "Full right-to-left Arabic experience",
        "Home, About, Services, Work, Pricing and Contact pages",
        "'Book a Call' and WhatsApp entry points on every relevant page",
        "Process overview and FAQ section",
        "Privacy Policy and Terms pages",
        "Responsive across mobile, tablet and desktop",
      ],
      ar: [
        "موقع ثنائي اللغة (إنجليزي + عربي) مع مبدّل لغة",
        "تجربة عربية كاملة من اليمين إلى اليسار",
        "صفحات الرئيسية، من نحن، الخدمات، الأعمال، التسعير، والتواصل",
        "نقاط وصول 'احجز مكالمة' و'واتساب' في كل صفحة مناسبة",
        "قسم لعرض سير العمل وقسم للأسئلة الشائعة",
        "صفحتا سياسة الخصوصية والشروط",
        "تصميم متجاوب عبر الجوال واللوحي وسطح المكتب",
      ],
    },
    metrics: [
      {
        value: "2",
        label: { en: "Languages (EN + AR)", ar: "لغتان (إنجليزي + عربي)" },
      },
      {
        value: "8",
        label: { en: "Pages delivered", ar: "صفحات مُسلَّمة" },
      },
      {
        value: "100%",
        label: { en: "Responsive", ar: "متجاوب" },
      },
    ],
    featured: true,
  },

  /* ================================================================
     02. Hassan Digital Skills (HDS)
     Digital-skills training platform — courses, enrollment, student
     portal, batch & countdown, reviews, founder story.
     Live: hassandigitalskills.com
     ================================================================ */
  {
    id: "hassan-digital-skills",
    client: {
      en: "Hassan Digital Skills — HDS",
      ar: "حسن للمهارات الرقمية — HDS",
    },
    title: {
      en: "Digital-skills training platform",
      ar: "منصة تدريب على المهارات الرقمية",
    },
    subtitle: {
      en: "A web application for a digital-skills training brand: courses listing, enrollment, scholarship applications, and a student portal login.",
      ar: "تطبيق ويب لعلامة تدريب على المهارات الرقمية: قائمة دورات، تسجيل، طلبات منح، وتسجيل دخول لبوابة الطالب.",
    },
    timeline: {
      en: "Web application delivery",
      ar: "تسليم تطبيق ويب",
    },
    services: [
      { en: "Web application", ar: "تطبيق ويب" },
      { en: "Authentication", ar: "مصادقة" },
      { en: "Enrollment flow", ar: "مسار تسجيل" },
      { en: "Next.js", ar: "Next.js" },
    ],
    techStack: ["Next.js", "React", "TypeScript", "PostgreSQL"],
    liveUrl: "https://hassandigitalskills.com",
    coverImage: "",
    galleryImages: [],
    challenge: {
      en: "HDS needed a single place where prospects could browse courses, apply for enrollment and scholarships, and students could log in to a portal — replacing manual forms and messaging apps.",
      ar: "احتاجت HDS إلى مكان واحد يستعرض فيه العملاء المحتملون الدورات، ويتقدمون للتسجيل والمنح، ويسجّل الطلاب الدخول إلى بوابة — بدلًا من النماذج اليدوية وتطبيقات المراسلة.",
    },
    detailedChallenge: {
      en: [
        "Enrollment and scholarship applications were being handled over chat apps — slow to review, easy to lose track of, and no clean record for the team.",
        "Students needed a login area to see their courses and status, without the team building a full LMS.",
        "The public site needed a clear course catalogue and an obvious next step ('apply' / 'enroll') for every visitor.",
      ],
      ar: [
        "كانت طلبات التسجيل والمنح تُدار عبر تطبيقات المحادثة — بطيئة في المراجعة وسهلة الفقدان، مع عدم وجود سجل واضح للفريق.",
        "احتاج الطلاب إلى منطقة تسجيل دخول لمشاهدة دوراتهم وحالتهم، دون بناء نظام إدارة تعلّم كامل.",
        "احتاج الموقع العام إلى كتالوج دورات واضح وخطوة تالية واضحة ('تقدّم' / 'سجّل') لكل زائر.",
      ],
    },
    solution: {
      en: "We built a Next.js web application with courses listing, enrollment and scholarship application flows, and a student portal login — plus the supporting content and legal pages around it.",
      ar: "بنينا تطبيق ويب بـ Next.js مع قائمة دورات، ومسارات تسجيل وطلب منح، وتسجيل دخول لبوابة الطالب — بالإضافة إلى المحتوى الداعم والصفحات القانونية المحيطة به.",
    },
    detailedSolution: {
      en: [
        "Course listing with a clear per-course layout: overview, outcomes, timing and a single 'enroll' action.",
        "Enrollment and scholarship flows with structured forms — so the team reviews applications in one dashboard instead of scattered chats.",
        "Student portal login so enrolled students can see their courses and application status.",
        "Batch and countdown sections to communicate upcoming cohorts.",
        "Reviews, services overview, founder story, contact and legal pages to complete the site.",
      ],
      ar: [
        "قائمة دورات مع تخطيط واضح لكل دورة: نظرة عامة، مخرجات، توقيت، وإجراء 'تسجيل' واحد.",
        "مسارات تسجيل وطلب منح بنماذج منظّمة — ليراجع الفريق الطلبات من لوحة واحدة بدلًا من محادثات متفرقة.",
        "تسجيل دخول لبوابة الطالب ليرى الطلاب المسجّلون دوراتهم وحالة طلباتهم.",
        "أقسام للدفعات والعدّ التنازلي لإعلان الدفعات القادمة.",
        "قسم مراجعات، نظرة على الخدمات، قصة المؤسس، تواصل، وصفحات قانونية لإكمال الموقع.",
      ],
    },
    keyFeatures: {
      en: [
        "Courses listing with per-course pages",
        "Enrollment application flow",
        "Scholarship application flow",
        "Student portal login",
        "Batch and countdown sections",
        "Reviews, services and founder story pages",
        "Contact and legal pages",
      ],
      ar: [
        "قائمة دورات بصفحات مستقلة لكل دورة",
        "مسار طلب التسجيل",
        "مسار طلب المنحة",
        "تسجيل دخول لبوابة الطالب",
        "أقسام للدفعات والعدّ التنازلي",
        "صفحات مراجعات وخدمات وقصة المؤسس",
        "صفحات تواصل وقانونية",
      ],
    },
    metrics: [
      {
        value: "6+",
        label: { en: "Core user flows", ar: "مسارات مستخدم أساسية" },
      },
      {
        value: "Portal",
        label: { en: "Student login area", ar: "منطقة دخول للطلاب" },
      },
      {
        value: "100%",
        label: { en: "Responsive", ar: "متجاوب" },
      },
    ],
    featured: false,
  },
];