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
        position: "fixed",
    bottom: 0,
    left: 0,
    margin: 0,
      }}
    >
      © 2025 BookMyRide. All Rights Reserved. Developed by R-Fa Tech.
    </footer>
  );
}

export default Footer;
