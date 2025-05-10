import { OpsFilterCondition } from "@/lib/types";
import Image from "next/image";
import { branchMap } from "@/lib/constants/pathnameMap";
import getS3Url from "@/lib/apiAws";
import { flex } from "../../../styled-system/patterns";
import { css } from "../../../styled-system/css";

type BranchListProps = {
    branches: string[];
    onClick: (condition: OpsFilterCondition) => void;
};

const popUpWrapper = flex({
    flexDirection: "column",
    gap: "0.3rem",
    backgroundColor: "rgba(0,0,0,0.7)",
    opacity: "0.9",
    padding: "0.1rem 0.2rem 0.1rem 0.1rem",
    cursor: "pointer",
});

const branchWrapper = flex({
    gap: "0.2rem",
});

const branchImage = css({
    backgroundColor: "black",
    height: "30px",
    width: "30px",
});

const branchText = css({
    color: "gray.200",
});

const BranchList = ({ branches, onClick }: BranchListProps) => {
    return (
        <ul className={popUpWrapper}>
            {branches.map((branch, index) => (
                <li
                    key={index}
                    className={branchWrapper}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick({
                            category: "branch",
                            value: branch,
                        });
                    }}
                >
                    <Image
                        className={branchImage}
                        src={getS3Url(branchMap[branch])}
                        height={30}
                        width={30}
                        alt="branch"
                    />
                    <span className={branchText}>{branch}</span>
                </li>
            ))}
        </ul>
    );
};

export default BranchList;
