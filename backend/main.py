from dotenv import load_dotenv 
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import requests
import os

app = FastAPI()

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

load_dotenv()

AZURE_ENDPOINT = os.getenv("AZURE_ENDPOINT")
AZURE_KEY = os.getenv("AZURE_KEY")

@app.post("/ocr")
async def ocr_analysis(file: UploadFile = File(...)):
    image_data = await file.read()

    headers = {
        'Ocp-Apim-Subscription-Key': AZURE_KEY,
        'Content-Type': 'application/octet-stream',
    }

    ocr_url = f"{AZURE_ENDPOINT}/vision/v3.2/ocr"

    response = requests.post(ocr_url, headers=headers, data=image_data)
    response.raise_for_status()
    
    ocr_result = response.json()

    return ocr_result
