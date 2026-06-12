import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY ?? '',
    NUMEN_OPENAI_KEY: process.env.NUMEN_OPENAI_KEY ?? '',
    NUMEN_OPENAI_MODEL: process.env.NUMEN_OPENAI_MODEL ?? 'gpt-4o-mini',
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: '/:path*.(png|jpg|jpeg|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
