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
import Button from "@/components/Button";
import useVote from "@/hooks/useVote";
import Notification from "@/components/ui/Notification";
import { classMap, branchMap } from "@/lib/constants/pathnameMap";

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

const headerTitle = flex({
    fontSize: {
        base: "1.5rem",
    },
    alignItems: "center",
    gap: "0.1rem",
});

const starsStyle = css({
    color: "#FFD700",
    opacity: 0.8,
    fontSize: "0.8rem",
    alignSelf: "flex-start",
});

const headerClass = flex({
    gap: "1rem",
});

const figureWithCaption = flex({
    alignItems: "center",
    gap: "0.2rem",
});

const captionStyle = css({
    fontSize: "0.8rem",
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
    overflow: "visible",
    position: "relative",
});

const imageElement = css({
    height: "100%",
    maxWidth: "100%",
    width: "auto",
    objectFit: "cover",
    transformOrigin: "center",
    transition:
        "object-fit 0.35s linear, transform 0.4s cubic-bezier(0.4,0,0.2,1), z-index 0s",

    _hover: {
        position: "absolute",
        width: "140%",
        height: "auto",
        maxWidth: "none",
        minWidth: "120%",
        objectFit: "contain",
        zIndex: 15,
        // transition: "transform 0.2s ease-in",
    },

    "&.square:hover": {
        transform: "scale(1.5)",
    },
    "&.tall:hover": {
        transform: "scale(1.05)",
    },
    "&.wide:hover": {
        transform: "scale(1.1)",
    },
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
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [aspect, setAspect] = useState<"square" | "tall" | "wide">("tall");
    const { votes, handleVote } = useVote({
        operatorId: initialData.id,
        onUnAuthVote: () => setShowNotification(true),
    });

    const operator = initialData;
    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();
    const operatorPath = `char_${paddedCode}_${operator.pathname}`;
    const imageSource = getS3Url(
        `operators/${operatorPath}/${operatorPath}_1.webp`
    );

    const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
        const img = e.currentTarget as HTMLImageElement;
        const ratio = img.naturalWidth / img.naturalHeight;
        if (ratio > 1.2) setAspect("wide");
        else if (ratio < 0.8) setAspect("tall");
        else setAspect("square");
    };

    return (
        <>
            <Notification
                title="Login required"
                description="You need to be logged in to vote."
                variant="Close"
                open={showNotification}
                onOpenChange={setShowNotification}
            />
            <div className={pageWrapper}>
                <article className={`${cardContainer} ${cardBackground}`}>
                    <section className={headerWrapper}>
                        <h2 className={headerTitle}>
                            {operator.name}
                            <span className={starsStyle}>
                                {"★".repeat(operator.rarity)}
                            </span>
                        </h2>

                        <div className={headerClass}>
                            <figure className={figureWithCaption}>
                                <Image
                                    src={getS3Url(classMap[operator.class])}
                                    alt="classImg"
                                    height="30"
                                    width="30"
                                />
                                <figcaption
                                    className={captionStyle}
                                >{`${operator.class}`}</figcaption>
                            </figure>
                            <figure className={figureWithCaption}>
                                <Image
                                    src={getS3Url(branchMap[operator.branch])}
                                    alt="branchImg"
                                    height="30"
                                    width="30"
                                />
                                <figcaption
                                    className={captionStyle}
                                >{`${operator.branch}`}</figcaption>
                            </figure>
                        </div>
                    </section>
                    <div className={imageWrapper}>
                        <Image
                            src={`${imageSource}`}
                            alt={operator.name}
                            className={`${imageElement} ${aspect}`}
                            width={100}
                            height={100}
                            unoptimized={true}
                            onLoad={handleImageLoad}
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
                                <Button
                                    content="👍"
                                    onClick={() => handleVote("upvote")}
                                    isSelected={votes.userVote === "upvote"}
                                />
                                <Button
                                    content="👎"
                                    onClick={() => handleVote("downvote")}
                                    isSelected={votes.userVote === "downvote"}
                                />
                            </div>
                            <VoteBar votes={votes} />
                        </section>
                    </div>
                </article>
            </div>
        </>
    );
};

export default OperatorDetailClient;
