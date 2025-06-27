import { useState } from "react";
import { TabProps } from "./OperatorTabs";
import { flex } from "../../../styled-system/patterns";
import { replaceTags, replacePlaceholder } from "@/utils/TextConverter";

const selectorWrapper = flex({
    gap: "0.5rem",
    cursor: "pointer",
    marginBottom: "1rem",
});

const getImgSrc = (skillId: string) => [
    `https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com/public/skills/skill_icon_${skillId}.png`,
    `https://arknights-wiki-assets.s3.ap-northeast-2.amazonaws.com/public/skills/skill_icon_${skillId}/skill_icon_${skillId}.png/skill_icon_${skillId}.png`, // Fallback image
];

const Skills = ({ operator }: TabProps) => {
    const [activeSkill, setActiveSkill] = useState<number>(0);
    const [activeLevel, setActiveLevel] = useState<number>(
        operator.skillDetails[0]?.levels.length - 1 || 9
    );

    //#region Helper Functions
    // Order of skills is determined by the index in operator.skillDetails
    const skillTableMap = Object.fromEntries(
        operator.skillDetails.map((detail) => [detail._id, detail])
    ); // creates a map of skill details by their ID then transforms it into an object
    const orderedSkillTable = operator.skills.map(
        (skill) => skillTableMap[skill.skillId]
    ); // maps the skills to their details based on skillId

    const handleSkillClick = (idx: number) => {
        setActiveSkill(idx);
        setActiveLevel(operator.skillDetails[idx]?.levels.length - 1 || 9);
    };

    return (
        <>
            <div>
                <div className={selectorWrapper}>
                    {orderedSkillTable.map((_, idx) => (
                        <span
                            key={idx}
                            onClick={() => handleSkillClick(idx)}
                            style={{
                                fontWeight:
                                    activeSkill === idx ? "bold" : "normal",
                                textDecoration:
                                    activeSkill === idx ? "underline" : "none",
                            }}
                        >
                            {idx + 1}
                        </span>
                    ))}
                </div>
                <ul>
                    {orderedSkillTable.map((skill, index) => {
                        if (activeSkill !== index) return null;
                        const id = skill.skillId;
                        const skillName = skill.levels[0].name;
                        const [primary, fallback] = getImgSrc(id);

                        return (
                            <li key={id}>
                                <article>
                                    <section>
                                        {skillName}
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={primary}
                                            width="30"
                                            height="30"
                                            alt={skillName}
                                            onError={(e) => {
                                                const target = e.currentTarget;
                                                if (target.src !== fallback) {
                                                    target.src = fallback;
                                                }
                                            }}
                                        />
                                    </section>
                                    <div>
                                        {skill.levels.map((level, idx) => (
                                            <span
                                                key={idx}
                                                onClick={() =>
                                                    setActiveLevel(idx)
                                                }
                                            >
                                                {idx + 1}
                                            </span>
                                        ))}
                                    </div>
                                    <section>
                                        <p>
                                            {replaceTags(
                                                replacePlaceholder(
                                                    skill.levels[activeLevel]
                                                        ?.description,
                                                    skill.levels[activeLevel]
                                                        ?.blackboard
                                                )
                                            )}
                                        </p>
                                    </section>
                                </article>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};

export default Skills;
