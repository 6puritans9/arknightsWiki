import "./globals.css";
import { css } from "../../styled-system/css";
import Paperlogy from "./styles/fonts";
import type { Metadata } from "next";
import { TouchProvider } from "@/components/TouchProvider";
import Nav from "../components/Nav";
import Footer from "@/components/Footer";
import getS3Url from "@/lib/apiAws";
import { container, flex } from "../../styled-system/patterns";
import StoreInitializer from "@/components/StoreInitializer";

export const metadata: Metadata = {
    title: "Arknights Wiki",
    description: "Arknights Wiki",
};

const headerStyles = css({
    position: "sticky",
    top: "0",
    zIndex: "100",
    flexShrink: "0",
});

const bodyStyles = flex({
    flexDirection: "column",
    height: "100vh",
    maxHeight: "100vh",
    // minHeight: "100vh",
    position: "relative",
    maxWidth: "100vw",
    overflowX: "hidden",
});

const mainStyles = container({
    width: "100%",
    maxWidth: "5xl",
    margin: "2rem auto",
    px: "4",
    flex: "1",
});

const footerStyles = flex({
    flexDirection: "column",
    opacity: "0.8",
    alignItems: "flex-end",
    padding: "0.5rem 1rem",
    backgroundColor: "primary",
});

const videoContainer = css({
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
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
        <html lang="en" className={`${Paperlogy.className}`}>
            <body className={bodyStyles}>
                <StoreInitializer />
                <TouchProvider>
                    <header className={headerStyles}>
                        <Nav />
                    </header>
                    <video autoPlay muted loop className={videoContainer}>
                        <source src={`${backgroundURL}`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <main className={mainStyles}>{children}</main>
                    <footer className={footerStyles}>
                        <Footer />
                    </footer>
                </TouchProvider>
            </body>
        </html>
    );
}
