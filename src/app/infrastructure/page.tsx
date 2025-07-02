import InfraClientPage from "./clientPage";
import {
    RoomType,
    BuffsObjectType,
    fetchAllBuildingData,
} from "@/lib/apiMongo";
import { flex, grid } from "../../../styled-system/patterns";

import ClientSideFilterWrapper from "@/components/Filter/infra/ClientSideFilterWrapper";

//#region Styles
const wrapper = flex({
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
});

const filterContainer = grid({
    gridTemplateColumns: "1fr 9fr",
    gridTemplateAreas: `
    "rarity-label rarity-content"
    "class-label class-content"
    "faction-label faction-content"
  `,
    gap: "1rem",
    justifyItems: "flex-start",
    marginBottom: "1rem",
    width: "100%",
});

const cardContainer = grid({
    gridTemplateColumns: {
        base: "1fr",
        sm: "repeat(2, 1fr)",
        lg: "repeat(4, 1fr)",
    },
    gap: "1rem",
    justifyItems: "center",
    width: "100%",
    padding: "1rem 0",
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
        <div className={wrapper}>
            {/* Hydration */}
            <section className={filterContainer}>
                <ClientSideFilterWrapper
                    buffs={buffs}
                    roomEffectTree={roomEffectTree}
                    ops={chars}
                />
            </section>

            {/* Server-rendered operators */}
            <section id="initial-operators" className={cardContainer}>
                {/* {initialVisibleOperators.map((operator, index) => (
                    <OpsThumbnail
                        key={operator._id}
                        operator={operator}
                        priority={index < 5}
                    />
                ))} */}

                <InfraClientPage initialData={{ chars, buffs }} />
            </section>
        </div>
    );
};

export default InfraPage;
