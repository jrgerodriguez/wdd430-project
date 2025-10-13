import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['mhtpdpxvrzsiobxggezu.supabase.co'],
  },
  async headers() {
    return [
      {
        // Aplica headers em todas as páginas
        source: '/:path*',
        headers: [
          // Content Security Policy - protege contra XSS
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://maps.gstatic.com https://cdnjs.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
              "img-src 'self' data: https: blob: https://mhtpdpxvrzsiobxggezu.supabase.co",
              "font-src 'self' data: https://fonts.gstatic.com https://cdnjs.cloudflare.com",
              "frame-src 'self' https://www.google.com",
              "connect-src 'self' https://maps.googleapis.com https://mhtpdpxvrzsiobxggezu.supabase.co",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'",
            ].join('; '),
          },
          // Previne clickjacking
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          // Previne MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Controla informações de referrer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Controla permissões de APIs do navegador
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(self "https://www.google.com"), microphone=(), camera=(), payment=(), usb=()',
          },
          // Isolamento de origem (COOP)
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin-allow-popups',
          },
          // Política de embedders
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'unsafe-none',
          },
          // Proteção XSS do navegador
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

export default nextConfig;