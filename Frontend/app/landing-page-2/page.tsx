"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import AnimatedBackground from "@/components/AnimatedBackground";

export default function LandingPage2() {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      <AnimatedBackground />
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(15px)",
          borderRadius: "20px",
          padding: "3rem 2.5rem",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow:
            "0 20px 40px rgba(0, 0, 0, 0.3), 0 0 80px rgba(255, 255, 255, 0.1)",
          maxWidth: "600px",
          width: "90%",
        }}
      >
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
          Habla-Señas   
        </h1>
        <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>
          Convierte lenguaje de señas en texto en tiempo real.
        </p>
        <button
          onClick={() => router.push("/traductor")}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setIsPressed(false);
          }}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          style={{
            padding: "1.2rem 3rem",
            fontSize: "1.1rem",
            fontWeight: "600",
            background: isHovered 
              ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 100%)"
              : "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 100%)",
            color: "white",
            border: `2px solid ${isHovered ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)"}`,
            borderRadius: "50px",
            cursor: "pointer",
            backdropFilter: "blur(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            letterSpacing: "1px",
            textTransform: "uppercase" as const,
            position: "relative",
            overflow: "hidden",
            boxShadow: isHovered
              ? "0 15px 40px rgba(255, 255, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
              : "0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            textShadow: "0 1px 2px rgba(0,0,0,0.3)",
            transform: isPressed 
              ? "translateY(-1px) scale(0.98)"
              : isHovered 
                ? "translateY(-3px) scale(1.02)"
                : "translateY(0px) scale(1)",
          }}
        >
          Comenzar
        </button>
      </div>
    </div>
  );
}