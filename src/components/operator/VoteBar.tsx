import { css } from "../../../styled-system/css";
import { VoteData } from "@/lib/apiVote";

type VoteBarProps = {
    votes: VoteData;
};

const voteBarContainer = css({
    position: "relative",
    width: "100%",
    height: "20px",
    backgroundColor: "gray.200",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "1rem",
});

const voteBar = css({
    height: "100%",
    borderRadius: "10px",
    transition: "all 0.3s ease",
});

const voteOverlay = css({
    position: "absolute",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 8px",
    fontSize: "0.7rem",
    fontWeight: "bold",
    color: "white",
    textShadow: "1px 1px 2px rgba(0,0,0,0.8)", // Ensures text is readable
    zIndex: 1,
});

const VoteBar = ({ votes }: VoteBarProps) => {
    const totalVotes = votes.upvotes + votes.downvotes;
    const upvotePercentage =
        totalVotes > 0 ? (votes.upvotes / totalVotes) * 100 : 50;
    const roundedUpvote = Math.round(upvotePercentage);
    const roundedDownvote = 100 - roundedUpvote;

    const getBarStyle = () => {
        return {
            background: `linear-gradient(to right, 
                #3b82f6 0%, 
                #3b82f6 ${upvotePercentage}%, 
                #ef4444 ${upvotePercentage}%, 
                #ef4444 100%)`,
        };
    };

    return (
        <div className={voteBarContainer}>
            <div className={voteBar} style={getBarStyle()}></div>
            <div className={voteOverlay}>
                <span>
                    {roundedUpvote}%({votes.upvotes})
                </span>
                <span>
                    {roundedDownvote}%({votes.downvotes})
                </span>
            </div>
        </div>
    );
};

export default VoteBar;
