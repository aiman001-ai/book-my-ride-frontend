// Path: frontend\src\components\Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        background: "#0f0e0eff",
        color: "#fff",
        padding: "1px 20px",
        display: "flex",
        justifyContent: "center", // horizontal center
        alignItems: "center",     // vertical center
        fontSize: "14px",
        textAlign: "center",
      }}
    >
      © 2025 BookMyRideToday. All Rights Reserved. Developed by R-Fa Creative Solutions
    </footer>
  );
}

export default Footer;
