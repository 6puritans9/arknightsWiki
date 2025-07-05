import { fetchAllOperators } from "@/api/apiMongo";
import mapOpsTree from "@/utils/mapOpsTree";
import ClientSideFilterWrapper from "@/components/filter/operators/ClientSideFilterWrapper";
import { flex, grid } from "../../../styled-system/patterns";
import OpCard from "@/components/operators/OpCard";
import OpsClientPage from "./clientPage";

//#region Styles
const pageWrapper = flex({
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "0",
});

const cardsContainer = grid({
    gridTemplateColumns: {
        base: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
        xl: "repeat(5, 1fr)",
    },
    width: "100%",
    gap: "0.5rem",
    justifyItems: "center",
});
//#endregion

const OperatorsPage = async () => {
    const ops = await fetchAllOperators();
    const opsArray = Object.entries(ops).sort(
        (prv, nxt) => nxt[1].releaseOrder - prv[1].releaseOrder
    );

    const { classTree, factionTree } = mapOpsTree(ops);
    const initialVisibleOps = opsArray.slice(0, 20);

    return (
        <div className={pageWrapper}>
            <ClientSideFilterWrapper
                classTree={classTree}
                factionTree={factionTree}
                ops={ops}
            />

            <section className={cardsContainer}>
                {initialVisibleOps.map(([id, op], index) => (
                    <OpCard
                        key={id}
                        id={id}
                        operator={op}
                        priority={index < 10}
                    />
                ))}

                <OpsClientPage initialCount={initialVisibleOps.length} />
            </section>
        </div>
    );
};

export default OperatorsPage;
