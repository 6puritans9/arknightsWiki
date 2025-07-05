import { CharsObjectType, BuffsObjectType } from "@/api/apiMongo";
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
    setAllOpsId: (ops: Array<keyof CharsObjectType>) => void;
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

    setAllOpsId: (opsIdList) => {
        set({ allOpsId: opsIdList, filteredOpsId: opsIdList });
    },

    setRefs: (ops, buffs) => set({ ops, buffs }),

    updateFilters: (category: "rooms" | "effects", effect) =>
        set((state) => {
            if (!effect) {
                return {
                    filters: {
                        ...state.filters,
                        [category]: [],
                    },
                };
            }

            const prvEffects = state.filters[category];
            if (prvEffects.includes(effect)) {
                return {}; // No update
            }

            // const exists = prevState.includes(effect);
            // const newState = exists
            //     ? prevState.filter((v) => v !== effect)
            //     : [...prevState, effect];

            // if (
            //     prevState.length === newState.length &&
            //     prevState.every((v, i) => v === newState[i])
            // ) {
            //     return {}; // No update
            // }

            return {
                filters: {
                    ...state.filters,
                    [category]: [effect],
                },
            };
        }),

    applyFilters: () => {
        const { allOpsId, ops, buffs, filters } = get();
        let filteredId = allOpsId;

        // Filter by rooms
        // if (filters.rooms.length) {
        filteredId = filteredId.filter((id) => {
            const op = ops[id];
            const charBuffs = op.buffChar;

            return charBuffs.some((elem) => {
                const singleCharBuff = elem.buffData;
                if (!Array.isArray(singleCharBuff) || !singleCharBuff.length) {
                    return;
                }

                return singleCharBuff.some((data) => {
                    const buffId = data.buffId;
                    const ownBuff = buffs[buffId];

                    return (
                        ownBuff &&
                        Array.isArray(ownBuff.effects) &&
                        filters.effects.some((effect) =>
                            ownBuff.effects.includes(effect)
                        )
                    );
                });
            });
        });
        // }

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
