// Path: frontend\src\pages\Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, BASE_URL } from "../utils";
import "../index.css";

import Header from "../components/Header";

function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password)
      return handleError("Email and password required");

    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("token", data.jwtToken);
        localStorage.setItem("loggedInUser", data.name);
        localStorage.setItem("loginTime", Date.now());
        handleSuccess(data.message);
        setTimeout(() => navigate("/home"), 500);
      } else handleError(data.message);
    } catch {
      handleError("Server error. Try again later.");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        overflow: "hidden",
        fontFamily: "Segoe UI, sans-serif",

        // ⭐ RESPONSIVE FIX 
        flexDirection: window.innerWidth < 768 ? "column-reverse" : "row",
      }}
    >
      <Header />

      {/* LEFT INFO PANEL */}
      <div
        style={{
          width: window.innerWidth < 768 ? "100%" : "46%",
          minHeight: window.innerWidth < 768 ? "45vh" : "100%",
          background: "linear-gradient(135deg,#0f5fb6 0%,#1b87d6 100%)",
          color: "#fff",
          padding: "40px 36px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: window.innerWidth < 768 ? "center" : "left",
        }}
      >
        <h2 style={{ margin: "0 0 12px 0", fontSize: "22px" }}>Welcome Back, Host!</h2>
        <p style={{ fontSize: "14px", opacity: 0.95 }}>
          Access your bookings, interact with riders, and streamline your hosting workflow effortlessly.
        </p>

        <ul style={{ marginLeft: window.innerWidth < 768 ? "0" : "18px", lineHeight: "1.6" }}>
          <li>Receive new booking requests instantly</li>
          <li>Chat with riders and discuss pricing</li>
          <li>Approve or reject trips easily</li>
          <li>Manage ongoing rides</li>
          <li>Smooth hosting experience</li>
        </ul>
      </div>

      {/* RIGHT LOGIN FORM */}
      <div
        style={{
          width: window.innerWidth < 768 ? "100%" : "54%",
          minHeight: window.innerWidth < 768 ? "55vh" : "100%",
          padding: "42px 36px",
          background: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "300px",
            padding: "30px 25px",
            background: "#fff",
            border: ".1px solid #ccc",
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
            marginTop: "-43px",
            borderRadius: "8px",
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
            Login
          </h1>

          <form onSubmit={handleLogin}>
            <label style={{ fontSize: "14px" }}>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email..."
              value={loginInfo.email}
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
              value={loginInfo.password}
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
              Login
            </button>

            <div style={{ marginTop: "14px", fontSize: "13px", textAlign: "center" }}>
              Don't have an account?
              <Link to="/signup" style={{ color: "#2b9af3" }}> Signup </Link>
            </div>
          </form>

          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
