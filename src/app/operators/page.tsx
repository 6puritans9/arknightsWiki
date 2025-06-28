import { flex, grid } from "../../../styled-system/patterns";
import { fetchAllOperators, ThumbnailOperatorType } from "@/lib/apiMongo";
import OpsThumbnail from "@/components/OpsThumbnail";
import ClientSideFilterWrapper from "../../components/Filter/ClientSideFilterWrapper";
import ClientPage from "./clientPage";

//#region Styles
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
//#endregion

export default async function OperatorsGrid() {
    const data = await fetchAllOperators();

    const classSet = new Set(data.map((operator) => operator.profession));
    // const branchSet = new Set(
    //     data.map(
    //         (operator) =>
    //             operator.subProfessionId
    //     )
    // );
    const nationSet = new Set(data.map((operator) => operator.nationId));
    // const groupSet = new Set(
    //     data
    //         .map((operator) =>
    //             operator.groupId
    //                 ? groupIdMap[operator.groupId] || operator.groupId
    //                 : null
    //         )
    //         .filter((v) => v !== null)
    // );
    // const teamSet = new Set(
    //     data
    //         .map((operator) =>
    //             operator.teamId
    //                 ? teamIdMap[operator.teamId] || operator.teamId
    //                 : null
    //         )
    //         .filter((v) => v !== null)
    // );

    // Class-to-branch mapping
    const classTree: { [key: string]: string[] } = ((classSet: Set<string>) => {
        const _classTree: { [key: string]: string[] } = {};

        classSet.forEach((className) => {
            _classTree[className] = Array.from(
                new Set(
                    data
                        .filter(
                            (operator) =>
                                operator.profession === className &&
                                operator.subProfessionId
                        ) // Double null-check
                        .map((operator) => operator.subProfessionId)
                )
            );
        });
        return _classTree;
    })(classSet);

    // Nation-to-(group | team) mapping
    const factionTree: { [key: string]: string[] } = ((
        data: ThumbnailOperatorType[]
    ) => {
        const _factionTree: { [key: string]: Set<string> } = {};

        data.forEach((operator) => {
            const nation = operator.nationId;
            if (!_factionTree[nation]) {
                _factionTree[nation] = new Set();
            }

            if (operator.groupId) {
                const group = operator.groupId;
                _factionTree[nation].add(group);
            }
            if (operator.teamId) {
                const team = operator.teamId;
                _factionTree[nation].add(team);
            }
        });

        return Object.fromEntries(
            Object.entries(_factionTree).map(([nation, set]) => [
                nation,
                Array.from(set),
            ]) // ["Lungmen", Set { ... }] >> ["Lungmen", ["LGD", "Penguin Logistics"]] >> { "Lungmen": ["LGD", "Penguin Logistics"] }
        );
    })(data);

    const filterArgs = {
        rarities: Array.from({ length: 6 }, (_, i) => 6 - i),
        classes: Array.from(classSet),
        // branches: Array.from(branchSet),
        nations: Array.from(nationSet),
    };

    // Select first 20 operators for server rendering
    const initialVisibleOperators = data.slice(0, 20);

    return (
        <div className={contentWrapper}>
            {/* Hydration */}
            <section className={filterContainer}>
                <ClientSideFilterWrapper
                    filterArgs={filterArgs}
                    classTree={classTree}
                    factionTree={factionTree}
                    initialData={data}
                />
            </section>

            {/* Server-rendered operators */}
            <section id="initial-operators" className={gridContainer}>
                {initialVisibleOperators.map((operator, index) => (
                    <OpsThumbnail
                        key={operator._id}
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
