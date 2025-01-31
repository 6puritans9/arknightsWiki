import Image from "next/image";
import { Database } from "@/lib/supabase";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

interface DetailsProps {
    operator: Operator;
}

const Details: React.FC<DetailsProps> = ({ operator }) => {
    return (
        <div className="card">
            <h2>{operator.name_en}</h2>
            <p>{operator.class_en}</p>
            <p>{operator.branch_en}</p>
            <p>{operator.faction_en}</p>
            <p>{operator.gender}</p>
            <p>{operator.position_en}</p>
            <p>{operator.rarity}</p>
        </div>
    );
};

export default Details;
