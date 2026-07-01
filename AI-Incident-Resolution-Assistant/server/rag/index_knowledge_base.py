import os
import shutil
from pathlib import Path

from dotenv import load_dotenv

from langchain_core.documents import Document
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter

load_dotenv()

# --------------------------------------------------
# Configuration
# --------------------------------------------------

KNOWLEDGE_BASE_PATH = Path("knowledge_base")
CHROMA_PATH = os.getenv("CHROMA_PATH")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")

COLLECTION_NAME = "incident_resolution"

# --------------------------------------------------
# Reset existing vector store
# --------------------------------------------------

if os.path.exists(CHROMA_PATH):
    shutil.rmtree(CHROMA_PATH)

# --------------------------------------------------
# Load knowledge base articles
# --------------------------------------------------

documents = []

for file in KNOWLEDGE_BASE_PATH.glob("*.md"):

    content = file.read_text(encoding="utf-8")

    metadata = {
        "source": file.name,
        "kb_id": "",
        "category": "",
        "severity": "",
        "title": ""
    }

    lines = content.splitlines()

    for i, line in enumerate(lines):

        line = line.strip()

        if line.startswith("Knowledge Base ID:"):
            metadata["kb_id"] = line.replace(
                "Knowledge Base ID:", ""
            ).strip()

        elif line.startswith("Category:"):
            metadata["category"] = line.replace(
                "Category:", ""
            ).strip()

        elif line.startswith("Severity:"):
            metadata["severity"] = line.replace(
                "Severity:", ""
            ).strip()

        elif line == "Title":

            if i + 1 < len(lines):
                metadata["title"] = lines[i + 1].strip()

    documents.append(
        Document(
            page_content=content,
            metadata=metadata
        )
    )

print(f"Loaded {len(documents)} documents.")

# --------------------------------------------------
# Split documents
# --------------------------------------------------

splitter = RecursiveCharacterTextSplitter(

    chunk_size=600,

    chunk_overlap=100,

    separators=[
        "\n## ",
        "\n\n",
        "\n",
        " ",
        ""
    ]
)

chunks = splitter.split_documents(documents)

print(f"Created {len(chunks)} chunks.")

# --------------------------------------------------
# Embedding model
# --------------------------------------------------

embeddings = OllamaEmbeddings(
    model=EMBEDDING_MODEL
)

# --------------------------------------------------
# Create vector store
# --------------------------------------------------

vector_store = Chroma.from_documents(

    documents=chunks,

    embedding=embeddings,

    persist_directory=CHROMA_PATH,

    collection_name=COLLECTION_NAME

)

print()

print("=" * 60)
print("Knowledge Base Successfully Indexed")
print("=" * 60)

print(f"Articles Indexed : {len(documents)}")
print(f"Chunks Created   : {len(chunks)}")
print(f"Collection       : {COLLECTION_NAME}")
print(f"Vector Store     : {CHROMA_PATH}")

print("=" * 60)