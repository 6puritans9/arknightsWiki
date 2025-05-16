"use client";

import { useEffect, useMemo, useRef } from "react";
import { QueryOperators } from "@/lib/types";
import OpsThumbnail from "@/components/OpsThumbnail";
import { OpsFilter } from "@/components/Filter/OpsFilter";
import { useOperatorStore } from "@/store/operatorStore";
import { css } from "../../../styled-system/css";
import { flex, grid } from "../../../styled-system/patterns";

// Styles
const contentWrapper = flex({
    flexDirection: "column",
    alignItems: "center",
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
});

const gridContainer = grid({
    gridTemplateColumns: {
        base: "repeat(3, 1fr)",
        md: "repeat(5, 1fr)",
    },
    gap: "1rem",
    justifyItems: "center",
});

// Types
type OperatorsGridClientProps = {
    initialData: QueryOperators;
};

// Filter
const OperatorsGridClient = ({ initialData }: OperatorsGridClientProps) => {
    const {
        filteredOperators,
        visibleCount,
        hasMore,
        setAllOperators,
        incrementVisibleCount,
    } = useOperatorStore();

    const loaderRef = useRef<HTMLDivElement>(null);

    // Set initial data
    useEffect(() => {
        setAllOperators(initialData);
    }, [initialData, setAllOperators]);

    // Infinite scroll
    useEffect(() => {
        if (!loaderRef.current || !hasMore) return;

        const currentLoaderRef = loaderRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    incrementVisibleCount();
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );

        observer.observe(currentLoaderRef);

        return () => {
            observer.unobserve(currentLoaderRef);
        };
    }, [hasMore, incrementVisibleCount]);

    // Filter arguments
    const { filterArgs, classTree } = useMemo(() => {
        const operators = initialData;
        const classSet = new Set(operators.map((operator) => operator.class));
        const branchSet = new Set(operators.map((operator) => operator.branch));
        const factionSet = new Set(
            operators.map((operator) => operator.faction)
        );

        const filterArgs = {
            rarity: Array.from({ length: 6 }, (_, i) => 6 - i),
            class: Array.from(classSet),
            branch: Array.from(branchSet),
            faction: Array.from(factionSet),
        };

        const classTree: { [key: string]: string[] } = {};
        classSet.forEach((className) => {
            classTree[className] = Array.from(
                new Set(
                    operators
                        .filter((operator) => operator.class === className)
                        .map((operator) => operator.branch)
                )
            );
        });

        return { filterArgs, classTree };
    }, [initialData]);

    // Handle error
    if (initialData instanceof Error) {
        const error = initialData.message;
        return <div>{error}</div>;
    }

    return (
        <div className={contentWrapper}>
            <section className={filterContainer}>
                <OpsFilter filterArgs={filterArgs} classTree={classTree} />
            </section>

            <section className={gridContainer}>
                {filteredOperators
                    .slice(0, visibleCount)
                    .map((operator, index) => (
                        <OpsThumbnail
                            key={operator.id}
                            operator={operator}
                            priority={index < 10}
                        />
                    ))}
            </section>

            {hasMore && (
                <div
                    ref={loaderRef}
                    className={css({
                        padding: "2rem",
                        textAlign: "center",
                        width: "100%",
                    })}
                >
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
                </div>
            )}
        </div>
    );
};

export default OperatorsGridClient;
