/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Image optimization
    images: {
        domains: [],
        formats: ["image/webp", "image/avif"],
    },
};

module.exports = nextConfig;
