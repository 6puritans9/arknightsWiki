import Image from "next/image";
import { flex } from "../../styled-system/patterns";
import { css } from "../../styled-system/css";
import { footerLogoText } from "@/lib/dictionary";

const container = flex({
    flexDirection: "column",
    alignItems: "flex-end",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    minHeight: "unset",
});

const FooterLogo = flex({
    fontSize: {
        base: "1.6rem",
        sm: "4rem",
        md: "4.5rem",
        lg: "6rem",
        xl: "8rem",
        "2xl": "9rem",
    },
    fontWeight: "bold",
    letterSpacing: "wide",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
    transform: "translateY(40%)",
    zIndex: 1,
    // position: "absolute",
    // left: 0,
    // bottom: 0,
});

const Footer = () => {
    return (
        <footer className={container}>
            <h1 className={FooterLogo} aria-label="Go to homepage">
                {footerLogoText.en}
            </h1>
        </footer>
    );
};

export default Footer;
