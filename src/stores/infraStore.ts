import { CharsObjectType, BuffsObjectType } from "@/lib/apiMongo";
import { create } from "zustand";

//#region Types
type InfraFilterType = {
    rooms: string[];
    effects: string[];
};
//#endregion

//#region State & Action
type State = {
    allOpsId: Array<keyof CharsObjectType>;
    filteredOpsId: Array<keyof CharsObjectType>;
    ops: CharsObjectType;
    buffs: BuffsObjectType;
    filters: InfraFilterType;
};

type Action = {
    setAllOpsId: (ops: CharsObjectType) => void;
    setRefs: (ops: CharsObjectType, buffs: BuffsObjectType) => void;
    updateFilters: (
        category: keyof InfraFilterType,
        value: string | null
    ) => void;
    applyFilters: () => void;
    resetFilters: () => void;
};
//#endregion

const initialState: State = {
    allOpsId: [],
    filteredOpsId: [],
    ops: {},
    buffs: {},
    filters: {
        rooms: [],
        effects: [],
    },
};

const useInfraStore = create<State & Action>((set, get) => ({
    ...initialState,

    setAllOpsId: (ops) => {
        const opsIdList = Object.keys(ops);

        set({ allOpsId: opsIdList, filteredOpsId: opsIdList });
    },

    setRefs: (ops, buffs) => set({ ops, buffs }),

    updateFilters: (category, value) =>
        set((state) => {
            if (!value) {
                return {
                    filters: {
                        ...state.filters,
                        [category]: [],
                    },
                };
            }

            const prevState = state.filters[category];
            const exists = prevState.includes(value);

            return {
                filters: {
                    ...state.filters,
                    [category]: exists
                        ? prevState.filter((v) => v !== value)
                        : [...prevState, value],
                },
            };
        }),

    applyFilters: () => {
        const { allOpsId, ops, buffs, filters } = get();
        let filteredId = allOpsId;

        // Filter by rooms
        if (filters.rooms.length) {
            filteredId = filteredId.filter((id) => {
                const op = ops[id];
                const allBuffs = op.buffChar;

                allBuffs.forEach((elem) => {
                    const singleBuffData = elem.buffData;

                    singleBuffData.forEach((data) => {
                        const buffId = data.buffId;
                        const ownBuff = buffs[buffId];

                        return filters.effects.some((effect) =>
                            ownBuff.effects.includes(effect)
                        );
                    });
                });
            });
        }

        // TODO: pop a modal up for below conditions?
        // Filter by related_effects
        // Filter by related_ops
        // Filter by related_factions

        set({ filteredOpsId: filteredId });
    },

    resetFilters: () =>
        set((state) => ({
            filters: initialState.filters,
            filteredOpsId: state.allOpsId,
        })),
}));

export default useInfraStore;
