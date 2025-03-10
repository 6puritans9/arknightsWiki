import Image from "next/image";
import { QueryOperator, QueryBaseSkills } from "@/lib/types";
import getS3Url from "@/lib/apiAws";

type IconProps = {
    operator: QueryOperator | QueryBaseSkills[0];
};

const Icon = ({ operator }: IconProps) => {
    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();

    const operatorPath = `char_${paddedCode}_${operator.pathname}`;
    const imagePath = `operators/${operatorPath}/icons/${operatorPath}.webp`;

    return (
        <div className="icon__container">
            <Image
                src={getS3Url(imagePath)}
                alt={operator.name}
                width={90}
                height={90}
            ></Image>
            <h2 className="icon__name">{operator.name}</h2>
        </div>
    );
};

export default Icon;
