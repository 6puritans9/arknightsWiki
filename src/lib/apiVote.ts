import supabase from "@/utils/supabase/client";
import { AuthUser, isAuthError } from "@supabase/supabase-js";

type VoteType = "upvote" | "downvote" | null;
type VoteFetchRequest = {
    operatorId: string;
    userId: string | null;
};
type VoteSubmitRequest = {
    operatorId: string;
    userVote: VoteType;
    upvoteDelta: number;
    downvoteDelta: number;
};
type VoteSubmitResponse = {
    upvotes: number;
    downvotes: number;
    userVote: VoteType;
};
type VoteData = {
    upvotes: number;
    downvotes: number;
    userVote: VoteType;
};

const checkAuth = async (): Promise<{
    user: AuthUser | null;
    error?: string;
}> => {
    try {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (error) {
            if (!isAuthError(error)) {
                throw error;
            }
        }

        return { user };
    } catch (error) {
        let errorMsg = "";
        if (error instanceof Error) {
            errorMsg = `Error: ${error.message}`;
        } else {
            errorMsg = `Unknown error: ${String(error)}`;
        }

        return { user: null, error: errorMsg };
    }
};

const fetchVote = async ({
    operatorId,
    userId,
}: VoteFetchRequest): Promise<VoteData> => {
    try {
        // fetch vote data for anonymous users
        const { data: opVotes, error: opVotesError } = await supabase
            .from("operator_votes")
            .select("upvotes, downvotes")
            .eq("operator_id", operatorId)
            .maybeSingle();
        if (opVotesError && opVotesError.code !== "PGRST116") {
            throw opVotesError;
        }
        console.log(opVotes);

        // fetch specific user vote data
        let userVote = null;
        if (userId) {
            const { data: userVoteData, error: userVoteError } = await supabase
                .from("user_votes")
                .select("vote_type")
                .eq("user_id", userId)
                .eq("operator_id", operatorId)
                .maybeSingle();

            if (userVoteError && userVoteError.code !== "PGRST116") {
                throw userVoteError;
            }
            userVote = userVoteData?.vote_type as VoteType;
        }

        return {
            upvotes: opVotes?.upvotes || 0,
            downvotes: opVotes?.downvotes || 0,
            userVote: userVote,
        };
    } catch (error) {
        console.error("Error fetching vote data:", error);
        return {
            upvotes: 0,
            downvotes: 0,
            userVote: null,
        };
    }
};

const submitVote = async ({
    operatorId,
    userVote,
    upvoteDelta,
    downvoteDelta,
}: VoteSubmitRequest): Promise<VoteSubmitResponse> => {
    try {
        const { user, error: authError } = await checkAuth();
        if (authError) {
            console.error("Authentication error:", authError);
            throw new Error("User not authenticated");
        }
        if (!user) {
            throw new Error("User not authenticated");
        }

        const { data, error: voteError } = await supabase.rpc("handle_vote", {
            p_operator_id: operatorId,
            p_vote_type: userVote,
            p_upvote_delta: upvoteDelta,
            p_downvote_delta: downvoteDelta,
        });
        if (voteError) {
            console.error("Error submitting vote:", voteError);
            throw new Error("Failed to submit vote");
        }

        return data as VoteSubmitResponse;
    } catch (error) {
        console.error("Error in submitVote:", error);
        throw new Error("Failed to submit vote");
    }
};

export type { VoteType, VoteData };
export { checkAuth, fetchVote, submitVote };
