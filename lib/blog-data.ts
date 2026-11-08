// lib/blog-data.ts
// Mock blog data — replace with Sanity CMS fetch later.
// Structure is already i18n-ready: swap this file's source, keep everything else.

export type LocalizedText = { en: string; ar: string };
export type LocalizedArray = { en: string[]; ar: string[] };

export interface BlogPost {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  coverImage: string;
  category: LocalizedText;
  readTime: number; // minutes
  publishedAt: string; // ISO date
  author: {
    name: string;
    role: LocalizedText;
  };
  content: LocalizedText; // markdown
  tags: string[];
  featured?: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-software-partner-uae",
    title: {
      en: "How to Choose a Software Development Partner in the UAE",
      ar: "كيف تختار شريكًا لتطوير البرمجيات في الإمارات",
    },
    excerpt: {
      en: "Most software projects fail before the first line of code — during vendor selection. Here's the framework we use to help clients choose the right partner.",
      ar: "معظم مشاريع البرمجيات تفشل قبل كتابة أول سطر كود — أثناء اختيار المورّد. هذا هو الإطار الذي نستخدمه لمساعدة العملاء في اختيار الشريك المناسب.",
    },
    coverImage: "/og-image.webp",
    category: { en: "Business", ar: "الأعمال" },
    readTime: 8,
    publishedAt: "2026-01-15",
    author: {
      name: "Muhammad Bilal",
      role: { en: "Founder & Software Architect", ar: "المؤسس ومهندس البرمجيات" },
    },
    tags: ["software-partner", "uae", "hiring"],
    featured: true,
    content: {
      en: `## Why vendor selection matters

Every software project has a moment when it can go right or go wrong. That moment is almost never during development — it's **during vendor selection**. By the time code is being written, you've already committed to the people who will (or won't) ship your product.

Here's the framework we use to help clients choose the right partner in the UAE and across the Gulf.

## 1. Ask for a written scope, not a verbal promise

Any serious agency will write down the exact deliverables, timeline, and payment milestones before you sign. A verbal "we'll figure it out" is a red flag.

**Ask for:**
- A written scope document with clear deliverables
- Milestone-based timeline
- Exact price breakdown per milestone

## 2. Test their communication speed

Before you sign, send three questions over a few days. Note how long they take to reply, and whether their replies actually answer the question. Fast, clear communication during sales is a strong signal for how they'll behave during delivery.

## 3. Ask about code ownership

You should own the source code from day one, or on final payment at the latest. If the agency won't hand over the code at the end, you're locked in permanently.

## 4. See real case studies, not just logos

Any agency can put a logo on their site. Ask for:
- Live URLs you can click through
- Screenshots of real work
- Contact details of past clients (for a reference call)

## 5. Ask about Arabic / RTL support

If you're operating in the Gulf, a bilingual site with full right-to-left support is **essential** — not a nice-to-have. Test whether the agency actually understands RTL, or just translates English layouts.

## The honest truth

The best agencies won't promise the world. They'll tell you what they can and can't do, quote clearly, and deliver on time. If a proposal sounds too good to be true, it probably is.

**Need help choosing? [Book a free call](/contact) — we'll walk you through what to look for, even if you don't work with us.**`,
      ar: `## لماذا يهم اختيار المورّد

كل مشروع برمجيات له لحظة يمكن أن ينجح فيها أو يفشل. تلك اللحظة ليست أثناء التطوير تقريبًا أبدًا — إنها **أثناء اختيار المورّد**. بحلول الوقت الذي يُكتب فيه الكود، تكون قد التزمت بالفعل بالأشخاص الذين سيسلّمون منتجك (أو لن يسلموه).

هذا هو الإطار الذي نستخدمه لمساعدة العملاء على اختيار الشريك المناسب في الإمارات ومنطقة الخليج.

## 1. اطلب نطاق عمل مكتوبًا، لا وعدًا شفهيًا

أي وكالة جادة ستكتب بالضبط المخرجات والجدول الزمني ومراحل الدفع قبل أن توقع. "سنتدبر الأمر" الشفهي علامة حمراء.

**اطلب:**
- وثيقة نطاق عمل واضحة بمخرجات محددة
- جدول زمني مبني على المراحل
- تفصيل سعر دقيق لكل مرحلة

## 2. اختبر سرعة تواصلهم

قبل أن توقّع، أرسل ثلاثة أسئلة على مدى أيام قليلة. لاحظ كم يستغرقون للرد، وهل ردودهم تجيب على السؤال فعلاً. التواصل السريع والواضح أثناء البيع إشارة قوية لسلوكهم أثناء التسليم.

## 3. اسأل عن ملكية الكود

يجب أن تملك الكود المصدري من اليوم الأول، أو عند الدفعة النهائية على أبعد تقدير. إذا رفضت الوكالة تسليم الكود في النهاية، فأنت محبوس بشكل دائم.

## 4. اطلع على دراسات حالة حقيقية، لا مجرد شعارات

أي وكالة تستطيع وضع شعار على موقعها. اطلب:
- روابط مباشرة يمكنك النقر عليها
- لقطات شاشة لعمل حقيقي
- بيانات اتصال عملاء سابقين (لمكالمة مرجعية)

## 5. اسأل عن دعم العربية / RTL

إذا كنت تعمل في الخليج، فإن موقعًا ثنائي اللغة بدعم كامل من اليمين إلى اليسار هو أمر **ضروري** — وليس رفاهية. اختبر ما إذا كانت الوكالة تفهم RTL فعلاً، أم تترجم تخطيطات إنجليزية فقط.

## الحقيقة الصادقة

أفضل الوكالات لا تعد بالعالم. ستخبرك بما تستطيع وما لا تستطيع، وتقدم عرضًا واضحًا، وتسلم في الموعد. إذا بدا العرض جيدًا لدرجة يصعب تصديقها، فمن المحتمل ألا يكون صحيحًا.

**تحتاج مساعدة في الاختيار؟ [احجز مكالمة مجانية](/contact) — سنرشدك لما يجب البحث عنه، حتى لو لم تعمل معنا.**`,
    },
  },
  {
    slug: "saas-vs-custom-web-app",
    title: {
      en: "SaaS vs Custom Web App: What Does Your Business Actually Need?",
      ar: "SaaS مقابل تطبيق ويب مخصص: ماذا يحتاج عملك فعلاً؟",
    },
    excerpt: {
      en: "The first question every business should answer before building software. We break down the real trade-offs — cost, control, and time-to-market.",
      ar: "أول سؤال يجب أن يجيب عليه أي عمل قبل بناء برمجيات. نحلل المفاضلات الحقيقية — التكلفة والتحكم والوقت حتى الوصول للسوق.",
    },
    coverImage: "/og-image.webp",
    category: { en: "Product", ar: "المنتج" },
    readTime: 6,
    publishedAt: "2026-01-08",
    author: {
      name: "Muhammad Bilal",
      role: { en: "Founder & Software Architect", ar: "المؤسس ومهندس البرمجيات" },
    },
    tags: ["saas", "web-apps", "product-strategy"],
    content: {
      en: `## The wrong question

Most founders ask: **"Should I build a SaaS or a web app?"**

That's the wrong question. The right question is: **"What do I need to learn first?"**

## When you need SaaS

Build SaaS if:
- You're selling software **to many customers** as a recurring product
- Each customer needs their **own isolated data**
- You want to charge **subscription fees**
- You're building a **product**, not a service

SaaS is fundamentally a **product business** — not a service business with software attached.

## When you need a custom web app

Build a web app if:
- You're solving **one specific business problem** (yours or one client's)
- You need **internal tools** for your team
- You're delivering a **custom solution** — not a mass product
- Time-to-market matters more than long-term scalability

## The trade-offs

| Factor | SaaS | Custom Web App |
|---|---|---|
| Initial cost | Higher (AED 25k+) | Lower (AED 15k+) |
| Time to launch | 8-12 weeks | 4-8 weeks |
| Revenue model | Recurring | One-time |
| Complexity | Multi-tenant, billing, admin | Single business logic |
| Scalability needs | Very high | Moderate |

## The honest recommendation

If you're not sure which you need, **start with a web app**. Launch the smallest possible version that solves the problem. Learn from real users. Then, if it works, rebuild as SaaS.

Building SaaS first is the most expensive way to discover you didn't need SaaS.

**Not sure which fits your case? [Book a call](/contact) — we'll help you pick the right path in 20 minutes.**`,
      ar: `## السؤال الخاطئ

يسأل معظم المؤسسين: **"هل يجب أن أبني SaaS أم تطبيق ويب؟"**

هذا هو السؤال الخاطئ. السؤال الصحيح هو: **"ما الذي أحتاج تعلمه أولاً؟"**

## عندما تحتاج SaaS

ابنِ SaaS إذا كنت:
- تبيع برمجيات **لعدة عملاء** كمنتج متكرر
- كل عميل يحتاج **بياناته المعزولة الخاصة**
- تريد فرض **رسوم اشتراك**
- تبني **منتجًا** لا خدمة

SaaS في جوهرها **عمل منتج** — وليس عمل خدمة ببرمجيات ملحقة.

## عندما تحتاج تطبيق ويب مخصص

ابنِ تطبيق ويب إذا كنت:
- تحل **مشكلة أعمال واحدة محددة** (مشكلتك أو مشكلة عميل واحد)
- تحتاج **أدوات داخلية** لفريقك
- تقدم **حلاً مخصصًا** — لا منتجًا جماهيريًا
- الوقت حتى السوق أهم من التوسع طويل الأمد

## المفاضلات

| العامل | SaaS | تطبيق ويب مخصص |
|---|---|---|
| التكلفة الأولية | أعلى (25 ألف درهم+) | أقل (15 ألف درهم+) |
| الوقت حتى الإطلاق | 8-12 أسبوعًا | 4-8 أسابيع |
| نموذج الإيرادات | متكرر | لمرة واحدة |
| التعقيد | متعدد المستأجرين، فواتير، إدارة | منطق أعمال واحد |
| احتياجات التوسع | عالية جدًا | معتدلة |

## التوصية الصادقة

إذا لم تكن متأكدًا مما تحتاج، **ابدأ بتطبيق ويب**. أطلق أصغر نسخة ممكنة تحل المشكلة. تعلم من المستخدمين الحقيقيين. ثم، إذا نجح، أعد بناءه كـ SaaS.

بناء SaaS أولاً هو أغلى طريقة لاكتشاف أنك لم تكن بحاجة إلى SaaS.

**غير متأكد مما يناسب حالتك؟ [احجز مكالمة](/contact) — سنساعدك في اختيار المسار الصحيح في 20 دقيقة.**`,
    },
  },
  {
    slug: "bilingual-websites-gulf-business",
    title: {
      en: "Why Bilingual Websites Are Essential for Gulf Businesses",
      ar: "لماذا المواقع ثنائية اللغة ضرورية للشركات الخليجية",
    },
    excerpt: {
      en: "Arabic-first users behave differently. A site that treats Arabic as an afterthought loses half its potential customers before they even scroll.",
      ar: "المستخدمون العرب يتصرفون بشكل مختلف. الموقع الذي يعامل العربية كفكرة لاحقة يفقد نصف عملائه المحتملين قبل أن يقوموا حتى بالتمرير.",
    },
    coverImage: "/og-image.webp",
    category: { en: "Design", ar: "التصميم" },
    readTime: 5,
    publishedAt: "2026-01-02",
    author: {
      name: "Muhammad Bilal",
      role: { en: "Founder & Software Architect", ar: "المؤسس ومهندس البرمجيات" },
    },
    tags: ["arabic", "rtl", "gulf", "bilingual"],
    content: {
      en: `## The numbers are clear

In the Gulf, **over 60% of users prefer browsing in Arabic** when given the choice. A site that only works well in English loses them before the first scroll.

But most bilingual sites fail for one simple reason: **they're translated, not designed**.

## Translating is not localizing

A real Arabic experience requires:
- **Right-to-left (RTL) layout** — every margin, padding, and arrow flips
- **Arabic-optimized fonts** — Cairo or IBM Plex Sans Arabic, not Arial
- **Line-height adjustments** — Arabic script needs more vertical space
- **Icon mirroring** — chevrons, back arrows, and navigation cues
- **Content that reads naturally in Arabic** — not translated word-for-word

## What breaks on most "bilingual" sites

- Buttons still point left→right
- Form fields align to the wrong side
- Icons don't flip
- Numbers format incorrectly (Arabic vs Western numerals)
- Arabic text looks cramped because line-height wasn't adjusted
- Menus close to the wrong side

## What it actually costs

Retrofitting RTL support into an existing English site is **more expensive** than building it correctly from day one. If you're starting fresh, always build bilingual-first.

## The competitive edge

Most Gulf businesses still have English-only sites. If your site works **perfectly** in Arabic, you immediately stand out — to the 60% of users your competitors are ignoring.

**Building a bilingual site? [See our approach →](/services#web-apps)**`,
      ar: `## الأرقام واضحة

في الخليج، **أكثر من 60% من المستخدمين يفضلون التصفح بالعربية** عند إعطائهم الخيار. الموقع الذي يعمل بشكل جيد بالإنجليزية فقط يفقدهم قبل أول تمرير.

لكن معظم المواقع ثنائية اللغة تفشل لسبب بسيط: **يتم ترجمتها، لا تصميمها**.

## الترجمة ليست تعريبًا

تجربة عربية حقيقية تتطلب:
- **تخطيط من اليمين إلى اليسار (RTL)** — كل هامش وحشو وسهم ينقلب
- **خطوط محسّنة للعربية** — Cairo أو IBM Plex Sans Arabic، لا Arial
- **تعديلات ارتفاع السطر** — النص العربي يحتاج مساحة رأسية أكبر
- **انعكاس الأيقونات** — الشيفرونات وأسهم الرجوع وإشارات التنقل
- **محتوى يُقرأ طبيعيًا بالعربية** — لا يُترجم كلمة بكلمة

## ما ينكسر في معظم المواقع "ثنائية اللغة"

- الأزرار لا تزال تشير يسار→يمين
- حقول النماذج تصطف على الجانب الخطأ
- الأيقونات لا تنعكس
- تنسيق الأرقام غير صحيح (عربي مقابل أرقام غربية)
- النص العربي يبدو مزدحمًا لأن ارتفاع السطر لم يُعدّل
- القوائم تُغلق على الجانب الخطأ

## تكلفة ذلك فعلاً

إعادة إضافة دعم RTL إلى موقع إنجليزي موجود **أغلى** من بنائه بشكل صحيح من اليوم الأول. إذا كنت تبدأ من جديد، ابنِ ثنائي اللغة أولاً دائمًا.

## الميزة التنافسية

معظم الشركات الخليجية لا تزال لديها مواقع إنجليزية فقط. إذا كان موقعك يعمل **بشكل مثالي** بالعربية، فأنت تبرز فورًا — أمام 60% من المستخدمين الذين يتجاهلهم منافسوك.

**تبني موقعًا ثنائي اللغة؟ [اطلع على نهجنا ←](/services#web-apps)**`,
    },
  },
  {
    slug: "ai-automation-small-business",
    title: {
      en: "AI Automation for Small Businesses: Where to Start",
      ar: "أتمتة الذكاء الاصطناعي للشركات الصغيرة: من أين تبدأ",
    },
    excerpt: {
      en: "You don't need a custom AI model or a data science team. Here are three real automations any small business can deploy this month.",
      ar: "لا تحتاج إلى نموذج ذكاء اصطناعي مخصص أو فريق علوم بيانات. إليك ثلاث عمليات أتمتة حقيقية يمكن لأي شركة صغيرة نشرها هذا الشهر.",
    },
    coverImage: "/og-image.webp",
    category: { en: "AI", ar: "الذكاء الاصطناعي" },
    readTime: 6,
    publishedAt: "2025-12-20",
    author: {
      name: "Muhammad Bilal",
      role: { en: "Founder & Software Architect", ar: "المؤسس ومهندس البرمجيات" },
    },
    tags: ["ai", "automation", "small-business", "whatsapp"],
    content: {
      en: `## You don't need a custom model

The biggest myth about AI is that you need to build it yourself. You don't. **Pre-trained models + smart integration** is what 95% of small businesses actually need.

## Three real automations

### 1. WhatsApp AI chatbot

**Problem:** You receive 50+ WhatsApp enquiries a day. Most are the same 10 questions.

**Solution:** A chatbot trained on your FAQs that answers Arabic + English enquiries, captures the customer's details, and hands over to a human when needed.

**Cost:** ~AED 3,900 setup + AED 990/month. Saves you roughly 3-4 hours per day.

### 2. Document processing

**Problem:** You manually re-type invoice data, order forms, or client details into your CRM.

**Solution:** AI extracts the fields from PDFs and images, then auto-fills your system. Accuracy is typically 95%+.

**Cost:** Varies by volume, but usually under AED 10,000 for the setup.

### 3. Customer support automation

**Problem:** Your team spends hours answering repetitive emails.

**Solution:** An AI assistant drafts replies to common questions, and your team just reviews and sends. Speeds up response time 5-10x.

**Cost:** Usually bundled into an existing chatbot project.

## Where most businesses go wrong

- **Too ambitious.** They want "AI that runs the whole business." Start with one process.
- **No clear metric.** They don't track hours saved, so they can't tell if it worked.
- **Skipping human handover.** Customers hate being stuck with a bot. Always have a path to a human.

## The 20-minute rule

Before building any AI automation, spend 20 minutes writing down:
1. The exact manual process you're replacing
2. How much time it takes per week
3. The cost per hour of that time

If the weekly cost is less than the setup cost divided by 26 weeks, **skip it**. If it's more, **build it**.

**Want help figuring out which automation pays off first? [Book a call](/contact).**`,
      ar: `## لا تحتاج إلى نموذج مخصص

أكبر أسطورة حول الذكاء الاصطناعي هي أنك تحتاج إلى بنائه بنفسك. لا تحتاج. **النماذج المدربة مسبقًا + التكامل الذكي** هو ما تحتاجه 95% من الشركات الصغيرة فعلاً.

## ثلاث عمليات أتمتة حقيقية

### 1. روبوت واتساب بالذكاء الاصطناعي

**المشكلة:** تستقبل 50+ استفسارًا على واتساب يوميًا. معظمها نفس الأسئلة العشرة.

**الحل:** روبوت محادثة مدرّب على أسئلتك الشائعة يجيب على الاستفسارات بالعربية والإنجليزية، ويلتقط بيانات العميل، ويسلّم لإنسان عند الحاجة.

**التكلفة:** ~3,900 درهم إعداد + 990 درهم/شهر. يوفر لك حوالي 3-4 ساعات يوميًا.

### 2. معالجة المستندات

**المشكلة:** تعيد كتابة بيانات الفواتير أو نماذج الطلبات أو تفاصيل العملاء يدويًا في نظام CRM.

**الحل:** يستخرج الذكاء الاصطناعي الحقول من ملفات PDF والصور، ثم يملأ نظامك تلقائيًا. الدقة عادة 95%+.

**التكلفة:** تختلف حسب الحجم، لكن عادة أقل من 10,000 درهم للإعداد.

### 3. أتمتة دعم العملاء

**المشكلة:** يقضي فريقك ساعات في الرد على رسائل بريد إلكتروني متكررة.

**الحل:** مساعد ذكاء اصطناعي يصيغ ردودًا على الأسئلة الشائعة، وفريقك يراجع ويرسل فقط. يسرّع وقت الاستجابة 5-10 أضعاف.

**التكلفة:** عادة تُضمّن في مشروع روبوت محادثة قائم.

## أين تخطئ معظم الشركات

- **طموح مفرط.** يريدون "ذكاء اصطناعي يدير العمل كله". ابدأ بعملية واحدة.
- **لا مقياس واضح.** لا يتتبعون الساعات الموفرة، فلا يستطيعون معرفة ما إذا نجح.
- **تخطي التسليم البشري.** يكره العملاء أن يُحبَصوا مع روبوت. دائمًا وفّر مسارًا لإنسان.

## قاعدة 20 دقيقة

قبل بناء أي أتمتة بالذكاء الاصطناعي، اقض 20 دقيقة في كتابة:
1. العملية اليدوية الدقيقة التي تستبدلها
2. كم من الوقت تستغرق أسبوعيًا
3. تكلفة الساعة من ذلك الوقت

إذا كانت التكلفة الأسبوعية أقل من تكلفة الإعداد مقسومة على 26 أسبوعًا، **تجاهلها**. إذا كانت أكثر، **ابنِها**.

**تريد مساعدة في معرفة أي أتمتة تستحق أولاً؟ [احجز مكالمة](/contact).**`,
    },
  },
];

/* ============================================================
   HELPERS
============================================================ */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPost(): BlogPost {
  return blogPosts.find((p) => p.featured) ?? blogPosts[0];
}

export function getRecentPosts(limit = 6): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, limit);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const post = getPostBySlug(slug);
  if (!post) return blogPosts.slice(0, limit);
  return blogPosts
    .filter((p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, limit);
}