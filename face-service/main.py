from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils.face_util import extract_embedding
from typing import List
import numpy as np

app = FastAPI()

class RegistrationRequest(BaseModel):
    image: str # base64

class VerificationRequest(BaseModel):
    image: str # base64
    stored_embedding: List[float]

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/register")
async def register_face(request: RegistrationRequest):
    try:
        embedding = extract_embedding(request.image)
        if embedding:
            return {"embedding": embedding}
        else:
            raise HTTPException(status_code=400, detail="No face detected")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/verify")
async def verify_face(request: VerificationRequest):
    try:
        current_embedding = extract_embedding(request.image)
        if not current_embedding:
            raise HTTPException(status_code=400, detail="No face detected in current image")

        # Calculate cosine distance
        a = np.array(current_embedding)
        b = np.array(request.stored_embedding)

        # Cosine distance = 1 - cosine similarity
        distance = 1 - (np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

        # Typical threshold for VGG-Face is around 0.4 for cosine distance
        is_match = bool(distance < 0.4)

        return {"match": is_match, "distance": float(distance)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
