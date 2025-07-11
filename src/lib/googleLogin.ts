import supabase from "../utils/supabase/client";
import { getCurrentLocale, getPathWithoutLocale } from "@/utils/i18n/locales";

const googleLogin = async () => {
    try {
        const currentPath = window.location.pathname;
        const currentLocale = getCurrentLocale(currentPath);
        const pathWithoutLocale = getPathWithoutLocale(currentPath);

        const nextPath =
            pathWithoutLocale && pathWithoutLocale !== "/"
                ? pathWithoutLocale
                : "/";

        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/${currentLocale}/auth/callback?next=${encodeURIComponent(nextPath)}`,
            },
        });

        if (error) {
            console.error("Error signing in with Google:", error);
            return null;
        }

        console.log(data, data.url);

        if (data && data.url) {
            window.location.href = data.url;
        } else {
            // This case might happen if Supabase *did* auto-redirect,
            // or if there's an unexpected response structure (though less likely for OAuth).
            // If it auto-redirected, the lines below this 'else' might not even run.
            console.warn(
                "googleLogin: Supabase signInWithOAuth did not return a URL and did not error. Auto-redirect might have occurred or check Supabase client behavior."
            );
        }
    } catch (e) {
        console.error(
            "googleLogin: Critical error in googleLogin function:",
            e
        );
    }
};

export default googleLogin;
