import os
import csv
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(dotenv_path="C:/dev/arknightswiki/.env.local")
MONGO_URI = os.getenv("MONGODB_URI")
CSV_PATH = "./assets/src_analysis.csv"
OUTPUT_CSV_PATH = "./assets/new_analysis.csv"

client = MongoClient(MONGO_URI)
db = client["data_en"]
collection = db["building_data"]

doc = collection.find_one()
buffs = doc["buffs"]

# Read existing CSV and collect names
rows = []
existing_names = set()

with open(CSV_PATH, encoding="utf-8", newline="") as infile:
    reader = csv.DictReader(infile)
    fieldnames = [fn for fn in reader.fieldnames]
    for row in reader:
        name = row.get("name", "")
        buff_id = row.get("buff_id", "")
        # If buff_id is empty or "0" and name matches a buff, insert correct buff_id
        if (not buff_id or buff_id == "0") and name:
            for b_id, buff in buffs.items():
                if buff.get("buffName", "") == name:
                    row["buff_id"] = b_id
                    break
        rows.append(row)
        if name:
            existing_names.add(name)

# Prepare new rows for buffs not in CSV (by name)
new_rows = []
for buff_id, buff in buffs.items():
    buff_name = buff.get("buffName", "")
    if buff_name and buff_name not in existing_names:
        new_row = {
            "buff_id": buff_id,
            "pathname": buff.get("pathname", ""),
            "name": buff_name,
            "effects": "",
            "related_effects": "",
            "related_ops": "",
            "related_factions": "",
            "related_facilities": "",
            "facility": buff.get("roomType", ""),
            "description": buff.get("description", ""),
        }
        new_rows.append(new_row)
        existing_names.add(buff_name)

# Write combined rows to output
with open(OUTPUT_CSV_PATH, "w", encoding="utf-8", newline="") as outfile:
    # Ensure all fieldnames are present and in order
    all_fieldnames = fieldnames
    for fn in [
        "buff_id",
        "pathname",
        "name",
        "effects",
        "related_effects",
        "related_ops",
        "related_factions",
        "related_facilities",
        "facility",
        "description",
    ]:
        if fn not in all_fieldnames:
            all_fieldnames.append(fn)
    writer = csv.DictWriter(outfile, fieldnames=all_fieldnames)
    writer.writeheader()
    for row in rows:
        writer.writerow(row)
    for row in new_rows:
        writer.writerow(row)

print(f"Done! Output written to {OUTPUT_CSV_PATH}")
