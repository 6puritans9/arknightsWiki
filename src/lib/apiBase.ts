import supabase from "./supabaseClient";

const baseQuery = supabase.from("operators").select(`
    id,
    name,
    nickname,
    pathname,
    code,
    operator_base (
        operator_id,
        base_id,
        base (
            *
        )
    )
`);

const getBaseSkills = async () => {
    const { data, error } = await baseQuery;
    if (error) throw error;

    return data;
};

export { baseQuery, getBaseSkills };
