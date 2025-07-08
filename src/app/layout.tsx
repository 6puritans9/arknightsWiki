import "./globals.css";
import Paperlogy from "./styles/fonts";
import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { TouchProvider } from "@/components/utils/TouchProvider";
import StoreInitializer from "@/components/utils/StoreInitializer";
import Header from "../components/layout/Header";
import Footer from "@/components/layout/Footer";
import { flex } from "../../styled-system/patterns";

export const metadata: Metadata = {
    title: "Rhodes Island",
    description: "Arknights Wiki",
};

const wrapper = flex({
    flexDirection: "column",
    padding: "layoutX",
    margin: 0,
    overflowX: "hidden",
    overflowY: "auto",
    gap: 0,
    minHeight: "100vh",
    // flex: "1 1 0%",
    // justifyContent: "space-between",
    // border: "2px solid blue",
});

const container = flex({
    flexDirection: "column",
    position: "relative",
    backgroundColor: "whiteBackground",
    flex: 1,
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        //TODO: change lang dynamically after i18n
        <html lang="en" className={`${Paperlogy.className}`}>
            <body className={wrapper}>
                <SpeedInsights />
                <StoreInitializer />
                <TouchProvider>
                    <Header />
                    <main className={container}>{children}</main>
                    <Footer />
                </TouchProvider>
            </body>
        </html>
    );
}
