from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import logging
import os

from ingest.pdf_loader import load_pdf
from ingest.chunker import chunk_text
from embeddings.embedder import Embedder
from vector_store.faiss_index import FAISSIndex
from retriever.retriever import Retriever
from llm.generator import generate_answer


# -------------------------------
# Models
# -------------------------------

class AskRequest(BaseModel):
    question: str


class AskResponse(BaseModel):
    answer: str
    sources: list[str]


# -------------------------------
# App setup
# -------------------------------

app = FastAPI(title="RAG API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -------------------------------
# Global RAG objects
# -------------------------------

embedder = None
retriever = None

print("🚀 Server started — waiting for PDF upload...")


# -------------------------------
# 🔥 Upload API (FIXED)
# -------------------------------

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    global retriever, embedder

    try:
        # ✅ Ensure uploads folder exists
        os.makedirs("uploads", exist_ok=True)

        # ✅ Save file properly
        file_location = os.path.join("uploads", file.filename)

        with open(file_location, "wb") as f:
            f.write(await file.read())

        print(f"\n📄 Uploaded: {file.filename}")
        print(f"📁 Saved at: {file_location}")

        # ✅ Load + process PDF
        text = load_pdf(file_location)

        if not text or len(text.strip()) == 0:
            raise Exception("PDF text extraction failed")

        print("✂️ Chunking...")
        chunks = chunk_text(text)

        print(f"🔢 Total chunks: {len(chunks)}")

        sources = [f"{file.filename} - chunk {i}" for i in range(len(chunks))]

        # ✅ Create embeddings
        print("🧠 Embedding...")
        embedder = Embedder()
        embeddings = embedder.encode(chunks)

        # ✅ Build FAISS index
        print("📦 Building FAISS index...")
        index = FAISSIndex(dimension=embeddings.shape[1])
        index.add(embeddings, chunks, sources)

        retriever = Retriever(embedder, index)

        print("✅ Upload + Indexing COMPLETE\n")

        return {"message": "PDF uploaded and indexed successfully"}

    except Exception as e:
        print("❌ UPLOAD ERROR:", str(e))
        logging.getLogger().exception("Upload failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------
# 🔥 Ask API
# -------------------------------

@app.post("/ask", response_model=AskResponse)
async def ask(request: AskRequest):
    if not request.question.strip():
        raise HTTPException(status_code=400, detail="Question is required")

    if retriever is None:
        raise HTTPException(status_code=503, detail="Please upload a document first")

    try:
        retrieved = retriever.retrieve(request.question, k=8)

        # 🔍 DEBUG
        print("\n================ DEBUG RETRIEVAL ================")
        for i, chunk in enumerate(retrieved):
            print(f"\nChunk {i+1}:")
            print(chunk["text"][:300])
            print("Source:", chunk["source"])
        print("================================================\n")

        answer, sources = generate_answer(retrieved, request.question)

        return AskResponse(answer=answer, sources=sources)

    except Exception as e:
        print("❌ ASK ERROR:", str(e))
        logging.getLogger().exception("Error answering question: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------
# Run server
# -------------------------------

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.app:app", host="0.0.0.0", port=8000, reload=True)