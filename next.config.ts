import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                hostname:
                    "arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com",
            },
        ],
        qualities: [75, 90, 100],
        minimumCacheTTL: 31536000,
        formats: ["image/webp", "image/avif"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
