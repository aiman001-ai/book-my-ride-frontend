// Path: frontend\src\components\Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 999,
      }}
    >
      {/* Left Top Circular Home Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "10px",
          left: "20px",
          width: "50px",
           border: "2px solid #df0505ff",
          height: "50px",
          borderRadius: "50%",
          
          background: "#303538ff",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
          fontSize: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          zIndex: 1000,
        }}
      >
        Home
      </button>

      {/* SVG Wave */}
      <svg
        viewBox="0 0 1440 120"
        style={{
          width: "100%",
          display: "block",
          transform: "rotate(180deg) scaleX(-1)", // Left-Right + Downward flip
        }}
      >
        <path
          fill="#848e9bff"
          d="
            M0,0
            C300,120 600,-40 900,80
            C1150,150 1300,20 1440,60
            L1440,120
            L0,120
            Z
          "
        ></path>
      </svg>
    </div>
  );
}

export default Header;
