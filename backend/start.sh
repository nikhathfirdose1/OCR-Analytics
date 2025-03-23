#!/bin/bash

# Activate virtual environment
source venv/bin/activate

# Optional
# python -m pip install --upgrade pip

# Start FastAPI server
python3 -m uvicorn main:app --reload


echo "FastAPI is running at http://localhost:8000"
