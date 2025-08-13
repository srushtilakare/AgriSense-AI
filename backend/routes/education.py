from flask import Blueprint, jsonify
import json
import os

education_bp = Blueprint('education', __name__)

@education_bp.route('', methods=['GET'])
def get_disease_library():
    try:
        with open('model/disease_library.json') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
