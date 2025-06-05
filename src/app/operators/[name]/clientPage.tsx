"use client";

import { useState } from "react";
import Image from "next/image";
import { Operator } from "@/lib/types";
import getS3Url from "@/lib/apiAws";
import { css } from "../../../../styled-system/css";
import { flex, grid } from "../../../../styled-system/patterns";
import { cardBackground } from "@/app/styles/shared/cardBackground";

type OperatorDetailClientProps = {
    initialData: Operator;
};
type TabProps = {
    operator: Operator;
};
type onClickProps = {
    onClick: (index: number) => () => void;
};

// Styles
const pageContainer = grid({
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr 1fr 3fr 2fr",
});

const headerWrapper = flex({
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 0.5rem 0 0.5rem",
});

const headerTitle = css({
    fontSize: {
        base: "1.5rem",
    },
});

const headerClass = flex({
    flexDirection: "column",
});

const tabsContainer = flex({
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: "0.5rem 1rem",
    borderBottom: "1px solid #ccc",
});

const tabElement = css({
    cursor: "pointer",
});

const contentWrapper = flex({
    flexDirection: "column",
    overflowY: "hidden",
    height: "100%",
    fontSize: {
        base: "0.8rem",
    },
});

const imageWrapper = css({
    gridRow: "1/-1",
    gridColumn: "2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const imageElement = css({
    height: "100%",
    width: "auto",
});

const feedbackContainer = flex({
    flexDirection: "column",
    gap: "1rem",
});

const tagsWrapper = flex({
    justifyContent: "center",
});

const voteWrapper = flex({
    justifyContent: "center",
});

const OperatorDetailClient = ({ initialData }: OperatorDetailClientProps) => {
    const [tab, setTab] = useState<number>(0);

    const operator = initialData;
    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();
    const operatorPath = `char_${paddedCode}_${operator.pathname}`;
    const imageSource = getS3Url(
        `operators/${operatorPath}/${operatorPath}_1.webp`
    );

    return (
        <article className={`${pageContainer} ${cardBackground}`}>
            <section className={headerWrapper}>
                <h2 className={headerTitle}>{operator.name}</h2>
                <div className={headerClass}>
                    <p>{`Class: ${operator.class}`}</p>
                    <p>{`Branch: ${operator.branch}`}</p>
                </div>
            </section>
            <div className={imageWrapper}>
                <Image
                    src={`${imageSource}`}
                    alt={operator.name}
                    className={imageElement}
                    width={100}
                    height={100}
                ></Image>
            </div>
            <section className={tabsContainer}>
                <Tabs onClick={(index) => () => setTab(index)} />
            </section>
            <section className={contentWrapper}>
                {tab === 0 && <Attributes operator={operator} />}
                {tab === 1 && <Skills operator={operator} />}
                {tab === 2 && <Review operator={operator} />}
                {tab === 3 && <Synergy operator={operator} />}
                {tab === 4 && <Lore operator={operator} />}
            </section>
            <div className={feedbackContainer}>
                <section className={tagsWrapper}>
                    <h1>TAGS</h1>
                </section>
                <section className={voteWrapper}>
                    <h1>Should I pull?</h1>
                </section>
            </div>
        </article>
    );
};

// Inner Components
const Tabs = ({ onClick }: onClickProps) => {
    const items = ["Attributes", "Skills", "Review", "Synergy", "Lore"];

    return items.map((item, index) => (
        <div className={tabElement} key={index} onClick={onClick(index)}>
            <h3>{item}</h3>
        </div>
    ));
};

const Attributes = ({ operator }: TabProps) => {
    return (
        <>
            <p>{`Class: ${operator.class}`}</p>
            <p>{`Branch: ${operator.branch}`}</p>
            <p>{`Faction: ${operator.faction}`}</p>
            <p>{`Race: ${operator.races}`}</p>
            <p>{`Gender: ${operator.gender}`}</p>
            <p>{`Position: ${operator.position}`}</p>
            <p>{`Rarity: ${operator.rarity}`}</p>
        </>
    );
};

const Skills = ({ operator }: TabProps) => {
    return (
        <>
            <h1 style={{ color: "red" }}>SKILLS</h1>
        </>
    );
};

const Review = ({ operator }: TabProps) => {
    return (
        <div>
            <h1 style={{ color: "red" }}>REVIEW</h1>
        </div>
    );
};

const Synergy = ({ operator }: TabProps) => {
    return (
        <div>
            <h1 style={{ color: "red" }}>SYNERGY</h1>
        </div>
    );
};

const Lore = ({ operator }: TabProps) => {
    return (
        <div>
            <h1 style={{ color: "red" }}>{operator.faction}</h1>
        </div>
    );
};

export default OperatorDetailClient;
