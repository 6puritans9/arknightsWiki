"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { SingleOpType } from "@/api/apiMongo";
import useNavStore from "@/stores/navStore";
import useVote from "@/hooks/useVote";
import { flex, grid } from "$/styled-system/patterns";
import Notification from "@/components/ui/Notification";
import VoteBar from "@/components/operators/operator/VoteBar";
import Button from "@/components/ui/Button";
import Header from "@/components/operators/operator/Header";
import Images from "@/components/operators/operator/Images";
import Contents from "@/components/operators/operator/Contents";

type OperatorDetailClientProps = {
    op: SingleOpType;
};

//#region Styles
const container = grid({
    gridTemplateColumns: {
        base: "1fr",
        md: "1.5fr 1fr",
    },
    gridTemplateRows: {
        base: "auto auto auto 1fr 1fr",
        md: "auto 3fr 1fr 1fr",
    },
    gridTemplateAreas: {
        base: `
        "header"
        "images"
        "contents"
        "tags"
        "feedback"
        `,
        md: `
    "header header"
    "contents images"
    "feedback tags"
    "suggests suggests"`,
    },
    alignSelf: "center",
    justifySelf: "center",
    width: "100%",
    height: "100%",
    gap: "1rem",
    padding: "1rem",
    minWidth: 0,
    "& > *": {
        minWidth: 0, // Apply to all grid children
        overflow: "hidden", // Prevent any child from expanding the grid
    },
});

const contentWrapper = flex({
    flexDirection: "column",
    overflowY: "hidden",
    height: "100%",
    fontSize: {
        base: "0.8rem",
    },
});

const feedbackContainer = flex({
    gridArea: "feedback",
    flexDirection: "column",
    gap: "1rem",
});

const tagsWrapper = flex({
    justifyContent: "center",
    gridArea: "tags",
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

const OperatorDetailClient = ({ op }: OperatorDetailClientProps) => {
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const { votes, handleVote } = useVote({
        operatorId: op.id,
        onUnAuthVote: () => setShowNotification(true),
    });

    const pathname = usePathname();
    const setPrvPathname = useNavStore((s) => s.setPrvPathname);
    useEffect(() => {
        setPrvPathname(pathname);
    }, [pathname, setPrvPathname]);

    return (
        <>
            <Notification
                title="Login required"
                description="You need to be logged in to vote."
                variant="Close"
                open={showNotification}
                onOpenChange={setShowNotification}
            />
            <article className={container}>
                <Header data={op} />
                <Contents data={op} />
                <Images data={op} />

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
                <section className={tagsWrapper}>
                    <h1>TAGS</h1>
                </section>
            </article>
        </>
    );
};

export default OperatorDetailClient;
