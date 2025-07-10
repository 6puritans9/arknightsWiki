import { css } from "$/styled-system/css";

const rarityStyle = css({
    fontSize: {
        base: "fBase",
        xl: "fLg",
    },
    position: "absolute",
    top: "0.5rem",
    left: "30%",
    transform: "translateX(-30%)",
    textAlign: "center",
    textShadow: "0 0 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 140, 0, 0.4)",
    color: "#FF8C00",
    zIndex: 2,
});

const iridescentRarityStyle = css({
    fontSize: {
        base: "fBase",
        xl: "fLg",
    },
    display: "inline-block",
    position: "absolute",
    top: "0.5rem",
    left: "40%",
    transform: "translateX(-40%)",
    textAlign: "center",
    background:
        "linear-gradient(135deg, #e0e0e0 0%, {colors.primary} 25%, #fff0d1 45%, #ffc470 55%, #ff9a3c 65%, #e0e0e0 100%)",
    backgroundSize: "300% 100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 1)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 16px rgba(108, 180, 238, 0.6))",
    animation: "metallicFlow 3s linear infinite",
    fontWeight: "bold",
    zIndex: 2,
});

export { rarityStyle, iridescentRarityStyle };
