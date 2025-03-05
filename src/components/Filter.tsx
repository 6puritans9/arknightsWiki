import { OpsFilterCondition } from "@/lib/types";
import Image from "next/image";
import { classMap, branchMap, factionMap } from "@/lib/constants/pathnameMap";

// type filterProps = {
//     filterArgs: { category: string; values: (string | number | null)[] }[];
//     onClick: (condition: UnifiedFilterCondition) => void;
// };

type opsFilterProps = {
    filterArgs: { category: string; values: (string | number)[] }[];
    onClick: (condition: OpsFilterCondition) => void;
};

const OpsFilter = ({ filterArgs, onClick }: opsFilterProps) => {
    return (
        <div className="filter__container">
            {filterArgs.map((arg, index) => (
                <div
                    key={index}
                    className={`filter__${arg.category}__container`}
                >
                    <h3 className="filter__title">
                        {arg.category.toUpperCase()}
                    </h3>
                    <ul className={`filter__${arg.category}`}>
                        {arg.values.map((value, index) => (
                            <li
                                key={index}
                                onClick={() =>
                                    onClick({ category: arg.category, value })
                                }
                            >
                                <div className="filter__icon__container">
                                    {(arg.category === "rarity" && (
                                        <p className="filter__icon__text">
                                            ★{value}
                                        </p>
                                    )) || (
                                        <>
                                            <Image
                                                className="filter__icon__image"
                                                src={
                                                    (arg.category === "class" &&
                                                        classMap[value]) ||
                                                    (arg.category ===
                                                        "branch" &&
                                                        branchMap[value]) ||
                                                    (arg.category ===
                                                        "faction" &&
                                                        factionMap[value])
                                                }
                                                height={30}
                                                width={30}
                                                alt={value.toString()}
                                            />
                                            <p className="filter__icon__desc">
                                                {value}
                                            </p>
                                        </>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
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

// const Filter = ({ filterArgs, onClick }: filterProps) => {
//     return (
//         <div className="filter__container">
//             {filterArgs.map((arg, index) => (
//                 <div key={index} className={`filter__${arg.category}`}>
//                     <h1>{arg.category}</h1>
//                     {arg.values.map((value, index) => (
//                         <h1
//                             key={index}
//                             onClick={() =>
//                                 onClick({ category: arg.category, value })
//                             }
//                         >
//                             {value}
//                         </h1>
//                     ))}
//                 </div>
//             ))}

//             <h1
//                 style={{ color: "red", textAlign: "center" }}
//                 onClick={() => onClick({ category: null, value: null })}
//             >
//                 RESET
//             </h1>
//         </div>
//     );
// };

export { OpsFilter };
