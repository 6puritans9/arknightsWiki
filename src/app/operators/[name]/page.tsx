import OperatorDetailClient from "./clientPage";
import { getOperator } from "@/lib/apiOperators";

type OperatorDetailProps = {
    params: {
        name: string;
    };
};

const OperatorDetail = async ({ params }: OperatorDetailProps) => {
    const { name } = params;
    const data = await getOperator(name);

    return <OperatorDetailClient initialData={data} />;
};

export default OperatorDetail;
