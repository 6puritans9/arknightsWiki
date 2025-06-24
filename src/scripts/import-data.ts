// src/scripts/import-data.ts
import { MongoClient } from "mongodb";
import fs from "fs";

const LANGUAGES: { [key: string]: string } = {
    cn: "data_cn",
    en: "data_en",
    kr: "data_kr",
    jp: "data_jp",
    tw: "data_tw",
};

const COLLECTIONS: { [key: string]: string } = {
    operators: "character_table",
    skills: "skill_table",
    building: "building_data",
    factions: "handbook_team_table",
    ranges: "range_table",
    patchedOperators: "char_patch_table",
    info: "handbook_info_table",
    charword: "charword_table",
    constData: "gamedata_const",
    enemies: "enemy_handbook_table",
    medals: "medal_table",
    skins: "skin_table",
    clues: "clue_data",
};

const getFilePath = (lang: string, collection: string): string => {
    return `./assets/ArknightsGamedata/${lang}/gamedata/excel/${COLLECTIONS[collection]}.json`;
};

// src/scripts/import-data.ts

const importData = async () => {
    console.log("🚀 Starting raw JSON import...");

    const client = new MongoClient(process.env.MONGODB_URI as string);

    try {
        await client.connect();
        console.log("✅ Connected to MongoDB");

        for (const [langCode, dbName] of Object.entries(LANGUAGES)) {
            console.log(`\n📝 Processing language: ${langCode} -> ${dbName}`);
            const db = client.db(dbName);

            for (const [collectionType, fileName] of Object.entries(
                COLLECTIONS
            )) {
                const filePath = getFilePath(langCode, collectionType);

                if (!fs.existsSync(filePath)) {
                    console.log(`⚠️  File not found: ${filePath}`);
                    continue;
                }

                console.log(`  📂 Importing ${fileName}.json`);

                try {
                    const rawData = JSON.parse(
                        fs.readFileSync(filePath, "utf8")
                    );
                    const collection = db.collection(fileName);

                    // Special handling for building_data - exclude customData
                    let dataToImport = rawData;
                    if (collectionType === "building") {
                        // Create a copy without customData
                        dataToImport = { ...rawData };
                        delete dataToImport.customData;
                        console.log(
                            `    🚫 Excluded customData from building_data`
                        );
                    }

                    // Clear existing data
                    await collection.deleteMany({});

                    // Convert object to array of documents
                    const documents = Object.entries(dataToImport).map(
                        ([key, value]) => ({
                            _id: key,
                            ...(value as any),
                        })
                    );

                    // Insert all documents
                    if (documents.length > 0) {
                        await collection.insertMany(documents);
                        console.log(
                            `    ✅ Inserted ${documents.length} documents`
                        );
                    } else {
                        console.log(`    ⚠️  No documents found`);
                    }
                } catch (error) {
                    console.error(`    ❌ Error importing ${fileName}:`, error);
                }
            }

            console.log(`✅ Completed ${langCode} database`);
        }

        console.log("\n🎉 All imports completed successfully!");
    } catch (error) {
        console.error("❌ Import failed:", error);
    } finally {
        await client.close();
        console.log("🔌 MongoDB connection closed");
    }
};

if (require.main === module) {
    importData().catch(console.error);
}

export { importData };
