import { getOperators } from "@/lib/apiOperators";
import OpsThumbnail from "@/components/OpsThumbnail";
import ClientSideFilterWrapper from "../../components/Filter/ClientSideFilterWrapper";
import ClientPage from "./clientPage";
import { flex, grid } from "../../../styled-system/patterns";

const contentWrapper = flex({
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
});

const filterContainer = grid({
    gridTemplateColumns: "1fr 9fr",
    gridTemplateAreas: `
    "rarity-label rarity-content"
    "class-label class-content"
    "faction-label faction-content"
  `,
    gap: "1rem",
    justifyItems: "flex-start",
    marginBottom: "1rem",
    width: "100%",
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

export default async function OperatorsGrid() {
    const data = await getOperators();

    const classSet = new Set(data.map((operator) => operator.class));
    const branchSet = new Set(data.map((operator) => operator.branch));
    const factionSet = new Set(data.map((operator) => operator.faction));

    const filterArgs = {
        rarity: Array.from({ length: 6 }, (_, i) => 6 - i),
        class: Array.from(classSet),
        branch: Array.from(branchSet),
        faction: Array.from(factionSet),
    };

    // Class-to-branch mapping
    const classTree: { [key: string]: string[] } = {};
    classSet.forEach((className) => {
        classTree[className] = Array.from(
            new Set(
                data
                    .filter((operator) => operator.class === className)
                    .map((operator) => operator.branch)
            )
        );
    });

    // Select first 20 operators for server rendering
    const initialVisibleOperators = data.slice(0, 20);

    return (
        <div className={contentWrapper}>
            {/* Hydration */}
            <section className={filterContainer}>
                <ClientSideFilterWrapper
                    filterArgs={filterArgs}
                    classTree={classTree}
                    initialData={data}
                />
            </section>

            {/* Server-rendered operators */}
            <section id="initial-operators" className={gridContainer}>
                {initialVisibleOperators.map((operator, index) => (
                    <OpsThumbnail
                        key={operator.id}
                        operator={operator}
                        priority={index < 5}
                    />
                ))}
            </section>

            {/* Client-side pagination with infinite scrolling */}
            <ClientPage initialCount={initialVisibleOperators.length} />
        </div>
    );
}
