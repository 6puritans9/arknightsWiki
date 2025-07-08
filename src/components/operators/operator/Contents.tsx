import { useState } from "react";
import { css } from "$/styled-system/css";
import { SingleOpType } from "@/api/apiMongo";
import Attributes from "./Attributes";
import Skills from "./Skills";

type ContentsProps = {
    data: SingleOpType;
};

const container = css({
    gridArea: "contents",
    border: "1px solid red",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
});

const tabStyle = css({
    fontSize: {
        base: "fMd",
        md: "fXl",
        lg: "4rem",
    },
    width: "fit-content",
    fontWeight: "semibold",
    cursor: "pointer",
});

const Contents = ({ data: op }: ContentsProps) => {
    const [tab, setTab] = useState<number | null>(null);

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
                className={tabStyle}
                onClick={() => (tab === 1 ? setTab(null) : setTab(1))}
            >
                SKILLS
            </h2>
            {tab === 1 && <Skills operator={op} />}
            <h2 className={tabStyle} onClick={() => setTab(2)}>
                MODULES
            </h2>
            {/* {tab === 2 && <Skills operator={op} />} */}
            <h2 className={tabStyle} onClick={() => setTab(3)}>
                REVIEW
            </h2>
            {/* {tab === 3 && <Skills operator={op} />} */}
            <h2 className={tabStyle} onClick={() => setTab(4)}>
                LORE
            </h2>
            {/* {tab === 4 && <Skills operator={op} />} */}
        </div>
    );
};

export default Contents;
