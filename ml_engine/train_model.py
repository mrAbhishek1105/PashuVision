import os
import tensorflow as tf
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2, preprocess_input
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import json

# Correct dataset path relative to this script
DATASET_DIR = "dataset" 
IMG_SIZE = (224, 224)
BATCH_SIZE = 10
EPOCHS = 100
LEARNING_RATE = 1e-4


def train():

    if not os.path.exists(DATASET_DIR):
        print(f"Dataset folder '{DATASET_DIR}' not found in {os.getcwd()}")
        return

    # Use 'preprocess_input' for MobileNetV2 (Expects [-1, 1] range)
    # Remove 'rescale=1./255' because preprocess_input handles scaling
    datagen = ImageDataGenerator(
        preprocessing_function=preprocess_input, 
        rotation_range=20,
        width_shift_range=0.2,
        height_shift_range=0.2,
        shear_range=0.2,
        zoom_range=0.2,
        horizontal_flip=True,
        fill_mode="nearest",
        validation_split=0.2
    )

    print("Loading training data...")
    train_gen = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode="categorical",
        subset="training",
        shuffle=True
    )

    print("Loading validation data...")
    val_gen = datagen.flow_from_directory(
        DATASET_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode="categorical",
        subset="validation",
        shuffle=True
    )

    if train_gen.samples == 0:
        print("No images found! Please check your dataset folder structure.")
        return

    num_classes = len(train_gen.class_indices)
    print("\nCLASS MAP:", train_gen.class_indices)

    base_model = MobileNetV2(
        weights="imagenet",
        include_top=False,
        input_shape=IMG_SIZE + (3,)
    )
    base_model.trainable = False

    x = GlobalAveragePooling2D()(base_model.output)
    x = Dense(128, activation="relu")(x)
    x = Dropout(0.5)(x)
    outputs = Dense(num_classes, activation="softmax")(x)

    model = Model(inputs=base_model.input, outputs=outputs)

    model.compile(
        optimizer=Adam(learning_rate=LEARNING_RATE),
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )

    print("\nTraining Phase 1 (Heads)...")
    model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS)

    # Fine-tuning
    print("\nTraining Phase 2 (Fine-tuning)...")
    base_model.trainable = True
    # Freeze lower layers, train top 50 
    # (Checking base_model layer count: MobileNetV2 has ~155 layers)
    for layer in base_model.layers[:-50]:
        layer.trainable = False

    model.compile(
        optimizer=Adam(learning_rate=1e-5), # Very low learning rate
        loss="categorical_crossentropy",
        metrics=["accuracy"]
    )

    model.fit(train_gen, validation_data=val_gen, epochs=EPOCHS) # Increase epochs for fine-tuning

    target_dir = "../backend/models"
    os.makedirs(target_dir, exist_ok=True)
    model.save(os.path.join(target_dir, "model.h5"))

    # SAVE CLASS INDEX MAP
    with open(os.path.join(target_dir, "class_map.json"), "w") as f:
        json.dump(train_gen.class_indices, f)

    print("\nModel and Class Map saved successfully.")


if __name__ == "__main__":
    train()
