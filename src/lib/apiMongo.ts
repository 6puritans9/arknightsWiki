import { MongoClient } from "mongodb";

//#region character_table Type Definitions
type attributesKeyFrameType = {
    level: number;
    data: {
        maxHp: number;
        atk: number;
        def: number;
        magicResistance: number;
        cost: number;
        blockCnt: number;
        moveSpeed: number;
        attackSpeed: number;
        baseAttackTime: number;
        respawnTime: number;
        hpRecoveryPerSec: number;
        spRecoveryPerSec: number;
        maxDeployCount: number;
        maxDeckStackCnt: number;
        tauntLevel: number;
        massLevel: number;
        baseForceLevel: number;
        stunImmune: boolean;
        silenceImmune: boolean;
        sleepImmune: boolean;
        frozenImmune: boolean;
        levitateImmune: boolean;
        disarmedCombatImmune: boolean;
        fearedImmune: boolean;
    };
};

type PhaseType = {
    characterPrefabKey: string;
    rangeId: string;
    maxLevel: number;
    attributesKeyFrames: attributesKeyFrameType[];
    evolveCost?: {
        id: string;
        count: number;
        type: string;
    }[];
};

type levelUpCostCondType = {
    unlockCond: {
        phase: string;
        level: number;
    };
    lvlUpTime: number;
    levelUpCost: {
        id: string;
        count: number;
        type: string;
    }[];
};

type skillType = {
    skillId: string;
    levelUpCostCond: levelUpCostCondType[];
};

type skillDetailType = {
    _id: string;
    skillId: string;
    hidden: boolean;
    levels: {
        name: string;
        description: string;
        skillType: string;
        durationType: string;
        spData: {
            spType: string;
            maxChargeTime: number;
            spCost: number;
            initSp: number;
            increment: number;
        };
        prefabId: string;
        duration: number;
        blackboard: {
            [key: string]: number;
        };
    }[];
};

export type ThumbnailOperatorType = {
    _id: string;
    name: string;
    appellation: string | null;
    rarity: number;
    profession: string;
    subProfessionId: string;
    nationId: string;
    teamId: string | null;
    groupId: string | null;
    displayNumber: string;
};

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
    phases: PhaseType[];
    skills: skillType[];
    skillDetails: skillDetailType[];
    // talents: 1;
    // potentialRanks: 1;
    // favorKeyFrames: 1;
    // allSkillLvlup: 1;
};
//#endregion Type Definitions

//#region building_data Type Definitions
export type BuildingCharType = {
    charId: string;
    buffChar: {
        buffData: {
            buffId: string;
            cond: {
                phase: string;
                level: number;
            };
        }[];
    }[];
};

export type BuildingBuffType = {
    buffId: string;
    buffName: string;
    buffIcon: string;
    skillIcon: string;
    sortId: number;
    buffColor: string;
    textColor: string;
    buffCategory: string;
    roomType:
        | "CONTROL"
        | "DORMITORY"
        | "HIRE"
        | "MANUFACTURE"
        | "MEETING"
        | "POWER"
        | "TRADING"
        | "TRAINING"
        | "WORKSHOP";
    description: string;
};
//#endregion

//#region Database mapping
const LANGUAGE_DB_MAP: { [key: string]: string } = {
    en: "data_en",
    cn: "data_cn",
    ja: "data_jp",
    kr: "data_kr",
    tw: "data_tw",
};
const rarityMap: { [key: string]: number } = {
    TIER_1: 1,
    TIER_2: 2,
    TIER_3: 3,
    TIER_4: 4,
    TIER_5: 5,
    TIER_6: 6,
};
//#endregion Database mapping

// MongoDB client instance
let client: MongoClient;

// Helper function to clean string fields
const cleanStringField = (value: string): string | null => {
    if (!value) {
        return null;
    }

    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
};

// Main Functions
const getClient = async () => {
    if (!client) {
        client = new MongoClient(process.env.MONGODB_URI as string);
        await client.connect();
    }

    return client;
};

