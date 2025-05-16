import Image from "next/image";
import Link from "next/link";
import { css } from "../../styled-system/css";
import { QueryOperator, QueryBaseSkills } from "@/lib/types";
import getS3Url from "@/lib/apiAws";

type ThumbnailProps = {
    operator: QueryOperator | QueryBaseSkills[0];
    // priority: boolean;
};

const wrapper = css({
    width: {
        base: "70px",
        sm: "80px",
        md: "90px",
    },
    height: "auto",
});

const InfraThumbnail = ({ operator }: ThumbnailProps) => {
    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();

    const operatorPath = `char_${paddedCode}_${operator.pathname}`;
    const imagePath = `operators/${operatorPath}/icons/${operatorPath}.webp`;

    return (
        <div className={wrapper}>
            <Link
                key={operator.id}
                href={`/operators/${operator.name}`}
                passHref
            >
                <Image
                    src={getS3Url(imagePath)}
                    alt={operator.name}
                    width={90}
                    height={90}
                    // priority={priority}
                ></Image>
            </Link>
            <span>{operator.name}</span>
        </div>
    );
};

export default InfraThumbnail;
