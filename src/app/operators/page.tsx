"use client";

import Icon from "@/components/Icon";
import Filter from "@/components/Filter";
import { getOperators } from "@/lib/apiOperators";
import { Operator, FilterCondition } from "@/lib/types";
import { useState, useEffect } from "react";
import Link from "next/link";

const Operators = () => {
    const [operators, setOperators] = useState<Operator[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<FilterCondition>({
        category: null,
        value: "",
    });

    const filterHandler = (condition: FilterCondition) => {
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
        if (!filter.category) {
            return operators;
        } else if (filter.category === "class") {
            return operator.class === filter.value;
        } else if (filter.category === "faction") {
            return operator.faction === filter.value;
        } else {
            return operator.rarity === filter.value;
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
                        href={`/operators/${operator.name}`}
                    >
                        <Icon operator={operator} />
                    </Link>
                ))}
            </section>
        </>
    );
};

export default Operators;
