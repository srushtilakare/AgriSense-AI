from flask import Blueprint, request, jsonify
import requests

weather_bp = Blueprint('weather', __name__)

API_KEY = "YOUR_OPENWEATHERMAP_API_KEY"

@weather_bp.route('', methods=['GET'])
def get_weather():
    city = request.args.get('city', 'Pune')
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    try:
        response = requests.get(url)
        data = response.json()

        temp = data['main']['temp']
        humidity = data['main']['humidity']
        risk = "High" if humidity > 80 else "Low"

        return jsonify({
            "city": city,
            "temperature": temp,
            "humidity": humidity,
            "disease_risk": f"{risk} risk of fungal disease due to humidity"
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500
