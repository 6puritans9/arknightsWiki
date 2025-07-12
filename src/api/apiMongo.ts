import { MongoClient, ObjectId } from "mongodb";
import { LANGUAGE_DB_MAP, rarityMap } from "../lib/constants/utilMap";

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

export type BlackboardEntry = {
    key: string;
    value: number;
    valueStr?: string;
};

export type BlackboardType = { [key: string]: number } | BlackboardEntry[];

type skillDetailType = {
    _id: string;
    skillId: string;
    iconId: string;
    hidden: boolean;
    levels: {
        name: string;
        rangeId?: string;
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
        blackboard?: BlackboardType;
    }[];
};

type CandidateType = {
    unlockCondition: {
        phase: "PHASE_0" | "PHASE_1" | "PHASE_2";
        level: number;
    };
};

type TalentType = {
    candidates: CandidateType[];
    requiredPotentialRank: number;
    prefabKey: string;
    name: string;
    description: string;
    blackboard: {
        [key: string]: number;
    };
    isHideTalent: boolean;
};

export type SingleOpType = {
    id: string;
    // isNotObtainable: boolean; // determine npc characters
    name: string;
    description: string; // profession description
    itemUsage: string; // character description
    itemDesc: string; // character sub-description
    appellation: string | null; // " " or string
    position: string; // MELEE | RANGED | ALL
    // isSpChar: boolean; // weird property; does not represent limited characters
    rarity: number;
    profession: string;
    subProfessionId: string;
    nationId: string;
    groupId: string | null;
    teamId: string | null;
    phases: PhaseType[];
    skills: skillType[];
    skillDetails: skillDetailType[];
    talents: TalentType[];
    // potentialRanks: 1;
    // favorKeyFrames: 1;
    // allSkillLvlup: 1;
    alterOpId: string | null;
    baseOpId: string | null;
    isLimited: boolean;
    recruit: string[];
    releaseOrder: number;
};

export type SimpleOpType = {
    name: string;
    appellation: string | null;
    rarity: number;
    position: string;
    profession: string;
    subProfessionId: string;

    nationId: string;
    teamId: string | null;
    groupId: string | null;

    releaseOrder: number;
    alterOpId: string | null;
    baseOpId: string | null;
    isLimited: boolean;
    recruit: string[];
};

type SimpleOpQuery = SimpleOpType & { _id: ObjectId };

export type OpsObjectType = {
    [id: string]: SimpleOpType;
};
//#endregion Type Definitions

//#region building_data Type Definitions
export type RoomType =
    | "CONTROL"
    | "DORMITORY"
    | "HIRE"
    | "MANUFACTURE"
    | "MEETING"
    | "POWER"
    | "TRADING"
    | "TRAINING"
    | "WORKSHOP"
    | "PRIVATE";

export type BuildingCharType = {
    charId: string;
    charName: string;
    charAppellation: string | null;
    nationId: string;
    teamId: string;
    groupId: string;
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

type BuildingCharQuery = BuildingCharType;

export type CharsObjectType = {
    [id: string]: BuildingCharType;
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
    roomType: RoomType;
    description: string;
    effects: string[];
    related_facilities?: string[];
    related_ops?: string[];
    related_factions?: string[];
    related_effects?: string[];
};

type BuildingBuffQuery = BuildingBuffType & { _id: ObjectId };

export type BuffsObjectType = {
    [id: string]: BuildingBuffType;
};
//#endregion

// MongoDB client instance
const MONGO_URI = process.env.MONGODB_URI as string;
let client: MongoClient;

const getClient = async () => {
    if (process.env.NODE_ENV === "development") {
        // @ts-expect-error: global type issue
        if (!global._mongoClient) {
            // @ts-expect-error: global type issue
            global._mongoClient = new MongoClient(MONGO_URI);
            // @ts-expect-error: global type issue
            await global._mongoClient.connect();
        }
        // @ts-expect-error: global type issue
        return global._mongoClient;
    }

    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }

    return client;
};

// Helper function to clean string fields
const cleanStringField = (value: string): string | null => {
    if (!value) {
        return null;
    }

    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
};

