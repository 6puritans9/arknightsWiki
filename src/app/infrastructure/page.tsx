"use client";

import { useEffect, useState } from "react";
import { getOperatorsWithBase } from "@/lib/apiBase";
import {
    OperatorWithBase,
    UnifiedFilterCondition,
    RelationsValue,
} from "@/lib/types";
import Filter from "@/components/Filter";
import Icon from "@/components/Icon";

const Infrastructure = () => {
    const [data, setData] = useState<OperatorWithBase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<UnifiedFilterCondition>({
        category: null,
        value: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOperatorsWithBase();
                // @ts-expect-error: type inference issue
                setData(data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    // console.log(data);

    const filterHandler = (condition: UnifiedFilterCondition) => {
        console.log("filterHandler");
        console.log(condition);

        setFilter(condition);
    };

    const facilitySet = new Set(
        data.flatMap((operator) =>
            operator.operator_base.map((row) => row.base.facility)
        )
    );

    const effectSet = new Set(
        data.flatMap((operator) =>
            operator.operator_base.flatMap((row) => row.base.effects)
        )
    );

    const filterArgs = [
        { category: "facility", values: Array.from(facilitySet) },
        { category: "effects", values: Array.from(effectSet) },
    ];

    const isRelationsValue = (value: any): value is RelationsValue => {
        return (
            value &&
            typeof value === "object" &&
            "effect" in value &&
            "ops" in value &&
            "faction" in value &&
            "race" in value &&
            "facility" in value
        );
    };

    const filteredData = data.filter((operator) => {
        const skill = operator.operator_base.map((row) => row.base);
        const effects = skill.flatMap((row) => row.effects);
        const facility = skill.map((row) => row.facility);

        if (!filter.value) {
            return true;
        } else if (
            filter.category === "facility" &&
            typeof filter.value === "string"
        ) {
            return facility.includes(filter.value);
        } else if (
            filter.category === "effects" &&
            typeof filter.value === "string"
        ) {
            return effects.includes(filter.value);
        } else if (filter.category === "relations") {
            // console.log("Filtering with relations value:", filter.value);

            return (
                (filter.value.r_effects &&
                    filter.value.r_effects.some((r_effect) =>
                        effects.includes(r_effect)
                    )) ||
                (filter.value.r_ops &&
                    filter.value.r_ops.some((r_op) => operator.name == r_op)) ||
                (filter.value.r_faction &&
                    filter.value.r_faction == operator.faction) ||
                (filter.value.r_race && filter.value.r_race == operator.race)
            );
        }
        return false;
    });

    return (
        <>
            <div className="flex">
                <Filter filterArgs={filterArgs} onClick={filterHandler} />
            </div>
            <section className="grid grid__icon">
                {filteredData.map((operator) => (
                    <div key={operator.id}>
                        <Icon operator={operator} />
                        {operator.operator_base.map((row, index) => (
                            <article
                                key={row.base_id}
                                onClick={() =>
                                    filterHandler({
                                        category: "relations",
                                        value: {
                                            r_effects: row.base.related_effects,
                                            r_ops: row.base.related_ops,
                                            r_faction: row.base.related_faction,
                                            r_race: row.base.related_race,
                                            r_facility:
                                                row.base.related_facility,
                                        },
                                    })
                                }
                            >
                                <p>{`${index + 1} ${row.base.name}`}</p>
                                <p>{row.base.description}</p>
                            </article>
                        ))}
                    </div>
                ))}
            </section>
        </>
    );
};

export default Infrastructure;
