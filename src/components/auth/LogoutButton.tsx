import { css } from "$/styled-system/css";

type LogoutButtonProps = {
    locale: string;
    onLogout: () => void;
};

const buttonStyle = css({
    userSelect: "none",
    appearance: "none",
    backgroundColor: "secondary", // A more distinct background color (e.g., a shade of red for logout)
    color: "white", // Ensure good contrast with the background
    border: "1px solid token(colors.red.700)", // Border color matching the theme
    borderRadius: "md", // Using a token for border radius (e.g., 'md' for medium)
    boxSizing: "border-box",
    cursor: "pointer",
    fontFamily: "inherit", // Inherit from a global style or specify
    fontSize: "sm", // Using a token for font size (e.g., 'sm' for small)
    fontWeight: "semibold", // Make the font a bit bolder
    height: "36px", // Slightly adjusted height
    letterSpacing: "0.25px",
    outline: "none",
    overflow: "hidden",
    padding: "0 16px", // Adjusted padding for better horizontal spacing
    position: "relative",
    textAlign: "center",
    transition:
        "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    // width: "auto", // 'auto' is fine, or set a min-width if needed
    // maxWidth: "400px", // Keep if you need to constrain it
    minWidth: "90px", // Ensure it's not too small

    _hover: {
        backgroundColor: "secondary", // Darken on hover
        borderColor: "red.800",
        boxShadow: "sm", // Add a subtle shadow on hover
        opacity: "0.7",
    },

    _active: {
        backgroundColor: "secondary", // Darken further when clicked
        opacity: "0.9",
        boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)", // Inner shadow for pressed effect
    },

    _focusVisible: {
        // For keyboard navigation
        outline: "2px solid token(colors.blue.500)", // Or your focus ring color
        outlineOffset: "2px",
    },
});

const LogoutButton = ({ locale, onLogout }: LogoutButtonProps) => {
    return (
        <button onClick={onLogout} className={buttonStyle}>
            Logout
        </button>
    );
};

export default LogoutButton;
