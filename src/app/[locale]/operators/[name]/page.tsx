import OperatorDetailClient from "./clientPage";
import { fetchSingleOperator } from "@/api/apiMongo";

type OperatorDetailProps = {
    params: Promise<{
        name: string;
        locale: string;
    }>;
    searchParams: Promise<{ id: string }>;
};

const OperatorDetail = async ({
    params,
    searchParams,
}: OperatorDetailProps) => {
    const { locale } = await params;
    const { id } = await searchParams;

    const op = await fetchSingleOperator(id, locale, "character_table");

    if (!op) {
        return <div>Operator not found</div>;
    }

    return <OperatorDetailClient op={op} locale={locale} />;
};

export default OperatorDetail;
