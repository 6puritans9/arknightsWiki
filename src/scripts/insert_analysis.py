import os
import csv
import json
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(dotenv_path="C:/dev/arknightswiki/.env.local")
MONGO_URI = os.getenv("MONGODB_URI")
LANGS = ["cn", "en", "jp", "kr", "tw"]
CSV_PATH = "./assets/building_data_analysis - analysis.csv"


def parse_array_field(field):
    if not field:
        return []
    try:
        return json.loads(field)
    except Exception:
        return [s.strip() for s in field.split(",") if s.strip()]


def main():
    rows = []
    with open(CSV_PATH, encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            rows.append(row)

    client = MongoClient(MONGO_URI)

    for lang in LANGS:
        db_name = f"data_{lang}"
        db = client[db_name]
        collection = db["building_data"]
        print(f"\nProcessing language: {lang}")

        doc = collection.find_one()
        buffs = doc["buffs"]
        # Build a mapping from buffId to buff_key

        for row in rows:
            buff_key = row["buff_id"]
            if buff_key not in buffs:
                print(f"[{lang}] No buff with key={buff_key}")
                continue

            set_fields = {}
            for field in [
                "effects",
                "related_effects",
                "related_ops",
                "related_factions",
                "related_facilities",
            ]:
                value = parse_array_field(row.get(field, ""))
                if value:  # Only add if not empty
                    set_fields[f"buffs.{buff_key}.{field}"] = value

            if not set_fields:
                print(f"[{lang}] No non-empty fields to update for buffs.{buff_key}")
                continue

            update = {"$set": set_fields}
            result = collection.update_one(
                {f"buffs.{buff_key}": {"$exists": True}}, update
            )
            if result.matched_count == 0:
                print(f"[{lang}] No matching buff for buffs.{buff_key}")

    client.close()
    print("All updates complete.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("Script failed:", e)
        exit(1)