// Main Functions
const fetchAllOperators = async (locale: string) => {
    try {
        const mongoClient = await getClient();
        const dbName = LANGUAGE_DB_MAP[locale] || "data_en";
        const db = mongoClient.db(dbName);
        const collection = db.collection("character_table");

        const pipeline = [
            {
                $match: {
                    isNotObtainable: false,
                    maxPotentialLevel: { $gt: 0 },
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    appellation: 1,
                    rarity: 1,
                    position: 1,
                    profession: 1,
                    subProfessionId: 1,
                    nationId: 1,
                    teamId: 1,
                    groupId: 1,
                    releaseOrder: 1,
                    alterOpId: 1,
                    baseOpId: 1,
                    isLimited: 1,
                    recruit: 1,
                },
            },
        ];

        const opsArray: SimpleOpQuery[] = await collection
            .aggregate(pipeline)
            .toArray();

        return Object.fromEntries(
            opsArray.map((op) => [
                op._id.toString(),
                {
                    name: op.name,
                    appellation: op.appellation === " " ? null : op.appellation,
                    rarity: rarityMap[op.rarity],
                    position: op.position,
                    profession: op.profession,
                    subProfessionId: op.subProfessionId,
                    nationId: op.nationId,
                    teamId: op.teamId || null,
                    groupId: op.groupId || null,
                    releaseOrder: op.releaseOrder,
                    alterOpId: op.alterOpId,
                    baseOpId: op.baseOpId,
                    isLimited: op.isLimited,
                    recruit: op.recruit,
                },
            ])
        ) as OpsObjectType;
    } catch (error) {
        console.error("Error fetching operators:", error);
        throw new Error("Failed to fetch operators");
    }
};

const fetchSingleOperator = async (
    id: string,
    locale: string,
    collectionName: string
) => {
    const decodedId = decodeURIComponent(id);

    try {
        const mongoClient = await getClient();
        const dbName = LANGUAGE_DB_MAP[locale];
        const db = mongoClient.db(dbName);
        const collection = db.collection(collectionName);

        const pipeline = [
            {
                $match: {
                    _id: decodedId,
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
                `Entity with name "${decodedId}" not found in collection "${collectionName}"`
            );
            return null;
        }

        const entity = result[0];

        return {
            id: entity._id.toString(),
            name: entity.name,
            description: entity.description,
            itemUsage: entity.itemUsage,
            itemDesc: entity.itemDesc,
            appellation: entity.appellation === " " ? null : entity.appellation,
            position: entity.position,
            rarity: rarityMap[entity.rarity],
            profession: entity.profession,
            subProfessionId: entity.subProfessionId,
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
            alterOpId: entity.alterOpId,
            baseOpId: entity.alterOpId,
            isLimited: entity.isLimited,
            recruit: entity.recruit,
            releaseOrder: entity.releaseOrder,
        } as SingleOpType;
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
                $lookup: {
                    from: "character_table",
                    localField: "charsArray.k",
                    foreignField: "_id",
                    as: "operatorData",
                },
            },
            {
                $unwind: {
                    path: "$operatorData",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $project: {
                    _id: 0,
                    charId: "$charsArray.k",
                    charName: "$operatorData.name",
                    charAppellation: "$operatorData.appellation",
                    nationId: "$operatorData.nationId",
                    teamId: "$operatorData.teamId",
                    groupId: "$operatorData.groupId",
                    buffChar: "$charsArray.v.buffChar",
                },
            },
            {
                $project: {
                    operatorData: 0,
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
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            "$buffsArray.v",
                            { _id: "$buffsArray.k" },
                        ],
                    },
                },
            },
        ];

        const [chars, buffs]: [BuildingCharQuery[], BuildingBuffQuery[]] =
            await Promise.all([
                collection.aggregate(charsPipeline).toArray(),
                collection.aggregate(buffsPipeline).toArray(),
            ]);

        const charsObj: CharsObjectType = Object.fromEntries(
            chars.map(({ charId, charAppellation, ...rest }) => [
                charId,
                {
                    charId,
                    charAppellation:
                        charAppellation === " " ? null : charAppellation,
                    ...rest,
                },
            ])
        );

        const buffsObj: BuffsObjectType = Object.fromEntries(
            buffs.map(({ _id, ...rest }) => [_id.toString(), { ...rest }])
        );

        const nameToIdMap: { [key: string]: string } = {};
        Object.entries(charsObj).forEach(([charId, values]) => {
            if (values.charAppellation) {
                nameToIdMap[values.charAppellation] = charId;
            }
            nameToIdMap[values.charName] = charId;
        });

        return {
            chars: charsObj,
            buffs: buffsObj,
            nameToIdMap,
        };
    } catch (error) {
        console.error("Error fetching building data:", error);
        throw new Error("Failed to fetch building data");
    }
};

export { fetchSingleOperator, fetchAllOperators, fetchAllBuildingData };
