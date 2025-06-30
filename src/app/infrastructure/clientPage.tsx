"use client";

import { useState, useMemo } from "react";
import { usePagination } from "@/hooks/usePagination";
import { css } from "../../../styled-system/css";
import { BuildingBuffType, BuildingCharType } from "@/lib/apiMongo";
import InfraCard from "@/components/infra/InfraCard";

type InfraClientPageProps = {
    initialData: {
        chars: BuildingCharType[];
        buffs: BuildingBuffType[];
        nameToIdMap: { [key: string]: string };
    };
};

const container = css({
    display: "grid",
    gridTemplateColumns: {
        base: "1fr",
        sm: "repeat(2, 1fr)",
        md: "repeat(4, 1fr)",
    },
    gap: "1.5rem",
    width: "100%",
    justifyItems: "center",
    padding: "1rem 0",
});

// const initialFilterState = {
//     selfName: null,
//     facility: null,
//     effects: null,
//     relations: null,
// };

// const baseReducer = (
//     state: BaseFilterState,
//     action: BaseFilterAction
// ): BaseFilterState => {
//     switch (action.type) {
//         case "SET_FACILITY":
//             return {
//                 ...state,
//                 facility: action.payload,
//                 selfName: action.selfName,
//             };
//         case "SET_EFFECTS":
//             return {
//                 ...initialFilterState,
//                 effects: action.payload,
//                 selfName: action.selfName,
//             };
//         case "SET_RELATIONS":
//             return {
//                 ...initialFilterState,
//                 relations: action.payload,
//                 selfName: action.selfName,
//             };
//         case "RESET":
//             return initialFilterState;
//     }
// };

const InfraClientPage = ({
    initialData: { chars, buffs, nameToIdMap: pathMap },
}: InfraClientPageProps) => {
    const buffMap = useMemo(() => {
        const map: { [key: string]: BuildingBuffType } = {};
        buffs.forEach((buff) => {
            map[buff.buffId] = buff;
        });

        return map;
    }, [buffs]);

    const { itemsToShow, hasMore, loaderRef } = usePagination(chars, 20);

    //     return (
    //         <>
    //             {chars.map((char) => {
    //                 return (
    //                     <InfraCard
    //                         key={char.charId}
    //                         char={char}
    //                         buffMap={buffMap}
    //                     />
    //                 );
    //             })}
    //         </>
    //     );
    // };
    return (
        <>
            <section className={container}>
                {itemsToShow.map((char) => (
                    <InfraCard
                        key={char.charId}
                        char={char}
                        buffMap={buffMap}
                    />
                ))}
            </section>
            {hasMore && (
                <div
                    ref={loaderRef}
                    className={css({
                        padding: "2rem",
                        textAlign: "center",
                        width: "100%",
                    })}
                >
                    <LoadingSpinner />
                </div>
            )}
        </>
    );
};

function LoadingSpinner() {
    return (
        <div
            className={css({
                display: "inline-block",
                width: "2rem",
                height: "2rem",
                border: "4px solid rgba(0,0,0,0.1)",
                borderRadius: "50%",
                borderLeftColor: "#09f",
                animation: "spin 1s linear infinite",
            })}
        >
            <style jsx>{`
                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>
        </div>
    );
}

export default InfraClientPage;
