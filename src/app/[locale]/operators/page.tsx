import { fetchAllOperators } from "@/api/apiMongo";
import mapOpsTree from "@/utils/mapOpsTree";
import { flex, grid } from "$/styled-system/patterns";
import ClientSideFilterWrapper from "@/components/filter/operators/ClientSideFilterWrapper";
import OpCard from "@/components/operators/OpCard";
import OpsClientPage from "./clientPage";

type OperatorsPageProps = {
    params: Promise<{ locale: string }>;
};

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
    marginTop: "2rem",
    width: "100%",
    gap: "0.5rem",
    justifyItems: "center",
});
//#endregion

const OperatorsPage = async ({ params }: OperatorsPageProps) => {
    const { locale } = await params;

    const ops = await fetchAllOperators(locale);
    const opsArray = Object.entries(ops).sort(
        (prv, nxt) => nxt[1].releaseOrder - prv[1].releaseOrder
    );

    const { classTree, factionTree } = mapOpsTree(ops);
    const initialRenderOps = opsArray.slice(0, 20);
    const initialOpsIds = initialRenderOps.map(([id]) => id);

    return (
        <div className={pageWrapper}>
            <ClientSideFilterWrapper
                classTree={classTree}
                factionTree={factionTree}
                ops={ops}
            />

            <section className={cardsContainer}>
                {initialRenderOps.map(([id, op], index) => (
                    <OpCard
                        key={id}
                        id={id}
                        operator={op}
                        locale={locale}
                        priority={index < 10}
                        dataSsrOp
                    />
                ))}

                <OpsClientPage initialOpsIds={initialOpsIds} locale={locale} />
            </section>
        </div>
    );
};

export default OperatorsPage;
