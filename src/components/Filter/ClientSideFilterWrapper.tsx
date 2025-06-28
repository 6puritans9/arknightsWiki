"use client";

import { useEffect } from "react";
import { ThumbnailOperatorType } from "@/lib/apiMongo";
import { useOperatorStore } from "@/stores/operatorStore";
import { OpsFilter } from "@/components/Filter/OpsFilter";

type ClientSideFilterWrapperProps = {
    filterArgs: {
        rarities: number[];
        classes: string[];
        nations: string[];
    };
    classTree: { [key: string]: string[] };
    factionTree: { [key: string]: string[] };
    initialData: ThumbnailOperatorType[];
};

export default function ClientSideFilterWrapper({
    filterArgs,
    classTree,
    factionTree,
    initialData,
}: ClientSideFilterWrapperProps) {
    const { setAllOperators } = useOperatorStore();

    useEffect(() => {
        setAllOperators(initialData);
    }, [initialData, setAllOperators]);

    return (
        <OpsFilter
            filterArgs={filterArgs}
            classTree={classTree}
            factionTree={factionTree}
        />
    );
}
