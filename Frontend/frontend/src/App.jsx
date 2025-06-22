// src/App.jsx
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import TranslatorPage from "./pages/TranslatorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/traductor" element={<TranslatorPage />} />
    </Routes>
  );
}

export default App;
