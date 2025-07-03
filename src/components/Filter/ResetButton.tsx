import { flex } from "../../../styled-system/patterns";

type ResetButtonProps = {
    onClick: () => void;
};

const container = flex({
    justifyContent: "center",
    flexGrow: 1,
});
const buttonText = flex({
    justifyContent: "center",
    padding: "0 0.5rem",
    color: "red.600",
    cursor: "pointer",
    fontWeight: "semibold",
    fontSize: {
        base: "fBase",
        lg: "fSm",
        xl: "fMd",
    },
    _active: {
        backgroundColor: "gray.300",
    },
});

const ResetButton = ({ onClick }: ResetButtonProps) => {
    return (
        <button className={container} onClick={onClick}>
            <span className={buttonText}>RESET</span>
        </button>
    );
};

export default ResetButton;
