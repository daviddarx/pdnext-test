/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    domains: ['files.daviddarx.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/one-night-stands',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
