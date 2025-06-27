import OperatorDetailClient from "./clientPage";
import { fetchOperatorWithSkills } from "@/lib/apiMongo";

type OperatorDetailProps = {
    params: Promise<{
        name: string;
    }>;
};

const OperatorDetail = async ({ params }: OperatorDetailProps) => {
    const { name } = await params;
    const data = await fetchOperatorWithSkills(name, "character_table", "en");

    if (!data) {
        return <div>Operator not found</div>;
    }

    return <OperatorDetailClient initialData={data} />;
};

export default OperatorDetail;
