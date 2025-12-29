# import os
# import json
# import numpy as np
# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from PIL import Image, ImageOps
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing.image import img_to_array
# from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# app = Flask(__name__)
# CORS(app)

# MODEL_PATH = "models/model.h5"
# CLASS_MAP_PATH = "models/class_map.json"
# BREED_INFO_PATH = "breed_info.json"

# model = None
# IDX_TO_CLASS = {}
# BREED_INFO = {}

# # ------------------------------
# # Load Resources
# # ------------------------------
# def load_resources():
#     global model, IDX_TO_CLASS, BREED_INFO
    
#     # Load Model
#     if os.path.exists(MODEL_PATH):
#         try:
#             model = load_model(MODEL_PATH)
#             print("✅ Model loaded successfully.")
#         except Exception as e:
#             print(f"❌ Model load error: {e}")
#             model = None
#     else:
#         print("⚠ Model not found — running in mock mode.")

#     # Load Class Map
#     if os.path.exists(CLASS_MAP_PATH):
#         try:
#             with open(CLASS_MAP_PATH, "r") as f:
#                 cls_map = json.load(f)
#             IDX_TO_CLASS = {int(v): k for k, v in cls_map.items()} # Ensure index is int
#             print("📌 Class mapping loaded:", IDX_TO_CLASS)
#         except Exception as e:
#              print(f"❌ Error loading class map: {e}")
#     else:
#         print("⚠ class_map.json missing.")

#     # Load Breed Info
#     if os.path.exists(BREED_INFO_PATH):
#         with open(BREED_INFO_PATH, "r") as f:
#             BREED_INFO = json.load(f)
#     else:
#         print("⚠ breed_info.json missing.")

# load_resources()

# # ------------------------------
# # Image Preprocessing
# # ------------------------------
# def prepare_image(image, target_size=(224, 224)):
#     if image.mode != "RGB":
#         image = image.convert("RGB")

#     image = image.resize(target_size)
#     image = img_to_array(image)
#     image = np.expand_dims(image, axis=0)
    
#     # CRITICAL FIX: Use MobileNetV2 Preprocessing ([-1, 1] range)
#     # This replaces the previous /255.0 normalization
#     image = preprocess_input(image) 
    
#     return image

# def format_breed_name(key):
#     # key format expected: "cow_gir" or just "Gir" depending on folder name
#     # We clean it up nicely
#     name = key.lower().replace("cow_", "").replace("buffalo_", "").replace("_", " ")
#     return name.title()

# def get_category(key):
#     if "buffalo" in key.lower():
#         return "Buffalo"
#     return "Cattle"

# # ------------------------------
# # Prediction API
# # ------------------------------
# @app.route("/predict", methods=["POST"])
# def predict():
#     if "file" not in request.files:
#         return jsonify({"error": "No file uploaded"}), 400

#     file = request.files["file"]
#     if file.filename == "":
#         return jsonify({"error": "Empty filename"}), 400

#     try:
#         image = Image.open(file)
        
#         # Mock Mode
#         if model is None or not IDX_TO_CLASS:
#             import random
#             print("Using Mock Mode")
#             mock_breeds = ["Gir", "Sahiwal", "Murrah", "Jaffarabadi"]
#             breed = random.choice(mock_breeds)
#             return jsonify({
#                  "mode": "mock",
#                  "breed": breed,
#                  "confidence": 0.95,
#                  "category": "Buffalo" if breed in ["Murrah", "Jaffarabadi"] else "Cattle",
#                  "info": BREED_INFO.get(breed, {})
#             })

#         processed = prepare_image(image)
#         preds = model.predict(processed)
        
#         class_idx = int(np.argmax(preds[0]))
#         confidence = float(np.max(preds[0]))
        
#         if class_idx not in IDX_TO_CLASS:
#             return jsonify({"error": "Prediction index out of range of class map"}), 500

#         class_key = IDX_TO_CLASS[class_idx]
#         predicted_breed = format_breed_name(class_key)
#         category = get_category(class_key)

#         # Lookup info - handle key mismatches (e.g. breed_info has "Gir" but class_key is "cow_gir")
#         # We try to match the formatted name first
#         info = BREED_INFO.get(predicted_breed, {})
#         # If not found, try raw key
#         if not info:
#              info = BREED_INFO.get(class_key, {})

#         response = {
#             "breed": predicted_breed,
#             "confidence": confidence,
#             "category": category,
#             "info": info
#         }
        
#         return jsonify(response)

