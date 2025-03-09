import OperatorDetailClient from "./clientPage";
import { getOperator } from "@/lib/apiOperators";

type OperatorDetailProps = {
    params: Promise<{
        name: string;
    }>;
};

const OperatorDetail = async ({ params }: OperatorDetailProps) => {
    const { name } = await params;
    const data = await getOperator(name);

    return <OperatorDetailClient initialData={data} />;
};

export default OperatorDetail;
