import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server";

const GET = async (
    request: Request,
    { params }: { params: Promise<{ locale: string }> }
) => {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/";
    const { locale } = await params;

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === "development";
            const redirectPath =
                next === "/" ? `/${locale}` : `/${locale}${next}`;

            if (isLocalEnv) {
                return NextResponse.redirect(`${origin}${redirectPath}`);
            } else if (forwardedHost) {
                return NextResponse.redirect(
                    `https://${forwardedHost}${redirectPath}`
                );
            } else {
                return NextResponse.redirect(`${origin}${redirectPath}`);
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`);
};

export { GET };
