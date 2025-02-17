import { FilterCondition } from "@/lib/types";
import { useState } from "react";

type filterProps = {
    onClick: (condition: FilterCondition) => void;
};

const Filter = ({ onClick }: filterProps) => {
    const [tab, setTab] = useState(0);

    return (
        <div className="filter__container">
            <div className="filter__rarity">
                <h1>Rarity</h1>
                <h1 onClick={() => onClick({ category: "rarity", value: 6 })}>
                    6
                </h1>
                <h1 onClick={() => onClick({ category: "rarity", value: 5 })}>
                    5
                </h1>
            </div>
            <div className="filter__class">
                <h1 style={{ color: "black" }}>Class</h1>
                <h1
                    onClick={() =>
                        onClick({ category: "class", value: "Vanguard" })
                    }
                >
                    Vanguard
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "class", value: "Guard" })
                    }
                >
                    Guard
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "class", value: "Sniper" })
                    }
                >
                    Sniper
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "class", value: "Caster" })
                    }
                >
                    Caster
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "class", value: "Medic" })
                    }
                >
                    Medic
                </h1>
            </div>
            <div className="filter__faction">
                <h1 style={{ color: "black" }}>Faction</h1>
                <h1
                    onClick={() =>
                        onClick({
                            category: "faction",
                            value: "Penguin Logistics",
                        })
                    }
                >
                    Penguin
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "faction", value: "Iberia" })
                    }
                >
                    Iberia
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "faction", value: "Siracusa" })
                    }
                >
                    Siracusa
                </h1>
                <h1
                    onClick={() =>
                        onClick({ category: "faction", value: "Sargon" })
                    }
                >
                    Sargon
                </h1>
            </div>
            <h1
                style={{ color: "red", textAlign: "center" }}
                onClick={() => onClick({})}
            >
                RESET
            </h1>
        </div>
    );
};

export default Filter;
