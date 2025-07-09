"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SingleOpType } from "@/api/apiMongo";
import { getStandardImage, getFactionImage, getEliteImage } from "@/api/apiAws";
import { css } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

type ImagesProps = {
    data: SingleOpType;
};

//#region Styles
const container = css({
    gridArea: "images",
    aspectRatio: "1/1",
    position: "relative",
    backgroundSize: "100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "top left",
    _hover: {
        overflow: "visible",
        zIndex: 2,
    },
    "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: "inherit",
        backgroundSize: "inherit",
        backgroundRepeat: "inherit",
        backgroundPosition: "inherit",
        filter: "invert(1)",
    },
});

const imageWrapper = flex({
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    height: "100%",
    width: "100%",
    cursor: "default",
});

const opImageStyle = css({
    height: { base: "50%", md: "100%" },
    width: "auto",
    transition: "transform 0.4s cubic-bezier(0.4,0,0.2,1)",
    transformOrigin: "center",
    objectFit: "contain",
    _hover: {
        objectFit: "contain",
        overflow: "visible",
        transform: "scale(1.15)",
    },
    zIndex: 2,
});

const selectorWrapper = flex({
    position: "absolute",
    right: 0,
    top: 0,
    justifyContent: "flex-end",
    gap: "0.8rem",
    zIndex: 9,
});

const selectorStyle = css({
    cursor: "pointer",
    _hover: {
        transform: {
            base: "scale(1.3)",
            md: "scale(1.5)",
        },
    },
});

const selected = css({
    transform: {
        base: "scale(1.3)",
        md: "scale(1.5)",
    },
});

//#endregion

const Images = ({ data: op }: ImagesProps) => {
    const [skin, setSkin] = useState<1 | 2>(1);

    const faction =
        (op.teamId && op.teamId) ||
        (op.groupId && op.groupId) ||
        (op.nationId && op.nationId);

    return (
        <div
            className={container}
            style={{
                backgroundImage: `url(${getFactionImage(faction)})`,
            }}
        >
            <div className={selectorWrapper}>
                <button
                    className={`${selectorStyle} ${skin === 1 ? selected : ""}`}
                    onClick={() => setSkin(1)}
                >
                    <Image
                        src={getEliteImage("0")}
                        alt="elite0"
                        style={{ filter: "invert(1)" }}
                        height={30}
                        width={30}
                    />
                </button>
                <button
                    className={`${selectorStyle} ${skin === 2 ? selected : ""}`}
                    onClick={() => setSkin(2)}
                >
                    <Image
                        src={getEliteImage("2")}
                        alt="elite2"
                        style={{ filter: "invert(1)" }}
                        height={30}
                        width={30}
                    />
                </button>
            </div>
            <figure className={imageWrapper}>
                <Link
                    href={getStandardImage(op.id, skin)}
                    target="_blank"
                    aria-label={`View full size image of ${op.name}`}
                >
                    <Image
                        src={getStandardImage(op.id, skin)}
                        alt={`${op.name} image`}
                        className={opImageStyle}
                        quality={75}
                        // width={500}
                        // height={500}
                        fill
                        loading="eager"
                        decoding="async"
                    />
                </Link>
            </figure>
        </div>
    );
};

export default Images;
