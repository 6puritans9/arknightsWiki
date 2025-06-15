import { css } from "../../styled-system/css";

type buttonProps = {
    content?: string;
    onClick: () => void;
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

const Button = ({ content, onClick }: buttonProps) => {
    return (
        <button className={buttonStyles} onClick={onClick}>
            {content}
        </button>
    );
};

export default Button;
