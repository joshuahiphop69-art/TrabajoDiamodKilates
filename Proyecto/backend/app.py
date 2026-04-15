from pathlib import Path
from uuid import uuid4

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename

from models.product import get_all_prods, get_prod_by_id, create_prod, update_prod, delete_prod

app = Flask(__name__)
CORS(app)

BASE_DIR = Path(__file__).resolve().parent
IMAGES_DIR = BASE_DIR.parent / "frontend" / "public" / "images"
MAX_IMAGES = 4
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

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

@app.route('/list-products/<id>', methods=['GET'])
def get_prod_by_id_route(id):
    prod = get_prod_by_id(id)

    if prod:
        return jsonify(prod), 200

    return jsonify({"message": "Producto no encontrado"}), 404

@app.route("/list-products/<id>", methods=["PUT"])
def update_prod_route(id):
    data = request.json
    result = update_prod(id, data)
    return jsonify(result)

@app.route('/upload-product-images', methods=['POST'])
def upload_product_images():
    files = request.files.getlist('images')

    if not files:
        return jsonify({"message": "No se recibieron imágenes"}), 400

    if len(files) > MAX_IMAGES:
        return jsonify({"message": "Solo se permiten hasta 4 imágenes"}), 400

    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    saved_paths = []

    for file in files:
        filename = secure_filename(file.filename or "")
        extension = Path(filename).suffix.lower()

        if not extension or extension not in ALLOWED_EXTENSIONS:
            return jsonify({"message": "Formato de imagen no permitido"}), 400

        new_filename = f"{uuid4().hex}{extension}"
        destination = IMAGES_DIR / new_filename
        file.save(destination)
        saved_paths.append(f"{request.host_url.rstrip('/')}/product-images/{new_filename}")

    return jsonify({"paths": saved_paths}), 201

@app.route('/product-images/<path:filename>', methods=['GET'])
def get_product_image(filename):
    response = send_from_directory(IMAGES_DIR, filename)
    response.headers["Cache-Control"] = "no-store"
    return response

@app.route('/list-products/<id>', methods=['DELETE'])
def delete_prod_route(id):
    result = delete_prod(id)
    if result.deleted_count > 0:
        return jsonify({"message": "Producto eliminado"}), 200
    else:
        return jsonify({"message": "Producto no encontrado"}), 404

if __name__ == '__main__':
    app.run(debug=True)
