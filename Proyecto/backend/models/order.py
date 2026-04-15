from datetime import datetime

from bson.objectid import ObjectId
from bson.objectid import InvalidId
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["diamond"]
collection = db["pedidos"]

def _serialize_order(order):
    order["_id"] = str(order["_id"])
    return order

def get_all_orders(cliente_id=None):
    query = {}

    if cliente_id:
        query["clienteId"] = cliente_id

    orders = list(collection.find(query).sort("fecha_creacion", -1))
    return [_serialize_order(order) for order in orders]

def create_order(data):
    now = datetime.now()
    products = []

    for product in data.get("productos", []):
        products.append({
            "productoId": product.get("productoId") or product.get("id"),
            "nombre": product.get("nombre"),
            "precio": product.get("precio", 0),
            "cantidad": product.get("cantidad", 1),
            "subtotal": product.get("subtotal", 0)
        })

    order = {
        "folio": f"PED-{now.strftime('%Y%m%d%H%M%S')}",
        "clienteId": data.get("clienteId", "CLI-LOCAL"),
        "cliente": data.get("cliente", "Usuario Cliente"),
        "productos": products,
        "total": data.get("total", 0),
        "fecha": now.strftime("%d/%m/%Y"),
        "fecha_creacion": now,
        "estado": "PENDIENTES"
    }

    result = collection.insert_one(order)
    order["_id"] = str(result.inserted_id)
    return order

def update_order_status(id, status):
    try:
        result = collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": {"estado": status}}
        )
        return result.matched_count == 1
    except InvalidId:
        return False
