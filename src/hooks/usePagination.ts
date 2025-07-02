import { useRef, useEffect, useState } from "react";

/**
 * usePagination - Infinite scroll pagination hook
 * @param items - The full array of items to paginate
 * @param pageSize - How many items to load per "page"
 */

const usePagination = <T>(items: T[], pageSize: number = 20) => {
    const [visibleCount, setVisibleCount] = useState(pageSize);

    const loaderRef = useRef<HTMLDivElement>(null);
    const hasMore = visibleCount < items.length;

    useEffect(() => {
        // Don't observe if no loader or nothing more to load
        if (!loaderRef.current || !hasMore) return;

        // Set up IntersectionObserver
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setVisibleCount((prev) =>
                        Math.min(prev + pageSize, items.length)
                    );
                }
            },
            { threshold: 0.1, rootMargin: "200px" }
        );
        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasMore, items.length, pageSize]);

    return {
        itemsToShow: items.slice(0, visibleCount),
        hasMore,
        loaderRef,
    };
};

export default usePagination;
