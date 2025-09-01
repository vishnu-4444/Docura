# backend/utils/vector_store.py
import faiss
import numpy as np

# dummy embedding function (replace later with HuggingFace embeddings)
def embed_text(text):
    # returns 512-dim random vector for now
    return np.random.rand(512).astype("float32")

# Create FAISS index (512-dim, L2 distance)
index = faiss.IndexFlatL2(512)

def store_chunks(chunks):
    vectors = [embed_text(c) for c in chunks]
    vectors = np.array(vectors)
    index.add(vectors)
    print(f"Stored {len(chunks)} chunks. Total vectors in index: {index.ntotal}")
