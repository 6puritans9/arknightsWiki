import { useState } from "react";

type filterProps = {
    onClick: (condition: string) => void;
};

const Filter = ({ onClick }: filterProps) => {
    const [tab, setTab] = useState(0);

    return (
        <div className="filter__container">
            <div className="filter__rarity">
                <h1>Rarity</h1>
                <h1 onClick={() => onClick("6")}>6</h1>
                <h1 onClick={() => onClick("5")}>5</h1>
            </div>
            <div className="filter__class">
                <h1 style={{ color: "black" }}>Class</h1>
                <h1 onClick={() => onClick("Vanguard")}>Vanguard</h1>
                <h1 onClick={() => onClick("Guard")}>Guard</h1>
                <h1 onClick={() => onClick("Sniper")}>Sniper</h1>
                <h1 onClick={() => onClick("Caster")}>Caster</h1>
                <h1 onClick={() => onClick("Medic")}>Medic</h1>
            </div>
            <div className="filter__faction">
                <h1 style={{ color: "black" }}>Faction</h1>
                <h1>Penguin</h1>
                <h1>Iberia</h1>
            </div>
            <h1
                style={{ color: "red", textAlign: "center" }}
                onClick={() => onClick("")}
            >
                RESET
            </h1>
        </div>
    );
};

export default Filter;
