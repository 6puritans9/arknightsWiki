"use client";
import { useState } from "react";
import { Accordion } from "radix-ui";
import {
    AccordionTrigger,
    AccordionContent,
    accordionRootStyle,
    accordionItemStyle,
    accordionContentStyle,
} from "@/components/ui/Accordion";
import useOperatorStore from "@/stores/operatorStore";
import { OpsFilterType } from "@/stores/operatorStore";
import { flex } from "$/styled-system/patterns";
import FilterButton from "../operators/FilterButton";
import ResetButton from "../ResetButton";

//#region Types
type OpsFilterProps = {
    classTree: { [key: string]: string[] };
    factionTree: { [key: string]: string[] };
};

type TabKey =
    | "rarity"
    | "isLimited"
    | "isAlter"
    | "profession"
    | "subProfessionId"
    | "nationId"
    | "groupId"
    | "teamId";

export type FilterCondition = {
    category: keyof OpsFilterType | "reset";
    value: number | string | null;
};
//#endregion

const customOrder: { [key: string]: number } = {
    PIONEER: 0,
    WARRIOR: 1,
    TANK: 2,
    SNIPER: 3,
    CASTER: 4,
    MEDIC: 5,
    SUPPORT: 6,
    SPECIAL: 7,
};

//#region Styles
const keyWrapper = flex({
    gap: "1rem",
    margin: "1rem 0",
    fontWeight: "bold",
    flexWrap: "wrap",
});

const valueWrapper = flex({
    gap: "1rem",
    flexWrap: "wrap",
});

// const selected = css({
//     fontStyle: "italic",
// });
//#endregion

const initialTabs = {
    rarity: null,
    isLimited: false,
    isAlter: false,
    profession: null,
    subProfessionId: null,
    nationId: null,
    groupId: null,
    teamId: null,
};

const OpsFilter = ({ classTree, factionTree }: OpsFilterProps) => {
    const [tabs, setTabs] = useState<{
        rarity: number | null;
        isLimited: boolean;
        isAlter: boolean;
        profession: string | null;
        subProfessionId: string | null;
        nationId: string | null;
        groupId: string | null;
        teamId: string | null;
    }>(initialTabs);
    const [openItems, setOpenItems] = useState<string[]>([]);
    const { updateFilters, applyFilters, resetFilters } = useOperatorStore();

    const rarities = Array.from({ length: 6 }, (_, i) => 6 - i);

    //#region helper functions
    const handleFilter = (
        category: keyof OpsFilterType,
        value: string | number | boolean
    ) => {
        updateFilters(category, value);
        applyFilters();
    };

    const handleTabs = (tab: TabKey, value: string | number | boolean) => {
        setTabs((prv) => ({
            ...prv,
            [tab]: prv[tab] === value ? null : value,
        }));
    };

    const handleClick = (
        category: keyof OpsFilterType,
        value: string | number | boolean
    ) => {
        handleTabs(category as TabKey, value);
        handleFilter(category, value);
    };

    const handleReset = () => {
        setTabs(initialTabs);
        resetFilters();
    };
    //#endregion

    return (
        <Accordion.Root
            className={accordionRootStyle}
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
        >
            <Accordion.Item className={accordionItemStyle} value="desc">
                <AccordionTrigger>About this page</AccordionTrigger>
                <AccordionContent>
                    <p className={accordionContentStyle}>
                        You can click filter or you can click highlited related
                        attributes in the card
                    </p>
                </AccordionContent>
            </Accordion.Item>
            <Accordion.Item className={accordionItemStyle} value="filter">
                <AccordionTrigger>
                    {openItems.includes("filter")
                        ? "Close Filter"
                        : "Open Filter"}
                </AccordionTrigger>
                <AccordionContent>
                    <div className={keyWrapper}>
                        {rarities.map((r) => (
                            <FilterButton
                                key={r}
                                value={r}
                                selectedTab={tabs.rarity}
                                onClick={() => handleClick("rarity", r)}
                            />
                        ))}
                    </div>
                    <div className={keyWrapper}>
                        <FilterButton
                            value={"Limited"}
                            selectedTab={tabs.isLimited}
                            onClick={() =>
                                handleClick("isLimited", !tabs.isLimited)
                            }
                        />
                        <FilterButton
                            value={"Alter"}
                            selectedTab={tabs.isAlter}
                            onClick={() =>
                                handleClick("isAlter", !tabs.isAlter)
                            }
                        />
                    </div>
                    <div className={keyWrapper}>
                        {Object.keys(classTree)
                            .sort((a, b) => customOrder[a] - customOrder[b])
                            .map((_class) => (
                                <FilterButton
                                    key={_class}
                                    value={_class}
                                    selectedTab={tabs.profession}
                                    onClick={() =>
                                        handleClick("profession", _class)
                                    }
                                />
                            ))}
                        <ResetButton onClick={() => handleReset()} />
                    </div>
                    {tabs.profession && (
                        <div className={valueWrapper}>
                            {Object.values(classTree[tabs.profession])
                                .sort()
                                .map((branch) => (
                                    <FilterButton
                                        key={branch}
                                        value={branch}
                                        selectedTab={tabs.subProfessionId}
                                        onClick={() =>
                                            handleClick(
                                                "subProfessionId",
                                                branch
                                            )
                                        }
                                    />
                                ))}
                        </div>
                    )}
                    <div className={keyWrapper}>
                        {Object.keys(factionTree)
                            .sort()
                            .map((nation) => (
                                <FilterButton
                                    key={nation}
                                    value={nation}
                                    selectedTab={tabs.nationId}
                                    onClick={() =>
                                        handleClick("nationId", nation)
                                    }
                                />
                            ))}
                    </div>
                    {tabs.nationId &&
                        factionTree[tabs.nationId] &&
                        factionTree[tabs.nationId].length > 0 && (
                            <div className={valueWrapper}>
                                {Object.values(factionTree[tabs.nationId])
                                    .sort()
                                    .map((v) => (
                                        <FilterButton
                                            key={v}
                                            selectedTab={tabs.groupId}
                                            value={v}
                                            onClick={() => {
                                                handleClick("groupId", v);
                                                // handleClick("teamId", v);
                                            }}
                                        />
                                    ))}
                            </div>
                        )}
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default OpsFilter;
