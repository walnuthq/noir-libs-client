/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/v1/:path*',
                destination: 'https://npkg.walnut.dev/api/v1/:path*', // Proxy to Backend
            },
        ];
    },
};

export default nextConfig;
