// Path: frontend\src\pages\Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import "../styles/Home.css";

// ✅ Update this to your live backend URL
const BASE_URL = "https://book-my-ride-3.onrender.com";

function Home() {
  const [rents, setRents] = useState([]);
  const navigate = useNavigate();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const res = await fetch(`${BASE_URL}/rent/all`);
        const data = await res.json();
        if (data.success) setRents(data.data);
      } catch (err) {
        console.error("Error fetching rents:", err);
      }
    };
    fetchRents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("Logged out successfully");
    navigate("/"); // Redirect to Landing page
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", paddingTop: "80px" }}>
      {/* ===== HEADER ===== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "70px",
          padding: "0 clamp(12px, 2vw, 20px)", // responsive horizontal padding
          background: "#fff",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottom: "1px solid #ddd",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          zIndex: 1000,
          boxSizing: "border-box",
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: "clamp(6px, 1vw, 8px) clamp(12px, 2vw, 20px)", // responsive padding
            fontSize: "clamp(14px, 1.2vw, 16px)", // responsive font size
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <div style={{ padding: "clamp(20px, 2vw, 40px)" }}>
        <h1 style={{ fontSize: "clamp(22px, 2.2vw, 28px)", marginBottom: "20px" }}>
          🚗 Rent-A-Car Dashboard
        </h1>

        <h2 style={{ fontSize: "clamp(18px, 2vw, 24px)", marginBottom: "15px" }}>
          📋 All Rent Requests
        </h2>

        {rents.length === 0 ? (
          <p>No rent requests available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // fully responsive
              gap: "20px",
            }}
          >
            {rents.map((rent) => (
              <div
                key={rent._id}
                style={{
                  background: "#fff",
                  padding: "15px",
                  borderRadius: "8px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  boxSizing: "border-box",
                }}
              >
                <h3 style={{ margin: "0 0 10px", fontSize: "clamp(16px, 1.5vw, 20px)" }}>
                  {rent.name}
                </h3>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
                  <strong>📞 Contact:</strong> {rent.contact}
                </p>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
                  <strong>🧍 Passengers:</strong> {rent.numberOfPassengers}
                </p>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
                  <strong>📍 Pick Point:</strong> {rent.cityPickPoint}
                </p>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
                  <strong>🏁 Drop Point:</strong> {rent.cityDropPoint}
                </p>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
                  <strong>📅 Date:</strong> {rent.date}
                </p>
                <p style={{ fontSize: "clamp(14px, 1.2vw, 16px)" }}>
                  <strong>⏰ Time:</strong> {rent.time}
                </p>
                <p style={{ fontSize: "12px", marginTop: "10px", color: "#555" }}>
                  Added: {new Date(rent.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
