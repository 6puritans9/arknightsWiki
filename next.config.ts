import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ["arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com"],
    },
    // async headers() {
    //     return [
    //         {
    //             source: "/_next/image(.*)",
    //             headers: [
    //                 {
    //                     key: "Cache-Control",
    //                     value: "public, max-age=31536000, immutable",
    //                 },
    //             ],
    //         },
    //     ];
    // },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
