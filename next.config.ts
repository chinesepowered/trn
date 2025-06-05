import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Disable TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Enable static exports for better hosting compatibility
  trailingSlash: true,
  // Optimize for gaming performance
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
