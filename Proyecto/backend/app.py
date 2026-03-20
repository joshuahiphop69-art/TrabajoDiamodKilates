from flask import Flask, request, jsonify
from flask_cors import CORS
from models.product import get_all_prods, create_prod, update_prod, delete_prod

app = Flask(__name__)
CORS(app)

@app.route("/")
def inicio():
    return "API BaseData Working"

@app.route('/list-products', methods=['GET'])
def get_prods():
    prods = get_all_prods()
    return jsonify(prods), 200

@app.route('/list-products', methods=['POST'])
def add_prod():
    data = request.json
    prod_id = create_prod(data)

    return jsonify({
        "message": "Producto dado de alta",
        "id": prod_id
    }), 201

@app.route("/list-products/<id>", methods=["PUT"])
def update_prod_route(id):
    data = request.json
    result = update_prod(id, data)
    return jsonify(result)

@app.route('/list-products/<id>', methods=['DELETE'])
def delete_prod_route(id):
    result = delete_prod(id)
    if result.deleted_count > 0:
        return jsonify({"message": "Producto eliminado"}), 200
    else:
        return jsonify({"message": "Producto no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)