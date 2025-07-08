"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { flex } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";
import AuthButton from "../auth/AuthButton";

//#region Elements
const hamburgerBtn = (
    <svg
        width="25"
        height="25"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
    </svg>
);

const closeBtn = (
    <svg
        width="25"
        height="25"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
    </svg>
);

const globe = (
    <svg
        width="25"
        height="25"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M7.49996 1.80002C4.35194 1.80002 1.79996 4.352 1.79996 7.50002C1.79996 10.648 4.35194 13.2 7.49996 13.2C10.648 13.2 13.2 10.648 13.2 7.50002C13.2 4.352 10.648 1.80002 7.49996 1.80002ZM0.899963 7.50002C0.899963 3.85494 3.85488 0.900024 7.49996 0.900024C11.145 0.900024 14.1 3.85494 14.1 7.50002C14.1 11.1451 11.145 14.1 7.49996 14.1C3.85488 14.1 0.899963 11.1451 0.899963 7.50002Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
        <path
            d="M13.4999 7.89998H1.49994V7.09998H13.4999V7.89998Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
        <path
            d="M7.09991 13.5V1.5H7.89991V13.5H7.09991zM10.375 7.49998C10.375 5.32724 9.59364 3.17778 8.06183 1.75656L8.53793 1.24341C10.2396 2.82218 11.075 5.17273 11.075 7.49998 11.075 9.82724 10.2396 12.1778 8.53793 13.7566L8.06183 13.2434C9.59364 11.8222 10.375 9.67273 10.375 7.49998zM3.99969 7.5C3.99969 5.17611 4.80786 2.82678 6.45768 1.24719L6.94177 1.75281C5.4582 3.17323 4.69969 5.32389 4.69969 7.5 4.6997 9.67611 5.45822 11.8268 6.94179 13.2472L6.45769 13.7528C4.80788 12.1732 3.9997 9.8239 3.99969 7.5z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
        <path
            d="M7.49996 3.95801C9.66928 3.95801 11.8753 4.35915 13.3706 5.19448 13.5394 5.28875 13.5998 5.50197 13.5055 5.67073 13.4113 5.83948 13.198 5.89987 13.0293 5.8056 11.6794 5.05155 9.60799 4.65801 7.49996 4.65801 5.39192 4.65801 3.32052 5.05155 1.97064 5.8056 1.80188 5.89987 1.58866 5.83948 1.49439 5.67073 1.40013 5.50197 1.46051 5.28875 1.62927 5.19448 3.12466 4.35915 5.33063 3.95801 7.49996 3.95801zM7.49996 10.85C9.66928 10.85 11.8753 10.4488 13.3706 9.6135 13.5394 9.51924 13.5998 9.30601 13.5055 9.13726 13.4113 8.9685 13.198 8.90812 13.0293 9.00238 11.6794 9.75643 9.60799 10.15 7.49996 10.15 5.39192 10.15 3.32052 9.75643 1.97064 9.00239 1.80188 8.90812 1.58866 8.9685 1.49439 9.13726 1.40013 9.30601 1.46051 9.51924 1.62927 9.6135 3.12466 10.4488 5.33063 10.85 7.49996 10.85z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
    </svg>
);

const glass = (
    <svg
        width="25"
        height="25"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
        ></path>
    </svg>
);
//#endregion

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
    fontSize: { base: "3rem", sm: "4rem", lg: "8rem" },
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

const Header = () => {
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
                    <AuthButton />
                </div>
            </nav>

            <div className={`${navOverlay} ${open ? "open" : ""}`}>
                <ul>
                    <li>
                        <Link
                            href="/"
                            className={navItem}
                            onClick={() => handleNavClick("/")}
                        >
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/operators"
                            className={navItem}
                            onClick={() => handleNavClick("/operators")}
                        >
                            OPERATORS
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/infrastructure"
                            className={navItem}
                            onClick={() => handleNavClick("/infrastructure")}
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
