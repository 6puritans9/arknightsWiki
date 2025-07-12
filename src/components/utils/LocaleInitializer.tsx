"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import useLocaleStore from "@/stores/localeStore";
import { langMap } from "@/utils/i18n/locales";

const LocaleInitializer = () => {
    const pathname = usePathname();
    const { setLocale } = useLocaleStore();

    useEffect(() => {
        const unsubscribe = useLocaleStore.subscribe(
            (state) => state.locale,
            (locale) => {
                if (typeof document !== "undefined") {
                    document.documentElement.lang = langMap[locale] || "en";
                }
            }
        );

        return unsubscribe;
    }, []);

    useEffect(() => {
        const segments = pathname.split("/");
        const localeFromUrl = segments[1];

        setLocale(localeFromUrl);
    }, [pathname, setLocale]);

    return null;
};

export default LocaleInitializer;
