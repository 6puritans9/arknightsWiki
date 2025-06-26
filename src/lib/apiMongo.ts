import { MongoClient } from "mongodb";

export type OperatorType = {
    _id: string;
    isNotObtainable: boolean; // determine npc characters
    name: string;
    description: string; // profession description
    itemUsage: string; // character description
    itemDesc: string; // character sub-description
    appellation: string | null; // " " or string
    position: string; // MELEE | RANGED | ALL
    isSpChar: boolean; // weird property; does not represent limited characters
    rarity: number;
    profession: string;
    subProfessionId: string;
    itemObtainApproach: string | null;
    nationId: string;
    groupId?: string;
    teamId?: string;
};

let client: MongoClient;
const LANGUAGE_DB_MAP: { [key: string]: string } = {
    en: "data_en",
    cn: "data_cn",
    ja: "data_jp",
    kr: "data_kr",
    tw: "data_tw",
};

const getClient = async () => {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
    }

    return client;
};

const fetchSingleEntity = async (
    name: string,
    collectionName: string,
    lang: string = "en"
) => {
    const decodedName = decodeURIComponent(name);
    const rarityMap: { [key: string]: number } = {
        TIER_1: 1,
        TIER_2: 2,
        TIER_3: 3,
        TIER_4: 4,
        TIER_5: 5,
        TIER_6: 6,
    };

    try {
        const mongoClient = await getClient();
        const dbName = LANGUAGE_DB_MAP[lang];
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);

        const entity = await collection.findOne(
            { name: decodedName, isNotObtainable: false }, // filters npc characters
            {
                projection: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    itemUsage: 1,
                    itemDesc: 1,
                    appellation: 1,
                    position: 1,
                    isSpChar: 1,
                    rarity: 1,
                    profession: 1,
                    subProfessionId: 1,
                    itemObtainApproach: 1,
                    nationId: 1,
                    groupId: 1,
                    teamId: 1,
                },
            }
        );

        if (!entity) {
            console.warn(
                `Entity with name "${decodedName}" not found in collection "${collectionName}"`
            );
            return null;
        }

        const cleanStringField = (value: string): string | null => {
            let trimmed = null;
            if (value) {
                trimmed = value.trim();
            }
            return trimmed || null;
        };

        return {
            _id: entity._id.toString(),
            name: entity.name,
            description: entity.description || "",
            itemUsage: entity.itemUsage || "",
            itemDesc: entity.itemDesc || "",
            appellation: cleanStringField(entity.appellation),
            position: entity.position,
            isSpChar: entity.isSpChar,
            rarity: rarityMap[entity.rarity],
            profession: entity.profession,
            subProfessionId: entity.subProfessionId,
            itemObtainApproach: cleanStringField(entity.itemObtainApproach),
            nationId: entity.nationId,
            groupId: cleanStringField(entity.groupId),
            teamId: cleanStringField(entity.teamId),
        } as OperatorType;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
};

export { fetchSingleEntity };
