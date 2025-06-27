import { useState } from "react";
import { css } from "../../../styled-system/css";
import { TabProps } from "./OperatorTabs";
import Image from "next/image";
import { flex } from "../../../styled-system/patterns";
import { convertAttrText } from "@/utils/TextConverter";

const phaseWrapper = flex({
    gap: "0.5rem",
    cursor: "pointer",
    alignItems: "center",
});

const filterRelated = (data: {
    [key: string]: number | boolean;
}): { [key: string]: number | boolean } => {
    const relatedKeys = [
        "maxHp",
        "atk",
        "def",
        "magicResistance",
        "cost",
        "blockCnt",
        "moveSpeed",
        "attackSpeed",
        "baseAttackTime",
        "respawnTime",
        "hpRecoveryPerSec",
        "spRecoveryPerSec",
        "maxDeployCount",
        "maxDeckStackCnt",
        "tauntLevel",
        "massLevel",
    ];

    return Object.fromEntries(
        Object.entries(data).filter(([key]) => relatedKeys.includes(key))
    );
};

const Attributes = ({ operator }: TabProps) => {
    const [phaseIdx, setPhaseIdx] = useState(0);
    const PHASE_IMG_SRC =
        "https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com/dynamicassets/arts/elite_hub";

    return (
        <>
            <p>Description: {convertAttrText(operator.description)}</p>
            <p>{`Position: ${operator.position}`}</p>
            <div className={phaseWrapper}>
                <Image
                    src={`${PHASE_IMG_SRC}/elite_0.png`}
                    width="30"
                    height="30"
                    alt="elite0"
                    onClick={() => setPhaseIdx(0)}
                ></Image>
                <Image
                    src={`${PHASE_IMG_SRC}/elite_1.png`}
                    width="30"
                    height="30"
                    alt="elite1"
                    onClick={() => setPhaseIdx(1)}
                ></Image>
                <Image
                    src={`${PHASE_IMG_SRC}/elite_2.png`}
                    width="30"
                    height="30"
                    alt="elite2"
                    onClick={() => setPhaseIdx(2)}
                ></Image>
            </div>
            {operator.phases.map((phase, index) => (
                <div key={index} style={{ overflow: "scroll" }}>
                    {index === phaseIdx && (
                        <>
                            <p>range: {phase.rangeId}</p>
                            <p>Level: {phase.maxLevel}</p>
                            <div>
                                {Object.entries(
                                    filterRelated(
                                        phase.attributesKeyFrames[1].data
                                    )
                                ).map(([key, value]) => (
                                    <p key={key}>
                                        {key}:{value}
                                    </p>
                                ))}
                            </div>
                            <div>
                                {phase.evolveCost &&
                                    phase.evolveCost.map(
                                        ({ id, count, type }, costIdx) => (
                                            <p key={costIdx}>
                                                {id}:{count} {type}
                                            </p>
                                        )
                                    )}
                            </div>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default Attributes;
