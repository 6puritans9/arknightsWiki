import { UnifiedFilterCondition } from "@/lib/types";

type filterProps = {
    filterArgs: { category: string; values: (string | number | null)[] }[];
    onClick: (condition: UnifiedFilterCondition) => void;
};

const Filter = ({ filterArgs, onClick }: filterProps) => {
    return (
        <div className="filter__container">
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

export default Filter;
