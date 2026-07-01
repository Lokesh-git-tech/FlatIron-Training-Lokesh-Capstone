import os

import chromadb
import ollama

from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------
# Configuration
# ---------------------------------------

KNOWLEDGE_BASE_PATH = "knowledge_base"

CHROMA_PATH = os.getenv("CHROMA_PATH")

EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")

# ---------------------------------------
# Simple Text Chunking Function
# ---------------------------------------

def split_text(text, chunk_size=500, overlap=75):

    chunks = []

    start = 0

    while start < len(text):

        end = start + chunk_size

        chunks.append(text[start:end])

        start += chunk_size - overlap

    return chunks

# ---------------------------------------
# Create Chroma Client
# ---------------------------------------

client = chromadb.PersistentClient(path=CHROMA_PATH)

collection_name = "incident_kb"

try:
    client.delete_collection(collection_name)
except:
    pass

collection = client.create_collection(collection_name)

# ---------------------------------------
# Read Documents
# ---------------------------------------

documents = []

print("Loading knowledge base...")

for filename in os.listdir(KNOWLEDGE_BASE_PATH):

    if filename.endswith(".txt"):

        filepath = os.path.join(KNOWLEDGE_BASE_PATH, filename)

        with open(filepath, "r", encoding="utf-8") as file:

            text = file.read()

        documents.append({
            "filename": filename,
            "text": text
        })

print(f"Loaded {len(documents)} documents.")

# ---------------------------------------
# Split Documents
# ---------------------------------------

chunks = []

for document in documents:

    split_chunks = split_text(document["text"])

    for chunk in split_chunks:

        chunks.append({
            "text": chunk,
            "filename": document["filename"]
        })

print(f"Created {len(chunks)} chunks.")

# ---------------------------------------
# Generate Embeddings
# ---------------------------------------

print("Generating embeddings...")

for index, chunk in enumerate(chunks):

    response = ollama.embeddings(
        model=EMBEDDING_MODEL,
        prompt=chunk["text"]
    )

    embedding = response["embedding"]

    collection.add(
        ids=[str(index)],
        embeddings=[embedding],
        documents=[chunk["text"]],
        metadatas=[
            {
                "source": chunk["filename"]
            }
        ]
    )

print("")
print("===================================")
print("Knowledge Base Indexed Successfully")
print("===================================")
print(f"Documents Indexed : {len(documents)}")
print(f"Chunks Created    : {len(chunks)}")
print("")