import { css } from "$/styled-system/css";
import {
    professionMap,
    subProfessionIdMap,
    nationIdMap,
    groupIdMap,
    teamIdMap,
} from "@/lib/constants/NameMap";

type FilterButtonProps = {
    value: string | number;
    selectedTab: string | number | boolean | null;
    onClick: () => void;
};

const buttonStyle = css({
    cursor: "pointer",
});

const textStyle = css({
    fontSize: {
        base: "fBase",
        lg: "fSm",
        xl: "fMd",
    },
});

const selected = css({
    fontStyle: "italic",
});

const FilterButton = ({ value, selectedTab, onClick }: FilterButtonProps) => {
    if (typeof value === "number") {
        return (
            <button
                className={`${buttonStyle} ${selectedTab === value ? selected : ""}`}
                onClick={onClick}
            >
                <span className={textStyle}>★{value}</span>
            </button>
        );
    }

    if (typeof selectedTab === "boolean") {
        return (
            <button
                className={`${buttonStyle} ${selectedTab === true ? selected : ""}`}
                onClick={onClick}
            >
                <span className={textStyle}>{value}</span>
            </button>
        );
    }

    return (
        <button
            className={`${buttonStyle} ${selectedTab === value ? selected : ""}`}
            onClick={onClick}
        >
            <span className={textStyle}>
                {professionMap[value] ||
                    subProfessionIdMap[value] ||
                    nationIdMap[value] ||
                    groupIdMap[value] ||
                    teamIdMap[value]}
            </span>
        </button>
    );
};

export default FilterButton;
