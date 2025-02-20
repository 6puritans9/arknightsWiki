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

    const paddedCode =
        operator.code.toString().length < 3
            ? operator.code.toString().padStart(3, "0")
            : operator.code.toString();

    const operatorPath = `char_${paddedCode}_${operator.pathname}`;

    return (
        <article className="op-details">
            <section className="op-details__header">
                <h2>{operator.name}</h2>
            </section>
            <div className="op-details__image-container">
                <Image
                    src={`/operators/${operatorPath}/${operatorPath}_1.png`}
                    alt={operator.name}
                    width={500}
                    height={500}
                ></Image>
            </div>
            <section className="op-details__tabs">
                <Tabs onClick={(index) => () => setTab(index)} />
            </section>
            <section className="op-details__contents">
                {tab === 0 && <Attributes operator={operator} />}
                {tab === 1 && <Skills operator={operator} />}
                {tab === 2 && <Review operator={operator} />}
                {tab === 3 && <Synergy operator={operator} />}
                {tab === 4 && <Lore operator={operator} />}
            </section>
            <section className="op-details__tags">
                <h1>TAGS</h1>
            </section>
            <section className="op-details__vote">
                <h1>VOTE</h1>
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
            <p>{`Class: ${operator.class}`}</p>
            <p>{`Branch: ${operator.branch}`}</p>
            <p>{`Faction: ${operator.faction}`}</p>
            <p>{`Race: ${operator.race}`}</p>
            <p>{`Gender: ${operator.gender}`}</p>
            <p>{`Position: ${operator.position}`}</p>
            <p>{`Rarity: ${operator.rarity}`}</p>
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
            <h1 style={{ color: "red" }}>{operator.faction}</h1>
        </div>
    );
};

export default Details;
