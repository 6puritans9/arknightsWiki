import { getBaseSkills } from "@/lib/apiBase";
import InfrastructureClient from "./clientPage";

const Infrastructure = async () => {
    const data = await getBaseSkills();

    return <InfrastructureClient initialData={data} />;
};

export default Infrastructure;
