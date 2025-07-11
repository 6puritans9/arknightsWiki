"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { flex } from "$/styled-system/patterns";
import { css } from "$/styled-system/css";
import AuthButton from "../auth/AuthButton";
import { hamburgerBtn, closeBtn, glass, globe } from "../ui/NavButtons";

type HeaderProps = {
    locale: string;
};

//#region Styles
const container = css({
    position: "sticky",
    height: "4rem",
    top: "0",
    zIndex: "header",
    flexShrink: "0",
});

const wrapper = flex({
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    align: "center",
    backgroundColor: "whiteBackground",
});

const navItem = css({
    transition: "color 0.2s ease",
    fontWeight: "bold",
    color: "headerText",
    fontSize: { base: "2rem", md: "4rem", lg: "8rem" },
    _hover: {
        color: "headerText",
        opacity: "0.5",
    },
});

const utilsContainer = flex({
    justifyContent: "flex-end",
    gap: "0.5rem",
    alignItems: "center",
});

const menuBtn = css({
    background: "none",
    border: "none",
    cursor: "pointer",
    width: "25px",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1100,
    "& .hamburger, & .close": {
        position: "absolute",
        left: 0,
        top: 0,
        transition: "opacity 0.65s, transform 0.65s",
    },
    "& .hamburger": {
        opacity: 1,
        transform: "scale(1) rotate(0deg)",
    },
    "& .close": {
        opacity: 0,
        transform: "scale(0.7) rotate(-90deg)",
    },
    "&.open .hamburger": {
        opacity: 0,
        transform: "scale(0.7) rotate(90deg)",
    },
    "&.open .close": {
        opacity: 1,
        transform: "scale(1) rotate(0deg)",
    },
});

const navOverlay = css({
    position: "absolute",
    top: "4rem",
    left: "-4.5rem",
    right: "-4.5rem",
    width: "100vw",
    height: "calc(100vh - 4rem)",
    overflowY: "hidden",
    padding: "layoutX",
    backgroundColor: "whiteBackground",
    pointerEvents: "none",
    zIndex: "overlay",
    opacity: 1,
    clipPath: "circle(0% at 0 0)",
    willChange: "clip-path",
    transition: "clip-path 0.65s cubic-bezier(0, 0, 0.2, 1), opacity 0.3s",
    "&.open": {
        pointerEvents: "auto",
        clipPath: "circle(150% at 0 0)",
        opacity: 1,
        overflowY: "auto",
    },
});

const copyrightWrapper = css({
    fontSize: { base: "0.5rem", sm: "0.7rem", md: "0.9rem" },
    alignSelf: "flex-end",
    paddingRight: {
        base: "2rem",
        sm: "3rem",
        md: "1rem",
        lg: "4rem",
        xl: "8rem",
    },
});

const textWithIcon = flex({
    alignItems: "center",
    gap: "0.3rem",
});

const githubIcon = css({
    width: {
        base: "0.5rem",
        sm: "0.6rem",
        md: "0.8rem",
        lg: "1rem",
        xl: "1.5rem",
    },
    height: "auto",
});
//#endregion

const Header = ({ locale }: HeaderProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    const handleNavClick = (href: string) => {
        if (pathname === href) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open, pathname]);

    useEffect(() => {
        if (open) setOpen(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    return (
        <header className={container}>
            <nav className={wrapper}>
                <button
                    className={`${menuBtn} ${open ? "open" : ""}`}
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    <span className="hamburger">{hamburgerBtn}</span>
                    <span className="close">{closeBtn}</span>
                </button>

                <div className={utilsContainer}>
                    {glass}
                    {globe}
                    <AuthButton locale={locale} />
                </div>
            </nav>

            <div className={`${navOverlay} ${open ? "open" : ""}`}>
                <ul>
                    <li>
                        <Link
                            href={`/${locale}`}
                            className={navItem}
                            onClick={() => handleNavClick(`/${locale}`)}
                        >
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${locale}/operators`}
                            className={navItem}
                            onClick={() =>
                                handleNavClick(`/${locale}operators`)
                            }
                        >
                            OPERATORS
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${locale}/infra`}
                            className={navItem}
                            onClick={() => handleNavClick(`/${locale}/infra`)}
                        >
                            R.I.I.C.
                        </Link>
                    </li>
                </ul>

                <div className={copyrightWrapper}>
                    <Link
                        className={textWithIcon}
                        target="_blank"
                        href="https://github.com/6puritans9/arknightsWiki"
                    >
                        Github
                        <Image
                            className={githubIcon}
                            style={{ filter: "invert(1)" }}
                            src={"/docs/github.svg"}
                            alt="github"
                            height={20}
                            width={20}
                        ></Image>
                    </Link>
                    <Link
                        target="_blank"
                        href=" https://freesentation.blog/paperlogyfont#feature"
                    >
                        Font by PAPERLOGY ©2024 by LEE JUIM
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
