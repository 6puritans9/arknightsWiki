import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";
import supabase from "@/utils/supabase/client";
import googleLogin from "@/lib/googleLogin";

type State = {
    user: User | null;
    session: Session | null;
    loading: boolean;
    initialized: boolean;
};

type Action = {
    initializeAuth: () => Promise<() => void>;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    setNullSession: () => void;
};

const initialState: State = {
    user: null,
    session: null,
    loading: true,
    initialized: false,
};

const useAuthStore = create<State & Action>((set, get) => ({
    ...initialState,

    initializeAuth: async () => {
        const { setNullSession } = get();

        try {
            const {
                data: { session },
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error("Error fetching session:", error.message);
                setNullSession();
                return () => {};
            }

            if (!session) {
                setNullSession();
            }

            set({
                user: session?.user ?? null,
                session,
                loading: false,
                initialized: true,
            });

            const {
                data: { subscription },
            } = supabase.auth.onAuthStateChange(async (event, session) => {
                console.log("Auth state changed:", event, session?.user?.email); //TODO: remove

                if (event === "SIGNED_OUT") {
                    set({ user: null, session: null, loading: false });
                } else if (
                    event === "SIGNED_IN" ||
                    event === "TOKEN_REFRESHED"
                ) {
                    set({
                        user: session?.user ?? null,
                        session,
                        loading: false,
                    });
                } else if (event === "USER_UPDATED") {
                    set({
                        user: session?.user ?? null,
                        session,
                        loading: false,
                    });
                }
            });

            return () => {
                subscription?.unsubscribe();
            };
        } catch (e) {
            console.error("Error initializing auth:", e);
            setNullSession();
            return () => {};
        }
    },

    login: async () => {
        set({ loading: true });

        try {
            await googleLogin();
        } catch (e) {
            console.error("Login error:", e);
            set({ loading: false });
        }
    },

    logout: async () => {
        set({ loading: true });
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error("Logout error:", error);
            }
            set({ user: null, session: null, loading: false });
        } catch (e) {
            console.error("Logout error:", e);
            set({ user: null, session: null, loading: false });
        }
    },

    setNullSession: () =>
        set({ user: null, session: null, loading: false, initialized: true }),
}));

export default useAuthStore;
