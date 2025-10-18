// next.config.js (ESM)
import createNextIntlPlugin from 'next-intl/plugin';

// ---- your existing env + URL logic ----
const api = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!api) throw new Error('NEXT_PUBLIC_API_BASE_URL is required');
const apiUrl = new URL(api);

const cdn = process.env.NEXT_PUBLIC_CDN_BASE_URL;
const remotePatterns = [
  {
    protocol: apiUrl.protocol.replace(':', ''),
    hostname: apiUrl.hostname,
    ...(apiUrl.port ? { port: apiUrl.port } : {}),
    pathname: '/v1/images/**'
  }
];
if (cdn) {
  const cdnUrl = new URL(cdn);
  remotePatterns.push({
    protocol: cdnUrl.protocol.replace(':', ''),
    hostname: cdnUrl.hostname,
    ...(cdnUrl.port ? { port: cdnUrl.port } : {}),
    pathname: '/**'
  });
}


const withNextIntl = createNextIntlPlugin({
  locales: ['en', 'id'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // If you use next-intl’s locale routing (recommended), you usually
  // do NOT need Next.js' built-in i18n block. Remove it to avoid conflicts.
  // i18n: { locales: ['en', 'id'], defaultLocale: 'en', localeDetection: false },

  async rewrites() {
    return [
      { source: '/media/:id', destination: `${apiUrl.origin}/v1/images/:id` }
    ];
  },
  images: { remotePatterns },
  reactStrictMode: true
};

export default withNextIntl(nextConfig);
