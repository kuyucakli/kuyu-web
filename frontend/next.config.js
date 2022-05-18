/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig


module.exports = {
  i18n: {
    locales: ["tr"],
    defaultLocale: "tr",
  },
  images: {
    domains: ['127.0.0.1', '127.0.0.1:1337', 'localhost'],
  },

  // Prefer loading of ES Modules over CommonJS
  experimental: { 
    esmExternals: true,
    images: {
      layoutRaw: true,
    },
  },

};
