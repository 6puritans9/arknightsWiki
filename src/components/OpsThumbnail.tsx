import Image from "next/image";
import Link from "next/link";
import { css } from "../../styled-system/css";
// import { QueryOperator } from "@/lib/types";
import { ThumbnailOperatorType } from "@/lib/apiMongo";
import getS3Url from "@/lib/apiAws";

type ThumbnailProps = {
    operator: ThumbnailOperatorType;
    priority: boolean;
};

const wrapper = css({
    width: {
        base: "70px",
        sm: "80px",
        md: "90px",
    },
    height: "auto",
});

const OpsThumbnail = ({ operator, priority = false }: ThumbnailProps) => {
    const operatorPath = `${operator._id}`;
    const imagePath = `operators/${operatorPath}/icons/${operatorPath}.webp`;

    return (
        <div className={wrapper}>
            <Link
                key={operator._id}
                href={`/operators/${operator.name}`}
                passHref
            >
                <Image
                    src={getS3Url(imagePath)}
                    alt={operator.name}
                    width={90}
                    height={90}
                    priority={priority}
                ></Image>
            </Link>
            <span>{operator.name}</span>
        </div>
    );
};

export default OpsThumbnail;
