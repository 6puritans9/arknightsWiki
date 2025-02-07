import Image from "next/image";
import { Operator } from "@/lib/types";

type IconProps = {
    operator: Operator;
};

const Icon = ({ operator }: IconProps) => {
    return (
        <div>
            <Image
                src={`/operators/icons/${operator.name_en.toLowerCase()}_s.webp`}
                alt={operator.name_en}
                width={90}
                height={90}
            ></Image>
            <h2>{operator.name_en}</h2>
            {/* <p>{operator.class_en}</p>
            <p>{operator.branch_en}</p>
            <p>{`Rarity: ${operator.rarity}`}</p> */}
        </div>
    );
};

export default Icon;
