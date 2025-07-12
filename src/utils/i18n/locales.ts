import { NextRequest } from "next/server";

export const locales = ["en-US", "ko-KR", "zh-CN", "zh-TW", "ja-JP"];
export const defaultLocale = "en-Us";
export const langMap: { [key: string]: string } = {
    "en-US": "en",
    "ko-KR": "ko",
    "ja-JP": "ja",
    "zh-CN": "zh-CN",
    "zh-TW": "zh-TW",
};

const hasLocaleInPath = (pathname: string): boolean => {
    return locales.some(
        (locale) =>
            pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
};

const getCurrentLocale = (pathname: string): string => {
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}`)) {
            return locale;
        }
    }
    return defaultLocale;
};

const getPreferredLocale = (request: NextRequest): string => {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
        for (const locale of locales) {
            if (
                acceptLanguage.includes(locale) ||
                acceptLanguage.includes(locale.split("-")[0])
            ) {
                return locale;
            }
        }
    }
    return defaultLocale;
};

const getPathWithoutLocale = (pathname: string): string => {
    for (const locale of locales) {
        if (pathname.startsWith(`/${locale}`)) {
            return pathname.slice(`/${locale}`.length) || "/";
        }
    }
    return pathname;
};

export {
    hasLocaleInPath,
    getCurrentLocale,
    getPreferredLocale,
    getPathWithoutLocale,
};
