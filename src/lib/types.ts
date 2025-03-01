import { Database } from "./supabase";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

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

export type UnifiedFilterCondition = FilterCondition | BaseFilterCondition;

export type { Operator, OperatorWithBase };
