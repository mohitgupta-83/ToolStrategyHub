/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: false,
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.toolstrategyhub.com',
                    },
                ],
                destination: 'https://toolstrategyhub.com/:path*',
                permanent: true,
            },
            {
                source: '/:path*',
                has: [
                    {
                        type: 'header',
                        key: 'x-forwarded-proto',
                        value: 'http',
                    },
                ],
                destination: 'https://toolstrategyhub.com/:path*',
                permanent: true,
            }
        ];
    },
};

export default nextConfig;
