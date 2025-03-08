"use client";

import { useState } from "react";
import { UnifiedFilterCondition, RelationsValue } from "@/lib/types";
import { InfraFilter } from "@/components/Filter/InfraFilter";
import Icon from "@/components/Icon";
import { QueryBaseSkills } from "@/lib/types";

type InfrastructureClientProps = {
    initialData: QueryBaseSkills;
};

const InfrastructureClient = ({ initialData }: InfrastructureClientProps) => {
    const [data, setData] = useState<QueryBaseSkills>(initialData);
    console.log(data);
    // const [filter, setFilter] = useState<UnifiedFilterCondition>({
    //     category: null,
    //     value: null,
    // });

    // if (initialData instanceof Error) {
    //     const error = initialData.message;
    //     return <div>{error}</div>;
    // }

    // const filterHandler = (condition: UnifiedFilterCondition) => {
    //     setFilter(condition);
    // };

    // const facilitySet = new Set(
    //     data.flatMap((operator) =>
    //         operator.operator_base.map((row) => row.base.facility)
    //     )
    // );

    // const effectSet = new Set(
    //     data.flatMap((operator) =>
    //         operator.operator_base.flatMap((row) => row.base.effects)
    //     )
    // );

    // const filterArgs = [
    //     { category: "facility", values: Array.from(facilitySet) },
    //     { category: "effects", values: Array.from(effectSet) },
    // ];

    // const isRelationsValue = (value: any): value is RelationsValue => {
    //     return (
    //         value &&
    //         typeof value === "object" &&
    //         "effect" in value &&
    //         "ops" in value &&
    //         "faction" in value &&
    //         "race" in value &&
    //         "facility" in value
    //     );
    // };

    // const filteredData = data.filter((operator) => {
    //     const skill = operator.operator_base.map((row) => row.base);
    //     const effects = skill.flatMap((row) => row.effects);
    //     const facility = skill.map((row) => row.facility);

    //     if (!filter.value) {
    //         return true;
    //     } else if (
    //         filter.category === "facility" &&
    //         typeof filter.value === "string"
    //     ) {
    //         return facility.includes(filter.value);
    //     } else if (
    //         filter.category === "effects" &&
    //         typeof filter.value === "string"
    //     ) {
    //         return effects.includes(filter.value);
    //     } else if (filter.category === "relations") {
    //         return (
    //             (filter.value.r_effects &&
    //                 filter.value.r_effects.some((r_effect) =>
    //                     effects.includes(r_effect)
    //                 )) ||
    //             (filter.value.r_ops &&
    //                 filter.value.r_ops.some((r_op) => operator.name == r_op)) ||
    //             (filter.value.r_faction &&
    //                 filter.value.r_faction == operator.faction) ||
    //             // (filter.value.r_faction &&
    //             //     operator.sub_factions.includes(filter.value.r_faction)) ||
    //             (filter.value.r_race && filter.value.r_race == operator.race)
    //         );
    //     }
    //     return false;
    // });

    return (
        <p>infra</p>
        // <>
        //     <div className="flex">
        //         <InfraFilter filterArgs={filterArgs} onClick={filterHandler} />
        //     </div>
        //     <section className="grid grid__icon">
        //         {filteredData.map((operator) => (
        //             <div key={operator.id}>
        //                 <Icon operator={operator} />
        //                 {operator.operator_base.map((row, index) => (
        //                     <article
        //                         key={row.base_id}
        //                         onClick={() =>
        //                             filterHandler({
        //                                 category: "relations",
        //                                 value: {
        //                                     r_effects: row.base.related_effects,
        //                                     r_ops: row.base.related_ops,
        //                                     r_faction: row.base.related_faction,
        //                                     r_race: row.base.related_race,
        //                                     r_facilities:
        //                                         row.base.related_facilities,
        //                                 },
        //                             })
        //                         }
        //                     >
        //                         <p>{`${index + 1} ${row.base.name}`}</p>
        //                         <p>{row.base.description}</p>
        //                     </article>
        //                 ))}
        //             </div>
        //         ))}
        //     </section>
        // </>
    );
};

export default InfrastructureClient;
