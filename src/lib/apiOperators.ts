import supabase from "./supabaseClient";

const operatorsQuery = supabase
    .from("operators")
    .select(
        `id, name, nickname, pathname, code, rarity, class, branch, faction, is_cn, has_promotion`
    )
    .order("is_cn", { ascending: false })
    .order("rarity", { ascending: false })
    .order("code", { ascending: false });

const getOperators = async () => {
    const { data, error } = await operatorsQuery;
    if (error) throw error;

    return data;
};

const getOperator = async (name: string) => {
    const decodedName = decodeURIComponent(name);
    const { data, error } = await supabase
        .from("operators")
        .select("*")
        .eq("name", decodedName)
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};

export { getOperators, getOperator, operatorsQuery };