#     except Exception as e:
#         print("❌ Prediction Error:", e)
#         # return jsonify({"error": str(e)}), 500 # Don't crash frontend on error in debug
#         return jsonify({"error": "Prediction failed", "details": str(e)}), 500

# @app.route("/", methods=["GET"])
# def health():
#     return jsonify({
#         "status": "running",
#         "model_loaded": model is not None
#     })

# if __name__ == "__main__":
#     app.run(debug=True, host="0.0.0.0", port=5000)





# -----------------------------------------

import os
import json
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

app = Flask(__name__)
CORS(app)

MODEL_PATH = "models/model.h5"
CLASS_MAP_PATH = "models/class_map.json"
BREED_INFO_PATH = "breed_info.json"

model = None
IDX_TO_CLASS = {}
BREED_INFO = {}

# ------------------------------
# LOAD RESOURCES
# ------------------------------
def load_resources():
    global model, IDX_TO_CLASS, BREED_INFO

    # Load Model
    if os.path.exists(MODEL_PATH):
        try:
            model = load_model(MODEL_PATH)
            print("✅ Model Loaded")
        except Exception as e:
            print("❌ Model Load Error:", e)
            model = None
    else:
        print("⚠ Model not found — Mock Mode Enabled")

    # Load Class Map
    if os.path.exists(CLASS_MAP_PATH):
        with open(CLASS_MAP_PATH, "r") as f:
            mapping = json.load(f)

        # Convert to index→class form
        IDX_TO_CLASS = {int(v): k for k, v in mapping.items()}
        print("📌 Class Map:", IDX_TO_CLASS)
    else:
        print("⚠ class_map.json missing")

    # Load Breed Info
    if os.path.exists(BREED_INFO_PATH):
        with open(BREED_INFO_PATH, "r") as f:
            BREED_INFO.update(json.load(f))
        print("📚 Breed Info Loaded")
    else:
        print("⚠ breed_info.json missing")


load_resources()


# ------------------------------
# IMAGE PREPROCESS
# ------------------------------
def prepare_image(image, target_size=(224, 224)):
    if image.mode != "RGB":
        image = image.convert("RGB")

    image = image.resize(target_size)
    image = img_to_array(image)
    image = np.expand_dims(image, axis=0)

    # MobileNetV2 preprocessing scaling [-1,1]
    return preprocess_input(image)


# ------------------------------
# HELPERS
# ------------------------------
def format_breed_name(key: str):
    """Convert dataset key → clean readable name"""
    key = key.lower().replace("cow_", "").replace("buffalo_", "")
    key = key.replace("_", " ")
    return key.title()


def get_category(key: str):
    return "Buffalo" if "buffalo" in key.lower() else "Cattle"


def resolve_info(predicted_breed, class_key):
    """
    Always return the richest info match.
    Supports:
    - "Gir"
    - "cow_gir"
    - "Gir Cattle"
    - future entries
    """

    candidates = [
        predicted_breed,
        predicted_breed.title(),
        predicted_breed.strip(),
        class_key,
        class_key.title(),
    ]

    for k in candidates:
        if k in BREED_INFO:
            return BREED_INFO[k]

    return {}  # fallback


# ------------------------------
# PREDICT API
# ------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Invalid filename"}), 400

    try:
        image = Image.open(file)

        # Mock Mode (no model yet)
        if not model or not IDX_TO_CLASS:
            import random

            mock = random.choice(["Gir", "Sahiwal", "Murrah", "Jaffarabadi"])
            return jsonify({
                "mode": "mock",
                "breed": mock,
                "confidence": 0.99,
                "category": "Buffalo" if mock in ["Murrah", "Jaffarabadi"] else "Cattle",
                "info": BREED_INFO.get(mock, {})
            })

        processed = prepare_image(image)
        preds = model.predict(processed)

        class_idx = int(np.argmax(preds[0]))
        confidence = float(np.max(preds[0]))

        class_key = IDX_TO_CLASS.get(class_idx)

        if class_key is None:
            return jsonify({"error": "Invalid class index"}), 500

        predicted_breed = format_breed_name(class_key)
        category = get_category(class_key)

        info = resolve_info(predicted_breed, class_key)

        print("👉 Final Breed:", predicted_breed)
        print("👉 Info Sent:", list(info.keys()))

        return jsonify({
            "breed": predicted_breed,
            "confidence": confidence,
            "category": category,
            "info": info
        })

    except Exception as e:
        print("❌ Prediction Error:", e)
        return jsonify({"error": "Prediction failed", "details": str(e)}), 500


@app.route("/", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "model_loaded": model is not None,
        "classes_loaded": bool(IDX_TO_CLASS),
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
