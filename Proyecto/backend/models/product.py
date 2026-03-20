from pymongo import MongoClient
from bson.objectid import ObjectId
from bson.objectid import InvalidId

client = MongoClient("mongodb://localhost:27017/")
db = client["diamond"]
collection = db["productos"]

def get_all_prods():
    prods = list(collection.find())

    for prod in prods:
        prod["_id"] = str(prod["_id"])
    
    return prods

def create_prod(data):
    result = collection.insert_one(data)
    return str(result.inserted_id)

def update_prod(id, data):
    try:
        if "_id" in data:
            del data["_id"]

        result = collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )

        if result.matched_count == 1:
            return {"message": "Producto actualizado"}
        else:
            return {"message": "Producto no encontrado"}

    except InvalidId:
        return {"error": "ID de producto inválido"}

def delete_prod(id):
    return collection.delete_one({"_id": ObjectId(id)})