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

const SITE_TITLE = "Numen Agency | Digital Agency from El Salvador - Web, SaaS & AI";
const SITE_DESCRIPTION =
  "Digital agency from El Salvador. We design and build web, SaaS and AI products. 12+ projects delivered, from concept to production in 4-8 weeks.";
const SHARE_IMAGE = "/og-numen.jpg";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Numen Agency",
  },
  description: SITE_DESCRIPTION,
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
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: "Numen Agency",
    type: "website",
    locale: "en_US",
    alternateLocale: ["es_SV"],
    images: [
      {
        url: SHARE_IMAGE,
        width: 1200,
        height: 630,
        alt: "Numen. Digital agency from El Salvador. We design and build web, SaaS and AI.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [SHARE_IMAGE],
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
    <html lang="en" className={`${font.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
