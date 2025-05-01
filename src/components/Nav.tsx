import Link from "next/link";
import { flex } from "../../styled-system/patterns";
import { css, cva } from "../../styled-system/css";

const navContainer = css({
    backgroundColor: "primary",
    opacity: "0.8",
    padding: "1rem 3rem",
});
const navFlex = flex({
    justifyContent: "space-evenly",
    align: "center",
});

const navItem = cva({
    base: {
        transition: "color 0.2s ease",
        fontWeight: "bold",
        color: "headerText",
        _hover: {
            color: "headerText",
            opacity: "0.5",
        },
    },
    variants: {
        size: {
            sm: { fontSize: "sm" },
            lg: { fontSize: "lg" },
        },
    },
    defaultVariants: {
        size: "lg",
    },
});
const navTitleContainer = css({
    width: "20%",
    padding: "0 2rem",
});

const navLinksContainer = css({
    width: "80%",
    display: "flex",
    justifyContent: "space-evenly",
    padding: "0 3rem",
    flexGrow: "1",
});

const Nav = () => {
    return (
        <nav className={navContainer}>
            <div className={navFlex}>
                <div className={navTitleContainer}>
                    <Link href="/" className={navItem()}>
                        ArknightsWiki
                    </Link>
                </div>
                <ul className={navLinksContainer}>
                    <li className={navItem()}>
                        <Link href="/operators">Operators</Link>
                    </li>
                    <li className={navItem()}>
                        <Link href="/infrastructure">RIIC</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Nav;
