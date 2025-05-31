import supabase from "../utils/supabase/client";

const googleLogin = async () => {
    try {
        const currentPath = window.location.pathname;
        const nextPath = currentPath && currentPath !== "/" ? currentPath : "/";

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
            },
        });

        if (error) {
            console.error("Error signing in with Google:", error);
            return null;
        }

        // If Supabase provides a URL, it means we need to manually redirect.
        if (data && data.url) {
            window.location.href = data.url; // Perform the redirect
        } else {
            // This case might happen if Supabase *did* auto-redirect,
            // or if there's an unexpected response structure (though less likely for OAuth).
            // If it auto-redirected, the lines below this 'else' might not even run.
            console.warn(
                "googleLogin: Supabase signInWithOAuth did not return a URL and did not error. Auto-redirect might have occurred or check Supabase client behavior."
            );
        }
    } catch (e) {
        // Catch any other unexpected errors during the function's execution
        console.error(
            "googleLogin: Critical error in googleLogin function:",
            e
        );
        // alert(`Critical Login Error: ${e instanceof Error ? e.message : String(e)}`); // For quick debugging
    }
};

export default googleLogin;
