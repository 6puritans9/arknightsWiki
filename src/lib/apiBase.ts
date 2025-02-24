import supabase from "./supabaseClient";

const getOperatorsWithBase = async () => {
    const { data, error } = await supabase.from("operators").select(`
            id,
            name,
            code,
            pathname,
            race,
            faction,
            operator_base:operator_base!inner(
                operator_id,
                base_id,
                base (
                id,
                name,
                description,
                effects,
                owners,
                obtain_at_e2,
                obtain_at_e1,
                obtain_at_30,
                can_overlap,
                pathname,
                related_effects,
                related_facility,
                related_faction,
                related_ops,
                related_race,
                replace_skill,
                facility
                )
            )
        `);

    if (error) {
        console.error(error);
        throw new Error("Failed to fetch operators");
    }

    return data;
};

export { getOperatorsWithBase };
