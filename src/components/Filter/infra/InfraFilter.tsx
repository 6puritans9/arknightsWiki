import { BuffsObjectType } from "@/lib/apiMongo";
// import parseDynamicKeywords from "@/utils/keywordParser";
import { flex } from "../../../../styled-system/patterns";
import useInfraStore from "@/stores/infraStore";
import { Accordion } from "radix-ui";
import {
    AccordionTrigger,
    AccordionContent,
    accordionRootStyle,
    accordionItemStyle,
    accordionContentStyle,
} from "@/components/ui/Accordion";
import { css } from "../../../../styled-system/css";

type FilterProps = {
    buffs: BuffsObjectType;
    roomEffectTree: { [key: string]: string[] };
};

const trigger = css({
    backgroundColor: "blue",
});
const wrapper = flex({});

// Handles dynamic keyword edge cases for filtering
// const keywordData = parseDynamicKeywords();

const InfraFilter = ({ buffs, roomEffectTree }: FilterProps) => {
    // const roomNames = Object.keys(roomEffectTree);
    // const effectNames = Object.values(roomEffectTree).flat();

    const { updateFilters, applyFilters, resetFilters } = useInfraStore();

    const filterHandler = (category: "rooms" | "effects", effect: string) => {
        updateFilters(category, effect);
        applyFilters();
    };

    return (
        <Accordion.Root className={accordionRootStyle} type="multiple">
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
                <AccordionTrigger>Open Filter</AccordionTrigger>
                <AccordionContent>
                    <div className={wrapper}>
                        {Object.keys(roomEffectTree).map((room) => (
                            <div key={room}>
                                <p onClick={() => filterHandler("rooms", room)}>
                                    {room}
                                </p>
                                <div>
                                    {Object.values(roomEffectTree[room]).map(
                                        (effect) => (
                                            <p
                                                key={effect}
                                                style={{
                                                    color:
                                                        buffs[effect]
                                                            ?.buffColor ??
                                                        "blue",
                                                    fontSize: "0.8rem",
                                                }}
                                                onClick={() =>
                                                    filterHandler(
                                                        "effects",
                                                        effect
                                                    )
                                                }
                                            >
                                                {effect}
                                            </p>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <h1
                        style={{ color: "red", textAlign: "center" }}
                        onClick={() => resetFilters()}
                    >
                        RESET
                    </h1>
                </AccordionContent>
            </Accordion.Item>
        </Accordion.Root>
    );
};

export default InfraFilter;
