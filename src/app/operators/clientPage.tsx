"use client";

import { useRef, useEffect, useMemo } from "react";
import { useOperatorStore } from "@/stores/operatorStore";
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
        hasMore,
        visibleCount,
        setVisibleCount,
        incrementVisibleCount,
        filteredOperators,
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
                        key={operator._id}
                        operator={operator}
                        priority={false}
                    />
                ));
        } else {
            return filteredOperators
                .slice(initialCount, visibleCount)
                .map((operator) => (
                    <OpsThumbnail
                        key={operator._id}
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
