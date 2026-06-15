import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SITE_URL } from "@/lib/site";

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
    default: "Numen Agency | Agencia Digital El Salvador - Desarrollo Web & SaaS",
    template: "%s | Numen Agency",
  },
  description:
    "Agencia digital en El Salvador. Desarrollo web full-stack, diseño de productos y IA. 12+ proyectos entregados. Del concepto a producción en 4-8 semanas.",
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
    title: "Numen Agency | Agencia Digital El Salvador - Desarrollo Web & SaaS",
    description:
      "Agencia digital en El Salvador. Desarrollo web full-stack, diseño de productos y IA. 12+ proyectos entregados. Del concepto a producción en 4-8 semanas.",
    url: SITE_URL,
    siteName: "Numen Agency",
    type: "website",
    locale: "es_SV",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Numen Agency — Agencia Digital El Salvador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numen Agency | Agencia Digital El Salvador - Desarrollo Web & SaaS",
    description:
      "Agencia digital en El Salvador. Desarrollo web full-stack, diseño de productos y IA. 12+ proyectos entregados.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  category: "technology",
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
      </body>
    </html>
  );
}
