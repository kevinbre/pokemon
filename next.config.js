/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
}

module.exports = nextConfig
