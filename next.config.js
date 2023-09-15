/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp'],
    domains: ['files.daviddarx.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/festival-program',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
