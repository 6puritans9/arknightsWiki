"use client";

import { useState } from "react";
import Image from "next/image";
import { OpsFilterCondition } from "@/lib/types";
import { classMap, factionMap } from "@/lib/constants/pathnameMap";
import { BranchList } from "./BranchList";

type opsFilterProps = {
    filterArgs: { category: string; values: (string | number)[] }[];
    classTree: { [key: string]: string[] };
    onClick: (condition: OpsFilterCondition) => void;
};

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

    const handleClassClick = (value: string) => {
        setBranchParent(branchParent === value ? null : value);
        onClick({ category: "class", value });
    };

    return (
        <div className="filter__container">
            {filterArgs
                .filter((arg) => arg.category !== "branch")
                .map((arg, index) => (
                    <div
                        key={index}
                        className={`filter__${arg.category}__container`}
                    >
                        <h3 className="filter__title">
                            {arg.category.toUpperCase()}
                        </h3>
                        <ul className={`filter__${arg.category}`}>
                            {arg.values
                                .sort((a, b) => customOrder[a] - customOrder[b])
                                .map((value, index) => (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            arg.category === "class"
                                                ? handleClassClick(
                                                      value.toString()
                                                  )
                                                : onClick({
                                                      category: arg.category,
                                                      value,
                                                  })
                                        }
                                    >
                                        <div className="filter__icon__container">
                                            {(arg.category === "rarity" && (
                                                <p className="filter__icon__text">
                                                    ★{value}
                                                </p>
                                            )) || (
                                                <>
                                                    <Image
                                                        className="filter__icon__image"
                                                        src={
                                                            (arg.category ===
                                                                "class" &&
                                                                classMap[
                                                                    value
                                                                ]) ||
                                                            (arg.category ===
                                                                "faction" &&
                                                                factionMap[
                                                                    value
                                                                ])
                                                        }
                                                        height={30}
                                                        width={30}
                                                        alt={value.toString()}
                                                    />
                                                    <p className="filter__icon__desc">
                                                        {value}
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        {arg.category === "class" &&
                                            branchParent === value && (
                                                <BranchList
                                                    branches={classTree[value]}
                                                    onClick={onClick}
                                                />
                                            )}
                                    </li>
                                ))}
                        </ul>
                    </div>
                ))}

            <h1
                style={{ color: "red", textAlign: "center" }}
                onClick={() => onClick({ category: null, value: null })}
            >
                RESET
            </h1>
        </div>
    );
};

export { OpsFilter };
