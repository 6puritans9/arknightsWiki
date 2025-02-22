import { Database } from "./supabase";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

type OperatorWithBase = {
    id: number;
    name: string;
    pathname: string;
    operator_base: {
        operator_id: number;
        base_id: number;
        base: {
            id: number;
            name: string;
            description: string;
            effect: string[];
            owners: string[];
            obtain_later: string[] | null;
            can_overlap: boolean | null;
            pathname: string;
            related_effects: string[] | null;
            related_facility: string | null;
            related_faction: string | null;
            related_ops: string[] | null;
            related_race: string | null;
            replace_skill: string | null;
            facility: string;
        };
    }[];
};

type FilterCondition = {
    category: string | null;
    value: number | string;
};

export type { Operator, OperatorWithBase, FilterCondition };
