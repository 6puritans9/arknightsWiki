import Image from "next/image";
import Link from "next/link";
import { SimpleOpType } from "@/api/apiMongo";
import { getPortraitImg } from "@/api/apiAws";
import { professionMap, subProfessionIdMap } from "@/lib/constants/NameMap";
import { css } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

type OpCardProps = {
    id: string;
    operator: SimpleOpType;
    priority?: boolean;
    dataSsrOp?: boolean;
};

const container = css({
    width: {
        base: "100px",
        md: "150px",
        xl: "200px",
    },
    height: {
        base: "150px",
        md: "225px",
        xl: "300px",
    },
    display: "block",
    position: "relative",
    marginBottom: "1rem",
    clipPath: "polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%)", // Creates skewed shape
    // marginLeft: "0.5rem",
    // marginRight: "0.5rem",
});

const figureContainer = css({
    position: "relative",
    width: "100%",
    height: "100%",
    // flex: 1,
    overflow: "hidden",
});

const imageStyle = css({
    // width: {
    //     base: "100px",
    //     md: "150px",
    //     xl: "200px",
    // },
    // width: "100%",
    // height: "100%",
    objectFit: "cover",
});

const figcaptionStyle = css({
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)", // Semi-transparent background
    color: "white",
    textAlign: "left",
    paddingLeft: "1rem",
});

const rarityStyle = css({
    position: "absolute",
    left: "30%",
    top: "0.5rem",
    transform: "translateX(-30%)",
    color: "#FF8C00",
    fontSize: {
        base: "fBase",
        xl: "fLg",
    },
    zIndex: 2,
    textAlign: "center",
});

const iridescentRarityStyle = css({
    position: "absolute",
    left: "30%",
    top: "0.5rem",
    transform: "translateX(-30%)",
    textAlign: "center",
    background:
        "linear-gradient(135deg, #e0e0e0 0%, #6cb4ee 25%, #fff0d1 45%, #ffc470 55%, #ff9a3c 65%, #e0e0e0 100%)",
    backgroundSize: "300% 100%",
    backgroundRepeat: "repeat",
    backgroundClip: "text",
    color: "transparent",
    WebkitTextFillColor: "transparent",
    fontWeight: "bold",
    animation: "metallicFlow 3s linear infinite",
    display: "inline-block",
    fontSize: {
        base: "fBase",
        xl: "fLg",
    },
    zIndex: 2,
});

const extraInfoStyle = flex({
    justifyContent: "flex-start",
    gap: "1rem",
    color: "white",
    fontSize: "0.7rem",
});

const OpCard = ({
    id,
    operator: op,
    priority = false,
    dataSsrOp,
}: OpCardProps) => {
    const dynamicFontSize = (name: string) => {
        if (name.length > 18) return "1rem";
        if (name.length > 10) return "1.1rem";
        return "1.2rem";
    };

    return (
        <div className={container} data-ssr-op={dataSsrOp ? "" : undefined}>
            <Link href={`/operators/${op.name}`} passHref>
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
                        // width={100}
                        // height={100}
                        priority={priority}
                        fill
                    />
                    <figcaption className={figcaptionStyle}>
                        {op.appellation ?? (
                            <div style={{ fontSize: dynamicFontSize(op.name) }}>
                                {op.appellation}
                            </div>
                        )}
                        <div style={{ fontSize: dynamicFontSize(op.name) }}>
                            {op.name}
                        </div>
                        <div className={extraInfoStyle}>
                            <span>{professionMap[op.profession]}</span>
                            <span>
                                {subProfessionIdMap[op.subProfessionId]}
                            </span>
                        </div>
                    </figcaption>
                </figure>
            </Link>
        </div>
    );
};

export default OpCard;
