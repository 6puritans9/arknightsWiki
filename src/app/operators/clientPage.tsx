"use client";

import { useReducer } from "react";
import Link from "next/link";
import {
    QueryOperators,
    OpsFilterCondition,
    OpsFilterState,
    OpsFilterAction,
} from "@/lib/types";
import Icon from "@/components/Icon";
import { OpsFilter } from "@/components/Filter/OpsFilter";
import { useOperatorStore } from "@/store/operatorStore";
import { css } from "../../../styled-system/css";
import { flex, grid } from "../../../styled-system/patterns";

// Styles
const contentWrapper = flex({
    flexDirection: "column",
});

const filterContainer = grid({
    gridTemplateColumns: "1fr 9fr",
    gridTemplateAreas: `
    "rarity-label rarity-content"
    "class-label class-content"
    "faction-label faction-content"
  `,
    gap: "1rem",
    justifyItems: "flex-start",
});

// Types
type OperatorsGridClientProps = {
    initialData: QueryOperators;
};

// Filter
const initialFilterState: OpsFilterState = {
    rarity: null,
    class: null,
    branch: null,
    faction: null,
};

const filterReducer = (
    state: OpsFilterState,
    action: OpsFilterAction
): OpsFilterState => {
    switch (action.type) {
        case "SET_CLASS":
            return { ...state, class: action.value, branch: null };
        case "SET_BRANCH":
            return { ...state, branch: action.value };
        case "SET_FACTION":
            return { ...state, faction: action.value };
        case "SET_RARITY":
            return { ...state, rarity: action.value };
        case "RESET":
            return initialFilterState;
    }
};

const OperatorsGridClient = ({ initialData }: OperatorsGridClientProps) => {
    const [filter, dispatch] = useReducer(filterReducer, initialFilterState);

    // const {
    //     filteredOperators,
    //     visibleCount,
    //     hasMore,
    //     filters,
    //     setAllOperators,
    //     incrementVisibleCount,
    //     updateFilter,
    //     resetFilters,
    //     applyFilters
    // } = useOperatorStore();

    if (initialData instanceof Error) {
        const error = initialData.message;
        return <div>{error}</div>;
    }

    const operators = initialData;
    const filterHandler = (condition: OpsFilterCondition) => {
        switch (condition.category) {
            case "class":
                dispatch({
                    type: "SET_CLASS",
                    value: condition.value as string,
                });
                break;
            case "branch":
                dispatch({
                    type: "SET_BRANCH",
                    value: condition.value as string,
                });
                break;
            case "faction":
                dispatch({
                    type: "SET_FACTION",
                    value: condition.value as string,
                });
                break;
            case "rarity":
                dispatch({
                    type: "SET_RARITY",
                    value: condition.value as number,
                });
                break;
            default:
                dispatch({ type: "RESET" });
        }
    };

    const classSet = new Set(operators.map((operator) => operator.class));
    const branchSet = new Set(operators.map((operator) => operator.branch));
    const factionSet = new Set(operators.map((operator) => operator.faction));

    const filterArgs = {
        rarity: Array.from({ length: 6 }, (_, i) => 6 - i),
        class: Array.from(classSet),
        branch: Array.from(branchSet),
        faction: Array.from(factionSet),
    };

    const filteredOperators = operators.filter((operator) => {
        return (
            (!filter.class || operator.class === filter.class) &&
            (!filter.branch || operator.branch === filter.branch) &&
            (!filter.faction || operator.faction === filter.faction) &&
            (!filter.rarity || operator.rarity === filter.rarity)
        );
    });

    const classTree: { [key: string]: string[] } = {};
    classSet.forEach((className) => {
        classTree[className] = Array.from(
            new Set(
                operators
                    .filter((operator) => operator.class === className)
                    .map((operator) => operator.branch)
            )
        );
    });

    return (
        <div className={contentWrapper}>
            <section className={filterContainer}>
                <OpsFilter
                    filterArgs={filterArgs}
                    classTree={classTree}
                    onClick={filterHandler}
                />
            </section>

            <section className="grid grid__icon">
                {filteredOperators.map((operator) => (
                    <Link
                        key={operator.id}
                        href={`/operators/${operator.name}`}
                        passHref
                    >
                        <Icon operator={operator} />
                    </Link>
                ))}
            </section>
        </div>
    );
};

export default OperatorsGridClient;
