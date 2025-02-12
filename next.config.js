/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: '/out',
  images: {
    unoptimized: true
  }
}
module.exports = nextConfig
