// lib/seo-schemas.ts
// Structured Data for SEO (Schema.org)

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodEarn",
  alternateName: "Code Earn Tech",
  url: "https://www.codearntech.com",
  logo: "https://www.codearntech.com/logo.png",
  description: "Leading software development company specializing in SaaS products, custom web applications, and practical programming training with guaranteed internships.",
  foundingDate: "2021",
  founders: [
    {
      "@type": "Person",
      name: "Muhammad Bilal", // Aapna naam yahan add karein
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Bazaar, Near City Center", // Exact address update karein
    addressLocality: "Samundri",
    addressRegion: "Punjab",
    postalCode: "37300",
    addressCountry: "PK",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+92-321-9515138", // Aapka number add karein
    contactType: "customer service",
    availableLanguage: ["English", "Urdu"],
    areaServed: "PK",
  },
  sameAs: [
    "https://www.facebook.com/codearntech", // Social links update karein
    "https://www.linkedin.com/company/codearntech",
    "https://twitter.com/codearntech",
    "https://github.com/codearntech",
  ],
  email: "codearntech@gmai.com",
  knowsAbout: [
    "SaaS Development",
    "Web Application Development",
    "Software Engineering",
    "Programming Training",
    "Backend Development",
    "Data Modeling",
    "System Architecture",
  ],
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "SaaS Product Development",
        description: "End-to-end SaaS platform development with scalable architecture",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Custom Web Application Development",
        description: "Tailored web applications for business automation",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Course",
        name: "Full Stack Development Training",
        description: "Practical programming training with internship guarantee",
      },
    },
  ],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CodEarn",
  url: "https://www.codearntech.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.codearntech.com/blogs?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-US",
  copyrightHolder: {
    "@type": "Organization",
    name: "CodEarn",
  },
  creator: {
    "@type": "Organization",
    name: "CodEarn",
  },
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Organization"],
  name: "CodEarn",
  image: "https://www.codearntech.com/og-image.jpg",
  "@id": "https://www.codearntech.com",
  url: "https://www.codearntech.com",
  telephone: "+92-321-9515138",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Main Bazaar",
    addressLocality: "Samundri",
    addressRegion: "Punjab",
    postalCode: "37300",
    addressCountry: "PK",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "31.4639", // Samundri coordinates
    longitude: "73.3428",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  department: [
    {
      "@type": "LocalBusiness",
      name: "CodEarn Training Center",
      description: "Programming and software development training institute",
    },
  ],
};