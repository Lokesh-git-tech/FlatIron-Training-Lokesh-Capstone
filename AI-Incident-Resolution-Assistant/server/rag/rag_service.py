import json
import os

from dotenv import load_dotenv

from openai import AzureOpenAI

from langchain_chroma import Chroma
from langchain_ollama import ChatOllama
from langchain_ollama import OllamaEmbeddings

from rag.prompts import SYSTEM_PROMPT

load_dotenv()


class RAGService:

    def __init__(self):

        self.provider = os.getenv(
            "AI_PROVIDER",
            "ollama"
        ).lower()

        # ---------------------------------------
        # Embeddings (Still using Ollama)
        # ---------------------------------------

        self.embeddings = OllamaEmbeddings(
            model=os.getenv("EMBEDDING_MODEL")
        )

        # ---------------------------------------
        # Chroma Vector Store
        # ---------------------------------------

        self.vector_store = Chroma(
            persist_directory=os.getenv("CHROMA_PATH"),
            embedding_function=self.embeddings,
            collection_name="incident_resolution"
        )

        # ---------------------------------------
        # AI Provider
        # ---------------------------------------

        if self.provider == "azure":

            self.client = AzureOpenAI(
                api_key=os.getenv("AZURE_OPENAI_API_KEY"),
                api_version=os.getenv("AZURE_OPENAI_API_VERSION"),
                azure_endpoint=os.getenv("AZURE_OPENAI_ENDPOINT")
            )

        else:

            self.llm = ChatOllama(
                model=os.getenv("OLLAMA_MODEL"),
                temperature=0,
                timeout=120
            )

    # --------------------------------------------------------

    def retrieve(self, question):

        return self.vector_store.similarity_search(
            question,
            k=4
        )

    # --------------------------------------------------------

    def generate_resolution(self, incident, question):

        docs = self.retrieve(question)

        context = "\n\n".join(
            doc.page_content for doc in docs
        )

        prompt = f"""
{SYSTEM_PROMPT}

----------------------------------------------------

INCIDENT DETAILS

Title:
{incident.title}

Category:
{incident.category}

Priority:
{incident.priority}

Description:
{incident.description}

----------------------------------------------------

USER QUESTION

{question}

----------------------------------------------------

KNOWLEDGE BASE

{context}
"""

        # ====================================================
        # Azure OpenAI
        # ====================================================

        if self.provider == "azure":

            response = self.client.chat.completions.create(

                model=os.getenv(
                    "AZURE_OPENAI_DEPLOYMENT"
                ),

                temperature=0,

                messages=[

                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT
                    },

                    {
                        "role": "user",
                        "content": prompt
                    }

                ]

            )

            answer = response.choices[0].message.content.strip()

            model_used = os.getenv(
                "AZURE_OPENAI_DEPLOYMENT"
            )

        # ====================================================
        # Ollama
        # ====================================================

        else:

            response = self.llm.invoke(prompt)

            answer = response.content.strip()

            model_used = os.getenv(
                "OLLAMA_MODEL"
            )

        # ====================================================
        # Parse JSON
        # ====================================================

        try:

            parsed = json.loads(answer)

        except json.JSONDecodeError:

            parsed = {

                "issue_summary": answer,

                "root_cause": "Unable to determine.",

                "resolution_steps": [],

                "escalation": "Manual investigation required.",

                "confidence": "Low"

            }

        # ====================================================
        # Sources
        # ====================================================

        sources = []

        for doc in docs:

            sources.append({

                "kb_id": doc.metadata.get("kb_id"),

                "title": doc.metadata.get("title"),

                "category": doc.metadata.get("category"),

                "severity": doc.metadata.get("severity"),

                "source": doc.metadata.get("source")

            })

        # ====================================================
        # Final Response
        # ====================================================

        return {

            "response": parsed,

            "sources": sources,

            "model": model_used

        }