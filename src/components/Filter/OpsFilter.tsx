"use client";

import Image from "next/image";
import { useOperatorStore } from "@/store/operatorStore";
import { css } from "../../../styled-system/css";
import { flex, grid } from "../../../styled-system/patterns";
import { selected, nonSelected } from "@/app/styles/filterStyles";
import { classMap, factionMap } from "@/lib/constants/pathnameMap";
import getS3Url from "@/lib/apiAws";
import BranchList from "./BranchList";
import {
    HybridTooltip,
    HybridTooltipContent,
    HybridTooltipTrigger,
} from "../HybirdTooltip";

// Styles
const filterSection = flex({
    gap: "1.5",
});

const filterTitle = css({
    fontSize: {
        base: "sm",
        md: "lg",
    },
});

const rarityWrapper = flex({
    justify: "spaceBetween",
    align: "center",
    cursor: "pointer",
    gap: "0.2rem",
});

const classWrapper = flex({
    cursor: "pointer",
});

const classImage = css({
    height: "30px",
    width: "auto",
    backgroundColor: "black",
});

const factionWrapper = grid({
    gridTemplateColumns: "repeat(10, 1fr)",
    gridTemplateRows: "auto",
    gap: "0",
    justifyItems: "center",
    alignItems: "center",
    cursor: "pointer",
});

const factionImage = css({
    height: "30px",
    width: "auto",
    backgroundColor: "black",
});

const popUpWrapper = css({
    backgroundColor: "rgba(0,0,0,0.7)",
    opacity: "0.9",
    padding: "0.1rem 0.2rem 0.1rem 0.1rem",
});

const popUpText = css({
    color: "white",
});

const resetButton = flex({
    justify: "center",
    color: "red.500",
    textAlign: "center",
    cursor: "pointer",
    fontWeight: "bold",
    padding: "0.5rem",
    borderRadius: "md",
    transition: "0.2s ease-in-out",
    _hover: {
        backgroundColor: "red.50",
        opacity: "0.5",
    },
    _active: {
        backgroundColor: "red.50",
        opacity: "0.7",
        transition: "background-color 0.1s ease-in-out",
    },
});

// Custom order for class sorting
const customOrder: { [key: string]: number } = {
    Vanguard: 0,
    Guard: 1,
    Defender: 2,
    Sniper: 3,
    Caster: 4,
    Medic: 5,
    Supporter: 6,
    Specialist: 7,
};

// Types
type Filters = {
    rarity: number[];
    class: string[];
    branch: string[];
    faction: string[];
};

type FilterCondition = {
    category: keyof Filters | "reset";
    value: number | string | null;
};

type FilterProps = {
    filterArgs: {
        rarity: number[];
        class: string[];
        branch: string[];
        faction: string[];
    };
    classTree: { [key: string]: string[] };
};

const OpsFilter = ({ filterArgs, classTree }: FilterProps) => {
    const rarities = filterArgs.rarity;
    const classes = filterArgs.class;
    const factions = filterArgs.faction;

    const filters: Filters = useOperatorStore((state) => state.filters);
    const updateFilter = useOperatorStore((state) => state.updateFilter);
    const applyFilters = useOperatorStore((state) => state.applyFilters);
    const resetFilters = useOperatorStore((state) => state.resetFilters);

    const handleFilterChange = (condition: FilterCondition) => {
        if (condition.category === "reset") {
            resetFilters();
        } else {
            updateFilter(condition.category, condition.value);
        }
        applyFilters();
    };

    const handleClassClick = (value: string) => {
        handleFilterChange({ category: "class", value: value });
    };

    const getImageSource = (category: string, key: string): string => {
        if (category === "class" && classMap[key]) {
            return getS3Url(classMap[key]);
        }
        if (category === "faction" && factionMap[key]) {
            return getS3Url(factionMap[key]);
        }

        return getS3Url("/placeholder.png");
    };

    const isSelected = (
        category: keyof typeof filters,
        value: string | number
    ): boolean => {
        return (filters[category] as (string | number)[]).includes(value);
    };

    return (
        <>
            <div className={filterSection}>
                <h3 className={filterTitle}>Rarity</h3>
            </div>
            <div>
                <ul className={rarityWrapper}>
                    {rarities.map((rarity) => (
                        <li
                            key={rarity}
                            className={
                                isSelected("rarity", rarity)
                                    ? selected
                                    : nonSelected
                            }
                            onClick={() =>
                                handleFilterChange({
                                    category: "rarity",
                                    value: rarity,
                                })
                            }
                        >
                            ★{rarity}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={filterSection}>
                <h3 className={filterTitle}>Class</h3>
            </div>
            <div>
                <ul className={classWrapper}>
                    {classes
                        .sort((a, b) => customOrder[a] - customOrder[b])
                        .map((classItem) => (
                            <li key={classItem}>
                                <HybridTooltip>
                                    <HybridTooltipTrigger asChild>
                                        <Image
                                            src={getImageSource(
                                                "class",
                                                classItem
                                            )}
                                            className={
                                                isSelected("class", classItem)
                                                    ? `${nonSelected} ${classImage}`
                                                    : `${selected} ${classImage}`
                                            }
                                            height={30}
                                            width={30}
                                            alt={classItem}
                                            onClick={() =>
                                                handleClassClick(classItem)
                                            }
                                        />
                                    </HybridTooltipTrigger>
                                    <HybridTooltipContent>
                                        <BranchList
                                            branches={classTree[classItem]}
                                            onClick={handleFilterChange}
                                            activeBranches={filters.branch}
                                        />
                                    </HybridTooltipContent>
                                </HybridTooltip>
                            </li>
                        ))}
                </ul>
            </div>

            <div className={filterSection}>
                <h3 className={filterTitle}>Faction</h3>
            </div>
            <div>
                <ul className={factionWrapper}>
                    {factions.map((faction) => (
                        <li key={faction}>
                            <HybridTooltip>
                                <HybridTooltipTrigger asChild>
                                    <Image
                                        src={getImageSource("faction", faction)}
                                        className={
                                            isSelected("faction", faction)
                                                ? `${selected} ${factionImage}`
                                                : `${nonSelected} ${factionImage}`
                                        }
                                        height={30}
                                        width={30}
                                        alt={faction}
                                        onClick={() =>
                                            handleFilterChange({
                                                category: "faction",
                                                value: faction,
                                            })
                                        }
                                    />
                                </HybridTooltipTrigger>
                                <HybridTooltipContent>
                                    <div className={popUpWrapper}>
                                        <p className={popUpText}>{faction}</p>
                                    </div>
                                </HybridTooltipContent>
                            </HybridTooltip>
                        </li>
                    ))}
                </ul>
                <div
                    className={resetButton}
                    onClick={() =>
                        handleFilterChange({ category: "reset", value: null })
                    }
                >
                    <span>RESET</span>
                </div>
            </div>
        </>
    );
};

export { OpsFilter };
