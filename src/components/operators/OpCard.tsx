import Image from "next/image";
import Link from "next/link";
import { SimpleOpType } from "@/api/apiMongo";
import getS3Url from "@/api/apiAws";
import { css } from "$/styled-system/css";

type OpCardProps = {
    id: string;
    operator: SimpleOpType;
    priority: boolean;
    dataSsrOp?: boolean;
};

const container = css({
    width: {
        base: "70px",
        md: "90px",
        xl: "120px",
    },
    height: "auto",
    maxHeight: "300px",
});

const nameStyle = css({
    overflowWrap: "anywhere",
    whiteSpace: "normal",
});

const OpCard = ({
    id,
    operator: op,
    priority = false,
    dataSsrOp,
}: OpCardProps) => {
    const operatorPath = `${id}`;
    const imagePath = `operators/${operatorPath}/icons/${operatorPath}.webp`;

    const dynamicFontSize = (name: string) => {
        if (name.length > 18) return "0.9rem";
        if (name.length > 10) return "1rem";
        return "1.2rem";
    };

    return (
        <div className={container} data-ssr-op={dataSsrOp ? "" : undefined}>
            <Link href={`/operators/${op.name}`} passHref>
                <Image
                    src={getS3Url(imagePath)}
                    alt={op.name}
                    width={90}
                    height={90}
                    priority={priority}
                ></Image>
            </Link>
            {op.appellation ?? <p>{op.appellation}</p>}
            <p
                className={nameStyle}
                style={{ fontSize: dynamicFontSize(op.name) }}
            >
                {op.name}
            </p>
            <p>{op.rarity}</p>
            <p>{op.profession}</p>
            <p>{op.subProfessionId}</p>
        </div>
    );
};

export default OpCard;
