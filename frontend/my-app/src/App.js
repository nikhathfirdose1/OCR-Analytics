import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // We'll define styles here

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState(null);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setOcrResult(null); // reset OCR output
  };

  const handleOCR = async () => {
    if (!selectedImage) return;
    const formData = new FormData();
    formData.append('file', selectedImage);

    const res = await axios.post('http://localhost:8000/ocr', formData);
    setOcrResult(res.data);
  };

  return (
    <div className="container">
      <h1>OCR Analytics Page</h1>
      <div className="steps-container">
        {/* Step 1 */}
        <div className="step-box">
          <h2>Step 1</h2>
          <div className="image-preview">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                width="200"
              />
            ) : (
              <p>No image selected</p>
            )}
          </div>
          <label className="btn">
            Select Image
            <input type="file" hidden onChange={handleImageChange} />
          </label>
        </div>

        {/* Step 2 */}
        <div className="step-box">
          <h2>Step 2</h2>
          <button className="btn" onClick={handleOCR}>OCR Analyze</button>
        </div>

        {/* Step 3 */}
        <div className="step-box">
          <h2>Step 3</h2>
          <div className="ocr-output">
            <h4>OCR Categories Output</h4>
            {ocrResult ? (
              ocrResult.regions.map((region, rIdx) =>
                region.lines.map((line, lIdx) => (
                  <p key={`${rIdx}-${lIdx}`}>
                    {line.words.map((word) => word.text).join(" ")}
                  </p>
                ))
              )
            ) : (
              <p>No output yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
