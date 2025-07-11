import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";
import { hasLocaleInPath, getPreferredLocale } from "./utils/i18n/locales";

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const authCallbackRegex = /^\/auth\/.*\/callback/;

    if (authCallbackRegex.test(pathname)) {
        return await updateSession(request);
    }

    const pathnameHasLocale = hasLocaleInPath(pathname);

    // Redirect to localized path if no locale present
    if (!pathnameHasLocale && pathname !== "/") {
        const locale = getPreferredLocale(request);
        const redirectUrl = new URL(`/${locale}${pathname}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // Handle root path redirect
    if (pathname === "/") {
        const locale = getPreferredLocale(request);
        const redirectUrl = new URL(`/${locale}`, request.url);
        return NextResponse.redirect(redirectUrl);
    }

    // Update session for all other requests
    return await updateSession(request);
}

export const config = {
    matcher: [
        /*     * Match all request paths except for the ones starting with:     * - _next/static (static files)     * - _next/image (image optimization files)     * - favicon.ico (favicon file)     * Feel free to modify this pattern to include more paths.     */ "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
