import Image from "next/image";
import { Operator } from "@/lib/types";

type OverviewProps = {
    operator: Operator;
};

const Overview = ({ operator }: OverviewProps) => {
    return (
        <div className="op-grid__icon">
            <Image
                src={`/operators/icons/${operator.name.toLowerCase()}_s.webp`}
                alt={operator.name}
                width={50}
                height={50}
            ></Image>
            <h2>{operator.name}</h2>
            <p>{operator.class}</p>
            <p>{operator.branch}</p>
            <p>{`Rarity: ${operator.rarity}`}</p>
        </div>
    );
};

export default Overview;
