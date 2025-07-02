"use client";

import { useEffect } from "react";
import { BuffsObjectType, CharsObjectType } from "@/lib/apiMongo";
import useInfraStore from "@/stores/infraStore";
import InfraFilter from "./InfraFilter";

type ClientSideFilterWrapperProps = {
    buffs: BuffsObjectType;
    roomEffectTree: { [key: string]: string[] };
    ops: CharsObjectType;
};

const ClientSideFilterWrapper = ({
    buffs,
    roomEffectTree,
    ops,
}: ClientSideFilterWrapperProps) => {
    const { setAllOpsId, setRefs } = useInfraStore();
    const opsIdList = Object.keys(ops);

    useEffect(() => {
        setAllOpsId(opsIdList);
        setRefs(ops, buffs);
    }, [ops, buffs]);

    return <InfraFilter buffs={buffs} roomEffectTree={roomEffectTree} />;
};

export default ClientSideFilterWrapper;
