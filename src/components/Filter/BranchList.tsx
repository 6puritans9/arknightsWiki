import { OpsFilterCondition } from "@/lib/types";
import Image from "next/image";
import { branchMap } from "@/lib/constants/pathnameMap";

type BranchListProps = {
    branches: string[];
    onClick: (condition: OpsFilterCondition) => void;
};

const BranchList = ({ branches, onClick }: BranchListProps) => {
    return (
        <div className="filter__branch-container">
            <ul className="filter__branch">
                {branches.map((branch, index) => (
                    <li
                        key={index}
                        onClick={(e) => {
                            e.stopPropagation();
                            onClick({
                                category: "branch",
                                value: branch,
                            });
                        }}
                    >
                        <Image
                            className="filter__icon__image"
                            src={branchMap[branch]}
                            height={30}
                            width={30}
                            alt="branch"
                        />
                    </li>
                ))}
            </ul>

            {/* <ul className="filter__branch">
                {classTree[value] &&
                    classTree[value].map((branch, index) => (
                        <>
                            <li
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onClick({
                                        category: "branch",
                                        value: branch,
                                    });
                                }}
                            >
                                <Image
                                    className="filter__icon__image"
                                    src={branchMap[branch]}
                                    height={30}
                                    width={30}
                                    alt="branch"
                                />
                            </li>
                            <p className="filter__icon__desc">{branch}</p>
                        </>
                    ))}
            </ul> */}
        </div>
    );
};

export { BranchList };
