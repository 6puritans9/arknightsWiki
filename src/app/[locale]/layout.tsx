import "@/app/globals.css";
import Paperlogy from "../styles/fonts";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TouchProvider } from "@/components/utils/TouchProvider";
import StoreInitializer from "@/components/utils/StoreInitializer";
// import LocaleInitializer from "@/components/utils/LocaleInitializer";
import Header from "@/components/layout/Header";
import { flex } from "$/styled-system/patterns";

export const metadata: Metadata = {
    title: "Rhodes Island",
    description: "Arknights Wiki",
};

type LocaleLayoutProps = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

const wrapper = flex({
    flexDirection: "column",
    padding: "layoutX",
    margin: 0,
    overflowX: "hidden",
    overflowY: "auto",
    gap: 0,
    minHeight: "100vh",
});

const container = flex({
    flexDirection: "column",
    position: "relative",
    backgroundColor: "whiteBackground",
    flex: 1,
});

const localeToLang: { [key: string]: string } = {
    "en-US": "en",
    "ko-KR": "ko",
    "ja-JP": "ja",
    "zh-CN": "zh-CN",
    "zh-TW": "zh-TW",
};

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;
    const htmlLang = localeToLang[locale] || "en";

    return (
        <html lang={htmlLang} className={`${Paperlogy.className}`}>
            <body className={wrapper}>
                <SpeedInsights />
                <StoreInitializer />
                {/* <LocaleInitializer /> */}
                <TouchProvider>
                    <Header locale={locale} />
                    <main className={container}>{children}</main>
                </TouchProvider>
            </body>
        </html>
    );
}
