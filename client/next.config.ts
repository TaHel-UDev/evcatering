import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["placehold.co", "directus-b8ss0sswk4wwgw4okswg8gk0.31.130.155.182.sslip.io"],
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
            value: "frame-ancestors 'self' https://*.directus.app https://directus-b8ss0sswk4wwgw4okswg8gk0.31.130.155.182.sslip.io", // Укажите домен вашего Directus
          },
        ],
      },
    ];
  },
};

export default nextConfig;
