import { Database } from "./supabase";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

type OperatorWithFaction = Operator & {
    operator_faction: {
        faction_id: number;
        factions: {
            id: number;
            name_en: string;
            description_en: string;
        };
    };
};

type FilterCondition = {
    category: string | null;
    value: number | string;
};

export type { Operator, OperatorWithFaction, FilterCondition };
