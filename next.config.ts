import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import withBundleAnalyzerFactory from '@next/bundle-analyzer';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const withBundleAnalyzer = withBundleAnalyzerFactory({
  enabled: process.env.ANALYZE === 'true',
});

// Strip /api/v1 suffix so connect-src points to the API origin, not the versioned path
const apiOrigin = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1')
  .replace(/\/api\/v1$/, '')
  .replace(/\/api$/, '');

const nextConfig: NextConfig = {
  // Enable React 19.2 Compiler (automatic memoization)
  reactCompiler: true,

  // Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'easybake.test',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'easybake.test',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Performance Optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
          {
            key: 'Content-Security-Policy',
            value: `default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ${apiOrigin};`,
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
