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
                    toast: {
                        value: "20",
                        description: "Z-index for toast notifications",
                    },
                    overlay: {
                        value: "30",
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
            },
        },
    },

    // The output directory for your css system
    outdir: "styled-system",
});
