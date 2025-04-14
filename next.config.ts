import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  ...(isDevelopment && { hostname: "local.slatecast.dev" }),
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api-test.slatecast.dev/api/:path*",
      },
    ];
  },
};

export default nextConfig;
