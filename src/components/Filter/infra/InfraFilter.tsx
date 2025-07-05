import useInfraStore from "@/stores/infraStore";
import { Accordion } from "radix-ui";
import {
    AccordionTrigger,
    AccordionContent,
    accordionRootStyle,
    accordionItemStyle,
    accordionContentStyle,
} from "@/components/ui/Accordion";
import { RoomType } from "@/api/apiMongo";
// import parseDynamicKeywords from "@/utils/keywordParser";
import FilterButton from "./FilterButton";
import { useState } from "react";
import { flex } from "$/styled-system/patterns";
import { css } from "$/styled-system/css";
import ResetButton from "../ResetButton";

type FilterProps = {
    roomEffectTree: { [key: string]: string[] };
};

const keyWrapper = flex({
    gap: "1rem",
    margin: "1rem 0",
    fontWeight: "bold",
});

const valueWrapper = flex({
    gap: "1rem",
    flexWrap: "wrap",
});

const selected = css({
    fontStyle: "italic",
    transition: "ease-in-out",
});

const buttonStyle = css({
    cursor: "pointer",
});

// Handles dynamic keyword edge cases for filtering
// const keywordData = parseDynamicKeywords();

const InfraFilter = ({ roomEffectTree }: FilterProps) => {
    const [roomTab, setRoomTab] = useState<RoomType | null>(null);
    const [effectTab, setEffectTab] = useState<string | null>(null);
    const [openItems, setOpenItems] = useState<string[]>([]);
    const { updateFilters, applyFilters, resetFilters } = useInfraStore();

    const filterHandler = (category: "rooms" | "effects", effect: string) => {
        updateFilters(category, effect);
        applyFilters();
    };

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
                        {Object.keys(roomEffectTree)
                            .sort()
                            .map((room) => (
                                <button
                                    className={`${buttonStyle} ${roomTab == room ? selected : ""}`}
                                    key={room}
                                >
                                    <span
                                        onClick={() =>
                                            setRoomTab(room as RoomType)
                                        }
                                    >
                                        {room}
                                    </span>
                                </button>
                            ))}
                    </div>
                    {roomTab && (
                        <div className={valueWrapper}>
                            {Object.values(roomEffectTree[roomTab])
                                .sort()
                                .map((effect) => (
                                    <FilterButton
                                        key={effect}
                                        buffText={effect}
                                        selectedTab={effectTab}
                                        selectedStyle={selected}
                                        onClick={() => {
                                            filterHandler("effects", effect);
                                            setEffectTab(effect);
                                        }}
                                    />
                                ))}
                            <ResetButton onClick={resetFilters} />
                        </div>
                    )}
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default InfraFilter;
