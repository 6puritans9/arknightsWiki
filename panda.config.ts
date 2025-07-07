import { defineConfig } from "@pandacss/dev";

export default defineConfig({
    // Whether to use css reset
    preflight: true,

    // Where to look for your css declarations
    include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

    // Files to exclude
    exclude: [],

    // Useful for theme customization
    theme: {
        extend: {
            tokens: {
                fontSizes: {
                    fBase: { value: "0.8rem", description: "iPhoneSE_375*667" },
                    fSm: {
                        value: "1rem",
                        description: "iPhone14ProMax_430*932",
                    },
                    fMd: {
                        value: "1rem",
                        description: "iPadAir_820*1180",
                    },
                    fLg: {
                        value: "1.5rem",
                        description: "iPadPro_1024*1366",
                    },
                    fXl: {
                        value: "1.8rem",
                        description: "desktop 1440p",
                    },
                },
                colors: {
                    primary: {
                        value: "#29c8cc",
                        description: "Primary color for arknights theme",
                    },
                    secondary: { value: "#1b1b1b" },
                    headerText: { value: "#333333" },
                    whiteBackground: { value: "#FFFFFC" },
                },
                zIndex: {
                    header: {
                        value: "10",
                        description: "Z-index for header",
                    },
                    modal: {
                        value: "20",
                        description: "Z-index for modal popup",
                    },
                    toast: {
                        value: "30",
                        description: "Z-index for toast notifications",
                    },
                    overlay: {
                        value: "40",
                        description: "Z-index for nav overlay",
                    },
                },
            },
            keyframes: {
                hide: {
                    from: { opacity: "1" },
                    to: { opacity: "0" },
                },
                slideIn: {
                    from: {
                        transform:
                            "translateX(calc(100% + var(--viewport-padding)))",
                    },
                    to: { transform: "translateX(0)" },
                },
                swipeOut: {
                    from: {
                        transform: "translateX(var(--radix-toast-swipe-end-x))",
                    },
                    to: {
                        transform:
                            "translateX(calc(100% + var(--viewport-padding)))",
                    },
                },
                spin: {
                    to: { transform: "rotate(360deg)" },
                },
                borderPulse: {
                    "0%": { borderWidth: "4px;" },
                    "50%": { borderWidth: "8px;" },
                    "100%": { borderWidth: "4px;" },
                },
                dash: {
                    "0%": { strokeDasharray: "1, 150", strokeDashoffset: "0" },
                    "50%": {
                        strokeDasharray: "90, 150",
                        strokeDashoffset: "-35",
                    },
                    "100%": {
                        strokeDasharray: "1, 150",
                        strokeDashoffset: "-125",
                    },
                },
            },
        },
    },

    // The output directory for your css system
    outdir: "styled-system",
});
