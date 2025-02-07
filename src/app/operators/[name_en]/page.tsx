"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Details from "@/components/Details";
import { Operator } from "@/lib/types";
import { getOperator } from "@/lib/apiOperators";

const OperatorDetail = () => {
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
