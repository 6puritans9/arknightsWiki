import supabase from "./supabaseClient";

const getOperators = async () => {
    const { data: operators, error } = await supabase
        .from("operators")
        .select("*");
    if (error) {
        console.error(error);
        throw new Error("Failed to fetch operators");
    }

    return operators;
};

const getOperator = async (name_en: string) => {
    const { data, error } = await supabase
        .from("operators")
        .select("*")
        .eq("name_en", name_en)
        .single();
    if (error) {
        throw new Error("Failed to fetch operator");
    }

    return data;
};

export { getOperators, getOperator };
