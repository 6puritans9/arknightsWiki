import { create } from "zustand";
import { OpsObjectType, SimpleOpType } from "@/api/apiMongo";

//#region Types
export type OpsFilterType = {
    rarity: number | null;
    position: string | null;

    profession: string | null;
    subProfessionId: string | null;

    nationId: string | null;
    teamId: string | null;
    groupId: string | null;

    isLimited: boolean;
    isAlter: boolean;

    recruitment: string | null;
};
//#endregion

//#region State & Action
type State = {
    allOpsId: Array<keyof OpsObjectType>;
    filteredOpsId: Array<keyof OpsObjectType>;
    ops: OpsObjectType;
    filters: OpsFilterType;
};

type Action = {
    setAllOpsId: (ops: Array<keyof OpsObjectType>) => void;
    setRefs: (ops: OpsObjectType) => void;
    updateFilters: (
        category: keyof OpsFilterType,
        value: string | number | boolean | null
    ) => void;
    applyFilters: () => void;
    resetFilters: () => void;
};
//#endregion

const initialState: State = {
    allOpsId: [],
    filteredOpsId: [],
    ops: {},
    filters: {
        rarity: null,
        position: null,
        profession: null,
        subProfessionId: null,
        nationId: null,
        teamId: null,
        groupId: null,
        isLimited: false,
        isAlter: false,
        recruitment: null,
    },
};

const useOperatorStore = create<State & Action>((set, get) => ({
    ...initialState,

    setAllOpsId: (opsIdList) =>
        set({
            allOpsId: opsIdList,
            filteredOpsId: opsIdList,
        }),

    setRefs: (ops) => {
        set({ ops });
    },

    updateFilters: (
        category: keyof OpsFilterType,
        value: string | number | boolean | null
    ) =>
        set((state) => {
            switch (category) {
                case "isLimited":
                case "isAlter":
                    return {
                        filters: {
                            ...state.filters,
                            [category]: !state.filters[category],
                        },
                    };

                default:
                    return {
                        filters: {
                            ...state.filters,
                            [category]:
                                state.filters[category] === value
                                    ? null
                                    : value,
                        },
                    };
            }
        }),

    applyFilters: () => {
        const { allOpsId, ops, filters } = get();

        const newFiltered = allOpsId.filter((id) => {
            const op = ops[id];

            // Check single-value filters
            for (const key of Object.keys(filters) as (keyof OpsFilterType)[]) {
                const filterValue = filters[key];
                if (
                    filterValue !== null &&
                    filterValue !== false &&
                    filterValue !== undefined
                ) {
                    if (key === "isLimited") {
                        if (filterValue && !op[key as keyof SimpleOpType])
                            return false;
                    } else if (key === "isAlter") {
                        if (filterValue && !op.baseOpId) return false;
                    } else if (key !== "recruitment") {
                        if (op[key] !== filterValue) return false;
                    }
                    // TODO: "recruitment"
                }
            }
            return true;
        });

        set({ filteredOpsId: newFiltered });
    },

    resetFilters: () => {
        const { allOpsId } = get();

        set({
            filters: initialState.filters,
            filteredOpsId: allOpsId,
        });
    },
}));

export default useOperatorStore;
