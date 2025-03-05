"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { OpsFilter } from "@/components/Filter";
import { QueryOperators, OpsFilterCondition } from "@/lib/types";

type OperatorsGridClientProps = {
    initialData: QueryOperators;
};

const OperatorsGridClient = ({ initialData }: OperatorsGridClientProps) => {
    const [filter, setFilter] = useState<OpsFilterCondition>({
        category: null,
        value: "",
    });

    const operators = initialData;
    const filterHandler = (condition: OpsFilterCondition) => {
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
            <OpsFilter filterArgs={filterArgs} onClick={filterHandler} />
            <section className="grid grid__icon">
                {filteredOperators.map((operator) => (
                    <Link
                        key={operator.id}
                        href={`/operators/${operator.name}`}
                        passHref
                    >
                        <Icon operator={operator} />
                    </Link>
                ))}
            </section>
        </>
    );
};

export default OperatorsGridClient;
