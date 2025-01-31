import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl) {
    throw new Error("Missing Supabase URL");
}
if (!supabaseKey) {
    throw new Error("Missing Supabase Key");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
