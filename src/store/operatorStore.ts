import { create } from "zustand";
import { QueryOperators, OpsFilterState } from "@/lib/types";

type State = {
    // Data
    allOperators: QueryOperators;
    filteredOperators: QueryOperators;

    // Pagination
    visibleCount: number;
    itemsPerPage: number;
    hasMore: boolean;

    // Filter
    filters: OpsFilterState;
};

type Action = {
    setAllOperators: (operators: QueryOperators) => void;
    incrementVisibleCount: () => void;
    resetVisibleCount: () => void;
    updateFilter: (category: string, value: string | number | null) => void;
    resetFilters: () => void;
    applyFilters: () => void;
};

const initialState: State = {
    allOperators: [],
    filteredOperators: [],
    visibleCount: 20,
    itemsPerPage: 20,
    hasMore: true,
    filters: {
        rarity: null,
        class: null,
        branch: null,
        faction: null,
    },
};

const useOperatorStore = create<State & Action>((set) => ({
    ...initialState,

    setAllOperators: (operators) =>
        set((state) => ({
            allOperators: operators,
            filteredOperators: operators,
            hasMore: operators.length > state.visibleCount,
        })),

    incrementVisibleCount: () =>
        set((state) => {
            const newCount = Math.min(
                state.visibleCount + state.itemsPerPage,
                state.filteredOperators.length
            );

            return {
                visibleCount: newCount,
                hasMore: newCount < state.filteredOperators.length,
            };
        }),

    resetVisibleCount: () =>
        set((state) => ({
            visibleCount: initialState.visibleCount,
            hasMore: state.filteredOperators.length > initialState.visibleCount,
        })),

    updateFilter: (category, value) =>
        set((state) => {
            const newFilters = { ...state.filters };

            switch (category) {
                case "rarity":
                    newFilters.rarity =
                        value === 0 || value ? (value as number) : null;
                    break;
                case "class":
                    newFilters.class = value as string | null;
                    // Reset branch when class changes
                    newFilters.branch = null;
                    break;
                case "branch":
                    newFilters.branch = value as string | null;
                    break;
                case "faction":
                    newFilters.faction = value as string | null;
                    break;
            }
            return { filters: newFilters };
        }),

    resetFilters: () =>
        set({
            filters: initialState.filters,
        }),
    applyFilters: () =>
        set((state) => {
            const { filters, allOperators } = state;

            const filtered = allOperators.filter(
                (operator) =>
                    (!filters.class || operator.class === filters.class) &&
                    (!filters.branch || operator.branch === filters.branch) &&
                    (!filters.faction ||
                        operator.faction === filters.faction) &&
                    (!filters.rarity || operator.rarity === filters.rarity)
            );

            return {
                filteredOperators: filtered,
                visibleCount: initialState.visibleCount,
                hasMore: filtered.length > initialState.visibleCount,
            };
        }),
}));

export { useOperatorStore };
