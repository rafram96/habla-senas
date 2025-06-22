// src/components/WebcamCapture.jsx
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function WebcamCapture() {
  const webcamRef = useRef(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const capture = async () => {
    const image = webcamRef.current.getScreenshot();
    if (!image) return;
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predict", {
        image,
      });
      setResult(res.data.result);
    } catch (err) {
      setResult("Error al traducir.");
    }
    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" width={400} />
      <br />
      <button onClick={capture}>
        {loading ? "Traduciendo..." : "Traducir"}
      </button>
      {result && <p><strong>Traducción:</strong> {result}</p>}
    </div>
  );
}
