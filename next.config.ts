import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: ["ukdppxnanimydpuedftw.supabase.co"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
