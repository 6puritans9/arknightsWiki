import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

const VALID_LOCALES = ["en-US", "ko-KR", "ja-JP", "zh-CN", "zh-TW"] as const;
const DEFAULT_LOCALE = "en-US";

type ValidLocale = (typeof VALID_LOCALES)[number];

type State = {
    locale: ValidLocale;
};

type Action = {
    setLocale: (locale: string) => void;
    resetLocale: () => void;
};

const isValidLocale = (locale: string): locale is ValidLocale => {
    return VALID_LOCALES.includes(locale as ValidLocale);
};

const initialState: State = {
    locale: "en-US",
};

const useLocaleStore = create<State & Action>()(
    subscribeWithSelector((set) => ({
        ...initialState,

        setLocale: (locale) => {
            if (isValidLocale(locale)) {
                set({ locale });
            } else {
                console.warn(
                    `Invalid locale: ${locale}. Using default: ${DEFAULT_LOCALE}`
                );
                set({ locale: DEFAULT_LOCALE });
            }
        },

        resetLocale: () => {
            set({ locale: DEFAULT_LOCALE });
        },
    }))
);

export default useLocaleStore;
export { VALID_LOCALES, DEFAULT_LOCALE };
