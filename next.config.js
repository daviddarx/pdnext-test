/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
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
