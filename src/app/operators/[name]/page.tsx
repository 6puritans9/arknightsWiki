import OperatorDetailClient from "./clientPage";
import { fetchSingleEntity } from "@/lib/apiMongo";

type OperatorDetailProps = {
    params: Promise<{
        name: string;
    }>;
};

const OperatorDetail = async ({ params }: OperatorDetailProps) => {
    const { name } = await params;
    const data = await fetchSingleEntity(name, "character_table", "en");

    if (!data) {
        return <div>Operator not found</div>;
    }

    return <OperatorDetailClient initialData={data} />;
};

export default OperatorDetail;
