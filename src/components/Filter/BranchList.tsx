import { OpsFilterCondition } from "@/lib/types";
import Image from "next/image";
import { branchMap } from "@/lib/constants/pathnameMap";
import getS3Url from "@/lib/apiAws";

type BranchListProps = {
    branches: string[];
    onClick: (condition: OpsFilterCondition) => void;
};

const BranchList = ({ branches, onClick }: BranchListProps) => {
    return (
        <ul>
            <div className="filter__branch__container">
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
                            src={getS3Url(branchMap[branch])}
                            height={30}
                            width={30}
                            alt="branch"
                        />
                        <p className="filter__icon__desc">{branch}</p>
                    </li>
                ))}
            </div>
        </ul>
    );
};

export { BranchList };
