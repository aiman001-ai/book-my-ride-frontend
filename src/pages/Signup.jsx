// Path: frontend\src\pages\Signup.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, BASE_URL } from "../utils";
import "../index.css";

import Header from "../components/Header";

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  // ✅ Responsive detection
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });

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
        flexDirection: isMobile ? "column" : "row",
        overflow: "hidden",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      <Header />

      {/* LEFT BLUE SECTION */}
      <div
        style={{
          width: isMobile ? "100%" : "46%",
          height: isMobile ? "auto" : "100vh",
          background: "linear-gradient(135deg,#0f5fb6 0%,#1b87d6 100%)",
          color: "#fff",
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          order: isMobile ? 2 : 1,
        }}
      >
        <h2 style={{ margin: "0 0 12px 0", fontSize: "22px" }}>Create your account</h2>
        <p style={{ fontSize: "14px", opacity: 0.95 }}>
          Join BookMyRideToday to book rides quickly and enjoy a smooth travel experience.
        </p>

        <ul style={{ marginLeft: "18px", lineHeight: "1.6" }}>
          <li>Easy ride booking</li>
          <li>Secure login system</li>
          <li>Fast customer support</li>
          <li>Compare and negotiate prices</li>
          <li>Track your bookings</li>
        </ul>
      </div>

      {/* RIGHT WHITE SECTION */}
      <div
        style={{
          width: isMobile ? "100%" : "54%",
          height: isMobile ? "auto" : "100vh",
          padding: "42px 36px",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          order: isMobile ? 1 : 2,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "25px 25px",
            background: "#fff",
            border: ".1px solid #ccc",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "36px",
              fontWeight: "300",
              marginBottom: "18px",
            }}
          >
            Signup
          </h1>

          <form onSubmit={handleSignup}>
            <label style={{ fontSize: "14px" }}>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name..."
              value={signupInfo.name}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0 14px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <label style={{ fontSize: "14px" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={signupInfo.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0 14px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <label style={{ fontSize: "14px" }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password..."
              value={signupInfo.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                margin: "8px 0 20px 0",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "11px",
                border: "none",
                borderRadius: "4px",
                background: "#2b9af3",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Signup
            </button>

            <div style={{ marginTop: "14px", fontSize: "13px", textAlign: "center" }}>
              Already have an account?
              <Link to="/login" style={{ color: "#2b9af3", marginLeft: "3px" }}>
                Login
              </Link>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
