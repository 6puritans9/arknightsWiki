import Link from "next/link";
import { flex } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import AuthButton from "./ui/auth/AuthButton";

const navContainer = css({
    backgroundColor: "primary",
    opacity: "0.8",
    padding: { base: "0.5rem 1rem", sm: "0.75rem 2rem" },
});
const navFlex = flex({
    justifyContent: "space-between",
    align: "center",
    width: "100%",
});

const navTitleContainer = flex({
    alignItems: "center",
    padding: "0 1rem",
});

const navLinksContainer = flex({
    justifyContent: "flex-start",
    padding: "0 3rem",
    gap: "2rem",
    flexGrow: "1",
});

const navButtonContainer = flex({
    justifyContent: "flex-end",
    padding: "0 1rem",
    alignItems: "center",
});

const navItem = css({
    transition: "color 0.2s ease",
    fontWeight: "bold",
    color: "headerText",
    fontSize: { base: "sm", sm: "md", lg: "lg" },
    _hover: {
        color: "headerText",
        opacity: "0.5",
    },
});

const Nav = () => {
    return (
        <nav className={navContainer}>
            <div className={navFlex}>
                <div className={navTitleContainer}>
                    <Link href="/" className={navItem}>
                        ArknightsWiki
                    </Link>
                </div>
                <ul className={navLinksContainer}>
                    <li>
                        <Link href="/operators" className={navItem}>
                            Operators
                        </Link>
                    </li>
                    <li>
                        <Link href="/infrastructure" className={navItem}>
                            RIIC
                        </Link>
                    </li>
                </ul>
                <div className={navButtonContainer}>
                    <AuthButton />
                </div>
            </div>
        </nav>
    );
};

export default Nav;
