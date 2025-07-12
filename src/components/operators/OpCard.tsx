import Image from "next/image";
import Link from "next/link";
import { SimpleOpType } from "@/api/apiMongo";
import { getPortraitImg } from "@/api/apiAws";
import {
    groupIdMap,
    teamIdMap,
    nationIdMap,
    professionMap,
    subProfessionIdMap,
} from "@/lib/constants/NameMap";
import { css } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

type OpCardProps = {
    id: string;
    operator: SimpleOpType;
    locale: string;
    priority?: boolean;
    dataSsrOp?: boolean;
};

//#region Styles
const container = css({
    height: {
        base: "160px",
        md: "225px",
        xl: "300px",
    },
    width: "100%",
    position: "relative",
    display: "block",
    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)",
    marginBottom: "1rem",
});

const figureContainer = css({
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
});

const imageStyle = css({
    objectFit: "cover",
});

const figcaptionStyle = css({
    fontSize: {
        base: "fSm",
    },
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingLeft: "1rem",
    textAlign: "left",
    color: "white",
});

const extraInfoStyle = flex({
    gap: {
        base: "0.3rem",
        md: "0.8rem",
    },
    fontSize: {
        base: "0.4rem",
        md: "0.8rem",
        xl: "0.9rem",
    },
    justifyContent: "flex-start",
    position: "relative",
    color: "white",
    overflow: "hidden",
    cursor: "pointer",
});

const extraInfoContent = flex({
    gap: "inherit",
    transition: "transform 0.3s ease",
    _groupHover: {
        transform: "translateY(-100%)",
    },
});

const extraInfoAlt = css({
    display: "flex",
    gap: "inherit",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    transition: "transform 0.3s ease",
    _groupHover: {
        transform: "translateY(-100%)",
    },
});

const rarityStyle = css({
    fontSize: {
        base: "fBase",
        xl: "fLg",
    },
    position: "absolute",
    top: "0.5rem",
    left: "30%",
    transform: "translateX(-30%)",
    textAlign: "center",
    textShadow: "0 0 8px rgba(0, 0, 0, 0.8), 0 0 16px rgba(255, 140, 0, 0.4)",
    color: "#FF8C00",
    zIndex: 2,
});

const iridescentRarityStyle = css({
    fontSize: {
        base: "fBase",
        xl: "fLg",
    },
    display: "inline-block",
    position: "absolute",
    top: "0.5rem",
    left: "40%",
    transform: "translateX(-40%)",
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
});
//#endregion

const OpCard = ({
    id,
    operator: op,
    locale,
    priority = false,
    dataSsrOp,
}: OpCardProps) => {
    //#region Fontsize Helpers
    const shortNameStyle = css({
        fontSize: {
            base: "0.9rem",
            md: "1.2rem",
            xl: "1.4rem",
        },
    });

    const mediumNameStyle = css({
        fontSize: {
            base: "0.8rem",
            md: "1.1rem",
            xl: "1.3rem",
        },
    });

    const longNameStyle = css({
        fontSize: {
            base: "0.6rem",
            md: "1.0rem",
            xl: "1.2rem",
        },
    });

    const getDynamicStyle = (name: string) => {
        if (name.length > 18) return longNameStyle;
        if (name.length > 10) return mediumNameStyle;
        return shortNameStyle;
    };
    //#endregion

    const isEnLocale = locale === "en-US";

    return (
        <div className={container} data-ssr-op={dataSsrOp ? "" : undefined}>
            <Link href={`/${locale}/operators/${op.name}?id=${id}`} passHref>
                <figure className={figureContainer}>
                    <span
                        className={
                            op.rarity > 5 ? iridescentRarityStyle : rarityStyle
                        }
                    >
                        {"★".repeat(op.rarity)}
                    </span>
                    <Image
                        src={getPortraitImg(id)}
                        className={imageStyle}
                        alt={op.name}
                        priority={priority}
                        fill
                    />
                    <figcaption className={figcaptionStyle}>
                        {isEnLocale && op.appellation && (
                            <div className={getDynamicStyle(op.appellation)}>
                                {op.appellation}
                            </div>
                        )}
                        <div className={getDynamicStyle(op.name)}>
                            {op.name}
                        </div>
                        <div className={`${extraInfoStyle} group`}>
                            <div className={extraInfoContent}>
                                <span>{professionMap[op.profession]}</span>
                                <span>
                                    {subProfessionIdMap[op.subProfessionId]}
                                </span>
                            </div>
                            <div className={extraInfoAlt}>
                                <span>{op.recruit}</span>
                                <span>
                                    {(op.groupId && groupIdMap[op.groupId]) ||
                                        (op.teamId && teamIdMap[op.teamId]) ||
                                        nationIdMap[op.nationId]}
                                </span>
                            </div>
                        </div>
                    </figcaption>
                </figure>
            </Link>
        </div>
    );
};

export default OpCard;
