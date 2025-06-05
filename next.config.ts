import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react']
  },
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  // Enable static exports for better hosting compatibility
  trailingSlash: true,
  // Optimize for gaming performance
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
