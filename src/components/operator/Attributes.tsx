import { TabProps } from "./OperatorTabs";

const Attributes = ({ operator }: TabProps) => {
    return (
        <>
            <p>{`Faction: ${operator.faction}`}</p>
            <p>{`Race: ${operator.races}`}</p>
            <p>{`Gender: ${operator.gender}`}</p>
            <p>{`Position: ${operator.position}`}</p>
            <p>{`Rarity: ${operator.rarity}`}</p>
        </>
    );
};

export default Attributes;
