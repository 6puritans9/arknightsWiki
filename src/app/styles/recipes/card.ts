import { cva } from "../../../../styled-system/css";

export const card = cva({
    base: {
        backgroundColor: "black/40",
        borderRadius: "lg",

        boxShadow: "0 4px 20px black/50",
    },

    variants: {
        spacing: {
            lg: { padding: "1rem 1.5rem 1.5rem 1.5rem" },
        },
    },
});
