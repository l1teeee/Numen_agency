import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import { StickyStack } from "@/components/blocks/sticky-stack";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { companyStats } from "@/lib/company-stats";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Numen",
  url: "https://delta-numen.com",
  logo: "https://delta-numen.com/favicon.png",
  email: "contact@delta-numen.com",
  description:
    "Numen is a boutique digital product studio from El Salvador with 12+ projects delivered and 6 products live in production. We build full-stack web apps, SaaS platforms, and AI-powered tools.",
  foundingDate: "2024",
  areaServed: "Worldwide",
  additionalProperty: companyStats.map((stat) => ({
    "@type": "PropertyValue",
    name: stat.schemaName,
    value: stat.display,
  })),
  address: {
    "@type": "PostalAddress",
    addressCountry: "SV",
    addressRegion: "El Salvador",
  },
  founders: [
    {
      "@type": "Person",
      name: "Julian Mendez",
      jobTitle: "Software Engineer & Founder",
    },
    {
      "@type": "Person",
      name: "Igmer Rodriguez",
      jobTitle: "Software Engineer & Co-founder",
    },
  ],
  knowsAbout: [
    "Web Development",
    "Product Design",
    "AI Integration",
    "SaaS Development",
    "DevOps",
    "Infrastructure as Code",
    "Kubernetes",
    "AWS",
    "Google Cloud",
    "Terraform",
    "CI/CD",
    "Next.js",
    "TypeScript",
    "Supabase",
    "Figma",
    "OpenAI",
    "React",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Development" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Product Design" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Integration" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "DevOps & Infrastructure" } },
    ],
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="bg-background">
        <Navbar />
        <HeroSection />
        <StickyStack />
        <ChatBubble />
      </div>
    </>
  );
}
