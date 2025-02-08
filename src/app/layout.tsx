import type { Metadata } from "next";
import { Paperlogy } from "./styles/fonts";
import "./styles.css";
import Navigation from "../components/Navigation";
import Title from "@/components/Title";

export const metadata: Metadata = {
    title: "명일방주 위키",
    description: "명일방주 한국어 위키 페이지입니다",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${Paperlogy}`}>
            <body className={"home"}>
                <header>
                    <Title />
                    <nav>
                        <Navigation />
                    </nav>
                </header>
                {children}
            </body>
        </html>
    );
}
