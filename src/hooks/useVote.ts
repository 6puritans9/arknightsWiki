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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const pendingVote = useRef<VoteType>(null);
    const doebounceTimer = useRef<NodeJS.Timeout>(null);

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
                console.error("Error fetching user:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Fetch initial votes when the component mounts
        fetchInitialVotes();
    }, [operatorId]);

    // OnClick handler for vote buttons
    const handleVote = useCallback(
        async (clickedVoteType: VoteType) => {
            try {
                const { user, error } = await checkAuth();
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

                setVotes((prevVotes) => {
                    let finalVoteType: VoteType | null;
                    if (prevVotes.userVote === clickedVoteType) {
                        finalVoteType = null; // toggle off
                    } else {
                        finalVoteType = clickedVoteType;
                    }
                    pendingVote.current = finalVoteType;

                    const newVotes = { ...prevVotes };

                    // remove previous vote if exists
                    if (prevVotes.userVote === "upvote") {
                        prevVotes.upvotes -= 1;
                    } else if (prevVotes.userVote === "downvote") {
                        prevVotes.downvotes -= 1;
                    }

                    // apply new vote
                    if (finalVoteType === "upvote") {
                        newVotes.upvotes += 1;
                    } else if (finalVoteType === "downvote") {
                        newVotes.downvotes += 1;
                    }
                    newVotes.userVote = finalVoteType;
                    return newVotes;
                });

                // debouncing
                if (doebounceTimer.current) {
                    clearTimeout(doebounceTimer.current);
                }

                doebounceTimer.current = setTimeout(async () => {
                    try {
                        const requestVoteType =
                            pendingVote.current === null
                                ? "delete"
                                : pendingVote.current;
                        const res = await submitVote({
                            operatorId,
                            requestVoteType,
                        });

                        setVotes(res);
                        pendingVote.current = null; // reset after submission
                    } catch (error) {
                        console.error("Error submitting vote:", error);
                        setError("Failed to submit vote");

                        try {
                            const freshData = await fetchVote({
                                operatorId,
                                userId: user?.id,
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
        [operatorId]
    );

    useEffect(() => {
        return () => {
            if (doebounceTimer.current) {
                clearTimeout(doebounceTimer.current);
            }
            pendingVote.current = null; // reset on unmount
        };
    });

    return { votes, isLoading, error, handleVote };
};

export default useVote;
