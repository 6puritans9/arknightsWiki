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
    base: Base[];
};

type QueryOperators = QueryData<typeof operatorsQuery>;
type QueryOperator = QueryData<typeof operatorsQuery>["0"];
type QueryBaseSkills = {
    id: number;
    name: string;
    nickname: string;
    pathname: string;
    code: string;
    races: string[];
    faction: string;
    sub_factions: string[];
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

type BaseRelationsValue = {
    r_effects: string[] | null;
    r_ops: string[] | null;
    r_faction: string | null;
    r_race: string | null;
    r_facilities: string[] | null;
};

type BaseFilterCondition = {
    category: string | null;
    value: string | BaseRelationsValue | null;
    selfName?: string | null;
};

type BaseFilterState = {
    selfName: string | null;
    facility: string | null;
    effects: string | null;
    relations: BaseRelationsValue | null;
};

type BaseFilterAction =
    | {
          type: "SET_FACILITY";
          payload: string | null;
          selfName: string | null;
      }
    | {
          type: "SET_EFFECTS";
          payload: string | null;
          selfName: string | null;
      }
    | {
          type: "SET_RELATIONS";
          payload: BaseRelationsValue | null;
          selfName: string | null;
      }
    | { type: "RESET" };

export type {
    Operator,
    QueryOperators,
    QueryOperator,
    QueryBaseSkills,
    QueryBaseSkill,
    UnifiedSingleQuery,
    OpsFilterState,
    OpsFilterAction,
    OpsFilterCondition,
    BaseFilterCondition,
    BaseFilterState,
    BaseFilterAction,
    BaseRelationsValue,
};
