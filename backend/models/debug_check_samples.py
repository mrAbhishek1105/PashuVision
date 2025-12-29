import os, json
import numpy as np
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

# Paths relative to where this script is: backend/models/
MODEL = "model.h5"
CLASS_MAP = "class_map.json"
# Dataset is in ml_engine/dataset. From backend/models, go up twice then to ml_engine/dataset
DATASET = "../../ml_engine/dataset"

if not os.path.exists(MODEL):
    print(f"Model not found at {MODEL}")
    exit()

model = load_model(MODEL)

if not os.path.exists(CLASS_MAP):
    print("Class Map not found")
    exit()

with open(CLASS_MAP) as f:
    class_map = json.load(f)

idx_to_class = {v:k for k,v in class_map.items()}

def preprocess(img_path):
    img = image.load_img(img_path, target_size=(224,224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    # FIX: Use preprocess_input matched to training
    x = preprocess_input(x)
    return x

if not os.path.exists(DATASET):
    print(f"Dataset path {DATASET} does not exist!")
    exit()

print(f"{'TRUE CLASS':<25} | {'PREDICTED':<25} | {'CONFIDENCE'}")
print("-" * 65)

for cls in sorted(os.listdir(DATASET)):
    folder = os.path.join(DATASET, cls)
    if not os.path.isdir(folder):
         continue
         
    files = os.listdir(folder)
    if not files:
        print(f"{cls:<25} | [No Images]")
        continue
        
    sample = files[0] # Take first image
    path = os.path.join(folder, sample)

    try:
        x = preprocess(path)
        pred = model.predict(x, verbose=0)
        idx = np.argmax(pred)
        predicted = idx_to_class.get(idx, "Unknown")
        conf = float(np.max(pred))

        print(f"{cls:<25} | {predicted:<25} | {conf:.2f}")
    except Exception as e:
        print(f"{cls:<25} | Error: {e}")
