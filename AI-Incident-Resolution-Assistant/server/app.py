from pathlib import Path

from flask import Flask, send_from_directory
from flask_cors import CORS
from flask_migrate import Migrate

from config import Config
from models import db

from routes.auth import auth_bp
from routes.incidents import incident_bp
from routes.ai import ai_bp

# ----------------------------------------------------
# React Build Path
# ----------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

CLIENT_BUILD = BASE_DIR.parent / "client" / "dist"

app = Flask(
    __name__,
    static_folder=str(CLIENT_BUILD),
    static_url_path=""
)

app.config.from_object(Config)

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


@app.route("/api")
def api_home():

    return {
        "message": "AI Incident Resolution Assistant API"
    }


# ----------------------------------------------------
# React Routes
# ----------------------------------------------------

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):

    requested = CLIENT_BUILD / path

    if path and requested.exists():

        return send_from_directory(
            CLIENT_BUILD,
            path
        )

    return send_from_directory(
        CLIENT_BUILD,
        "index.html"
    )


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=False
    )