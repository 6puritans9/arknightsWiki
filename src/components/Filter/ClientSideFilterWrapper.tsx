"use client";

import { OpsFilter } from "@/components/Filter/OpsFilter";
import { useOperatorStore } from "@/store/operatorStore";
import { useEffect } from "react";
import { QueryOperator } from "@/lib/types";

type ClientSideFilterWrapperProps = {
    filterArgs: {
        rarity: number[];
        class: string[];
        branch: string[];
        faction: string[];
    };
    classTree: { [key: string]: string[] };
    initialData: QueryOperator[];
};

export default function ClientSideFilterWrapper({
    filterArgs,
    classTree,
    initialData,
}: ClientSideFilterWrapperProps) {
    const { setAllOperators } = useOperatorStore();

    // Initialize store with data
    useEffect(() => {
        setAllOperators(initialData);
    }, [initialData, setAllOperators]);

    return <OpsFilter filterArgs={filterArgs} classTree={classTree} />;
}
