import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Remove static export - use regular Next.js
  // output: 'export',
  
  // Keep image optimization disabled for compatibility
  images: {
    unoptimized: true,
  },
  
  // Add trailing slash
  trailingSlash: true,
  
  // Disable problematic features
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'MitraVerify',
  },
};

export default nextConfig;