const fetchAllOperators = async (
    lang: string = "en"
): Promise<ThumbnailOperatorType[]> => {
    try {
        const mongoClient = await getClient();
        const dbName = LANGUAGE_DB_MAP[lang];
        const db = mongoClient.db(dbName);
        const collection = db.collection("character_table");

        // TODO: add query for position, isLimited
        let query = collection.find(
            {
                $and: [
                    { isNotObtainable: false },
                    { maxPotentialLevel: { $gt: 0 } },
                ],
            },
            {
                projection: {
                    _id: 1,
                    name: 1,
                    appellation: 1,
                    rarity: 1,
                    profession: 1,
                    subProfessionId: 1,
                    nationId: 1,
                    teamId: 1,
                    groupId: 1,
                    displayNumber: 1,
                },
            }
        );

        // TODO: sort by rarity, releaseOrder,
        query = query.sort({ rarity: -1, displayNumber: -1 });
        const operators = await query.toArray();

        return operators.map((op) => ({
            _id: op._id.toString(),
            name: op.name,
            appellation: op.appellation || null,
            rarity: rarityMap[op.rarity],
            profession: op.profession,
            subProfessionId: op.subProfessionId,
            nationId: op.nationId,
            teamId: op.teamId || null,
            groupId: op.groupId || null,
            displayNumber: op.displayNumber,
        }));
    } catch (error) {
        console.error("Error fetching operators:", error);
        throw new Error("Failed to fetch operators");
    }
};

const fetchOperatorWithSkills = async (
    name: string,
    collectionName: string,
    lang: string = "en"
) => {
    const decodedName = decodeURIComponent(name);

    try {
        const mongoClient = await getClient();
        const dbName = LANGUAGE_DB_MAP[lang];
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);

        const pipeline = [
            {
                $match: {
                    name: decodedName,
                    isNotObtainable: false, // filter npc characters
                },
            },
            // Lookup to join skills
            {
                $lookup: {
                    from: "skill_table",
                    localField: "skills.skillId",
                    foreignField: "_id",
                    as: "skillDetails",
                },
            },
            {
                $project: {
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
                    phases: 1,
                    skills: 1,
                    skillDetails: 1,
                    // talents: 1,
                    // potentialRanks: 1,
                    // favorKeyFrames: 1,
                    // allSkillLvlup: 1,
                },
            },
        ];

        const result = await collection.aggregate(pipeline).toArray();
        if (!result || result.length === 0) {
            console.warn(
                `Entity with name "${decodedName}" not found in collection "${collectionName}"`
            );
            return null;
        }

        const entity = result[0];

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
            phases: entity.phases,
            skills: entity.skills,
            skillDetails: entity.skillDetails,
            // talents: 1,
            // potentialRanks: 1,
            // favorKeyFrames: 1,
            // allSkillLvlup: 1,
        } as OperatorType;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
};

const fetchAllBuildingData = async (lang: string = "en") => {
    try {
        const mongoClient = await getClient();
        const dbName = LANGUAGE_DB_MAP[lang];
        const db = mongoClient.db(dbName);
        const collection = db.collection("building_data");

        const charsPipeline = [
            {
                $project: {
                    charsArray: { $objectToArray: "$chars" },
                },
            },
            { $unwind: "$charsArray" },
            {
                $project: {
                    charId: "$charsArray.k",
                    buffChar: "$charsArray.v.buffChar",
                },
            },
        ];
        const buffsPipeline = [
            {
                $project: {
                    buffsArray: { $objectToArray: "$buffs" },
                },
            },
            {
                $unwind: "$buffsArray",
            },
            {
                $replaceRoot: { newRoot: "$buffsArray.v" },
            },
        ];

        const [chars, buffs] = await Promise.all([
            collection.aggregate<BuildingCharType>(charsPipeline).toArray(),
            collection.aggregate<BuildingBuffType>(buffsPipeline).toArray(),
        ]);

        if (chars) {
            console.log("Fetched chars:", chars.length);
        }
        if (buffs) {
            console.log("Fetched buffs:", buffs.length);
        }

        return {
            chars: chars.map((char) => ({
                charId: char.charId.toString(),
                buffChar: char.buffChar.map((buff) => ({
                    buffData: Array.isArray(buff.buffData)
                        ? buff.buffData.map((data) => ({
                              buffId: data.buffId,
                              cond: data.cond,
                          }))
                        : [],
                })),
            })),
            buffs: buffs.map((buff) => ({
                buffId: buff.buffId,
                buffName: buff.buffName,
                buffIcon: buff.buffIcon,
                skillIcon: buff.skillIcon,
                sortId: buff.sortId,
                buffColor: buff.buffColor,
                textColor: buff.textColor,
                buffCategory: buff.buffCategory,
                roomType: buff.roomType,
                description: buff.description,
            })),
        };
    } catch (error) {
        console.error("Error fetching building data:", error);
        throw new Error("Failed to fetch building data");
    }
};

export { fetchOperatorWithSkills, fetchAllOperators, fetchAllBuildingData };
