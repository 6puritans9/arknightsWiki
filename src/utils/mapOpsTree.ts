import { OpsObjectType } from "@/api/apiMongo";

const mapOpsTree = (ops: OpsObjectType) => {
    //#region Class << branch
    const classSet = new Set<string>(
        Object.values(ops).map((o) => o.profession)
    );

    const classTree: { [key: string]: string[] } = ((classSet: Set<string>) => {
        const _classTree: { [key: string]: Set<string> } = {};
        classSet.forEach((className) => {
            _classTree[className] = new Set();
        });

        Object.values(ops).forEach((op) => {
            _classTree[op.profession].add(op.subProfessionId);
        });

        return Object.fromEntries(
            Object.entries(_classTree).map(([className, branches]) => [
                className,
                Array.from(branches),
            ])
        );
    })(classSet);
    //#endregion

    //#region Nation << (group | set)
    const nationSet = new Set<string>(
        Object.values(ops).map((o) => o.nationId)
    );

    const factionTree: { [key: string]: string[] } = ((
        nationSet: Set<string>
    ) => {
        const _factionTree: { [key: string]: Set<string> } = {};
        nationSet.forEach((nation) => {
            _factionTree[nation] = new Set();
        });

        Object.values(ops).map((v) => {
            const nation = v.nationId;
            const group = v.groupId;
            const team = v.teamId;

            if (group) {
                _factionTree[nation].add(group);
            }
            if (team) {
                _factionTree[nation].add(team);
            }
        });

        return Object.fromEntries(
            Object.entries(_factionTree).map(([nation, set]) => [
                nation,
                Array.from(set),
            ])
        );
    })(nationSet);
    //#endregion

    return { classTree, factionTree };
};

export default mapOpsTree;
