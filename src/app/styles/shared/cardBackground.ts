import { css } from "$/styled-system/css";

// Shared background styling
export const cardBackground = css({
    backgroundColor: "black/40",
    borderRadius: "lg",
    padding: "1rem 1.5rem 1.5rem 1.5rem",
    boxShadow: "0 4px 20px black/50",
});

// If you want variants, you can also create multiple versions:
export const cardBackgroundLarge = css({
    backgroundColor: "black/40",
    borderRadius: "lg",
    padding: "2rem 3rem 3rem 3rem",
    boxShadow: "0 4px 20px black/50",
});

export const cardBackgroundSmall = css({
    backgroundColor: "black/40",
    borderRadius: "lg",
    padding: "0.5rem 1rem 1rem 1rem",
    boxShadow: "0 4px 20px black/50",
});
