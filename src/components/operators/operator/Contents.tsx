import { useState } from "react";
import { css } from "$/styled-system/css";
import { SingleOpType } from "@/api/apiMongo";
import Attributes from "./Attributes";
import Skills from "./Skills";
import Modules from "./Modules";
import Review from "./Review";
import Lore from "./Lore";

type ContentsProps = {
    data: SingleOpType;
};

const container = css({
    gridArea: "contents",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
});

const baseTabStyle = {
    fontSize: {
        base: "fMd",
        md: "fXl",
        lg: "4rem",
    },
    width: "fit-content",
    fontWeight: "semibold",
    cursor: "pointer",
};

const tabStyle = css({
    ...baseTabStyle,
});

const emptyTabStyle = css({
    ...baseTabStyle,
    cursor: "default",
    textDecoration: "line-through",
});

const Contents = ({ data: op }: ContentsProps) => {
    const [tab, setTab] = useState<number | null>(null);

    const hasSkills = Object.keys(op.skills).length ? true : false;
    // const hasModules = op.modules ? true : false;

    return (
        <div className={container}>
            <h2
                className={tabStyle}
                onClick={() => (tab === 0 ? setTab(null) : setTab(0))}
            >
                ATTRIBUTES
            </h2>
            {tab === 0 && <Attributes operator={op} />}

            <h2
                className={hasSkills ? tabStyle : emptyTabStyle}
                onClick={() => (tab === 1 ? setTab(null) : setTab(1))}
            >
                SKILLS
            </h2>
            {tab === 1 && op.rarity > 1 && <Skills operator={op} />}

            <h2
                className={tabStyle}
                onClick={() => (tab === 2 ? setTab(null) : setTab(2))}
            >
                MODULES
            </h2>
            {tab === 2 && <Modules operator={op} />}

            <h2
                className={tabStyle}
                onClick={() => (tab === 3 ? setTab(null) : setTab(3))}
            >
                REVIEW
            </h2>
            {tab === 3 && <Review operator={op} />}

            <h2
                className={tabStyle}
                onClick={() => (tab === 4 ? setTab(null) : setTab(4))}
            >
                LORE
            </h2>
            {tab === 4 && <Lore operator={op} />}
        </div>
    );
};

export default Contents;
