import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'http',
        hostname: '**', // Разрешаем все HTTP источники (для разработки и Directus)
      },
      {
        protocol: 'https',
        hostname: '**', // Разрешаем все HTTPS источники
      },
    ],
  },
  // Настройки для работы с Directus Visual Editor
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Разрешаем загрузку в iframe
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' http://* https://*", // Разрешаем HTTP и HTTPS
          },
        ],
      },
    ];
  },
};

export default nextConfig;
