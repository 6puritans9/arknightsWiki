"use client";

import { useState } from "react";
import getS3Url, {
    getProfessionImage,
    getsubProfessionIdImage,
} from "@/lib/apiAws";
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
import { nationIdMap } from "@/lib/constants/NameMap";
import { WithId } from "mongodb";
import { OperatorType } from "@/lib/apiMongo";

type OperatorDetailClientProps = {
    initialData: WithId<OperatorType>;
};

//#region Styles
const pageWrapper = flex({
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: "1rem",
});

const cardContainer = grid({
    gridTemplateColumns: "2fr 1fr",
    gridTemplateRows: "1fr auto 2fr auto",
    alignSelf: "center",
    justifySelf: "center",
    width: "100%",
    height: "70vh",
    gap: "1rem",
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

const imageContainer = flex({
    gridRow: "1/-1",
    gridColumn: "2",
    flexDirection: "column",
    height: "100%",
    width: "100%",
});

const selectorWrapper = flex({
    justifyContent: "flex-end",
    gap: "0.8rem",
});

const selector = css({
    cursor: "pointer",
    _hover: {
        color: "#f0f0f0/60",
    },
});

const selected = css({
    color: "#f0f0f0/60",
});

const imageWrapper = css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    maxHeight: "100%",
    width: "100%",
    overflow: "visible",
    position: "relative",
    paddingTop: "3rem",
    aspectRatio: "1 / 1",
});

const imageElement = css({
    // height: "80%",
    maxHeight: "100%",
    height: "auto",
    maxWidth: "100%",
    width: "auto",
    objectFit: "cover",
    transformOrigin: "center",
    transition:
        "object-fit 0.35s linear, transform 0.4s cubic-bezier(0.4,0,0.2,1), z-index 0s",

    _hover: {
        position: "absolute",
        objectFit: "contain",
        zIndex: 15,
    },

    "&.square:hover": {
        transform: "scale(1.2) translateY(5%)",
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
//#endregion Styles

const OperatorDetailClient = ({ initialData }: OperatorDetailClientProps) => {
    //#region State management
    const [tab, setTab] = useState<number>(0);
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const [aspect, setAspect] = useState<"square" | "tall" | "wide">("tall");
    const [selectedSkin, setSelectedSkin] = useState<1 | 2>(1);
    const { votes, handleVote } = useVote({
        operatorId: initialData._id,
        onUnAuthVote: () => setShowNotification(true),
    });
    //#endregion State management

    const operator = initialData;
    const operatorPath = `${operator._id}`;
    const getImageSource = (skinType: 1 | 2) => {
        const baseImagePath = getS3Url(
            `operators/${operatorPath}/${operatorPath}`
        );

        switch (skinType) {
            case 1:
                return `${baseImagePath}_1.webp`;
            case 2:
                return `${baseImagePath}_2.webp`;
            default:
                return `${baseImagePath}_1.webp`;
        }
    };

    const faction = nationIdMap[initialData.nationId as string];
    const factionImage = getS3Url(faction);

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
                                    src={getProfessionImage(
                                        operator.profession
                                    )}
                                    alt="classImg"
                                    height="30"
                                    width="30"
                                />
                                <figcaption
                                    className={captionStyle}
                                >{`${operator.profession}`}</figcaption>
                            </figure>
                            <figure className={figureWithCaption}>
                                <Image
                                    src={getsubProfessionIdImage(
                                        operator.subProfessionId
                                    )}
                                    alt="branchImg"
                                    height="30"
                                    width="30"
                                />
                                <figcaption
                                    className={captionStyle}
                                >{`${operator.subProfessionId}`}</figcaption>
                            </figure>
                        </div>
                    </section>
                    <div
                        className={imageContainer}
                        style={{
                            backgroundImage: `url(${factionImage})`,
                            backgroundSize: "40%",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "top left",
                        }}
                    >
                        <div className={selectorWrapper}>
                            <button
                                className={`${selector} ${selectedSkin === 1 ? selected : ""}`}
                                onClick={() => setSelectedSkin(1)}
                            >
                                1
                            </button>
                            <button
                                className={`${selector} ${selectedSkin === 2 ? selected : ""}`}
                                onClick={() => setSelectedSkin(2)}
                            >
                                2
                            </button>
                        </div>
                        <div className={imageWrapper}>
                            <Image
                                src={getImageSource(selectedSkin)}
                                alt={operator.name}
                                className={`${imageElement} ${aspect}`}
                                width={100}
                                height={100}
                                unoptimized={true}
                                onLoad={handleImageLoad}
                            />
                        </div>
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
                                    content="upvote"
                                    onClick={() => handleVote("upvote")}
                                    isSelected={votes.userVote === "upvote"}
                                />
                                <Button
                                    content="downvote"
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
