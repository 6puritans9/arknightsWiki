import Image from "next/image";
import { UnifiedSingleQuery } from "@/lib/types";

type IconProps = {
    operator: UnifiedSingleQuery;
};

const Icon = ({ operator }: IconProps) => {
    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();

    const operatorPath = `char_${paddedCode}_${operator.pathname}`;

    return (
        <div className="icon__container">
            <Image
                src={`/operators/${operatorPath}/icons/${operatorPath}.webp`}
                alt={operator.name}
                width={90}
                height={90}
            ></Image>
            <h2 className="icon__name">{operator.name}</h2>
        </div>
    );
};

export default Icon;
