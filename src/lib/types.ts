import { Database } from "./supabase";
import { QueryData } from "@supabase/supabase-js";
import { operatorsQuery } from "./apiOperators";
import { baseQuery } from "./apiBase";

// Query Types
type Operator = Database["public"]["Tables"]["operators"]["Row"];
type Base = Database["public"]["Tables"]["base"]["Row"];
type OperatorBase = {
    operator_id: number;
    base_id: number;
    base: Base;
};

type QueryOperators = QueryData<typeof operatorsQuery>;
type QueryOperator = QueryData<typeof operatorsQuery>["0"];
type QueryBaseSkills = {
    id: number;
    name: string;
    nickname: string;
    pathname: string;
    code: string;
    operator_base: OperatorBase[];
}[];
type QueryBaseSkill = QueryData<typeof baseQuery>["0"];

// Unified Query Type
type UnifiedSingleQuery = QueryOperator | QueryBaseSkill;

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
    QueryOperators,
    QueryOperator,
    QueryBaseSkills,
    OpsFilterCondition,
    OpsFilterState,
    OpsFilterAction,
    UnifiedSingleQuery,
};
