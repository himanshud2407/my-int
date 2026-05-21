from fastapi.testclient import TestClient
from main import app
import base64
import os
import numpy as np

client = TestClient(app)

def test_register_face_no_face():
    dummy_image = base64.b64encode(os.urandom(100)).decode('utf-8')
    response = client.post("/register", json={"image": dummy_image})
    assert response.status_code in [400, 500]

def test_verify_face_logic():
    # Mocking the embedding for verification
    dummy_image = base64.b64encode(os.urandom(100)).decode('utf-8')
    # Since we can't easily mock the extract_embedding within the FastAPI app during a TestClient call
    # without more complex mocking, we at least test the endpoint structure.
    # But for now, we know if it doesn't find a face, it should return 400 or 500.
    response = client.post("/verify", json={
        "image": dummy_image,
        "stored_embedding": [0.1] * 128 # Dummy embedding
    })
    assert response.status_code in [400, 500]
