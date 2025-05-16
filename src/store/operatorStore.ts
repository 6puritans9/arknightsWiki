import { create } from "zustand";
import { QueryOperators } from "@/lib/types";

type FilterType = {
    rarity: number[];
    class: string[];
    branch: string[];
    faction: string[];
};

type State = {
    // Data
    allOperators: QueryOperators;
    filteredOperators: QueryOperators;

    // Pagination
    visibleCount: number;
    itemsPerPage: number;
    hasMore: boolean;

    // Filter
    filters: FilterType;
};

type Action = {
    setAllOperators: (operators: QueryOperators) => void;
    incrementVisibleCount: () => void;
    resetVisibleCount: () => void;
    updateFilter: (
        category: keyof FilterType | "reset",
        value: string | number | null
    ) => void;
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
        rarity: [],
        class: [],
        branch: [],
        faction: [],
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
            if (category === "reset") {
                return { filters: initialState.filters };
            }

            const newFilters = { ...state.filters };

            switch (category) {
                case "rarity":
                    if (typeof value === "number") {
                        const index = newFilters.rarity.indexOf(value);

                        if (index == -1) {
                            newFilters.rarity = [...newFilters.rarity, value];
                        } else {
                            newFilters.rarity = newFilters.rarity.filter(
                                (r) => r !== value
                            );
                        }
                        break;
                    }
                case "class":
                    if (typeof value === "string") {
                        const index = newFilters.class.indexOf(value);

                        if (index == -1) {
                            newFilters.class = [...newFilters.class, value];
                        } else {
                            newFilters.class = newFilters.class.filter(
                                (c) => c !== value
                            );
                            // Reset branch when class changes
                            newFilters.branch = newFilters.branch.filter(
                                (b) =>
                                    !state.allOperators.some(
                                        (op) =>
                                            op.class === value &&
                                            op.branch === b
                                    )
                            );
                        }
                    }
                    break;
                case "branch":
                    if (typeof value === "string") {
                        const index = newFilters.branch.indexOf(value);

                        if (index == -1) {
                            newFilters.branch = [...newFilters.branch, value];
                        } else {
                            newFilters.branch = newFilters.branch.filter(
                                (b) => b !== value
                            );
                        }
                    }
                    break;
                case "faction":
                    if (typeof value === "string") {
                        const index = newFilters.faction.indexOf(value);

                        if (index == -1) {
                            newFilters.faction = [...newFilters.faction, value];
                        } else {
                            newFilters.faction = newFilters.faction.filter(
                                (f) => f !== value
                            );
                        }
                    }
                    break;
                default:
                    throw new Error("Invalid filter category or value");
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

            const filtered = allOperators.filter((operator) => {
                const rarityMatch =
                    filters.rarity.length === 0 ||
                    filters.rarity.includes(operator.rarity);
                const classMatch =
                    filters.class.length === 0 ||
                    filters.class.includes(operator.class);
                const branchMatch =
                    filters.branch.length === 0 ||
                    filters.branch.includes(operator.branch);
                const factionMatch =
                    filters.faction.length === 0 ||
                    filters.faction.includes(operator.faction);

                return rarityMatch && classMatch && branchMatch && factionMatch;
            });

            return {
                filteredOperators: filtered,
                visibleCount: initialState.visibleCount,
                hasMore: filtered.length > initialState.visibleCount,
            };
        }),
}));

export { useOperatorStore };
