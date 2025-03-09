import { BaseFilterCondition } from "@/lib/types";

type FilterProps = {
    filterArgs: { category: string; values: string[] }[];
    onClick: (condition: BaseFilterCondition) => void;
};

const InfraFilter = ({ filterArgs, onClick }: FilterProps) => {
    return (
        <div className="">
            {filterArgs.map((arg, index) => (
                <div key={index} className={`filter__${arg.category}`}>
                    <h1>{arg.category}</h1>
                    {arg.values.map((value, index) => (
                        <h1
                            key={index}
                            onClick={() =>
                                onClick({ category: arg.category, value })
                            }
                        >
                            {value}
                        </h1>
                    ))}
                </div>
            ))}

            <h1
                style={{ color: "red", textAlign: "center" }}
                onClick={() => onClick({ category: null, value: null })}
            >
                RESET
            </h1>
        </div>
    );
};

export { InfraFilter };
