"use client";

import Icon from "@/components/Icon";
import { getOperators, getOperator } from "@/lib/apiOperators";
import { Operator } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";

const Operators = () => {
    const [operators, setOperators] = useState<Operator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOperators = async () => {
            try {
                const data = await getOperators();
                setOperators(data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch operators");
            } finally {
                setLoading(false);
            }
        };

        fetchOperators();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

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
