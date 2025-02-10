import { useState } from "react";
import Image from "next/image";
import { Operator } from "@/lib/types";

type OperatorProps = {
    operator: Operator;
};

type onClickProps = {
    onClick: (index: number) => () => void;
};

const Details = ({ operator }: OperatorProps) => {
    const [tab, setTab] = useState<number>(0);

    return (
        <article className="op-details">
            <section className="op-details__header">
                <h2>{operator.name_en}</h2>
                <Image
                    src={`/operators/details/${operator.name_en.toLowerCase()}.png`}
                    alt={operator.name_en}
                    width={500}
                    height={500}
                ></Image>
            </section>
            <section>
                <div className="op-details__tabs">
                    <Tabs onClick={(index) => () => setTab(index)} />
                </div>
                <div className="op-details__contents">
                    {tab === 0 && <Attributes operator={operator} />}
                    {tab === 1 && <Skills operator={operator} />}
                    {tab === 2 && <Review operator={operator} />}
                    {tab === 3 && <Synergy operator={operator} />}
                    {tab === 4 && <Lore operator={operator} />}
                </div>
            </section>
        </article>
    );
};

// Inner Components
const Tabs = ({ onClick }: onClickProps) => {
    const items = ["Attributes", "Skills", "Review", "Synergy", "Lore"];

    return items.map((item, index) => (
        <div key={index} onClick={onClick(index)}>
            <h3>{item}</h3>
        </div>
    ));
};

const Attributes = ({ operator }: OperatorProps) => {
    return (
        <>
            <p>{`Class: ${operator.class_en}`}</p>
            <p>{`Branch: ${operator.branch_en}`}</p>
            <p>{operator.gender}</p>
            <p>{operator.position_en}</p>
            <p>{`Rarity: ${operator.rarity}`}</p>
            <h1>TAGS</h1>
        </>
    );
};

const Skills = ({ operator }: OperatorProps) => {
    return (
        <>
            <h1 style={{ color: "red" }}>SKILLS</h1>
        </>
    );
};

const Review = ({ operator }: OperatorProps) => {
    return (
        <div>
            <h1 style={{ color: "red" }}>REVIEW</h1>
        </div>
    );
};

const Synergy = ({ operator }: OperatorProps) => {
    return (
        <div>
            <h1 style={{ color: "red" }}>SYNERGY</h1>
        </div>
    );
};

const Lore = ({ operator }: OperatorProps) => {
    return (
        <div>
            <h1 style={{ color: "red" }}>{operator.faction_en}</h1>
        </div>
    );
};

export default Details;
