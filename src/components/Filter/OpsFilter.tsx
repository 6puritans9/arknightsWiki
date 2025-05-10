"use client";

import { useState } from "react";
import Image from "next/image";
import { OpsFilterCondition } from "@/lib/types";
import { classMap, factionMap } from "@/lib/constants/pathnameMap";
import BranchList from "./BranchList";
import { HoverCard } from "radix-ui";
import getS3Url from "@/lib/apiAws";
import { flex, grid } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";

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

// Types
type opsFilterProps = {
    filterArgs: {
        rarity: number[];
        class: string[];
        branch: string[];
        faction: string[];
    };
    classTree: { [key: string]: string[] };
    onClick: (condition: OpsFilterCondition) => void;
};

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

const OpsFilter = ({ filterArgs, classTree, onClick }: opsFilterProps) => {
    const [branchParent, setBranchParent] = useState<string | null>(null);
    const rarities = filterArgs.rarity;
    const classes = filterArgs.class;
    const factions = filterArgs.faction;

    const handleClassClick = (value: string) => {
        setBranchParent(branchParent === value ? null : value);
        onClick({ category: "class", value });
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

    return (
        <>
            <div className={filterSection}>
                <h3 className={filterTitle}>Rarity</h3>
            </div>
            <div>
                <ul className={rarityWrapper}>
                    {rarities.map((rarity) => (
                        <li key={rarity}>★{rarity}</li>
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
                                <HoverCard.Root>
                                    <HoverCard.Trigger asChild>
                                        <Image
                                            src={getImageSource(
                                                "class",
                                                classItem
                                            )}
                                            height={30}
                                            width={30}
                                            alt={classItem}
                                        />
                                    </HoverCard.Trigger>
                                    <HoverCard.Portal>
                                        <HoverCard.Content>
                                            <BranchList
                                                branches={classTree[classItem]}
                                                onClick={onClick}
                                            />
                                        </HoverCard.Content>
                                    </HoverCard.Portal>
                                </HoverCard.Root>
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
                            <HoverCard.Root>
                                <HoverCard.Trigger asChild>
                                    <Image
                                        src={getImageSource("faction", faction)}
                                        className={factionImage}
                                        height={30}
                                        width={30}
                                        alt={faction}
                                    />
                                </HoverCard.Trigger>
                                <HoverCard.Portal>
                                    <HoverCard.Content>
                                        <div className={popUpWrapper}>
                                            <p className={popUpText}>
                                                {faction}
                                            </p>
                                        </div>
                                    </HoverCard.Content>
                                </HoverCard.Portal>
                            </HoverCard.Root>
                        </li>
                    ))}
                </ul>
            </div>

            <h1
                style={{ color: "red", textAlign: "center" }}
                onClick={() => onClick({ category: null, value: null })}
            >
                RESET
            </h1>
        </>
    );
};

export { OpsFilter };
