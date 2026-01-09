/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Advertencia: Esto permite que las compilaciones de producción se completen con éxito incluso si
    // tu proyecto tiene errores de ESLint.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
