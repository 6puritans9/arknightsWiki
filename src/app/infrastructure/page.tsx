import operatorsWithBase from "@/lib/apiBase";
import InfrastructureClient from "./clientPage";

const Infrastructure = () => {
    const data = operatorsWithBase;

    return <InfrastructureClient initialData={data} />;
};

export default Infrastructure;
