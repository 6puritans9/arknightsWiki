import Image from "next/image";
import { Fragment } from "react";
import { getEliteImage } from "@/lib/apiAws";
import { css, cva } from "../../../styled-system/css";
import { BuildingBuffType } from "@/lib/apiMongo";

type BuffCardProps = {
    buffData: {
        buffId: string;
        cond: {
            phase: string;
            level: number;
        };
    }[];
    buffMap: { [key: string]: BuildingBuffType };
};

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

const imageWrapper = css({
    display: "inline-flex",
    alignItems: "center",
    marginRight: "0.5rem",
    backgroundColor: "black",
});

const buffTitle = css({
    fontSize: {
        base: "md",
        sm: "lg",
    },
});

const buffDesc = css({
    fontSize: {
        base: "sm",
        sm: "md",
    },
    color: "gray.600",
    marginTop: "0.25rem",
});

const BuffCard = ({ buffData, buffMap }: BuffCardProps) => {
    return buffData.map((data, i) => {
        const buffDetail = buffMap[data.buffId];
        const phase = parseInt(data.cond.phase.replace("PHASE_", ""), 10);
        const isSameCategory = buffData.length > 1;

        return (
            <Fragment key={i}>
                <dl
                    className={
                        isSameCategory
                            ? container({ visual: "aggregate" })
                            : container({ visual: "divde" })
                    }
                >
                    <dt>
                        <span className={imageWrapper}>
                            <Image
                                src={getEliteImage(phase)}
                                height={20}
                                width={20}
                                alt={`elite ${phase}`}
                            />
                        </span>
                        {`level=${data.cond.level}`}
                    </dt>
                    <dd className={buffTitle}>{buffDetail.buffName}</dd>
                    <dd className={buffDesc}>{buffDetail.description}</dd>
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
