from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from config import Config
from models import db

from routes.auth import auth_bp
from routes.incidents import incident_bp
from routes.ai import ai_bp

app = Flask(__name__)

app.config.from_object(Config)
app.register_blueprint(ai_bp)

db.init_app(app)

migrate = Migrate(app, db)

CORS(
    app,
    supports_credentials=True,
    origins=["http://localhost:5173"]
)

app.register_blueprint(auth_bp)
app.register_blueprint(incident_bp)


@app.route("/")
def home():
    return {
        "message": "AI Incident Resolution Assistant API"
    }


if __name__ == "__main__":
    app.run(debug=True)