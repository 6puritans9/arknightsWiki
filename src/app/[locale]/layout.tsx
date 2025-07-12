import "@/app/globals.css";
import Paperlogy from "../styles/fonts";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TouchProvider } from "@/components/utils/TouchProvider";
import StoreInitializer from "@/components/utils/StoreInitializer";
import LocaleInitializer from "@/components/utils/LocaleInitializer";
import { langMap } from "@/utils/i18n/locales";
import Header from "@/components/layout/Header";
import { flex } from "$/styled-system/patterns";
import Footer from "@/components/layout/Footer";

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

export default async function LocaleLayout({
    children,
    params,
}: LocaleLayoutProps) {
    const { locale } = await params;
    const htmlLang = langMap[locale] || "en";

    return (
        <html lang={htmlLang} className={`${Paperlogy.className}`}>
            <body className={wrapper}>
                <SpeedInsights />
                <StoreInitializer />
                <LocaleInitializer />
                <TouchProvider>
                    <Header />
                    <main className={container}>{children}</main>
                    <Footer locale={locale} />
                </TouchProvider>
            </body>
        </html>
    );
}
