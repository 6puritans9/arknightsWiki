// import Image from "next/image";
// import { getsubProfessionIdImage } from "@/api/apiAws";
// import { FilterCondition } from "./OpsFilter";
// import { subProfessionIdMap } from "@/lib/constants/NameMap";
// import { flex } from "$/styled-system/patterns";
// import { css } from "$/styled-system/css";
// import { nonSelected, selected } from "@/app/styles/filterStyles";

// // Styles
// const popUpWrapper = flex({
//     flexDirection: "column",
//     gap: "0.3rem",
//     backgroundColor: "rgba(0,0,0,0.7)",
//     opacity: "0.9",
//     padding: "0.1rem 0.2rem 0.1rem 0.1rem",
//     cursor: "pointer",
// });

// const branchWrapper = flex({
//     gap: "0.2rem",
// });

// const branchImage = css({
//     backgroundColor: "black",
//     height: "30px",
//     width: "30px",
// });

// const branchText = css({
//     color: "gray.200",
// });

// type BranchListProps = {
//     branches: string[];
//     onClick: (condition: FilterCondition) => void;
//     activeBranches?: string[];
// };

// const BranchList = ({ branches, activeBranches, onClick }: BranchListProps) => {
//     const isBranchActive = (branch: string): boolean => {
//         if (activeBranches) {
//             return activeBranches.includes(branch);
//         }
//         return false;
//     };

//     return (
//         <ul className={popUpWrapper}>
//             {branches.map((branchItem, index) => (
//                 <li
//                     key={index}
//                     className={branchWrapper}
//                     onClick={(e) => {
//                         e.stopPropagation();
//                         onClick({
//                             category: "branch",
//                             value: branchItem,
//                         });
//                     }}
//                 >
//                     <Image
//                         className={
//                             isBranchActive(branchItem)
//                                 ? `${selected} ${branchImage}`
//                                 : `${nonSelected} ${branchImage}`
//                         }
//                         src={getsubProfessionIdImage(branchItem)}
//                         height={30}
//                         width={30}
//                         alt="branch"
//                     />
//                     <span className={branchText}>
//                         {subProfessionIdMap[branchItem] || branchItem}
//                     </span>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default BranchList;
