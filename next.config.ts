import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {},
  // Next 15/16 turbopack settings
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
