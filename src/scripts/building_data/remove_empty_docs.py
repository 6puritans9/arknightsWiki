import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv(dotenv_path="C:/dev/arknightswiki/.env.local")
MONGO_URI = os.getenv("MONGODB_URI")
FIELDS = [
    "effects",
    "related_effects",
    "related_ops",
    "related_factions",
    "related_facilities",
]

client = MongoClient(MONGO_URI)
db = client["data_kr"]
collection = db["building_data"]

doc = collection.find_one()
if not doc:
    print("No document found in building_data collection.")
    client.close()
    exit(1)

buffs = doc["buffs"]

unset_fields = {}
for buff_key, buff_obj in buffs.items():
    for field in FIELDS:
        if field in buff_obj and buff_obj[field] == []:
            unset_fields[f"buffs.{buff_key}.{field}"] = ""

if unset_fields:
    collection.update_one({"_id": doc["_id"]}, {"$unset": unset_fields})
    print("Removed empty arrays:", unset_fields)
else:
    print("No empty arrays found.")

client.close()
