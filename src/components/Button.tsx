import { css } from "../../styled-system/css";
import Image from "next/image";

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
            <Image
                src={`https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com/public/${content}.png`}
                width="50"
                height="50"
                alt={content as string}
            />
        </button>
    );
};

export default Button;
