import { css } from "../../styled-system/css";

type buttonProps = {
    content?: string;
    onClick: () => void;
    isSelected: boolean;
};

const buttonStyles = css({
    cursor: "pointer",
    padding: "0.5rem 1rem",
    backgroundColor: "transparent",
    borderRadius: "0.25rem",
    fontSize: "1.2rem",
    transition: "all 0.2s ease",
    _hover: {
        backgroundColor: "gray.100",
        borderColor: "gray.500",
    },
    _disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
    },
});
const selected = css({
    backgroundColor: "gray.800",
    color: "white",
    borderColor: "gray.800",
    borderWidth: "1px",
});

const Button = ({ content, onClick, isSelected }: buttonProps) => {
    return (
        <button
            className={`${buttonStyles} ${isSelected && selected}`}
            onClick={onClick}
        >
            {content}
        </button>
    );
};

export default Button;
