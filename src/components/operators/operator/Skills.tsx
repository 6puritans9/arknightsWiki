import Image from "next/image";
import { useState, useMemo } from "react";
import { getSkillImage } from "@/api/apiAws";
import { SingleOpType } from "@/api/apiMongo";
import { flex } from "$/styled-system/patterns";
import { css } from "$/styled-system/css";
import TextProcessor from "@/components/text/TextProcessor";
import { extractSkillRange } from "@/components/text/TextProcessor";
import RangeTable from "./RangeTable";

export type SkillsProps = {
    operator: SingleOpType;
};

//#region Styles
const selectorWrapper = flex({
    justifyContent: "space-between",
    gap: "0.5rem",
    cursor: "pointer",
    width: "100%",
    marginBottom: {
        base: "1rem",
    },
});

const skillImageStyle = css({
    height: {
        base: "30px",
        md: "60px",
    },
});

const selectorStyle = flex({
    gap: {
        base: "0.5rem",
    },
});

const levelSelectorWrapper = flex({
    gap: {
        base: "0.5rem",
    },
    cursor: "pointer",
});

const selected = css({
    color: "red",
    fontWeight: "bold",
});
//#endregion

const Skills = ({ operator }: SkillsProps) => {
    const [activeSkillId, setActiveSkillId] = useState<string>(
        operator.skills[0].skillId
    );
    const [activeLevel, setActiveLevel] = useState<number>(
        operator.skillDetails[0].levels.length - 1
    );

    //#region Helper Functions
    const skillTableMap = Object.fromEntries(
        operator.skillDetails.map((detail) => [detail._id, detail])
    );
    const orderedSkillTable = operator.skills.map(
        (skill) => skillTableMap[skill.skillId]
    );

    const currentSkill = skillTableMap[activeSkillId];
    const currentSkillIndex = operator.skillDetails.findIndex(
        (detail) => detail._id === activeSkillId
    );

    //#endregion

    //#region caching dynamic text
    const parsedDesc = useMemo(() => {
        if (!currentSkill) return [];

        const rawDescription = currentSkill.levels[activeLevel].description;

        return TextProcessor.from(rawDescription)
            .parseRichText()
            .parseNewlines()
            .fillValues(operator, currentSkillIndex, activeLevel)
            .parsePopovers()
            .getResult();
    }, [currentSkill, currentSkillIndex, activeLevel, operator]);

    const skillRange = useMemo(() => {
        return extractSkillRange(operator, currentSkillIndex, activeLevel);
    }, [operator, currentSkillIndex, activeLevel]);
    //#endregion

    const handleSkillClick = (skillId: string, idx: number) => {
        setActiveSkillId(skillId);
        setActiveLevel(operator.skillDetails[idx]?.levels.length - 1);
    };

    return (
        <>
            <div className={selectorWrapper}>
                {orderedSkillTable.map((skill, idx) => {
                    const id = skill.skillId;
                    const iconId = skill.iconId || id;
                    const skillName = skill.levels[0].name;

                    return (
                        <figure
                            key={idx}
                            onClick={() => handleSkillClick(id, idx)}
                            className={selectorStyle}
                        >
                            <Image
                                src={getSkillImage(iconId)}
                                className={skillImageStyle}
                                width={60}
                                height={60}
                                alt="skillImg"
                            />
                            <figcaption>
                                <section>{skillName}</section>
                            </figcaption>
                        </figure>
                    );
                })}
            </div>
            {currentSkill && (
                <article>
                    <div className={levelSelectorWrapper}>
                        {currentSkill.levels.map((level, idx) => (
                            <span
                                key={idx}
                                className={activeLevel === idx ? selected : ""}
                                onClick={() => setActiveLevel(idx)}
                            >
                                {idx === 7
                                    ? "M1"
                                    : idx === 8
                                      ? "M2"
                                      : idx === 9
                                        ? "M3"
                                        : idx + 1}
                            </span>
                        ))}
                    </div>
                    <section>
                        <p>{parsedDesc}</p>
                        {skillRange && (
                            <>
                                <p
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    projectile buff range
                                </p>
                                <RangeTable
                                    range={skillRange}
                                    projectileSelf={true}
                                />
                            </>
                        )}

                        {currentSkill.levels[activeLevel].rangeId && (
                            <RangeTable
                                range={currentSkill.levels[activeLevel].rangeId}
                            />
                        )}
                    </section>
                </article>
            )}
        </>
    );
};

export default Skills;
