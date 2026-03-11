import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // adjust as needed
    },
  },
  reactCompiler: true,
  typedRoutes: true,
};

export default nextConfig;
