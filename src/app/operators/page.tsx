import { getOperators } from "@/lib/apiOperators";
import OperatorsGridClient from "./clientPage";

const OperatorsGrid = async () => {
    const data = await getOperators();

    return <OperatorsGridClient initialData={data} />;
};

export default OperatorsGrid;
