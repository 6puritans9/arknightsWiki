import { TabProps } from "./OperatorTabs";

const Lore = ({ operator }: TabProps) => {
    return (
        <div>
            <h1>{operator.faction}</h1>
        </div>
    );
};

export default Lore;
