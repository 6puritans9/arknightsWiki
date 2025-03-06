import { Database } from "./supabase";
import { QueryData } from "@supabase/supabase-js";
import { operatorsQuery } from "./apiOperators";

// Query Types
type Operator = Database["public"]["Tables"]["operators"]["Row"];

type QueryOperators = QueryData<typeof operatorsQuery>;
type QueryOperator = QueryData<typeof operatorsQuery>["0"];

type OperatorWithBase = {
    id: number;
    name: string;
    code: number;
    pathname: string;
    races: string[];
    faction: string;
    operator_base: {
        operator_id: number;
        base_id: number;
        base: {
            id: number;
            name: string;
            description: string;
            effects: string[];
            replace_skill: string | null;
            can_overlap: boolean | null;
            related_effects: string[] | null;
            related_ops: string[] | null;
            related_faction: string | null;
            related_race: string | null;
            owners: string[];
            obtain_at_e2: string[] | null;
            pathname: string;
            facility: string;
            obtain_at_e1: string[] | null;
            obtain_at_30: string[] | null;
            related_facilities: string[] | null;
        };
    }[];
};

// Filter types
type OpsFilterState = {
    rarity: number | null;
    class: string | null;
    branch: string | null;
    faction: string | null;
};

type OpsFilterAction =
    | { type: "SET_CLASS"; value: string | null }
    | { type: "SET_BRANCH"; value: string | null }
    | { type: "SET_FACTION"; value: string | null }
    | { type: "SET_RARITY"; value: number | null }
    | { type: "RESET" };

export type FilterCondition = {
    category: string | null;
    value: number | string | null;
};

export type RelationsValue = {
    r_effects: string[] | null;
    r_ops: string[] | null;
    r_faction: string | null;
    r_race: string | null;
    r_facilities: string[] | null;
};

export type BaseFilterCondition = {
    category: string | null;
    value: string | RelationsValue | null;
};

type OpsFilterCondition = {
    category: string | null;
    value: number | string | null;
};

export type UnifiedFilterCondition = FilterCondition | BaseFilterCondition;

export type {
    Operator,
    OperatorWithBase,
    QueryOperators,
    QueryOperator,
    OpsFilterCondition,
    OpsFilterState,
    OpsFilterAction,
};
