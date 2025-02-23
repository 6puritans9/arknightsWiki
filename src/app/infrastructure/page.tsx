"use client";

import { useEffect, useState } from "react";
import { getOperatorsWithBase } from "@/lib/apiBase";
import { OperatorWithBase } from "@/lib/types";
import Filter from "@/components/Filter";
import Icon from "@/components/Icon";

const Infrastructure = () => {
    const [data, setData] = useState<OperatorWithBase[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const filterHandler = (condition: FilterCondition) => {
        setFilter(condition);
    };

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
            <div className="flex">
                <h2>Filter</h2>
                <Filter onClick={filterHandler} />
            </div>
            <section className="grid grid__icon">
                {data.map((operator) => (
                    <div key={operator.id}>
                        <Icon operator={operator} />
                        <p>{operator.name}</p>
                        {operator.operator_base.map((row, index) => (
                            <div key={row.base_id}>
                                <p>{`${index + 1} ${row.base.name}`}</p>
                                <p>{row.base.description}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </section>
        </>
    );
};

export default Infrastructure;
