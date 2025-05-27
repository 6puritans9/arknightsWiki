"use client";

import { useOperatorStore } from "@/stores/operatorStore";
import { useRef, useEffect, useMemo } from "react";
import OpsThumbnail from "@/components/OpsThumbnail";
import { grid } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";

const gridContainer = grid({
    gridTemplateColumns: {
        base: "repeat(3, 1fr)",
        md: "repeat(5, 1fr)",
    },
    gap: "1rem",
    justifyItems: "center",
    width: "100%",
});

type ClientPaginationProps = {
    initialCount: number;
};

export default function ClientPage({ initialCount }: ClientPaginationProps) {
    const {
        filteredOperators,
        visibleCount,
        hasMore,
        incrementVisibleCount,
        setVisibleCount,
        filters,
    } = useOperatorStore();

    const loaderRef = useRef<HTMLDivElement>(null);

    // Set initial visible count based on server-rendered items
    useEffect(() => {
        setVisibleCount(initialCount);
    }, [initialCount, setVisibleCount]);

    // Handle infinite scroll
    useEffect(() => {
        if (!loaderRef.current || !hasMore) return;

        const currentRef = loaderRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    incrementVisibleCount();
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );

        observer.observe(currentRef);
        return () => observer.unobserve(currentRef);
    }, [hasMore, incrementVisibleCount]);

    // Check if any filters are active
    const hasActiveFilters = useMemo(() => {
        return Object.values(filters).some((arr) => arr.length > 0);
    }, [filters]);

    // Handle visibility of server-rendered operators
    useEffect(() => {
        const initialOperators = document.getElementById("initial-operators");

        if (initialOperators) {
            initialOperators.style.display = hasActiveFilters ? "none" : "grid";
        }
    }, [hasActiveFilters, filteredOperators.length]);

    const shouldShowOperators = useMemo(
        () =>
            hasActiveFilters ||
            (!hasActiveFilters && visibleCount > initialCount),
        [hasActiveFilters, visibleCount, initialCount]
    );

    // Memoize operators to display
    const operatorsToShow = useMemo(() => {
        if (hasActiveFilters) {
            return filteredOperators
                .slice(0, visibleCount)
                .map((operator) => (
                    <OpsThumbnail
                        key={operator.id}
                        operator={operator}
                        priority={false}
                    />
                ));
        } else {
            return filteredOperators
                .slice(initialCount, visibleCount)
                .map((operator) => (
                    <OpsThumbnail
                        key={operator.id}
                        operator={operator}
                        priority={false}
                    />
                ));
        }
    }, [filteredOperators, visibleCount, initialCount, hasActiveFilters]);

    // If filters are active but no results, show a "No results" message
    if (hasActiveFilters && filteredOperators.length === 0) {
        return (
            <div
                className={css({
                    padding: "2rem",
                    textAlign: "center",
                    width: "100%",
                    fontSize: "lg",
                    color: "gray.600",
                })}
            >
                No operators match your selected filters.
                <p
                    className={css({
                        fontSize: "sm",
                        marginTop: "1rem",
                    })}
                >
                    Try adjusting your filter criteria.
                </p>
            </div>
        );
    }

    return (
        <>
            {/* Only render client-side operators when:
                1. Filtering is active OR
                2. We've loaded more operators beyond initialCount */}
            {shouldShowOperators && (
                <section className={gridContainer}>{operatorsToShow}</section>
            )}

            {hasMore && (
                <div
                    ref={loaderRef}
                    className={css({
                        padding: "2rem",
                        textAlign: "center",
                        width: "100%",
                    })}
                >
                    <LoadingSpinner />
                </div>
            )}
        </>
    );
}

