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
  const isMobile = screenWidth <= 900;
  const isSmallMobile = screenWidth <= 500;

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
          padding: "0 20px",
          background: "#fff",
          color: "#000",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          borderBottom: "1px solid #ddd",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <button
          onClick={handleLogout}
          style={{
            background: "#007bff",
            color: "#fff",
            border: "none",
            padding: isSmallMobile ? "6px 12px" : "8px 20px",
            fontSize: isSmallMobile ? "14px" : "16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </header>

      {/* ===== PAGE CONTENT ===== */}
      <div style={{ padding: isMobile ? "20px" : "40px" }}>
        <h1 style={{ fontSize: isMobile ? "22px" : "28px", marginBottom: "20px" }}>
          🚗 Rent-A-Car Dashboard
        </h1>

        <h2 style={{ fontSize: isMobile ? "18px" : "24px", marginBottom: "15px" }}>
          📋 All Rent Requests
        </h2>

        {rents.length === 0 ? (
          <p>No rent requests available.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
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
                }}
              >
                <h3 style={{ margin: "0 0 10px" }}>{rent.name}</h3>
                <p><strong>📞 Contact:</strong> {rent.contact}</p>
                <p><strong>🧍 Passengers:</strong> {rent.numberOfPassengers}</p>
                <p><strong>📍 Pick Point:</strong> {rent.cityPickPoint}</p>
                <p><strong>🏁 Drop Point:</strong> {rent.cityDropPoint}</p>
                <p><strong>📅 Date:</strong> {rent.date}</p>
                <p><strong>⏰ Time:</strong> {rent.time}</p>
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
