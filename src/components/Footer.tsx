import Image from "next/image";
import { flex } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import { footerLogoText } from "@/lib/dictionary";

const textWithIcon = flex({
    alignItems: "center",
    gap: "0.3rem",
});

const githubImage = css({
    width: {
        base: "0.5rem",
        sm: "0.6rem",
        md: "0.8rem",
        lg: "1rem",
        xl: "1.5rem",
    },
    height: "auto",
});

const footerContainer = flex({
    flexDirection: "column",
    alignItems: "flex-end",
    padding: "1rem 3rem",
    paddingBottom: {
        base: "2.5rem",
        sm: "4rem",
        md: "4rem",
        lg: "5rem",
        xl: "9rem",
    },
    position: "relative",
    overflow: "hidden",
    width: "100%",
    minHeight: "unset",
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

const FooterLogo = flex({
    fontSize: {
        base: "1.5rem",
        sm: "4rem",
        md: "5rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "9rem",
    },
    fontWeight: "bold",
    letterSpacing: "wide",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    bottom: 0,
    transform: "translateY(39%)",
    padding: "0 1rem",
    zIndex: 1,
});

const Footer = () => {
    return (
        <footer className={footerContainer}>
            <div className={copyrightWrapper}>
                <a
                    className={textWithIcon}
                    target="_blank"
                    href="https://github.com/6puritans9/arknightsWiki"
                >
                    Github
                    <Image
                        className={githubImage}
                        src={"/docs/github.svg"}
                        alt="github"
                        height={20}
                        width={20}
                    ></Image>
                </a>
                <a
                    target="_blank"
                    href=" https://freesentation.blog/paperlogyfont#feature"
                >
                    Font by PAPERLOGY ©2024 by LEE JUIM
                </a>
            </div>
            <h1 className={FooterLogo} aria-label="Go to homepage">
                {footerLogoText.en}
            </h1>
        </footer>
    );
};

export default Footer;
