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

print("=" * 60)
print("SECRET KEY:", app.config["SECRET_KEY"])
print("=" * 60)

db.init_app(app)

migrate = Migrate(app, db)

CORS(
    app,
    supports_credentials=True,
    origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ]
)

app.register_blueprint(auth_bp, url_prefix="/api")
app.register_blueprint(incident_bp, url_prefix="/api")
app.register_blueprint(ai_bp, url_prefix="/api")


@app.route("/")
def home():
    return {
        "message": "AI Incident Resolution Assistant API"
    }


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )