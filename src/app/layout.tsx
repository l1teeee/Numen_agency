import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const font = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const BASE_URL = "https://delta-numen.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Numen — Digital Product Studio",
    template: "%s | Numen",
  },
  description:
    "Numen is a boutique digital product studio from El Salvador. We build full-stack web apps, SaaS platforms, and AI-powered tools with Next.js, TypeScript, and Supabase.",
  keywords: [
    "digital product studio",
    "web development agency",
    "SaaS development",
    "AI integration",
    "product design",
    "Next.js agency",
    "TypeScript development",
    "El Salvador tech agency",
    "full-stack development",
    "Supabase",
  ],
  authors: [{ name: "Numen", url: BASE_URL }],
  creator: "Numen",
  publisher: "Numen",
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Numen — Digital Product Studio",
    description:
      "Boutique digital product studio. Full-stack apps, product design, and AI integration from El Salvador.",
    url: BASE_URL,
    siteName: "Numen",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Numen — Digital Product Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Numen — Digital Product Studio",
    description:
      "Boutique digital product studio. Full-stack apps, product design, and AI integration.",
    images: ["/og.png"],
  },
  alternates: {
    canonical: BASE_URL,
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
