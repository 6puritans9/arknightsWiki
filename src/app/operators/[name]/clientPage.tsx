"use client";

import { useState } from "react";
import { Operator } from "@/lib/types";
import getS3Url from "@/lib/apiAws";
import Image from "next/image";
import { css } from "../../../../styled-system/css";
import { flex, grid } from "../../../../styled-system/patterns";
import { cardBackground } from "@/app/styles/shared/cardBackground";
import OperatorTabs from "@/components/operator/OperatorTabs";
import Attributes from "@/components/operator/Attributes";
import Skills from "@/components/operator/Skills";
import Review from "@/components/operator/Review";
import Synergy from "@/components/operator/Synergy";
import Lore from "@/components/operator/Lore";
import VoteBar from "@/components/operator/VoteBar";
import useVote from "@/hooks/useVote";

type OperatorDetailClientProps = {
    initialData: Operator;
};

// Styles
const pageWrapper = flex({
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "1rem",
});

const cardContainer = grid({
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr 1fr 3fr 2fr",
    alignSelf: "center",
    justifySelf: "center",
    width: "100%",
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
    borderTop: "1px solid",
    borderTopColor: "gray.800/70",
    borderBottom: "1px solid",
    borderBottomColor: "gray.800/70",
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
    height: "100%",
    width: "100%",
});

const imageElement = css({
    height: "max-content",
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
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
});

const buttonWrapper = flex({
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1.5rem",
});

const OperatorDetailClient = ({ initialData }: OperatorDetailClientProps) => {
    const [tab, setTab] = useState<number>(0);
    const { votes } = useVote({ operatorId: initialData.id });

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
        <div className={pageWrapper}>
            <article className={`${cardContainer} ${cardBackground}`}>
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
                    <OperatorTabs
                        onClick={(index) => () => setTab(index)}
                        activeTab={tab}
                    />
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
                        <div className={buttonWrapper}>
                            <button>👍</button>
                            <button>👎</button>
                        </div>
                        <VoteBar votes={votes} />
                    </section>
                </div>
            </article>
        </div>
    );
};

export default OperatorDetailClient;
