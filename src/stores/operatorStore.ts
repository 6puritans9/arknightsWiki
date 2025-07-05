import { create } from "zustand";
import { OpsObjectType, SimpleOpType } from "@/api/apiMongo";

//#region Types
export type OpsFilterType = {
    rarity: number[];
    position: string[];

    profession: string[];
    subProfessionId: string[];

    nationId: string[];
    teamId: string[];
    groupId: string[];

    isLimited: boolean;
    isAlter: boolean;

    recruitment: string[];
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
        rarity: [],
        position: [],

        profession: [],
        subProfessionId: [],

        nationId: [],
        teamId: [],
        groupId: [],

        isLimited: false,
        isAlter: false,

        recruitment: [],
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
            if (!value) {
                return {
                    filters: {
                        ...state.filters,
                        [category]: Array.isArray(
                            state.filters[category] ? [] : false
                        ),
                    },
                };
            }

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
                    const prvValues = state.filters[category] as (
                        | string
                        | number
                    )[];
                    let newValues: (string | number)[];

                    if (
                        typeof value === "string" ||
                        typeof value === "number"
                    ) {
                        if (prvValues.includes(value)) {
                            newValues = prvValues.filter((v) => v !== value);
                        } else {
                            newValues = [value];
                        }

                        return {
                            filters: {
                                ...state.filters,
                                [category]: newValues,
                            },
                        };
                    }
                    return {};
            }
        }),

    applyFilters: () => {
        const { allOpsId, ops, filters } = get();

        const newFiltered = allOpsId.filter((id) => {
            const op = ops[id];
            const keys = Object.entries(filters)
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                .filter(([_, v]) => Array.isArray(v) && v.length)
                .map(([k]) => k as keyof OpsFilterType);

            for (const key of keys) {
                const values = filters[key] as (string | number)[];
                const opValue = op[key as keyof SimpleOpType];

                if (values.length) {
                    if (
                        (typeof opValue === "string" ||
                            typeof opValue === "number") &&
                        !values.includes(opValue)
                    ) {
                        return false;
                    }
                }
            }

            // TODO: "recruitment"

            // Boolean filters: if true, op value must be true
            if (filters.isLimited && !op.isLimited) {
                return false;
            }
            if (filters.isAlter && !op.baseOpId) {
                return false;
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
