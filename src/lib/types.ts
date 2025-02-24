import { Database } from "./supabase";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

type OperatorWithBase = {
    id: number;
    name: string;
    code: number;
    pathname: string;
    race: string;
    faction: string;
    operator_base: {
        operator_id: number;
        base_id: number;
        base: {
            id: number;
            name: string;
            description: string;
            effects: string[];
            owners: string[];
            obtain_later: string[] | null;
            replace_skill: string | null;
            can_overlap: boolean | null;
            pathname: string;
            related_effects: string[] | null;
            related_ops: string[] | null;
            related_faction: string | null;
            related_race: string | null;
            related_facility: string | null;
            facility: string;
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
    r_facility: string | null;
};

export type BaseFilterCondition = {
    category: string | null;
    value: string | RelationsValue | null;
};

export type UnifiedFilterCondition = FilterCondition | BaseFilterCondition;

export type { Operator, OperatorWithBase };
