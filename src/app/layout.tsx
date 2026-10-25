import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "lenis/dist/lenis.css";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const font = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Numen Agency | Digital Agency in El Salvador - Web & SaaS Development",
    template: "%s | Numen Agency",
  },
  description:
    "Digital agency in El Salvador. Full-stack web development, product design and AI. 12+ projects delivered. From concept to production in 4-8 weeks.",
  keywords: [
    "agencia digital El Salvador",
    "desarrollo web El Salvador",
    "agencia desarrollo web",
    "desarrollo SaaS El Salvador",
    "integración IA",
    "diseño productos digitales",
    "Numen Agency",
    "agencia Next.js",
    "desarrollo full-stack",
    "agencia tecnología El Salvador",
    "web development agency El Salvador",
    "SaaS development El Salvador",
  ],
  authors: [{ name: "Numen Agency", url: SITE_URL }],
  creator: "Numen Agency",
  publisher: "Numen Agency",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Numen Agency | Digital Agency in El Salvador - Web & SaaS Development",
    description:
      "Digital agency in El Salvador. Full-stack web development, product design and AI. 12+ projects delivered. From concept to production in 4-8 weeks.",
    url: SITE_URL,
    siteName: "Numen Agency",
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_SV"],
    images: [
      {
        url: "/OPimage.png",
        width: 1200,
        height: 630,
        alt: "Numen Agency - Digital Agency in El Salvador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numen Agency | Digital Agency in El Salvador - Web & SaaS Development",
    description:
      "Digital agency in El Salvador. Full-stack web development, product design and AI. 12+ projects delivered.",
    images: ["/OPimage.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
  other: {
    "geo.region": "SV",
    "geo.placename": "El Salvador",
    "geo.position": "13.6929;-89.2182",
    ICBM: "13.6929, -89.2182",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${font.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
