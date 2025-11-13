/**
 * Утилита для определения поддомена франчайзи
 */

export function getFranchiseSubdomain(): string | null {
  if (typeof window === 'undefined') return null;

  const host = window.location.host;
  const parts = host.split('.');

  // Локальная разработка: msk.localhost
  if (host.includes('localhost')) {
    const subdomain = parts[0];
    return subdomain === 'localhost' ? null : subdomain;
  }

  // Продакшен: msk.yourdomain.com
  if (parts.length >= 3) {
    return parts[0]; // первая часть - это поддомен
  }

  return null;
}

export function getFranchiseBaseUrl(): string {
  const subdomain = getFranchiseSubdomain();
  
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }

  if (subdomain) {
    return `${window.location.protocol}//${window.location.host}`;
  }

  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

