"use client";

import { useState, useEffect } from "react";
import Details from "@/components/Details";
import { getOperator } from "@/lib/apiOperators";
import { Database } from "@/lib/supabase";
import { useParams } from "next/navigation";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

interface OperatorDetailProps {
    name: string;
}

const OperatorDetail: React.FC<OperatorDetailProps> = () => {
    const params = useParams();
    const { name_en } = params;
    const [operator, setOperator] = useState<Operator | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (name_en) {
            const fetchOperator = async () => {
                try {
                    const data = await getOperator(name_en as string);
                    setOperator(data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOperator();
        } else {
            console.error("No name provided");
        }
    }, [name_en]);

    if (loading) return <div>Loading...</div>;
    if (!operator) return <div>Operator not found</div>;

    return <Details operator={operator} />;
};

export default OperatorDetail;
