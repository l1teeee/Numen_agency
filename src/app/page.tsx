import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import { StickyStack } from "@/components/blocks/sticky-stack";
import { ChatBubble } from "@/components/ui/chat-bubble";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Numen",
  url: "https://delta-numen.com",
  logo: "https://delta-numen.com/favicon.png",
  email: "contact@delta-numen.com",
  description:
    "Numen is a boutique digital product studio from El Salvador. We build full-stack web apps, SaaS platforms, and AI-powered tools.",
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
