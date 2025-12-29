# 🐄 PashuVision Breed Recognition System

A full-stack AI application to identify Indian cattle and buffalo breeds from images. Uses **Flask** for the backend, **React** for the frontend, and **MobileNetV2** for breed classification.

## 🌟 New Features (Phase 2)
-   **Multi-Page UI**: Home, About, Developer, and Prediction pages.
-   **Premium Design**: Glassmorphism aesthetic with smooth animations.
-   **Rich Data**: Detailed stats (milk yield, lifespan) for every breed.
-   **Documentation**: Comprehensive Project Report included.

## 📂 Project Structure

- `frontend/` - React + Vite UI (now with Router).
- `backend/` - Flask API with MobileNetV2 inference logic.
- `ml_engine/` - Training scripts and dataset structure.

## 🚀 Setup & Run Instructions

### 1. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
pip install -r requirements.txt
python app.py
```
Key Notes:
- The server starts at `http://localhost:5000`.
- If no model is found in `models/`, it runs in **Mock Mode** (returns random predictions for UI testing).

### 2. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
- Open `http://localhost:5173` in your browser.

### 3. ML Model Training
To train the model yourself (Required for real predictions):
1. Add images to `ml_engine/dataset/` (Check `dataset_structure.txt`).
2. Run the training script:
```bash
cd ml_engine
python train_model.py
```
3. The trained model will be saved to `backend/models/model.h5`.

## 🛠 Tech Stack
- **Frontend**: React, Vite, Framer Motion, React Router
- **Backend**: Flask, Flask-CORS, TensorFlow/Keras
- **ML**: MobileNetV2 (Transfer Learning)

## 📄 Documentation
A detailed project report including methodology and architecture is available in the app or directly at:
[PROJECT_REPORT.md](frontend/public/PROJECT_REPORT.md)
