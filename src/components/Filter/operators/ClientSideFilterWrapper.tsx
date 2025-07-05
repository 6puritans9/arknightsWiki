"use client";

import { useEffect } from "react";
import { OpsObjectType } from "@/api/apiMongo";
import useOperatorStore from "@/stores/operatorStore";
import OpsFilter from "./OpsFilter";

type ClientSideFilterWrapperProps = {
    classTree: { [key: string]: string[] };
    factionTree: { [key: string]: string[] };
    ops: OpsObjectType;
};

const ClientSideFilterWrapper = ({
    classTree,
    factionTree,
    ops,
}: ClientSideFilterWrapperProps) => {
    const { setAllOpsId, setRefs } = useOperatorStore();
    const opsIdList = Object.keys(ops);

    useEffect(() => {
        setAllOpsId(opsIdList);
        setRefs(ops);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ops]);

    return <OpsFilter classTree={classTree} factionTree={factionTree} />;
};

export default ClientSideFilterWrapper;
