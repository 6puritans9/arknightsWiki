"use client";

import { useEffect, useState } from "react";
import { getOperatorsWithBase } from "@/lib/apiBase";
import { OperatorWithBase } from "@/lib/types";

const Infrastructure = () => {
    const [data, setData] = useState<OperatorWithBase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOperatorsWithBase();
                // @ts-expect-error: type inference issue
                setData(data);
                console.log(data);
            } catch (error) {
                console.error(error);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <h1>Infra Builder</h1>
            <div>
                {data.map((operator) =>
                    operator.operator_base.map((row) => (
                        <div key={row.base_id}>
                            <p>{operator.name}</p>
                            <p>{row.base.name}</p>
                            <p>{row.base.description}</p>
                            {/* Render other base details as needed */}
                        </div>
                    ))
                )}
            </div>
        </>
    );
};

export default Infrastructure;
