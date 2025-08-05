from flask import Flask
from flask_cors import CORS

from routes.predict import predict_bp
from routes.weather import weather_bp
from routes.education import education_bp
from routes.history import history_bp
from routes.admin import admin_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(predict_bp, url_prefix='/api/predict')
app.register_blueprint(weather_bp, url_prefix='/api/weather')
app.register_blueprint(education_bp, url_prefix='/api/education')
app.register_blueprint(history_bp, url_prefix='/api/history')
app.register_blueprint(admin_bp, url_prefix='/api/admin')

if __name__ == "__main__":
    app.run(debug=True)
