import base64
import cv2
import numpy as np
from deepface import DeepFace
import tempfile
import os

def extract_embedding(base64_image: str):
    # Decode base64 image
    encoded_data = base64_image.split(',')[1] if ',' in base64_image else base64_image
    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Save to a temporary file because DeepFace often expects a file path
    with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as temp_file:
        cv2.imwrite(temp_file.name, img)
        temp_path = temp_file.name

    try:
        # Extract embeddings
        embeddings = DeepFace.represent(img_path=temp_path, model_name="VGG-Face", enforce_detection=True)
        # DeepFace returns a list of dictionaries (one for each face)
        if embeddings:
            return embeddings[0]["embedding"]
        return None
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

def verify_faces(img1_base64: str, img2_base64: str):
    # Alternatively, use embeddings for faster verification if we already have them
    # But for a simple direct check:
    pass
