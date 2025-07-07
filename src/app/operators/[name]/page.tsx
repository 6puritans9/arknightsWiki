import OperatorDetailClient from "./clientPage";
import { fetchSingleOperator } from "@/api/apiMongo";

type OperatorDetailProps = {
    params: Promise<{
        name: string;
    }>;
};

const OperatorDetail = async ({ params }: OperatorDetailProps) => {
    const { name } = await params;
    const op = await fetchSingleOperator(name, "character_table", "en");

    if (!op) {
        return <div>Operator not found</div>;
    }

    return <OperatorDetailClient op={op} />;
};

export default OperatorDetail;
