import { css } from "../../../../styled-system/css";

type FilterButtonProps = {
    buffText: string;
    selectedTab: string | null;
    selectedStyle: string;
    onClick: () => void;
};

const buttonStyle = css({
    cursor: "pointer",
});

const textStyle = css({
    fontSize: {
        base: "0.5rem",
        mdToLg: "0.8rem",
        xl: "1rem",
    },
});

const FilterButton = ({
    buffText,
    selectedTab,
    selectedStyle,
    onClick,
}: FilterButtonProps) => {
    return (
        <button
            className={`${buttonStyle} ${selectedTab === buffText ? selectedStyle : ""}`}
            onClick={onClick}
        >
            <span className={textStyle}>{buffText}</span>
        </button>
    );
};

export default FilterButton;
