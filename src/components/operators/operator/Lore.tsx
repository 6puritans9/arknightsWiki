import { SingleOpType } from "@/api/apiMongo";
import { nationIdMap, groupIdMap, teamIdMap } from "@/lib/constants/NameMap";

type LoreProps = {
    operator: SingleOpType;
};

const Lore = ({ operator }: LoreProps) => {
    const nation = nationIdMap[operator.nationId] || operator.nationId;
    const group = operator.groupId
        ? groupIdMap[operator.groupId] || operator.groupId
        : null;
    const team = operator.teamId
        ? teamIdMap[operator.teamId] || operator.teamId
        : null;

    return (
        <div>
            <p>{`Nation: ${nation}`}</p>
            {operator.teamId && <p>{`Team: ${team}`}</p>}
            {operator.groupId && <p>{`Group: ${group}`}</p>}
            {operator.itemUsage && <p>{`itemUsage: ${operator.itemUsage}`}</p>}
            {operator.itemDesc && <p>{`itemDesc: ${operator.itemDesc}`}</p>}
        </div>
    );
};

export default Lore;
