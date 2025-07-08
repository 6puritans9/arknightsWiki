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

//#region Styles
const phaseWrapper = flex({
    padding: "0.5rem 3rem",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    filter: "invert(1)",
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

const toggleButton = css({
    width: "100%",
    cursor: "pointer",
    padding: "0.5rem",
    backgroundColor: "gray.200",
    border: "1px solid gray.400",
    borderRadius: "4px",
    marginTop: "0.5rem",
    textAlign: "center",
    _hover: {
        backgroundColor: "gray.300",
    },
});

const statWrapper = flex({
    justifyContent: "space-between",
});

const imageTextWrapper = flex({
    justifyContent: "flex-start",
    gap: {
        base: "0.1rem",
        md: "0.3rem",
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
        setShowExtraStats(false);
    }, []);

    const handleShowExtraStats = useCallback(() => {
        setShowExtraStats(true);
    }, []);

    return (
        <>
            {/* <p>parsed: {parsed}</p> */}
            <p>{desc}</p>

            <div className={phaseWrapper}>
                <Image
                    src={getEliteImage("0")}
                    width={30}
                    height={30}
                    alt="elite0"
                    onClick={() => handlePhaseChange(0)}
                ></Image>
                <Image
                    src={getEliteImage("1")}
                    width={30}
                    height={30}
                    alt="elite1"
                    onClick={() => handlePhaseChange(1)}
                ></Image>
                <Image
                    src={getEliteImage("2")}
                    width={30}
                    height={30}
                    alt="elite2"
                    onClick={() => handlePhaseChange(2)}
                ></Image>
            </div>
            <div style={{ overflow: "hidden" }}>
                <p>range: {currentPhase.rangeId}</p>
                <p>Level: {currentPhase.maxLevel}</p>

                <div className={infoContainer}>
                    {Object.entries(mainStats).map(([key, value]) => (
                        <div key={key} className={statWrapper}>
                            <div className={imageTextWrapper}>
                                <Image
                                    src={getIconImage(key)}
                                    alt={key}
                                    width={20}
                                    height={20}
                                />
                                <dt>{key}</dt>
                            </div>
                            <dd>{value}</dd>
                        </div>
                    ))}
                </div>

                {!showExtraStats && (
                    <button
                        className={toggleButton}
                        onClick={handleShowExtraStats}
                    >
                        Show Additional Stats
                    </button>
                )}

                {showExtraStats && (
                    <div className={extraStatsContainer}>
                        {Object.entries(extraStats).map(([key, value]) => (
                            <div key={key} className={statWrapper}>
                                <div className={imageTextWrapper}>
                                    <dt>{key}</dt>
                                </div>
                                <dd>{value}</dd>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Attributes;
