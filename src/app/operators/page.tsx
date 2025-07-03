import { fetchAllOperators } from "@/lib/apiMongo";
import { flex, grid } from "../../../styled-system/patterns";
import ClientSideFilterWrapper from "../../components/Filter/ClientSideFilterWrapper";
import OpsThumbnail from "@/components/OpsThumbnail";
import ClientPage from "./clientPage";
import mapOpsTree from "@/utils/mapOpsTree";

//#region Styles
const contentWrapper = flex({
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
});

const gridContainer = grid({
    gridTemplateColumns: {
        base: "repeat(3, 1fr)",
        md: "repeat(5, 1fr)",
    },
    gap: "1rem",
    justifyItems: "center",
    width: "100%",
});
//#endregion

const OperatorsPage = async () => {
    const ops = await fetchAllOperators();
    const { classTree, factionTree } = mapOpsTree(ops);
    const initialVisibleOperators = Object.entries(ops).slice(0, 20);

    return (
        <div className={contentWrapper}>
            <ClientSideFilterWrapper
                classTree={classTree}
                factionTree={factionTree}
                initialOps={ops}
            />

            <section className={gridContainer}>
                {initialVisibleOperators.map(([id, op], index) => (
                    <OpsThumbnail key={id} operator={op} priority={index < 5} />
                ))}
                <ClientPage initialCount={initialVisibleOperators.length} />
            </section>
        </div>
    );
};

export default OperatorsPage;
