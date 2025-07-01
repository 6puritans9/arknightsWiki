import os
import csv
import json
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(dotenv_path="C:/dev/arknightswiki/.env.local")
MONGO_URI = os.getenv("MONGODB_URI")
LANGS = ["cn", "en", "jp", "kr", "tw"]
CSV_PATH = "./assets/operators - orders.csv"


def parse_array_field(field):
    if not field:
        return []
    try:
        return json.loads(field)
    except Exception:
        return [s.strip() for s in field.split(",") if s.strip()]


def main():
    client = MongoClient(MONGO_URI)

    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            charId = row["charId"]
            releaseOrder = int(row["releaseOrder"]) if row["releaseOrder"] else None
            isLimited = row["isLimited"].strip().upper() == "TRUE"
            alterOpId = row.get("alterOpId") or None
            baseOpId = row.get("baseOpId") or None
            recruit = parse_array_field(row.get("recruit", ""))

            update_fields = {
                "isLimited": isLimited,
                "releaseOrder": releaseOrder,
                "alterOpId": alterOpId,
                "baseOpId": baseOpId,
                "recruit": recruit,
            }

            for lang in LANGS:
                db = client[f"data_{lang}"]
                collection = db["character_table"]

                result = collection.update_one({"_id": charId}, {"$set": update_fields})
                if not result.matched_count:
                    print(f"[{lang}] No document found for _id: {charId}, skipping.")

    client.close()
    print("All updates complete.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("Script failed:", e)
        exit(1)
