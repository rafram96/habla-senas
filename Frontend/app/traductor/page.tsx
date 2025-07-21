"use client";

import { useRouter } from "next/navigation";
import WebcamCapture from "../../components/WebcamCapture";

export default function TranslatorPage() {
  const router = useRouter();

  return (
    <div className="translator-page" style={{ position: "relative" }}>
      {/* Botón de volver */}
      <button
        onClick={() => router.back()}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          zIndex: 1000,
          padding: "0.8rem 1.5rem",
          fontSize: "0.9rem",
          fontWeight: "600",
          background: "linear-gradient(135deg, rgba(52, 152, 219, 0.9) 0%, rgba(41, 128, 185, 0.9) 100%)",
          color: "white",
          border: "2px solid rgba(255, 255, 255, 0.3)",
          borderRadius: "25px",
          cursor: "pointer",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s ease",
          letterSpacing: "0.5px",
          textTransform: "uppercase" as const,
          boxShadow: "0 4px 15px rgba(52, 152, 219, 0.3)",
        }}
        onMouseOver={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.transform = "translateY(-2px) scale(1.05)";
          target.style.boxShadow = "0 8px 25px rgba(52, 152, 219, 0.4)";
        }}
        onMouseOut={(e) => {
          const target = e.target as HTMLButtonElement;
          target.style.transform = "translateY(0px) scale(1)";
          target.style.boxShadow = "0 4px 15px rgba(52, 152, 219, 0.3)";
        }}
      >
        ← Volver
      </button>
      
      <WebcamCapture />
    </div>
  );
}
