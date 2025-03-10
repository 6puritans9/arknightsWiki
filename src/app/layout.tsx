import type { Metadata } from "next";
import { Paperlogy } from "./styles/fonts";
import "./styles/styles.css";
import Nav from "../components/Nav";
import Title from "@/components/Title";
import Footer from "@/components/Footer";
import getS3Url from "@/lib/apiAws";

export const metadata: Metadata = {
    title: "Arknights Wiki",
    description: "Arknights Wiki",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const backgroundURL = getS3Url("background/sarkaz-arknights.1920x1080.mp4");

    return (
        <html lang="en" className={`${Paperlogy}`}>
            <body>
                <div className="page__container">
                    <header className="header">
                        <div className="header__container">
                            <Title />
                            <Nav />
                        </div>
                    </header>
                    <main className="content">
                        <video autoPlay muted loop className="content__video">
                            <source src={`${backgroundURL}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {children}
                    </main>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
