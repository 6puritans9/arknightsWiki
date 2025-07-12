import useLocaleStore from "@/stores/localeStore";
import { css } from "$/styled-system/css";
import { LogoutText } from "@/lib/dictionary";

type LogoutButtonProps = {
    onLogout: () => void;
};

const buttonStyle = css({
    fontSize: { base: "0.5rem", md: "fMd" },
    height: { base: "28px", md: "36px" },
    minWidth: { base: "50px", md: "8rem" },
    padding: { base: "0 0.6rem", md: "0 16px" },
    fontWeight: "semibold",
    color: "white",

    backgroundColor: "secondary",
    border: "1px solid token(colors.red.700)",
    borderRadius: "md",

    cursor: "pointer",
    overflow: "hidden",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
    transition:
        "background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out",

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
});

const LogoutButton = ({ onLogout }: LogoutButtonProps) => {
    const { locale } = useLocaleStore();

    return (
        <button onClick={onLogout} className={buttonStyle}>
            {LogoutText[locale]}
        </button>
    );
};

export default LogoutButton;
