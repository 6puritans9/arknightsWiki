"use client";

import { useState, useReducer } from "react";
import {
    BaseFilterCondition,
    BaseFilterState,
    BaseFilterAction,
    BaseRelationsValue,
} from "@/lib/types";
import { QueryBaseSkills } from "@/lib/types";
import { InfraFilter } from "@/components/Filter/InfraFilter";
import InfraThumbnail from "@/components/InfraThumbnail";

type InfrastructureClientProps = {
    initialData: QueryBaseSkills;
};

const initialFilterState = {
    selfName: null,
    facility: null,
    effects: null,
    relations: null,
};

const baseReducer = (
    state: BaseFilterState,
    action: BaseFilterAction
): BaseFilterState => {
    switch (action.type) {
        case "SET_FACILITY":
            return {
                ...state,
                facility: action.payload,
                selfName: action.selfName,
            };
        case "SET_EFFECTS":
            return {
                ...initialFilterState,
                effects: action.payload,
                selfName: action.selfName,
            };
        case "SET_RELATIONS":
            return {
                ...initialFilterState,
                relations: action.payload,
                selfName: action.selfName,
            };
        case "RESET":
            return initialFilterState;
    }
};

const InfrastructureClient = ({ initialData }: InfrastructureClientProps) => {
    const [data, setData] = useState<QueryBaseSkills>(initialData);
    const [filter, dispatch] = useReducer(baseReducer, initialFilterState);

    if (initialData instanceof Error) {
        const error = initialData.message;
        return <div>{error}</div>;
    }

    const filterHandler = (condition: BaseFilterCondition) => {
        switch (condition.category) {
            case "facility":
                dispatch({
                    type: "SET_FACILITY",
                    selfName: condition.selfName ?? null,
                    payload: condition.value as string,
                });
                break;
            case "effects":
                dispatch({
                    type: "SET_EFFECTS",
                    selfName: condition.selfName ?? null,
                    payload: condition.value as string,
                });
                break;
            case "relations":
                dispatch({
                    selfName: condition.selfName ?? null,
                    type: "SET_RELATIONS",
                    payload: condition.value as BaseRelationsValue,
                });
                break;
            default:
                dispatch({ type: "RESET" });
        }
    };

    const facilitySet = new Set(
        data.flatMap((operator) =>
            operator.operator_base.flatMap((row) => {
                const baseArray = Array.isArray(row.base)
                    ? row.base
                    : [row.base];

                return baseArray.map((baseItem) => baseItem.facility);
            })
        )
    );

    const effectSet = new Set(
        data.flatMap((operator) =>
            operator.operator_base.flatMap((row) => {
                const baseArray = Array.isArray(row.base)
                    ? row.base
                    : [row.base];

                return baseArray.flatMap((baseItem) => baseItem.effects);
            })
        )
    );

    const filterArgs = [
        { category: "facility", values: Array.from(facilitySet) },
        { category: "effects", values: Array.from(effectSet) },
    ];

    const filteredData = data.filter((operator) => {
        const skill = operator.operator_base.flatMap((row) => {
            const baseArray = Array.isArray(row.base) ? row.base : [row.base];
            return baseArray;
        });
        const effects = skill.flatMap((row) => row.effects);
        const facility = skill.map((row) => row.facility);

        if (filter.selfName === operator.name) {
            return true;
        }
        if (!filter.facility && !filter.effects && !filter.relations) {
            return true;
        } else if (filter.facility && facility.includes(filter.facility)) {
            return true;
        } else if (filter.effects && effects.includes(filter.effects)) {
            return true;
        } else if (filter.relations) {
            return (
                (filter.relations.r_effects &&
                    filter.relations.r_effects.some((r_effect: string) =>
                        effects.includes(r_effect)
                    )) ||
                (filter.relations.r_ops &&
                    filter.relations.r_ops.some(
                        (r_op: string) => operator.name === r_op
                    )) ||
                (filter.relations.r_faction &&
                    operator.faction === filter.relations.r_faction) ||
                (filter.relations.r_faction &&
                    operator.sub_factions &&
                    operator.sub_factions.includes(filter.relations.r_faction))
            );
        }
        return false;
    });

    return (
        <>
            <div className="flex">
                <InfraFilter filterArgs={filterArgs} onClick={filterHandler} />
            </div>
            <section className="infra__container">
                {filteredData.map((operator) => (
                    <div className="infra__icon__container" key={operator.id}>
                        <InfraThumbnail operator={operator} />
                        {operator.operator_base.map((row, index) => {
                            const baseArray = Array.isArray(row.base)
                                ? row.base
                                : [row.base];

                            return (
                                <article
                                    key={row.base_id}
                                    className="infra__icon__content"
                                    onClick={() =>
                                        filterHandler({
                                            category: "relations",
                                            selfName: operator.name,
                                            value: {
                                                r_effects: baseArray.flatMap(
                                                    (base) =>
                                                        base.related_effects ||
                                                        []
                                                ),
                                                r_ops: baseArray.flatMap(
                                                    (base) =>
                                                        base.related_ops || []
                                                ),
                                                r_faction:
                                                    baseArray[0]
                                                        ?.related_faction ||
                                                    null,
                                                r_race:
                                                    baseArray[0]
                                                        ?.related_race || null,
                                                r_facilities: baseArray.flatMap(
                                                    (base) =>
                                                        base.related_facilities ||
                                                        []
                                                ),
                                            },
                                        })
                                    }
                                >
                                    <h4 className="infra__icon__content-name">{`${
                                        index + 1
                                    } ${baseArray
                                        .map((base) => base.name)
                                        .join(", ")}`}</h4>
                                    <p className="infra__icon__content-desc">
                                        {baseArray
                                            .map((base) => base.description)
                                            .join(", ")}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                ))}
            </section>
        </>
    );
};

export default InfrastructureClient;
