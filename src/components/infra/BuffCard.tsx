import Image from "next/image";
import { Fragment } from "react";
import { getEliteImage } from "@/api/apiAws";
import { css, cva } from "../../../styled-system/css";
import { BuffsObjectType } from "@/api/apiMongo";
import { flex } from "../../../styled-system/patterns";

type BuffCardProps = {
    buffData: {
        buffId: string;
        cond: {
            phase: string;
            level: number;
        };
    }[];
    buffs: BuffsObjectType;
};

//#region Styles
const container = cva({
    base: {
        padding: "0.75rem",
        background: "#f5f7fa",
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
    },
    variants: {
        visual: {
            aggregate: {
                marginBottom: 0,
            },
            divde: {
                marginBottom: "1rem",
            },
        },
    },
});

const headerWrapper = flex({
    justifyContent: "flex-end",
    gap: "0.2rem",
});

const eliteImage = css({
    maxWidth: "30px",
    maxHeight: "22.5px",
    width: "auto",
    height: "auto",
    filter: "invert(1)",
});

const eliteText = css({
    fontSize: {
        base: "fBase",
        lg: "fMd",
    },
    fontWeight: "bold",
    color: "gray.500",
});

const buffTitle = flex({
    fontSize: {
        base: "md",
        sm: "lg",
    },
    flex: 1,
});

const buffDesc = css({
    fontSize: {
        base: "sm",
        sm: "md",
    },
    color: "gray.600",
    marginTop: "0.25rem",
});
//#endregion

const BuffCard = ({ buffData, buffs }: BuffCardProps) => {
    return buffData.map((data, i) => {
        const buffDetail = buffs[data.buffId];
        const phase = data.cond.phase[data.cond.phase.length - 1];
        const isSameCategory = buffData.length > 1;

        const handleClick = () => {
            if (buffDetail.related_ops) {
                console.log(buffDetail.related_ops);
            }
        };

        return (
            <Fragment key={i}>
                <dl
                    className={
                        isSameCategory
                            ? container({ visual: "aggregate" })
                            : container({ visual: "divde" })
                    }
                >
                    <div className={headerWrapper}>
                        <dt className={buffTitle}>{buffDetail.buffName}</dt>
                        <Image
                            className={eliteImage}
                            src={getEliteImage(phase)}
                            width={30}
                            height={22.5}
                            alt={`elite ${phase}`}
                            loading="lazy"
                            decoding="async"
                        />
                        <span className={eliteText}>{data.cond.level}</span>
                    </div>
                    <dd className={buffDesc} onClick={handleClick}>
                        {buffDetail.description}
                    </dd>
                </dl>

                {isSameCategory && i < buffData.length - 1 && (
                    <hr
                        style={{
                            margin: "0.5rem 0",
                            border: 0,
                            borderTop: "1px solid #d0d7de",
                        }}
                    />
                )}
            </Fragment>
        );
    });
};

export default BuffCard;
