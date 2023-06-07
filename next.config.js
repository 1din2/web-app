/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["1din2.ro"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.agora.md",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/p",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
