import Image from "next/image";
import { QueryOperator } from "@/lib/types";

type IconProps = {
    operator: QueryOperator;
};

const Icon = ({ operator }: IconProps) => {
    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();

    const operatorPath = `char_${paddedCode}_${operator.pathname}`;

    return (
        <div>
            <Image
                src={`/operators/${operatorPath}/icons/${operatorPath}.webp`}
                alt={operator.name}
                width={90}
                height={90}
            ></Image>
            <h2>{operator.name}</h2>
        </div>
    );
};

export default Icon;
