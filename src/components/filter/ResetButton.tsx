import { css } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

type ResetButtonProps = {
    onClick: () => void;
};

const buttonStyle = flex({
    justifyContent: "center",
    alignItems: "end",
    flexGrow: 1,
    cursor: "pointer",
});

const textStyle = css({
    _active: {
        backgroundColor: "gray.300",
    },
    fontSize: {
        base: "fBase",
        lg: "fSm",
        xl: "fMd",
    },
    padding: "0 0.5rem",
    color: "red.600",
    maxHeight: "100%",
});

const ResetButton = ({ onClick }: ResetButtonProps) => {
    return (
        <button className={buttonStyle} onClick={onClick}>
            <span className={textStyle}>RESET</span>
        </button>
    );
};

export default ResetButton;
