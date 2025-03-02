"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Filter from "@/components/Filter";
import { QueryOperators, FilterCondition } from "@/lib/types";

type OperatorsGridClientProps = {
    initialData: QueryOperators;
};

const OperatorsGridClient = ({ initialData }: OperatorsGridClientProps) => {
    const [operators, setOperators] = useState<QueryOperators>(initialData);
    const [filter, setFilter] = useState<FilterCondition>({
        category: null,
        value: "",
    });

    const filterHandler = (condition: FilterCondition) => {
        setFilter(condition);
    };

    const classSet = new Set(operators.map((operator) => operator.class));
    const branchSet = new Set(operators.map((operator) => operator.branch));
    const factionSet = new Set(operators.map((operator) => operator.faction));

    const filterArgs = [
        {
            category: "rarity",
            values: Array.from({ length: 6 }, (_, i) => 6 - i),
        },
        { category: "class", values: Array.from(classSet) },
        { category: "branch", values: Array.from(branchSet) },
        { category: "faction", values: Array.from(factionSet) },
    ];

    const filteredOperators = operators.filter((operator) => {
        if (!filter.value) {
            return operators;
        } else if (filter.category === "class") {
            return operator.class === filter.value;
        } else if (filter.category === "faction") {
            return operator.faction === filter.value;
        } else if (filter.category === "branch") {
            return operator.branch === filter.value;
        } else {
            return operator.rarity === filter.value;
        }
    });

    return (
        <>
            <div className="flex">
                <Filter filterArgs={filterArgs} onClick={filterHandler} />
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

export default OperatorsGridClient;
