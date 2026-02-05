const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/contentfulImageLoader.js',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

// Configurar orígenes de desarrollo permitidos desde variable de entorno
// Formato: "host1:port1,host2:port2" o "host1,host2"
if (process.env.ALLOWED_DEV_ORIGINS) {
  nextConfig.allowedDevOrigins = process.env.ALLOWED_DEV_ORIGINS.split(',').map(o => o.trim());
}

module.exports = withBundleAnalyzer(nextConfig);
