import { memo } from "react";
import { css } from "$/styled-system/css";
import { flex } from "$/styled-system/patterns";

type RangeTableProps = {
    range: string;
};

const CELL_TYPES = {
    SELF: "self",
    ACTIVE: "active",
    EMPTY: "empty",
} as const;

//#region Styles
const container = flex({
    width: "100%",
    justifyContent: "center",
});

const tableStyle = css({
    borderCollapse: "separate",
    flexShrink: 0,
    borderSpacing: "2px",
});

const rowStyle = css({
    alignItems: "center",
});

const baseCellStyle = {
    height: { base: "12px", md: "16px" },
    width: { base: "12px", md: "16px" },
    borderRadius: "4px",
    padding: "0",
    margin: "0",
};

const activeCellStyle = css({
    ...baseCellStyle,
    border: "1px solid gray",
});

const operatorCellStyle = css({
    ...baseCellStyle,
    backgroundColor: "primary",
});

const emptyCellStyle = css({
    ...baseCellStyle,
});

const srOnlyStyle = css({
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0,0,0,0)",
    whiteSpace: "nowrap",
    border: "0",
});
//#endregion

const getCellClass = (cellType: string): string => {
    switch (cellType) {
        case "active":
            return activeCellStyle;
        case "self":
            return operatorCellStyle;
        case "empty":
        default:
            return emptyCellStyle;
    }
};

const getCellText = (cellType: string): string => {
    switch (cellType) {
        case "active":
            return "active cell";
        case "self":
            return "operator cell";
        case "empty":
        default:
            return "empty cell";
    }
};

const createGrid = (rangeId: string) => {
    const { SELF, ACTIVE, EMPTY } = CELL_TYPES;

    switch (rangeId) {
        case "x-4": {
            return [
                [ACTIVE, ACTIVE, ACTIVE],
                [ACTIVE, SELF, ACTIVE],
                [ACTIVE, ACTIVE, ACTIVE],
            ];
        }
        case "x-1": {
            return [
                [EMPTY, EMPTY, ACTIVE, EMPTY, EMPTY],
                [EMPTY, ACTIVE, ACTIVE, ACTIVE, EMPTY],
                [ACTIVE, ACTIVE, SELF, ACTIVE, ACTIVE],
                [EMPTY, ACTIVE, ACTIVE, ACTIVE, EMPTY],
                [EMPTY, EMPTY, ACTIVE, EMPTY, EMPTY],
            ];
        }
        case "3-12": {
            return [
                [ACTIVE, ACTIVE, EMPTY, EMPTY],
                [SELF, ACTIVE, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, EMPTY, EMPTY],
            ];
        }
        case "3-6": {
            return [
                [ACTIVE, ACTIVE, ACTIVE],
                [SELF, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, ACTIVE],
            ];
        }
        case "3-5": {
            return [
                [ACTIVE, ACTIVE, EMPTY],
                [ACTIVE, ACTIVE, ACTIVE],
                [SELF, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, EMPTY],
            ];
        }
        case "3-1": {
            return [
                [ACTIVE, ACTIVE, ACTIVE, EMPTY],
                [SELF, ACTIVE, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, ACTIVE, EMPTY],
            ];
        }
        case "2-3": {
            return [
                [ACTIVE, ACTIVE, EMPTY],
                [SELF, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, EMPTY],
            ];
        }
        case "2-1": {
            return [
                [ACTIVE, EMPTY, EMPTY],
                [ACTIVE, ACTIVE, EMPTY],
                [SELF, ACTIVE, ACTIVE],
                [ACTIVE, ACTIVE, EMPTY],
                [ACTIVE, EMPTY, EMPTY],
            ];
        }
        case "1-1":
        default: {
            return [[SELF]];
        }
    }
};

const RangeTable = memo(({ range }: RangeTableProps) => {
    const grid = createGrid(range);

    return (
        <div className={container}>
            <table className={tableStyle}>
                <thead>
                    <tr>
                        <th className={srOnlyStyle}></th>
                        {grid[0]?.map((_, colIndex) => (
                            <th
                                key={colIndex}
                                scope="col"
                                className={srOnlyStyle}
                            >
                                Y{colIndex + 1}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {grid.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowStyle}>
                            <th scope="row" className={srOnlyStyle}>
                                X{rowIndex + 1}
                            </th>

                            {row.map((cellType, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={getCellClass(cellType)}
                                >
                                    <span className={srOnlyStyle}>
                                        {getCellText(cellType)}
                                    </span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});

RangeTable.displayName = "RangeTable";

export default RangeTable;
