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
    const dbLocaleMap: { [key: string]: string } = {
        "en-US": "en",
        "ko-KR": "kr",
        "zh-CN": "cn",
        "zh-TW": "tw",
        "ja-JP": "ja",
    };
    console.log(dbLocaleMap[locale]);

    const op = await fetchSingleOperator(
        id,
        dbLocaleMap[locale],
        "character_table"
    );

    if (!op) {
        return <div>Operator not found</div>;
    }

    return <OperatorDetailClient op={op} locale={locale} />;
};

export default OperatorDetail;
