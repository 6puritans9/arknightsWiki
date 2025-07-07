import { flex } from "$/styled-system/patterns";
import { footerLogoText } from "@/lib/dictionary";

const container = flex({
    // marginTop: {
    //     base: "1.5rem",
    //     lg: "3rem",
    // },
    flexDirection: "column",
    alignItems: "flex-end",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    // border: "2px solid red",
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
    justifyContent: "center",
    alignItems: "flex-end",
    fontWeight: "bold",
    letterSpacing: "wide",
    width: "100%",
    transform: "translateY(40%)",
    overflowY: "hidden",
});

const Footer = () => {
    return (
        <footer className={container}>
            <h3 className={FooterLogo} aria-label="Go to homepage">
                {footerLogoText.en}
            </h3>
        </footer>
    );
};

export default Footer;
