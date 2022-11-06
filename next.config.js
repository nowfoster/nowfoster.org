/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    domains: ["images.ctfassets.net"],
  },

  async redirects() {
    return [
      {
        source: "/could-you-foster",
        destination: "/could-you-foster/0",
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
