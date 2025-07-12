"use client";

import { usePathname } from "next/navigation";
import { useMemo, useEffect } from "react";
import useOperatorStore from "@/stores/operatorStore";
import usePagination from "@/hooks/usePagination";
import useNavStore from "@/stores/navStore";
import { flex } from "$/styled-system/patterns";
import OpCard from "@/components/operators/OpCard";
import Spinner from "@/components/ui/Spinner";
import { getPathWithoutLocale } from "@/utils/i18n/locales";

type ClientPaginationProps = {
    initialOpsIds: string[];
    locale: string;
};

const spinnerWrapper = flex({
    gridColumn: "1 / -1",
    justifyContent: "center",
    width: "100%",
    marginTop: "1rem",
});

const OpsClientPage = ({ initialOpsIds, locale }: ClientPaginationProps) => {
    const { filteredOpsId, ops, filters, applyFilters, resetFilters } =
        useOperatorStore();

    // Check filter state and modify display
    const isFilterActive = useMemo(() => {
        return Object.entries(filters).some(([, value]) =>
            Array.isArray(value) ? value.length : !!value
        );
    }, [filters]);

    useEffect(() => {
        const ssrCards = document.querySelectorAll("[data-ssr-op]");

        ssrCards.forEach(
            (card) =>
                ((card as HTMLElement).style.display = isFilterActive
                    ? "none"
                    : "")
        );
    }, [isFilterActive]);

    // Check route changes to manange filter state
    const pathname = usePathname();
    const pathWithoutLocale = getPathWithoutLocale(pathname);

    const setPrvPathname = useNavStore((s) => s.setPrvPathname);

    const prvPathname = useNavStore().prvPathname;

    // If previous pages were on the same group, keep the state
    useEffect(() => {
        const wasOpPage = /^\/operators(\/[^/]+)?\/?$/.test(prvPathname || "");
        const isOpPage = /^\/operators(\/[^/]+)?\/?$/.test(pathWithoutLocale);

        if (!wasOpPage && isOpPage) {
            resetFilters();
        } else {
            applyFilters();
        }

        setPrvPathname(pathWithoutLocale);
    }, [
        pathWithoutLocale,
        prvPathname,
        applyFilters,
        resetFilters,
        setPrvPathname,
    ]);

    //#region Helper functions
    // filtered: Show only filtered ops, sorted by rarity, release order
    const filteredOpsToShow = useMemo(() => {
        return (filteredOpsId as string[]).slice().sort((prv, nxt) => {
            if (ops[nxt].rarity !== ops[prv].rarity) {
                return ops[nxt].rarity - ops[prv].rarity;
            }

            return ops[nxt].releaseOrder - ops[prv].releaseOrder;
        });
    }, [filteredOpsId, ops]);

    // unFiltered: Show all the ops NOT in initial SSR list, sorted by release order
    const unfilteredOpsToShow = useMemo(() => {
        return (filteredOpsId as string[])
            .filter((id) => !initialOpsIds.includes(id))
            .sort((prv, nxt) => ops[nxt].releaseOrder - ops[prv].releaseOrder);
    }, [filteredOpsId, initialOpsIds, ops]);

    const opsToShow = isFilterActive ? filteredOpsToShow : unfilteredOpsToShow;

    const { itemsToShow, hasMore, loaderRef } = usePagination(opsToShow, 20);
    //#endregion

    return (
        <>
            {itemsToShow.map((char) => (
                <OpCard
                    key={char}
                    id={char as string}
                    operator={ops[char]}
                    locale={locale}
                />
            ))}

            {hasMore && (
                <div ref={loaderRef} className={spinnerWrapper}>
                    <Spinner />
                </div>
            )}
        </>
    );
};

export default OpsClientPage;
