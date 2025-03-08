import withBundleAnalyzer from '@next/bundle-analyzer';
const bundleAnalyzer = withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
})
/** @type {import('next').NextConfig} */
const isProd = process.env.APP_MODE === 'production'
const isBeta = process.env.APP_MODE === 'beta'
const nextConfig = {
    experimental: {
        nextScriptWorkers: true,
    },
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "www.gradding.com" },
            { protocol: "https", hostname: "gradding.com" },
            { protocol: "https", hostname: "gradding.s3.ap-south-1.amazonaws.com" },
            { protocol: "https", hostname: "wsnew2024.s3.amazonaws.com" },
            { protocol: "http", hostname: "localhost" },
            { protocol: "https", hostname: "beta.gradding.com" },
            { protocol: "http", hostname: "127.0.0.1" },
            { protocol: "http", hostname: "127.0.0.1", port: "8000" },
        ],
        // disableStaticImages: true,
        // domains: ['beta.gradding.com'], // Replace with your actual domain(s)
        path: (isBeta || isProd) ? '/blog/_next/image' : "/_next/image", // Set your desired base path
    },
    assetPrefix: isBeta ? 'https://beta.gradding.com/blog' : isProd ? 'https://www.gradding.com/blog' : "",
};

// export default nextConfig;
export default bundleAnalyzer(nextConfig);
