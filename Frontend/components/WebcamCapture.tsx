"use client";

import { useRef, useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

export default function WebcamCapture() {
  const webcamRef = useRef<Webcam>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [cameraOn, setCameraOn] = useState(true);

  const capture = async () => {
    if (!cameraOn || !webcamRef.current) return;
    
    const image = webcamRef.current.getScreenshot();
    if (!image) return;
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/predict", {
        image,
      });
      setResult(res.data.result);
    } catch (err) {
      console.error("Error al traducir:", err);
      setResult("Error al traducir. Verifica que el servidor esté ejecutándose.");
    }
    setLoading(false);
  };

  const toggleCamera = () => {
    setCameraOn(!cameraOn);
    if (cameraOn) {
      setResult(""); // Limpiar resultado cuando se apaga la cámara
    }
  };

  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
        fontFamily: "'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif"
      }}>
        {/* Título */}
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c3e50",
          marginBottom: "2rem",
          textAlign: "center",
          textShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          Traductor de Señas
        </h1>

        {/* Contenedor de la webcam */}
        <div style={{
          position: "relative",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.15), 0 0 80px rgba(0,0,0,0.05)",
          border: "4px solid white",
          backgroundColor: "#000",
          marginBottom: "2rem"
        }}>
          {cameraOn ? (
            <Webcam 
              ref={webcamRef} 
              screenshotFormat="image/jpeg" 
              width={500}
              height={375}
              style={{
                display: "block",
                borderRadius: "16px"
              }}
            />
          ) : (
            <div style={{
              width: "500px",
              height: "375px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#2c3e50",
              borderRadius: "16px",
              color: "white",
              fontSize: "1.2rem",
              textAlign: "center"
            }}>
              📷 Cámara apagada
            </div>
          )}
          
          {/* Overlay decorativo */}
          <div style={{
            position: "absolute",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            border: cameraOn ? "2px solid rgba(52, 152, 219, 0.3)" : "2px solid rgba(231, 76, 60, 0.3)",
            borderRadius: "16px",
            pointerEvents: "none"
          }} />
        </div>

        {/* Botones de control */}
        <div style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem"
        }}>
          {/* Botón encender/apagar cámara */}
          <button
            onClick={toggleCamera}
            style={{
              padding: "1rem 2rem",
              fontSize: "1rem",
              fontWeight: "600",
              background: cameraOn 
                ? "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)"
                : "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: cameraOn 
                ? "0 8px 25px rgba(231, 76, 60, 0.3)"
                : "0 8px 25px rgba(39, 174, 96, 0.3)",
              minWidth: "180px"
            }}
            onMouseOver={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = "translateY(-2px) scale(1.02)";
              target.style.boxShadow = cameraOn 
                ? "0 12px 30px rgba(231, 76, 60, 0.4)"
                : "0 12px 30px rgba(39, 174, 96, 0.4)";
            }}
            onMouseOut={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.transform = "translateY(0px) scale(1)";
              target.style.boxShadow = cameraOn 
                ? "0 8px 25px rgba(231, 76, 60, 0.3)"
                : "0 8px 25px rgba(39, 174, 96, 0.3)";
            }}
          >
            {cameraOn ? "🔴 Apagar Cámara" : "🟢 Encender Cámara"}
          </button>

          {/* Botón de captura */}
          <button
            onClick={capture}
            disabled={loading || !cameraOn}
            style={{
              padding: "1rem 2.5rem",
              fontSize: "1rem",
              fontWeight: "600",
              background: (loading || !cameraOn)
                ? "linear-gradient(135deg, #95a5a6 0%, #7f8c8d 100%)"
                : "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
              color: "white",
              border: "none",
              borderRadius: "50px",
              cursor: (loading || !cameraOn) ? "not-allowed" : "pointer",
              transition: "all 0.3s ease",
              textTransform: "uppercase",
              letterSpacing: "1px",
              boxShadow: (loading || !cameraOn)
                ? "0 4px 15px rgba(149, 165, 166, 0.3)"
                : "0 8px 25px rgba(52, 152, 219, 0.3)",
              transform: (loading || !cameraOn) ? "scale(0.98)" : "scale(1)",
              opacity: (loading || !cameraOn) ? 0.8 : 1,
              minWidth: "200px"
            }}
            onMouseOver={(e) => {
              if (!loading && cameraOn) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(-2px) scale(1.02)";
                target.style.boxShadow = "0 12px 30px rgba(52, 152, 219, 0.4)";
              }
            }}
            onMouseOut={(e) => {
              if (!loading && cameraOn) {
                const target = e.target as HTMLButtonElement;
                target.style.transform = "translateY(0px) scale(1)";
                target.style.boxShadow = "0 8px 25px rgba(52, 152, 219, 0.3)";
              }
            }}
          >
            {loading ? (
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{
                  width: "20px",
                  height: "20px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTop: "2px solid white",
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                  marginRight: "10px"
                }} />
                Traduciendo...
              </div>
            ) : (
              "📷 Traducir Seña"
            )}
          </button>
        </div>

        {/* Resultado */}
        {result && (
          <div style={{
            marginTop: "1rem",
            padding: "1.5rem 2rem",
            backgroundColor: "white",
            borderRadius: "15px",
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            border: "1px solid rgba(52, 152, 219, 0.2)",
            maxWidth: "500px",
            width: "100%"
          }}>
            <h3 style={{
              margin: "0 0 10px 0",
              color: "#2c3e50",
              fontSize: "1.2rem",
              fontWeight: "600"
            }}>
              🔤 Traducción:
            </h3>
            <p style={{
              margin: "0",
              fontSize: "1.4rem",
              color: "#27ae60",
              fontWeight: "700",
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              letterSpacing: "1px"
            }}>
              {result}
            </p>
          </div>
        )}

        {/* Instrucciones */}
        <div style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "rgba(52, 152, 219, 0.1)",
          borderRadius: "10px",
          border: "1px solid rgba(52, 152, 219, 0.2)",
          maxWidth: "500px",
          textAlign: "center"
        }}>
          <p style={{
            margin: "0",
            color: "#2c3e50",
            fontSize: "0.9rem",
            lineHeight: "1.5"
          }}>
            💡 <strong>Instrucciones:</strong> {cameraOn 
              ? "Posiciona tu mano frente a la cámara y haz la seña que deseas traducir. Luego presiona el botón para obtener la traducción."
              : "Enciende la cámara para comenzar a traducir señas."
            }
          </p>
        </div>
      </div>

      {/* CSS para animación */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
