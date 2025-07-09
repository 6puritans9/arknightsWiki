import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import {
    parseRichText,
    NewlineRichText,
} from "@/components/text/TextConverter";
import { TabProps } from "./OperatorTabs";
import { flex, grid } from "$/styled-system/patterns";
import { getEliteImage, getIconImage } from "@/api/apiAws";
import { css } from "$/styled-system/css";
import { statsMap } from "@/lib/dictionary";
import RangeTable from "./RangeTable";

//#region Styles
const phaseWrapper = flex({
    padding: { base: "0.5rem 1rem", md: "0.5rem 3rem" },
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
});

const infoContainer = grid({
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "repeat(4, 1fr)",
});

const extraStatsContainer = grid({
    gridTemplateColumns: "1fr 1fr", // Same styling as main container
    gridTemplateRows: "auto", // Auto rows for flexible content
    marginTop: {
        base: "0.5rem",
    },
});

const imageTextWrapper = flex({
    justifyContent: "flex-start",
    gap: {
        base: "0.1rem",
        md: "0.3rem",
    },
});

const statsValueWrapper = flex({
    fontSize: {
        base: "0.7rem",
        md: "fMd",
    },
    wordBreak: "break-word",
    justifyContent: "space-between",
    width: "100%",
});

const toggleButton = css({
    fontSize: {
        base: "fBase",
        md: "fMd",
    },
    width: "100%",
    padding: "0.5rem",
    cursor: "pointer",
    textAlign: "center",
    backgroundColor: "gray.200",
    border: "1px solid gray.400",
    marginTop: "0.5rem",
    _hover: {
        backgroundColor: "gray.300",
    },
});

const phaseContainer = flex({
    justifyContent: "center",
    alignItems: "center",
    paddingX: { base: "0", md: "3rem" },
    marginY: { base: "0.7rem" },
    cursor: "pointer",
    transition: "all 0.2s ease",
    _hover: {
        transform: {
            base: "scale(1.3)",
            md: "scale(1.5)",
        },
    },
});

const infoImageStyle = css({
    aspectRatio: "1/1",
    objectFit: "contain",
    height: { base: "20px", md: "40px" },
    width: {
        base: "20px",
        md: "40px",
    },
});

const levelTextStyle = css({
    margin: {
        base: "1rem 0",
    },
    textAlign: "center",
    fontWeight: "bolder",
});

const descTextStyle = css({
    textAlign: "center",
});

const inverted = css({
    filter: "invert(1)",
});

const selected = css({
    transform: {
        base: "scale(1.3)",
        md: "scale(1.5)",
    },
});
//#endregion

const MAIN_STAT_KEYS = [
    "maxHp",
    "atk",
    "def",
    "magicResistance",
    "cost",
    "blockCnt",
    "attackSpeed",
    "respawnTime",
];

const EXTRA_STAT_KEYS = [
    "moveSpeed",
    "baseAttackTime",
    "hpRecoveryPerSec",
    "spRecoveryPerSec",
    "maxDeployCount",
    "maxDeckStackCnt",
    "tauntLevel",
    "massLevel",
];

const statKeys = (data: { [key: string]: number | boolean }) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => MAIN_STAT_KEYS.includes(key))
    );
};

const extraStatKeys = (data: { [key: string]: number | boolean }) => {
    return Object.fromEntries(
        Object.entries(data).filter(([key]) => EXTRA_STAT_KEYS.includes(key))
    );
};

const Attributes = ({ operator: op }: TabProps) => {
    const [phaseIdx, setPhaseIdx] = useState(0);
    const [showExtraStats, setShowExtraStats] = useState(false);

    //#region Memoization
    const desc = useMemo(() => {
        const parsed = parseRichText(op.description);

        return NewlineRichText(parsed);
    }, [op.description]);

    const currentPhase = useMemo(() => {
        return op.phases[phaseIdx];
    }, [op.phases, phaseIdx]);

    const mainStats = useMemo(() => {
        if (!currentPhase.attributesKeyFrames[1].data) {
            return {};
        }

        return statKeys(currentPhase.attributesKeyFrames[1].data);
    }, [currentPhase]);

    const extraStats = useMemo(() => {
        if (!currentPhase.attributesKeyFrames[1].data) {
            return {};
        }
        return extraStatKeys(currentPhase.attributesKeyFrames[1].data);
    }, [currentPhase]);

    const handlePhaseChange = useCallback((index: number) => {
        setPhaseIdx(index);
    }, []);

    //#endregion

    return (
        <>
            <p className={descTextStyle}>{desc}</p>

            <div className={phaseWrapper}>
                <div
                    className={`${phaseContainer} ${phaseIdx === 0 ? selected : ""}`}
                    onClick={() => handlePhaseChange(0)}
                >
                    <Image
                        src={getEliteImage("0")}
                        width={30}
                        height={30}
                        alt="elite0"
                        className={inverted}
                    />
                </div>
                <div
                    className={`${phaseContainer} ${phaseIdx === 1 ? selected : ""}`}
                    onClick={() => handlePhaseChange(1)}
                >
                    <Image
                        src={getEliteImage("1")}
                        width={30}
                        height={30}
                        alt="elite1"
                        className={inverted}
                    />
                </div>
                <div
                    className={`${phaseContainer} ${phaseIdx === 2 ? selected : ""}`}
                    onClick={() => handlePhaseChange(2)}
                >
                    <Image
                        src={getEliteImage("2")}
                        width={30}
                        height={30}
                        alt="elite2"
                        className={inverted}
                    />
                </div>
            </div>

            <div style={{ overflow: "hidden" }}>
                <RangeTable range={currentPhase.rangeId} />

                <p className={levelTextStyle}>
                    At Level {currentPhase.maxLevel}(Max)
                </p>

                <div className={infoContainer}>
                    {Object.entries(mainStats).map(([key, value]) => (
                        <div key={key}>
                            <div className={imageTextWrapper}>
                                <Image
                                    src={getIconImage(key)}
                                    className={infoImageStyle}
                                    alt={key}
                                    width={20}
                                    height={20}
                                />
                                <div className={statsValueWrapper}>
                                    <dt>{statsMap[key].en}</dt>
                                    <dd>{value}</dd>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {!showExtraStats && (
                    <button
                        className={toggleButton}
                        onClick={() => setShowExtraStats(true)}
                    >
                        Show Additional Stats
                    </button>
                )}

                {showExtraStats && (
                    <div className={extraStatsContainer}>
                        {Object.entries(extraStats).map(([key, value]) => (
                            <div key={key}>
                                <div className={imageTextWrapper}>
                                    <div className={statsValueWrapper}>
                                        <dt>{statsMap[key].en}</dt>
                                        <dd>{value}</dd>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Attributes;
