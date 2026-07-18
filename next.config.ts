import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["three", "@react-three/drei", "@react-three/fiber"],
  },
};

export default nextConfig;
