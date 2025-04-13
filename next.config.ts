import type { NextConfig } from "next";

import "./src/lib/env/client";
import "./src/lib/env/server";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/dashboard",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
