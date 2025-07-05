import { describe, expect, beforeEach, it } from "@jest/globals";
import { SimpleOpType } from "@/api/apiMongo";
import useOperatorStore from "@/stores/operatorStore";

const mockOps = {
    op1: {
        name: "op1",
        appellation: null,
        rarity: 5,
        position: "Melee",
        profession: "Guard",
        subProfessionId: "Duelist",

        nationId: "Rhodes",
        teamId: "A",
        groupId: "G1",

        releaseOrder: 1,
        alterOpId: "op2",
        baseOpId: null,
        isLimited: false,
        recruit: [],
    },
    op2: {
        name: "op2",
        appellation: "오퍼레이터2",
        rarity: 6,
        position: "Ranged",
        profession: "Sniper",
        subProfessionId: "Marksman",

        nationId: "Ursus",
        teamId: "B",
        groupId: "G2",

        releaseOrder: 6,
        alterOpId: null,
        baseOpId: "op1",
        isLimited: true,
        recruit: [],
    },
    op3: {
        name: "op3",
        appellation: null,
        rarity: 5,
        position: "All",
        profession: "Caster",
        subProfessionId: "chain",

        nationId: "Iberia",
        teamId: "B",
        groupId: "G2",

        releaseOrder: 4,
        alterOpId: null,
        baseOpId: null,
        isLimited: false,
        recruit: [],
    },
};

// Helper function
const init = (mockOps: { [key: string]: SimpleOpType }) => {
    return Object.keys(mockOps);
};

// Test function
describe("opsStore", () => {
    beforeEach(() => {
        useOperatorStore.setState({
            allOpsId: init(mockOps),
            filteredOpsId: init(mockOps),
            ops: mockOps,
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
        });
    });

    it("filters by rarity 6", () => {
        useOperatorStore.getState().updateFilters("rarity", 6);
        useOperatorStore.getState().applyFilters();
        expect(useOperatorStore.getState().filteredOpsId).toEqual(["op2"]);
    });

    it("filters by rarity 5", () => {
        useOperatorStore.getState().updateFilters("rarity", 5);
        useOperatorStore.getState().applyFilters();
        expect(useOperatorStore.getState().filteredOpsId).toEqual([
            "op1",
            "op3",
        ]);
    });

    it("filters limited operator", () => {
        useOperatorStore.getState().updateFilters("isLimited", true);
        useOperatorStore.getState().applyFilters();
        expect(useOperatorStore.getState().filteredOpsId).toEqual(["op2"]);
    });

    it("filters both limited & common operator ", () => {
        useOperatorStore.getState().updateFilters("isLimited", false);
        useOperatorStore.getState().applyFilters();
        expect(useOperatorStore.getState().filteredOpsId).toEqual([
            "op1",
            "op2",
            "op3",
        ]);
    });

    it("filters alternative operator", () => {
        useOperatorStore.getState().updateFilters("isAlter", true);
        useOperatorStore.getState().applyFilters();
        expect(useOperatorStore.getState().filteredOpsId).toEqual(["op2"]);
    });
});
