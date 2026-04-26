class Retriever:
    def __init__(self, embedder, vector_store):
        self.embedder = embedder
        self.vector_store = vector_store

    def retrieve(self, query, k=10):
        query_embedding = self.embedder.encode([query])
        return self.vector_store.search(query_embedding, k)