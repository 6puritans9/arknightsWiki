import { useState, useRef, useCallback, useEffect } from "react";
import {
    VoteType,
    VoteData,
    checkAuth,
    fetchVote,
    submitVote,
} from "@/lib/apiVote";

type UseVoteProps = {
    operatorId: string;
    onUnAuthVote: () => void;
};

const useVote = ({ operatorId, onUnAuthVote }: UseVoteProps) => {
    // 1. Server State - Single Source of Truth
    const serverStateRef = useRef<VoteData>({
        upvotes: 0,
        downvotes: 0,
        userVote: null,
    });

    // 2. Client State - UI State (initialized from server)
    const [clientState, setClientState] = useState<VoteData>({
        upvotes: 0,
        downvotes: 0,
        userVote: null,
    });

    // 4. Client state reference to avoid race conditions
    const clientVoteRef = useRef<VoteType>(null);

    // Loading and error states
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Debouncing
    const pendingVote = useRef<VoteType>(null);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    // 1. Initialize both states from server
    useEffect(() => {
        const fetchInitialVotes = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const { user } = await checkAuth();
                const userId = user?.id || null;
                const serverData = await fetchVote({ operatorId, userId });

                // 1. Server state = source of truth
                serverStateRef.current = serverData;

                // 2. Client state = initialized from server
                setClientState(serverData);

                // 4. Client ref = initialized from server
                clientVoteRef.current = serverData.userVote;
            } catch (e) {
                setError(e instanceof Error ? e.message : "Unknown error");
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialVotes();
    }, [operatorId]);

    // 5. Calculate deltas based on client state
    const calculateDeltas = (oldVote: VoteType, newVote: VoteType) => {
        const oldUp = oldVote === "upvote" ? 1 : 0;
        const oldDown = oldVote === "downvote" ? 1 : 0;
        const newUp = newVote === "upvote" ? 1 : 0;
        const newDown = newVote === "downvote" ? 1 : 0;

        return {
            upvoteDelta: newUp - oldUp,
            downvoteDelta: newDown - oldDown,
        };
    };

    const handleVote = useCallback(
        async (clickedVoteType: VoteType) => {
            try {
                const { user } = await checkAuth();
                if (!user) {
                    onUnAuthVote();
                    return;
                }

                // 4. Use client ref to avoid race conditions
                const currentClientVote = clientVoteRef.current;
                const newVote =
                    currentClientVote === clickedVoteType
                        ? null
                        : clickedVoteType;

                // 4. Update client ref immediately (atomic)
                clientVoteRef.current = newVote;

                // 5. Calculate deltas from client state
                const deltas = calculateDeltas(currentClientVote, newVote);

                // Store what we'll send to server
                pendingVote.current = newVote;

                // 6. Update client UI immediately
                setClientState((prev) => ({
                    upvotes: prev.upvotes + deltas.upvoteDelta,
                    downvotes: prev.downvotes + deltas.downvoteDelta,
                    userVote: newVote,
                }));

                // 7. Debounce for 500ms
                if (debounceTimer.current) {
                    clearTimeout(debounceTimer.current);
                }

                debounceTimer.current = setTimeout(async () => {
                    try {
                        // Calculate final deltas from server state to pending vote
                        const serverToClientDeltas = calculateDeltas(
                            serverStateRef.current.userVote,
                            pendingVote.current
                        );

                        // 8. Send to server
                        const serverResponse = await submitVote({
                            operatorId,
                            userVote: pendingVote.current,
                            upvoteDelta: serverToClientDeltas.upvoteDelta,
                            downvoteDelta: serverToClientDeltas.downvoteDelta,
                        });

                        // 9. Server response becomes new source of truth
                        serverStateRef.current = serverResponse;

                        // 10. Sync client state with server
                        setClientState(serverResponse);
                        clientVoteRef.current = serverResponse.userVote;

                        pendingVote.current = null;
                    } catch (e) {
                        console.error("Error submitting vote:", e);
                        setError("Failed to submit vote");

                        // Revert client state to server state on error
                        setClientState(serverStateRef.current);
                        clientVoteRef.current = serverStateRef.current.userVote;
                    }
                }, 500);
            } catch (e) {
                console.error("Error handling vote:", e);
                setError(e instanceof Error ? e.message : "Unknown error");
            }
        },
        [operatorId, onUnAuthVote]
    );

    // Cleanup dangling timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    // Return client state for UI
    return {
        votes: clientState, // UI displays client state
        isLoading,
        error,
        handleVote,
    };
};

export default useVote;
