"use client";

import Icon from "@/components/Icon";
import Filter from "@/components/Filter";
import { getOperators } from "@/lib/apiOperators";
import { Operator } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";

const Operators = () => {
    const [operators, setOperators] = useState<Operator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<string>("");

    const filterHandler = (condition: string) => {
        setFilter(condition);
    };

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

    const filteredOperators = operators.filter((operator) => {
        if (filter === "") {
            return operators;
        } else if (filter === "6") {
            return operator.rarity === Number(filter);
        } else if (filter === "5") {
            return operator.rarity === Number(filter);
        } else {
            return operator.class_en === filter;
        }
    });

    return (
        <>
            <div className="flex">
                <Filter onClick={filterHandler} />
            </div>
            <section className="grid grid__icon">
                {filteredOperators.map((operator) => (
                    <Link
                        key={operator.id}
                        href={`/operators/${operator.name_en}`}
                    >
                        <Icon operator={operator} />
                    </Link>
                ))}
            </section>
        </>
    );
};

export default Operators;
