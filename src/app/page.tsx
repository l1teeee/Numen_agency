import { Navbar } from "@/components/blocks/navbar";
import { HeroSection } from "@/components/blocks/hero-section";
import { StickyStack } from "@/components/blocks/sticky-stack";
import { ChatBubble } from "@/components/ui/chat-bubble";
import { companyStats } from "@/lib/company-stats";
import { translations } from "@/lib/translations";

const BASE_URL = "https://delta-numen.com";

const faqEs = translations.es.faq.items;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": `${BASE_URL}/#organization`,
      name: "Numen Agency",
      alternateName: "Numen",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/favicon.png`,
        width: 512,
        height: 512,
      },
      image: `${BASE_URL}/og.png`,
      email: "contact@delta-numen.com",
      description:
        "Agencia digital en El Salvador especializada en desarrollo web full-stack, diseño de productos y integración de IA. 12+ proyectos entregados, 6 productos en producción.",
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
        {
          "@type": "Person",
          name: "Igmer Rodriguez",
          jobTitle: "Software Engineer & Co-founder",
        },
      ],
      knowsAbout: [
        "Desarrollo Web Full-Stack",
        "Diseño de Productos Digitales",
        "Integración de IA",
        "Desarrollo SaaS",
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
        name: "Servicios Digitales",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Desarrollo Web Full-Stack en El Salvador",
              description:
                "Aplicaciones full-stack con Next.js, TypeScript y Supabase. Desde MVPs hasta plataformas SaaS de producción.",
              provider: { "@id": `${BASE_URL}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Diseño de Productos Digitales",
              description:
                "Diseño end-to-end en Figma: flujos de usuario, wireframes, prototipos interactivos y sistemas de diseño.",
              provider: { "@id": `${BASE_URL}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Integración de IA en Productos",
              description:
                "IA conversacional, búsqueda semántica, automatización de contenido y recomendaciones inteligentes.",
              provider: { "@id": `${BASE_URL}/#organization` },
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "DevOps e Infraestructura",
              description:
                "Despliegues en AWS, GCP y Kubernetes. CI/CD, infraestructura como código con Terraform.",
              provider: { "@id": `${BASE_URL}/#organization` },
            },
          },
        ],
      },
      additionalProperty: companyStats.map((stat) => ({
        "@type": "PropertyValue",
        name: stat.schemaName,
        value: stat.display,
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Numen Agency",
      description: "Agencia digital en El Salvador — Desarrollo Web, SaaS e IA",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["es-SV", "en-US"],
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: faqEs.map((item) => ({
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
        <HeroSection />
        <StickyStack />
        <ChatBubble />
      </div>
    </>
  );
}
