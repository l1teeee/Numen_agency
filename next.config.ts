import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    BREVO_API_KEY: process.env.BREVO_API_KEY ?? '',
    NUMEN_OPENAI_KEY: process.env.NUMEN_OPENAI_KEY ?? '',
    NUMEN_OPENAI_MODEL: process.env.NUMEN_OPENAI_MODEL ?? 'gpt-4o-mini',
  },
};

export default nextConfig;
