/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["1din2.ro", "storage.agora.md", "s3.eu-central-1.amazonaws.com"],
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