from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Groq client
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

MODEL_NAME = "llama-3.1-8b-instant"  # Best default model

def generate_answer(retrieved_chunks, query):
    """
    retrieved_chunks: list of dicts
    [
        {
            "text": "...",
            "source": "sample.pdf - chunk 3"
        },
        ...
    ]
    """

    context = ""
    citations = []

    for item in retrieved_chunks:
        context += item["text"] + "\n\n"
        citations.append(item["source"])

    prompt = f"""
You are a strict assistant.

Answer ONLY from the provided context.
If the answer is not clearly present, say EXACTLY:
"I don't know based on the given context."

DO NOT guess or make up information.

Context:
{context}

Question:
{query}

Answer:
"""

    # 🔥 Groq API call (replaces Ollama)
    response = client.chat.completions.create(
        model=MODEL_NAME,
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0
    )

    answer = response.choices[0].message.content

    return answer, list(set(citations))