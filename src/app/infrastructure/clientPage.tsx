"use client";

import { BuffsObjectType, CharsObjectType } from "@/lib/apiMongo";
import { css } from "../../../styled-system/css";
import usePagination from "@/hooks/usePagination";
import useInfraStore from "@/stores/infraStore";
import InfraCard from "@/components/infra/InfraCard";
import Spinner from "@/components/ui/Spinner";

type InfraClientPageProps = {
    initialData: {
        chars: CharsObjectType;
        buffs: BuffsObjectType;
    };
};
//#region Styles
const container = css({
    display: "grid",
    gridTemplateColumns: {
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
    },
    gap: "1.5rem",
    width: "100%",
    justifyItems: "center",
    padding: "1rem 0",
});

//#endregion

const InfraClientPage = ({ initialData: { buffs } }: InfraClientPageProps) => {
    const { filteredOpsId, ops } = useInfraStore();
    const filteredOps = filteredOpsId.map((id) => ops[id]);

    const { itemsToShow, hasMore, loaderRef } = usePagination(filteredOps, 20);

    return (
        <section className={container}>
            {itemsToShow.map((char) => (
                <InfraCard key={char.charId} char={char} buffs={buffs} />
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
        </section>
    );
};

export default InfraClientPage;
