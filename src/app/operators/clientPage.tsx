"use client";

import useOperatorStore from "@/stores/operatorStore";
import usePagination from "@/hooks/usePagination";
import { css } from "$/styled-system/css";
import OpCard from "@/components/operators/OpCard";
import Spinner from "@/components/ui/Spinner";

type ClientPaginationProps = {
    initialCount: number;
};

const OpsClientPage = ({ initialCount }: ClientPaginationProps) => {
    const { filteredOpsId, ops } = useOperatorStore();
    // const filteredOps = filteredOpsId.map(id => ops[id]);

    const { itemsToShow, hasMore, loaderRef } = usePagination(
        filteredOpsId.sort(
            (prv, nxt) => ops[nxt].releaseOrder - ops[prv].releaseOrder
        ),
        20
    );

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
                    className={css({
                        padding: "2rem",
                        textAlign: "center",
                        width: "100%",
                    })}
                >
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default OpsClientPage;
