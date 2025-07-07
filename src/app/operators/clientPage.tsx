"use client";

import { useMemo, useEffect } from "react";
import useOperatorStore from "@/stores/operatorStore";
import usePagination from "@/hooks/usePagination";
import OpCard from "@/components/operators/OpCard";
import Spinner from "@/components/ui/Spinner";

type ClientPaginationProps = {
    initialOpsIds: string[];
};

const OpsClientPage = ({ initialOpsIds }: ClientPaginationProps) => {
    const { filteredOpsId, ops, filters } = useOperatorStore();

    const isFilterActive = useMemo(() => {
        return Object.entries(filters).some(([, value]) =>
            Array.isArray(value) ? value.length : !!value
        );
    }, [filters]);

    useEffect(() => {
        const ssrCards = document.querySelectorAll("[data-ssr-op]");
        ssrCards.forEach(
            (card) =>
                ((card as HTMLElement).style.display = isFilterActive
                    ? "none"
                    : "")
        );
        // if (ssrOps) {
        //     ssrOps.style.display = isFilterActive ? "none" : "";
        // }
    }, [isFilterActive]);

    // filtered: Show only filtered ops, sorted by rarity, release order
    const filteredOpsToShow = useMemo(() => {
        return (filteredOpsId as string[]).slice().sort((prv, nxt) => {
            if (ops[nxt].rarity !== ops[prv].rarity) {
                return ops[nxt].rarity - ops[prv].rarity;
            }

            return ops[nxt].releaseOrder - ops[prv].releaseOrder;
        });
    }, [filteredOpsId, ops]);

    // unFiltered: Show all the ops NOT in initial SSR list, sorted by release order
    const unfilteredOpsToShow = useMemo(() => {
        return (filteredOpsId as string[])
            .filter((id) => !initialOpsIds.includes(id))
            .sort((prv, nxt) => ops[nxt].releaseOrder - ops[prv].releaseOrder);
    }, [filteredOpsId, initialOpsIds, ops]);

    const opsToShow = isFilterActive ? filteredOpsToShow : unfilteredOpsToShow;

    const { itemsToShow, hasMore, loaderRef } = usePagination(opsToShow, 20);

    return (
        <>
            {itemsToShow.map((char) => (
                <OpCard
                    key={char}
                    id={char as string}
                    operator={ops[char]}
                    priority={false}
                />
            ))}

            {hasMore && (
                <div
                    ref={loaderRef}
                    // className={css({
                    //     padding: "2rem",
                    //     textAlign: "center",
                    //     width: "100%",
                    // })}
                >
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default OpsClientPage;
