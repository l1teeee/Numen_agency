import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import {
  ServicesSection,
  ProjectsSection,
  UseCasesSection,
  AboutSection,
  GlobalReachSection,
  InsightsSection,
  ProcessSection,
  FAQSection,
  ContactFormSection,
  SiteFooter,
} from "@/components/blocks/sections";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { companyStats } from "@/lib/company-stats";
import { SITE_URL } from "@/lib/site";
import { translations } from "@/lib/translations";

const faqEn = translations.en.faq.items;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${SITE_URL}/#organization`,
      name: "Numen Agency",
      alternateName: "Numen",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.png`,
        width: 512,
        height: 512,
      },
      image: `${SITE_URL}/OPimage.png`,
      email: "contact@delta-numen.com",
      description:
        "Digital agency in El Salvador specializing in full-stack web development, product design and AI integration. 12+ projects delivered, 6 products in production.",
      foundingDate: "2024",
      areaServed: ["El Salvador", "Worldwide"],
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        addressCountry: "SV",
        addressRegion: "El Salvador",
        addressLocality: "El Salvador",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 13.6929,
        longitude: -89.2182,
      },
      founders: [
        {
          "@type": "Person",
          name: "Julian Mendez",
          jobTitle: "Software Engineer & Founder",
        },
      ],
      knowsAbout: [
        "Full-Stack Web Development",
        "Digital Product Design",
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
        itemListElement: translations.en.services.items.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.desc,
            provider: { "@id": `${SITE_URL}/#organization` },
          },
        })),
      },
      additionalProperty: companyStats.map((stat) => ({
        "@type": "PropertyValue",
        name: stat.schemaName,
        value: stat.display,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Numen Agency",
      description: "Digital agency in El Salvador - Web Development, SaaS and AI",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: ["en-US", "es-SV"],
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: faqEn.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ],
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
        <main id="main-content" tabIndex={-1}>
          <HeroSection />
          <ServicesSection />
          <ProjectsSection />
          <UseCasesSection />
          <AboutSection />
          <GlobalReachSection />
          <InsightsSection />
          <ProcessSection />
          <FAQSection />
          <ContactFormSection />
        </main>
        <SiteFooter />
        <ChatBubble />
      </div>
    </>
  );
}
