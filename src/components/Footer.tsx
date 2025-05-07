import Image from "next/image";
import { flex } from "../../styled-system/patterns";

const textWithIcon = flex({
    alignItems: "center",
    gap: "0.3rem",
});

const Footer = () => {
    return (
        <>
            <a
                className={textWithIcon}
                target="_blank"
                href="https://github.com/6puritans9/arknightsWiki"
            >
                Github
                <Image
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
        </>
    );
};

export default Footer;
