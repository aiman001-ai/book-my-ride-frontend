// Path: frontend\src\components\Header.jsx
import React from "react";

function Header() {
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
      <svg
        viewBox="0 0 1440 120"
        style={{
          width: "100%",
          display: "block",
          transform: "rotate(180deg) scaleX(-1)", // 👈 Left-Right + Downward flip
        }}
      >
        <path
          fill="#848e9bff






"
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
