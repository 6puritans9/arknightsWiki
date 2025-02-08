import Image from "next/image";

const Footer = () => {
    return (
        <footer className="footer">
            <a target="_blank" href="https://github.com/6puritans9">
                Made by Lee Kyuhong
                <Image
                    src={"/docs/github.svg"}
                    alt="github"
                    height={15}
                    width={15}
                ></Image>
            </a>
            <br></br>
            <a
                target="_blank"
                href=" https://freesentation.blog/paperlogyfont#feature"
            >
                Font by PAPERLOGY ©2024 by LEE JUIM
            </a>
        </footer>
    );
};

export default Footer;
