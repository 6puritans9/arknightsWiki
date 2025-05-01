import "./globals.css";
import { css } from "../../styled-system/css";
import { Paperlogy } from "./styles/fonts";
import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "@/components/Footer";
import getS3Url from "@/lib/apiAws";

export const metadata: Metadata = {
    title: "Arknights Wiki",
    description: "Arknights Wiki",
};

const pageContainer = css({
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
    minHeight: "100%",
    maxWidth: "100%",
});

const videoContainer = css({
    position: "absolute",
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    objectFit: "cover",
    zIndex: "-1",
    opacity: "0.5",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const backgroundURL = getS3Url("background/sarkaz-arknights.1920x1080.mp4");

    return (
        <html lang="en" className={`${Paperlogy}`}>
            <body>
                <div className={pageContainer}>
                    <header
                        style={{ position: "sticky", top: "0", zIndex: "100" }}
                    >
                        <Nav />
                    </header>
                    <main className={pageContainer}>
                        <video autoPlay muted loop className={videoContainer}>
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
