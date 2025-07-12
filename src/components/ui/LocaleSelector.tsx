"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover } from "radix-ui";
import { GlobeIcon } from "@radix-ui/react-icons";
import useLocaleStore from "@/stores/localeStore";
import { locales } from "@/utils/i18n/locales";
import { css } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

//#region styles
const triggerButton = css({
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0.5rem",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
    outline: "none",
    _hover: {
        backgroundColor: "gray.100",
    },
    _focus: {
        boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
    },
});

const content = css({
    backgroundColor: "white",
    border: "1px solid",
    borderColor: "gray.200",
    borderRadius: "0.5rem",
    padding: "0.5rem",
    boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    minWidth: { base: "200px" },
    zIndex: "modal",
});

const localeItem = flex({
    fontSize: { base: "0.85rem" },
    padding: { base: "0.75rem 1rem" },
    alignItems: "center",
    gap: "0.75rem",
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
    textAlign: "left",
    _hover: {
        backgroundColor: "gray.100",
    },
});

const flagStyle = css({
    fontSize: { base: "1.2em" },
});

const checkStyle = css({
    marginLeft: "auto",
    fontSize: "0.75em",
});

const arrowStyle = css({
    fill: "gray.200",
    stroke: "gray.300",
    strokeWidth: "1px",
    width: "12px",
    height: "6px",
});

const currentLocaleStyle = css({
    backgroundColor: "blue.50",
    color: "primary",
    _hover: {
        backgroundColor: "blue.200",
    },
});
//#endregion

const langs: { [key: string]: { name: string; flag: string } } = {
    "en-US": { name: "English", flag: "🇺🇸" },
    "ko-KR": { name: "한국어", flag: "🇰🇷" },
    "ja-JP": { name: "日本語", flag: "🇯🇵" },
    "zh-CN": { name: "简体中文", flag: "🇨🇳" },
    "zh-TW": { name: "繁體中文", flag: "🇹🇼" },
};

const LocaleSelector = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const { locale: curLocale, setLocale } = useLocaleStore();

    const handleLocaleChange = (newLocale: string) => {
        if (newLocale === curLocale) {
            return;
        }

        setLocale(newLocale);

        // Replace current locale with new locale in pathname
        const pathWithoutLocale = pathname.replace(`/${curLocale}`, "") || "/";
        const newPath = `/${newLocale}${pathWithoutLocale}`;

        const currentSearchParams = searchParams.toString();
        const finalUrl = currentSearchParams
            ? `${newPath}}?${currentSearchParams}`
            : newPath;

        router.push(finalUrl, { scroll: false });
    };

    return (
        <Popover.Root>
            <Popover.Trigger asChild>
                <button className={triggerButton} aria-label="Select language">
                    <GlobeIcon width={20} height={20} />
                </button>
            </Popover.Trigger>

            <Popover.Portal>
                <Popover.Content
                    className={content}
                    align="center"
                    sideOffset={5}
                >
                    {locales.map((locale) => {
                        const isCurrent = locale === curLocale;
                        return (
                            <button
                                key={locale}
                                className={`${localeItem} ${isCurrent ? currentLocaleStyle : ""}`}
                                onClick={() => handleLocaleChange(locale)}
                                disabled={isCurrent}
                            >
                                <span className={flagStyle}>
                                    {langs[locale].flag}
                                </span>
                                <span>{langs[locale].name}</span>
                                {isCurrent && (
                                    <span className={checkStyle}>✓</span>
                                )}
                            </button>
                        );
                    })}
                    <Popover.Arrow className={arrowStyle} />
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
};

export default LocaleSelector;
