/** @type {import('next').NextConfig} */

const staticContent = require('./static-content/static-content.json');

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: staticContent.defaultRoute,
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
