# from ingest.pdf_loader import load_pdf
# from ingest.chunker import chunk_text
# from embeddings.embedder import Embedder
# from vector_store.faiss_index import FAISSIndex
# from retriever.retriever import Retriever
# from llm.generator import generate_answer

# # -------------------------------
# # 1️⃣ Load and prepare documents
# # -------------------------------

# pdf_path = "../data/sample.pdf"
# print("Loading document...")
# pdf_text = load_pdf(pdf_path)

# print("Chunking document...")
# chunks = chunk_text(pdf_text)

# sources = [f"{pdf_path} - chunk {i}" for i in range(len(chunks))]

# print("Creating embeddings...")
# embedder = Embedder()
# embeddings = embedder.encode(chunks)

# print("Building FAISS index...")
# index = FAISSIndex(dimension=embeddings.shape[1])
# index.add(embeddings, chunks, sources)

# retriever = Retriever(embedder, index)

# print("\n✅ RAG system ready!")
# print("Type your question below.")
# print("Type 'exit' to quit.\n")

# # -------------------------------
# # 2️⃣ Interactive Q&A loop
# # -------------------------------

# while True:
#     query = input("🧑 You: ").strip()

#     if query.lower() in ["exit", "quit"]:
#         print("👋 Exiting RAG system.")
#         break

#     retrieved_chunks = retriever.retrieve(query)
#     answer, citations = generate_answer(retrieved_chunks, query)

#     print("\n🤖 Answer:")
#     print(answer)

#     print("\n📚 Sources:")
#     for src in citations:
#         print("-", src)

#     print("\n" + "-" * 60 + "\n")
    
#     retrieved_chunks = retriever.retrieve(query)

# print("\n--- DEBUG: Retrieved Chunks ---")
# for i, chunk in enumerate(retrieved_chunks):
#     print(f"\nChunk {i+1}:")
#     print(chunk["text"][:300])
#     print("Source:", chunk["source"])

from ingest.pdf_loader import load_pdf
from ingest.chunker import chunk_text
from embeddings.embedder import Embedder
from vector_store.faiss_index import FAISSIndex
from retriever.retriever import Retriever
from llm.generator import generate_answer

# -------------------------------
# 1️⃣ Load and prepare documents
# -------------------------------

pdf_path = "../data/sample.pdf"

print("Loading document...")
pdf_text = load_pdf(pdf_path)

print("Chunking document...")
chunks = chunk_text(pdf_text)

sources = [f"{pdf_path} - chunk {i}" for i in range(len(chunks))]

print("Creating embeddings...")
embedder = Embedder()
embeddings = embedder.encode(chunks)

print("Building FAISS index...")
index = FAISSIndex(dimension=embeddings.shape[1])
index.add(embeddings, chunks, sources)

retriever = Retriever(embedder, index)

print("\n✅ RAG system ready!")
print("Type your question below.")
print("Type 'exit' to quit.\n")

# -------------------------------
# 2️⃣ Interactive Q&A loop
# -------------------------------

while True:
    query = input("🧑 You: ").strip()

    if query.lower() in ["exit", "quit"]:
        print("👋 Exiting RAG system.")
        break

    # 🔍 Retrieve relevant chunks
    retrieved_chunks = retriever.retrieve(query, k=8)

    # 🔥 DEBUG: Show retrieved chunks
    print("\n--- DEBUG: Retrieved Chunks ---")
    for i, chunk in enumerate(retrieved_chunks):
        print(f"\nChunk {i+1}:")
        print(chunk["text"][:300])
        print("Source:", chunk["source"])
    print("================================================\n")
    # 🤖 Generate answer
    answer, citations = generate_answer(retrieved_chunks, query)

    print("\n🤖 Answer:")
    print(answer)

    print("\n📚 Sources:")
    for src in citations:
        print("-", src)

    print("\n" + "-" * 60 + "\n")