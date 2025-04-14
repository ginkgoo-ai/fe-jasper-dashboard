import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  hostname: "local.slatecast.dev",

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
