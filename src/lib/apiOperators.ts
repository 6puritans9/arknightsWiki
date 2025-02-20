import supabase from "./supabaseClient";

const getOperators = async () => {
    const { data: operators, error } = await supabase
        .from("operators")
        .select(`*`)
        .order("is_cn", { ascending: false })
        .order("rarity", { ascending: false })
        .order("code", { ascending: false });
    if (error) {
        console.error(error);
        throw new Error("Failed to fetch operators");
    }

    return operators;
};

const getOperator = async (name: string) => {
    const { data, error } = await supabase
        .from("operators")
        .select("*")
        .eq("name", name)
        .single();
    if (error) {
        throw new Error("Failed to fetch operator");
    }

    return data;
};

export { getOperators, getOperator };
