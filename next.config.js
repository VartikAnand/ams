/** @type {import('next').NextConfig} */
const nextConfig = {
  ignoreBuildErrors: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
