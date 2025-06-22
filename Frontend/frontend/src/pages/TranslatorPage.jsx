// src/pages/TranslatorPage.jsx
import WebcamCapture from "../components/WebcamCapture";
import ResultBox from "../components/ResultBox";

export default function TranslatorPage() {
  return (
    <div className="translator-page">
      <h1>Traductor</h1>
      <WebcamCapture />
      <ResultBox />
    </div>
  );
}
