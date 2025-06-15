import { useState, useRef, useCallback, useEffect } from "react";
import {
    VoteType,
    VoteData,
    checkAuth,
    fetchVote,
    submitVote,
} from "@/lib/apiVote";

type UseVoteProps = {
    operatorId: number;
};

const useVote = ({ operatorId }: UseVoteProps) => {
    const [votes, setVotes] = useState<VoteData>({
        upvotes: 0,
        downvotes: 0,
        userVote: null,
    });
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const pendingVote = useRef<VoteType | null>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchInitialVotes = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const { user, error: authError } = await checkAuth();
                if (authError) {
                    console.warn(
                        "Authentication error(user might be anonymous1):",
                        authError
                    );
                }

                const userId = user?.id || null;
                const voteData = await fetchVote({ operatorId, userId });
                setVotes(voteData);
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
                console.error("Error fetching user:", e);
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch initial votes when the component mounts
        fetchInitialVotes();
    }, [operatorId]);

    const getVoteDeltas = (
        oldVote: VoteType | null,
        newVote: VoteType | null
    ) => ({
        upvoteDelta:
            (newVote === "upvote" ? 1 : 0) - (oldVote === "upvote" ? 1 : 0),
        downvoteDelta:
            (newVote === "downvote" ? 1 : 0) - (oldVote === "downvote" ? 1 : 0),
    });

    // OnClick handler for vote buttons
    const handleVote = useCallback(
        async (clickedVoteType: VoteType) => {
            try {
                const { user, error } = await checkAuth(); // user must be authenticated
                if (error) {
                    console.error("Error fetching user:", error);
                    return;
                }
                if (!user) {
                    console.error(
                        "User not authenticated. Toast or modal to notify state."
                    );
                    return;
                }

                const newVoteType =
                    votes.userVote === clickedVoteType ? null : clickedVoteType;
                const { upvoteDelta, downvoteDelta } = getVoteDeltas(
                    /* oldVote */ votes.userVote,
                    /* newVote */ newVoteType
                );

                pendingVote.current = newVoteType; // set pending vote before state update

                setVotes((prevVotes) => {
                    return {
                        upvotes: prevVotes.upvotes + upvoteDelta,
                        downvotes: prevVotes.downvotes + downvoteDelta,
                        userVote: newVoteType,
                    };
                });

                // debouncing
                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current);
                }

                debounceTimer.current = setTimeout(async () => {
                    try {
                        // pendingVote.current === null
                        //     ? "delete"                                : pendingVote.current;
                        const res = await submitVote({
                            operatorId,
                            userVote: pendingVote.current,
                            upvoteDelta,
                            downvoteDelta,
                        });

                        setVotes(res);
                        pendingVote.current = null; // reset after submission
                    } catch (error) {
                        console.error("Error submitting vote:", error);
                        setError("Failed to submit vote");

                        try {
                            const freshData = await fetchVote({
                                operatorId,
                                userId: user.id,
                            });
                            setVotes(freshData);
                        } catch (fetchError) {
                            console.error(
                                "Error fetching fresh vote data:",
                                fetchError
                            );
                        }
                    }
                }, 500);
            } catch (error) {
                console.error("Error handling vote:", error);
                setError(
                    error instanceof Error ? error.message : "Unknown error"
                );
            }
        },
        [operatorId, votes.userVote]
    );

    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
            pendingVote.current = null; // reset on unmount
        };
    }, []);

    return { votes, isLoading, error, handleVote };
};

export default useVote;
