import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import supabase from "@/utils/supabase/client";
import googleLogin from "@/lib/googleLogin";

type AuthState = {
    user: User | null;
    loading: boolean;
    initializeAuth: () => () => void; // Returns a cleanup function to unsubscribe from auth changes
    login: () => Promise<void>;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: true,
    initializeAuth: () => {
        (async () => {
            try {
                const { data, error } = await supabase.auth.getSession();
                if (error) {
                    console.error("Error fetching session:", error.message);
                    set({ loading: false });
                    return;
                }

                set({ user: data.session?.user ?? null, loading: false });
            } catch (e) {
                console.error("Error initializing auth:", e);
                set({ loading: false });
            }
        })();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (event, session) => {
                set({ user: session?.user ?? null, loading: false });
            }
        );

        return () => {
            if (authListener) {
                authListener.subscription.unsubscribe();
            }
        };
    },

    login: async () => {
        await googleLogin();
    },

    logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
    },
}));
