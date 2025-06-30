import { flex, grid } from "../../../styled-system/patterns";
import { fetchAllBuildingData } from "@/lib/apiMongo";
import InfraClientPage from "./clientPage";
import { RoomType, BuildingBuffType } from "@/lib/apiMongo";

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

const InfraPage = async () => {
    const { chars, buffs, nameToIdMap } = await fetchAllBuildingData();

    const roomBuffTree = ((buffs: BuildingBuffType[]) => {
        const _roomBuffTree: { [key in RoomType]?: BuildingBuffType[] } = {};

        buffs.forEach((buff) => {
            const roomType = buff.roomType as RoomType;

            if (!Array.isArray(_roomBuffTree[roomType])) {
                _roomBuffTree[roomType] = [];
            }
            _roomBuffTree[roomType].push(buff);
        });

        return _roomBuffTree;
    })(buffs);

    // const filterArgs = {
    //     rooms: Object.keys(roomBuffTree),
    //     buffs: Object.values(roomBuffTree).flat(),
    // };

    return (
        <div className={wrapper}>
            {/* Hydration */}
            <section className={filterContainer}>
                <div>
                    {/* {Object.entries(roomBuffTree).map(([roomType, buffs]) => (
                        <div key={roomType}>
                            <h3>{roomType}</h3>
                        </div>
                    ))} */}
                    <p>FILTER</p>
                </div>
                {/* <div>
                    {filterArgs.buffs.map((buff) => (
                        <div
                            key={buff.buffId}
                            style={{ marginBottom: "0.5rem" }}
                        >
                            <p>{`Name: ${buff.buffName}`}</p>
                            <p>{`ID: ${buff.buffId}`}</p>
                            <p>{`Category: ${buff.buffCategory}`}</p>
                            <p>{`Description: ${buff.description}`}</p>
                        </div>
                    ))}
                </div> */}
                {/* <ClientSideFilterWrapper
                    filterArgs={filterArgs}
                    classTree={classTree}
                    factionTree={factionTree}
                    initialData={data}
                /> */}
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
                <InfraClientPage initialData={{ chars, buffs, nameToIdMap }} />
            </section>
        </div>
    );
};

export default InfraPage;
