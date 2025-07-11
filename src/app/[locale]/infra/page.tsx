import InfraClientPage from "./clientPage";
import {
    RoomType,
    BuffsObjectType,
    fetchAllBuildingData,
} from "@/api/apiMongo";
import { flex } from "$/styled-system/patterns";
import ClientSideFilterWrapper from "@/components/filter/infra/ClientSideFilterWrapper";

//#region Styles
const pageWrapper = flex({
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    margin: "0 auto",
});

//#endregion

const InfraPage = async () => {
    const { chars, buffs } = await fetchAllBuildingData();

    const roomEffectTree: { [key: string]: string[] } = ((
        buffs: BuffsObjectType
    ) => {
        const _roomEffectTree: { [key: string]: Set<string> } = {};

        Object.values(buffs).forEach((buff) => {
            const roomType: RoomType = buff.roomType;
            const effects: string[] = buff.effects;

            _roomEffectTree[roomType] ??= new Set<string>();
            if (effects) {
                const flatEffects = effects.flat();
                for (const effect of flatEffects) {
                    _roomEffectTree[roomType].add(effect);
                }
            }
        });

        return Object.fromEntries(
            Object.entries(_roomEffectTree).map(([k, s]) => [k, Array.from(s)])
        ) as { [key in RoomType]: string[] };
    })(buffs);

    return (
        <div className={pageWrapper}>
            <ClientSideFilterWrapper
                buffs={buffs}
                roomEffectTree={roomEffectTree}
                ops={chars}
            />

            <InfraClientPage initialData={{ chars, buffs }} />
        </div>
    );
};

export default InfraPage;
