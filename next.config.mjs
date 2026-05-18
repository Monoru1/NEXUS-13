/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  pageExtensions: ['ts', 'tsx', 'mdx'],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
          // Note thématique : ces headers servent la fiction aussi (le site se comporte comme une vraie ressource sécurisée).
          { key: 'X-Nexus-Classification', value: 'NEXUS//SECRET//NOFORN' },
        ],
      },
    ];
  },
};

export default nextConfig;
