"use client";

import Icon from "@/components/Icon";
import { getOperators, getOperator } from "@/lib/apiOperators";
import { Operator } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

const Operators = () => {
    const [operators, setOperators] = useState<Operator[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOperators = async () => {
            const { data, error } = await supabase
                .from("operators")
                .select("id, name_en, class_en, branch_en, rarity");

            if (error) {
                console.error(error);
            } else {
                setOperators(data);
            }
            setLoading(false);
        };

        fetchOperators();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <section className="grid grid__icon">
            {operators.map((operator) => (
                <Link key={operator.id} href={`/operators/${operator.name_en}`}>
                    <Icon operator={operator} />
                </Link>
            ))}
        </section>
    );
};

export default Operators;
