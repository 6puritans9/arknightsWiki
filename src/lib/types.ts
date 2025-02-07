import { Database } from "./supabase";

type Operator = Database["public"]["Tables"]["operators"]["Row"];

export type { Operator };
