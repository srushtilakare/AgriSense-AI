from flask import Blueprint, request, jsonify
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import json
import os

predict_bp = Blueprint('predict', __name__)

# Load model and class names
model = load_model('model/model.h5')
with open('model/class_names.json') as f:
    class_names = json.load(f)

def preprocess_image(image):
    image = image.resize((224, 224))
    image = np.array(image) / 255.0
    image = np.expand_dims(image, axis=0)
    return image

@predict_bp.route('', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['file']
    image = Image.open(file.stream)
    image_array = preprocess_image(image)
    predictions = model.predict(image_array)[0]

    index = int(np.argmax(predictions))
    confidence = float(np.max(predictions))
    predicted_class = class_names[index]

    remedies = {
        "Healthy": "Your crop is healthy. No action required.",
        "Tomato___Early_blight": "Use fungicides, improve air circulation.",
        "Tomato___Late_blight": "Use copper-based fungicide. Remove infected leaves.",
    }

    return jsonify({
        "prediction": predicted_class,
        "confidence": confidence,
        "remedy": remedies.get(predicted_class, "General care and maintenance recommended.")
    })
