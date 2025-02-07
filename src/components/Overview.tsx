import Image from "next/image";
import { Operator } from "@/lib/types";

type OverviewProps = {
    operator: Operator;
};

const Overview = ({ operator }: OverviewProps) => {
    return (
        <div className="op-grid__icon">
            <Image
                src={`/operators/icons/${operator.name_en.toLowerCase()}_s.webp`}
                alt={operator.name_en}
                width={50}
                height={50}
            ></Image>
            <h2>{operator.name_en}</h2>
            <p>{operator.class_en}</p>
            <p>{operator.branch_en}</p>
            <p>{`Rarity: ${operator.rarity}`}</p>
        </div>
    );
};

export default Overview;