function LoadingSpinner() {
    return (
        <div
            className={css({
                display: "inline-block",
                width: "2rem",
                height: "2rem",
                border: "4px solid rgba(0,0,0,0.1)",
                borderRadius: "50%",
                borderLeftColor: "#09f",
                animation: "spin 1s linear infinite",
            })}
        >
            <style jsx>{`
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

// TODO: remove comments
// "use client";

// import { useOperatorStore } from "@/store/operatorStore";
// import { useRef, useEffect } from "react";
// import OpsThumbnail from "@/components/OpsThumbnail";
// import { grid } from "../../../styled-system/patterns";
// import { css } from "../../../styled-system/css";

// const gridContainer = grid({
//     gridTemplateColumns: {
//         base: "repeat(3, 1fr)",
//         md: "repeat(5, 1fr)",
//     },
//     gap: "1rem",
//     justifyItems: "center",
//     width: "100%",
// });

// type ClientPaginationProps = {
//     initialCount: number;
// };

// export default function ClientPage({ initialCount }: ClientPaginationProps) {
//     const {
//         filteredOperators,
//         visibleCount,
//         hasMore,
//         incrementVisibleCount,
//         setVisibleCount,
//     } = useOperatorStore();

//     const loaderRef = useRef<HTMLDivElement>(null);

//     // Set initial visible count based on server-rendered items
//     useEffect(() => {
//         setVisibleCount(initialCount);
//     }, [initialCount, setVisibleCount]);

//     // Handle infinite scroll
//     useEffect(() => {
//         if (!loaderRef.current || !hasMore) return;

//         const currentRef = loaderRef.current;
//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting && hasMore) {
//                     incrementVisibleCount();
//                 }
//             },
//             { threshold: 0.1, rootMargin: "200px" }
//         );

//         observer.observe(currentRef);
//         return () => observer.unobserve(currentRef);
//     }, [hasMore, incrementVisibleCount]);

//     // Handle visibility of server-rendered operators
//     useEffect(() => {
//         const initialOperators = document.getElementById("initial-operators");
//         const isFiltering =
//             filteredOperators.length !== 0 &&
//             filteredOperators.length !== initialCount;

//         if (initialOperators) {
//             initialOperators.style.display = isFiltering ? "none" : "grid";
//         }
//     }, [filteredOperators.length, initialCount]);

//     // Only show operators if filtering is active
//     if (
//         filteredOperators.length === 0 ||
//         filteredOperators.length === initialCount
//     ) {
//         return hasMore ? (
//             <div ref={loaderRef} className={css({ padding: "1rem" })}>
//                 <LoadingSpinner />
//             </div>
//         ) : null;
//     }

//     return (
//         <>
//             <section className={gridContainer}>
//                 {filteredOperators.slice(0, visibleCount).map((operator) => (
//                     <OpsThumbnail
//                         key={operator.id}
//                         operator={operator}
//                         priority={false}
//                     />
//                 ))}
//             </section>

//             {hasMore && (
//                 <div
//                     ref={loaderRef}
//                     className={css({
//                         padding: "2rem",
//                         textAlign: "center",
//                         width: "100%",
//                     })}
//                 >
//                     <LoadingSpinner />
//                 </div>
//             )}
//         </>
//     );
// }

// function LoadingSpinner() {
//     return (
//         <div
//             className={css({
//                 display: "inline-block",
//                 width: "2rem",
//                 height: "2rem",
//                 border: "4px solid rgba(0,0,0,0.1)",
//                 borderRadius: "50%",
//                 borderLeftColor: "#09f",
//                 animation: "spin 1s linear infinite",
//             })}
//         >
//             <style jsx>{`
//                 @keyframes spin {
//                     to {
//                         transform: rotate(360deg);
//                     }
//                 }
//             `}</style>
//         </div>
//     );
// }

// // "use client";

// // import { useOperatorStore } from "@/store/operatorStore";
// // import { useEffect, useMemo, useRef } from "react";
// // import { QueryOperators } from "@/lib/types";
// // import OpsThumbnail from "@/components/OpsThumbnail";
// // import { OpsFilter } from "@/components/Filter/OpsFilter";
// // import { css } from "../../../styled-system/css";
// // import { flex, grid } from "../../../styled-system/patterns";

// // // Styles
// // const contentWrapper = flex({
// //     flexDirection: "column",
// //     alignItems: "center",
// // });

// // const filterContainer = grid({
// //     gridTemplateColumns: "1fr 9fr",
// //     gridTemplateAreas: `
// //     "rarity-label rarity-content"
// //     "class-label class-content"
// //     "faction-label faction-content"
// //   `,
// //     gap: "1rem",
// //     justifyItems: "flex-start",
// //     marginBottom: "1rem",
// // });

// // const gridContainer = grid({
// //     gridTemplateColumns: {
// //         base: "repeat(3, 1fr)",
// //         md: "repeat(5, 1fr)",
// //     },
// //     gap: "1rem",
// //     justifyItems: "center",
// // });

// // // Types
// // type OperatorsGridClientProps = {
// //     initialData: QueryOperators;
// //     filterArgs: {
// //         rarity: number[];
// //         class: string[];
// //         branch: string[];
// //         faction: string[];
// //     };
// //     classTree: {
// //         [key: string]: string[];
// //     };
// //     initialCount: number;
// // };

// // // Filter
// // const OperatorsGridClient = ({
// //     initialData,
// //     filterArgs,
// //     classTree,
// //     initialCount = 20,
// // }: OperatorsGridClientProps) => {
// //     const {
// //         filteredOperators,
// //         visibleCount,
// //         hasMore,
// //         setAllOperators,
// //         incrementVisibleCount,
// //         setVisibleCount,
// //     } = useOperatorStore();

// //     const loaderRef = useRef<HTMLDivElement>(null);

// //     // Set initial data
// //     useEffect(() => {
// //         setAllOperators(initialData);
// //         setVisibleCount(initialCount);

// //         const parentElement =
// //             document.getElementById("initial-operators")?.parentElement;
// //         if (parentElement) {
// //             const filterElement = document.getElementById("filter-section");
// //             parentElement.insertBefore(filterElement, parentElement.firstChild);
// //         }
// //     }, [initialData, initialCount, setAllOperators, setVisibleCount]);

// //     // Infinite scroll
// //     useEffect(() => {
// //         if (!loaderRef.current || !hasMore) return;

// //         const currentLoaderRef = loaderRef.current;
// //         const observer = new IntersectionObserver(
// //             (entries) => {
// //                 if (entries[0].isIntersecting && hasMore) {
// //                     incrementVisibleCount();
// //                 }
// //             },
// //             { threshold: 0.1, rootMargin: "200px" }
// //         );

// //         observer.observe(currentLoaderRef);

// //         return () => {
// //             observer.unobserve(currentLoaderRef);
// //         };
// //     }, [hasMore, incrementVisibleCount]);

// //     // Filter arguments
// //     // const { filterArgs, classTree } = useMemo(() => {
// //     //     const operators = initialData;
// //     //     const classSet = new Set(operators.map((operator) => operator.class));
// //     //     const branchSet = new Set(operators.map((operator) => operator.branch));
// //     //     const factionSet = new Set(
// //     //         operators.map((operator) => operator.faction)
// //     //     );

// //     //     const filterArgs = {
// //     //         rarity: Array.from({ length: 6 }, (_, i) => 6 - i),
// //     //         class: Array.from(classSet),
// //     //         branch: Array.from(branchSet),
// //     //         faction: Array.from(factionSet),
// //     //     };

// //     //     const classTree: { [key: string]: string[] } = {};
// //     //     classSet.forEach((className) => {
// //     //         classTree[className] = Array.from(
// //     //             new Set(
// //     //                 operators
// //     //                     .filter((operator) => operator.class === className)
// //     //                     .map((operator) => operator.branch)
// //     //             )
// //     //         );
// //     //     });

// //     //     return { filterArgs, classTree };
// //     // }, [initialData]);

// //     // Handle error
// //     if (initialData instanceof Error) {
// //         const error = initialData.message;
// //         return <div>{error}</div>;
// //     }
// //     const showFilteredResults =
// //         filteredOperators.length > 0 &&
// //         filteredOperators.length !== initialData.length;

// //     return (
// //         <div className={contentWrapper}>
// //             <section id="filter-section" className={filterContainer}>
// //                 <OpsFilter filterArgs={filterArgs} classTree={classTree} />
// //             </section>

// //             {/* CSR after SSR */}
// //             {showFilteredResults && (
// //                 <section className={gridContainer}>
// //                     {filteredOperators
// //                         .slice(0, visibleCount)
// //                         .map((operator) => (
// //                             <OpsThumbnail
// //                                 key={operator.id}
// //                                 operator={operator}
// //                                 priority={false}
// //                             />
// //                         ))}
// //                 </section>
// //             )}

// //             {hasMore && (
// //                 <div
// //                     ref={loaderRef}
// //                     className={css({
// //                         padding: "2rem",
// //                         textAlign: "center",
// //                         width: "100%",
// //                     })}
// //                 >
// //                     <div
// //                         className={css({
// //                             display: "inline-block",
// //                             width: "2rem",
// //                             height: "2rem",
// //                             border: "4px solid rgba(0,0,0,0.1)",
// //                             borderRadius: "50%",
// //                             borderLeftColor: "#09f",
// //                             animation: "spin 1s linear infinite",
// //                         })}
// //                     >
// //                         <style jsx>{`
// //                             @keyframes spin {
// //                                 to {
// //                                     transform: rotate(360deg);
// //                                 }
// //                             }
// //                         `}</style>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default OperatorsGridClient;
