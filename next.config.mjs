import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/:path*`, // Proxy to Backend
            },
        ];
    },
};

if (process.env.NODE_ENV === 'development') {
    await setupDevPlatform();
}


export default nextConfig;
