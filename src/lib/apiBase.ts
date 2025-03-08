import supabase from "./supabaseClient";

const baseQuery = supabase.from("operators").select(`
    id,
    name,
    nickname,
    pathname,
    code,
    operator_base!inner (
        operator_id,
        base_id,
        base (
            id,
            name,
            description,
            effects,
            replace_skill,
            can_overlap,
            related_effects,
            related_ops,
            related_faction,
            related_race,
            owners,
            obtain_at_e2,
            pathname,
            facility,
            obtain_at_e1,
            obtain_at_30,
            related_facilities
        )
    )
`);

const getBaseSkills = async () => {
    const { data, error } = await baseQuery;
    if (error) throw error;

    return data;
};

export { baseQuery, getBaseSkills };
