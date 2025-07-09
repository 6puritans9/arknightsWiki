import Image from "next/image";
import { getProfessionImage, getsubProfessionIdImage } from "@/api/apiAws";
import { SingleOpType } from "@/api/apiMongo";
import { css, cva } from "$/styled-system/css";
import { flex, grid } from "$/styled-system/patterns";
import { professionMap, subProfessionIdMap } from "@/lib/constants/NameMap";

type HeaderProps = {
    data: SingleOpType;
};

//#region Styles
const wrapper = flex({
    gridArea: "header",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 0.5rem 0 0.5rem",
    width: "100%",
    height: "100%",
});

const nameStyle = flex({
    fontSize: {
        base: "1.5rem",
        lg: "5rem",
    },
    fontWeight: "semibold",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "0.3rem",
    flexWrap: "wrap",
    wordBreak: "break-word",
    overflowWrap: "break-word",
});

const infoContainer = flex({
    fontSize: {
        base: "0.4rem",
        lg: "fLg",
    },
    gap: {
        base: "0.2rem",
        lg: "0.7rem",
    },
    paddingLeft: {
        base: "0.2rem",
        lg: "1rem",
    },
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
});

const imageStyle = cva({
    base: {
        height: {
            base: "15px",
            lg: "30px",
        },
        width: "auto",
        objectFit: "cover",
    },
    variants: {
        invert: {
            true: {
                filter: "invert(1)",
            },
        },
    },
    defaultVariants: {
        invert: false,
    },
});

const figWithCaption = flex({
    alignItems: "center",
    gap: "0.2rem",
});

const posTextStyle = css({
    color: "secondary",
});

const rarityStyle = css({
    fontSize: {
        base: "fBase",
        xl: "fXl",
    },
    textAlign: "center",
    textShadow: "0 0 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 140, 0, 0.4)",
    color: "#FF8C00",
    zIndex: 2,
    paddingTop: {
        base: "0.2rem",
        md: "1rem",
    },
});

const iridescentRarityStyle = css({
    fontSize: {
        base: "fBase",
        xl: "fXl",
    },
    display: "inline-block",
    textAlign: "center",
    background:
        "linear-gradient(135deg, #e0e0e0 0%, {colors.primary} 25%, #fff0d1 45%, #ffc470 55%, #ff9a3c 65%, #e0e0e0 100%)",
    backgroundSize: "300% 100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    filter: "drop-shadow(0 0 4px rgba(0, 0, 0, 1)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 16px rgba(108, 180, 238, 0.6))",
    animation: "metallicFlow 3s linear infinite",
    fontWeight: "bold",
    zIndex: 2,
    paddingTop: {
        base: "0.5rem",
        md: "1rem",
    },
});
//#endregion

const Header = ({ data: op }: HeaderProps) => {
    return (
        <section className={wrapper}>
            <h2 className={nameStyle}>
                {op.name}
                <span
                    className={
                        op.rarity > 5 ? iridescentRarityStyle : rarityStyle
                    }
                >
                    {"★".repeat(op.rarity)}
                </span>
            </h2>

            <div className={infoContainer}>
                <figure className={figWithCaption}>
                    <Image
                        src={getProfessionImage(op.profession)}
                        alt="classImg"
                        className={imageStyle()}
                        height={30}
                        width={30}
                    />
                    <figcaption>{`${professionMap[op.profession]} /`}</figcaption>
                </figure>
                <figure className={figWithCaption}>
                    <Image
                        src={getsubProfessionIdImage(op.subProfessionId)}
                        className={imageStyle({ invert: true })}
                        alt="branchImg"
                        height={30}
                        width={30}
                    />
                    <figcaption>{`${subProfessionIdMap[op.subProfessionId]} /`}</figcaption>
                </figure>
                <span className={posTextStyle}>{op.position}</span>
            </div>
        </section>
    );
};

export default Header;
