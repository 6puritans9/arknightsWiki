import type { Metadata } from "next";
import { Paperlogy } from "./styles/fonts";
import "./styles/styles.css";
import Nav from "../components/Nav";
import Title from "@/components/Title";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Arknights Wiki",
    description: "Arknights Wiki",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${Paperlogy}`}>
            <body>
                <header className="header">
                    <div className="header__container">
                        <Title />
                        <Nav />
                    </div>
                </header>
                {children}
                <Footer />
            </body>
        </html>
    );
}
