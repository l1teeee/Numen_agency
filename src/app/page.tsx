import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import { StickyStack } from "@/components/blocks/sticky-stack";
import { ChatBubble } from "@/components/ui/chat-bubble";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Numen Agency",
  url: "https://numenagency.com",
  logo: "https://numenagency.com/favicon.png",
  email: "hola@numenagency.com",
  description:
    "Boutique digital product studio from El Salvador. We build full-stack web apps, SaaS platforms, and AI-powered tools.",
  foundingDate: "2024",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressCountry: "SV",
    addressRegion: "El Salvador",
  },
  founders: [
    {
      "@type": "Person",
      name: "Julian Mendez",
      jobTitle: "Full-Stack Developer & Co-founder",
    },
    {
      "@type": "Person",
      name: "Igmer Rodriguez",
      jobTitle: "Full-Stack Developer & Co-founder",
    },
  ],
  knowsAbout: [
    "Web Development",
    "Product Design",
    "AI Integration",
    "SaaS Development",
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
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Digital Strategy" } },
    ],
  },
  sameAs: [
    "https://twitter.com/numenagency",
    "https://linkedin.com/company/numenagency",
    "https://github.com/numenagency",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
