/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverActions: true,
    runtime: "nodejs", // good for supabase/server auth
  },
  images: {
    unoptimized: true,
    domains: ["*"],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // ____________________________________
};

module.exports = nextConfig;
