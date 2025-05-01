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
                    secondary: { value: "#1b1b1b6c" },
                    headerText: { value: "#333333" },
                },
            },
        },
    },

    // The output directory for your css system
    outdir: "styled-system",
});
