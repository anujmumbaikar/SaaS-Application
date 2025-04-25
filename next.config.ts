import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  api: {
    bodyParser: {
      sizeLimit: '50mb', // Set a size limit for file uploads (adjust as needed)
    },
  },
};

export default nextConfig;
