import os
from dotenv import load_dotenv

load_dotenv()


class Config:

    SECRET_KEY = os.getenv("SECRET_KEY")

    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URI",
        "sqlite:///app.db"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SESSION_COOKIE_HTTPONLY = True

    SESSION_COOKIE_SAMESITE = "Lax"

    # ==========================================
    # AI Provider
    # ==========================================

    AI_PROVIDER = os.getenv(
        "AI_PROVIDER",
        "ollama"
    )

    # ==========================================
    # Ollama
    # ==========================================

    OLLAMA_MODEL = os.getenv(
        "OLLAMA_MODEL",
        "llama3.2:latest"
    )

    EMBEDDING_MODEL = os.getenv(
        "OLLAMA_EMBEDDING_MODEL",
        "nomic-embed-text"
    )

    CHROMA_PATH = os.getenv(
        "CHROMA_PATH",
        "./chroma_db"
    )

    # ==========================================
    # Azure OpenAI
    # ==========================================

    AZURE_OPENAI_ENDPOINT = os.getenv(
        "AZURE_OPENAI_ENDPOINT"
    )

    AZURE_OPENAI_API_KEY = os.getenv(
        "AZURE_OPENAI_API_KEY"
    )

    AZURE_OPENAI_DEPLOYMENT = os.getenv(
        "AZURE_OPENAI_DEPLOYMENT"
    )

    AZURE_OPENAI_API_VERSION = os.getenv(
        "AZURE_OPENAI_API_VERSION"
    )