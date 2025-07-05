import { OperatorType } from "@/api/apiMongo";
import { css, cx } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

const tabElement = flex({
    cursor: "pointer",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease-in-out",
    _hover: {
        backgroundColor: "#f0f0f0/60",
    },
});

const selectedTabElement = css({
    backgroundColor: "#f0f0f0/60",
});

type TabsProps = {
    onClick: (index: number) => () => void;
    activeTab: number;
};

export type TabProps = {
    operator: OperatorType;
};

const OperatorTabs = ({ onClick, activeTab }: TabsProps) => {
    const items = ["Attributes", "Skills", "Review", "Synergy", "Lore"];

    return items.map((item, index) => (
        <div
            className={cx(
                tabElement,
                index === activeTab && selectedTabElement
            )}
            key={index}
            onClick={onClick(index)}
        >
            <h3>{item}</h3>
        </div>
    ));
};

export default OperatorTabs;
