// Path: frontend\src\pages\Home.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import "../styles/Home.css";


function Home() {
  const [rents, setRents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRents = async () => {
      try {
        const res = await fetch("http://localhost:8080/rent/all");
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
      navigate("/");  // Landing page
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>🚗 Rent-A-Car Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <h2 className="home-title">📋 All Rent Requests</h2>

      {rents.length === 0 ? (
        <p className="home-empty">No rent requests available.</p>
      ) : (
        <div className="home-grid">
          {rents.map((rent) => (
            <div key={rent._id} className="home-card">
              <h3 className="home-card-title">{rent.name}</h3>

              <p><strong>📞 Contact:</strong> {rent.contact}</p>
              <p><strong>🧍 Passengers:</strong> {rent.numberOfPassengers}</p>
              <p><strong>📍 Pick Point:</strong> {rent.cityPickPoint}</p>
              <p><strong>🏁 Drop Point:</strong> {rent.cityDropPoint}</p>
              <p><strong>📅 Date:</strong> {rent.date}</p>
              <p><strong>⏰ Time:</strong> {rent.time}</p>

              <p className="home-created">
                Added: {new Date(rent.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
