// Path: frontend\src\pages\Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, BASE_URL } from "../utils";
import "../index.css";

import Header from "../components/Header";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;
    if (!name || !email || !password) return handleError("All fields are required");

    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupInfo),
      });
      const data = await res.json();
      if (data.success) {
        handleSuccess(data.message);
        setTimeout(() => navigate("/login"), 700);
      } else handleError(data.message);
    } catch {
      handleError("Server error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "row",
        fontFamily: "Segoe UI, sans-serif",
        flexWrap: "wrap", // ⭐ Mobile par automatic stack hoga
      }}
    >
      <Header />

      {/* LEFT PANEL */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          background: "linear-gradient(135deg,#0f5fb6,#1b87d6)",
          color: "#fff",
          padding: "clamp(20px,4vw,60px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          minWidth: "300px",
        }}
      >
        <h2 style={{ margin: "0 0 12px 0", fontSize: "clamp(20px, 2.5vw, 28px)" }}>
          Create your account
        </h2>

        <p style={{ fontSize: "clamp(12px,1.2vw,16px)", opacity: 0.95 }}>
          Join BookMyRideToday to book rides quickly and enjoy a smooth travel experience.
        </p>

        <ul style={{ marginLeft: "18px", lineHeight: 1.6, fontSize: "clamp(12px,1vw,16px)" }}>
          <li>Easy ride booking</li>
          <li>Secure login system</li>
          <li>Fast customer support</li>
          <li>Compare and negotiate prices</li>
          <li>Track your bookings</li>
        </ul>
      </div>

      {/* RIGHT SIGNUP FORM */}
      <div
        style={{
          flex: 1,
          minHeight: "100vh",
          padding: "clamp(20px,4vw,50px)",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "300px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "350px",
            padding: "20px",
            background: "#fff",
            border: "0.1px solid #ccc",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "clamp(28px,4vw,36px)",
              fontWeight: "300",
              lineHeight: "1.2",
              marginBottom: "18px",
            }}
          >
            Signup
          </h1>

          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <label style={{ fontSize: "clamp(12px,1.2vw,14px)" }}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "clamp(12px,1vw,14px)",
              }}
            />

            <label style={{ fontSize: "clamp(12px,1.2vw,14px)" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "clamp(12px,1vw,14px)",
              }}
            />

            <label style={{ fontSize: "clamp(12px,1.2vw,14px)" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "clamp(12px,1vw,14px)",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                border: "none",
                borderRadius: "4px",
                background: "#2b9af3",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                fontSize: "clamp(14px,1.2vw,16px)",
              }}
            >
              Signup
            </button>

            <div style={{ marginTop: "14px", fontSize: "clamp(12px,1vw,14px)", textAlign: "center" }}>
              Already have an account?
              <Link to="/login" style={{ color: "#2b9af3" }}> Login </Link>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
