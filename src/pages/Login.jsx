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

  const handleChange = (e) => setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginInfo.email || !loginInfo.password) return handleError("Email and password required");

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
    <div style={{ height: "100vh", width: "100vw", display: "flex", overflow: "hidden", fontFamily: "Segoe UI, sans-serif" }}>
      <Header />
      <div style={{ width: "46%", height: "100%", background: "linear-gradient(135deg,#0f5fb6 0%,#1b87d6 100%)", color: "#fff", padding: "clamp(30px, 4vw, 40px)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div>
          <h2 style={{ margin: "0 0 12px 0", fontSize: "clamp(18px, 2vw, 22px)" }}>Welcome Back, Host!</h2>
          <p style={{ fontSize: "clamp(12px, 1.2vw, 14px)", opacity: 0.95 }}>Access your bookings, interact with riders, and streamline your hosting workflow effortlessly.</p>
          <ul style={{ marginLeft: "18px", lineHeight: "1.6", fontSize: "clamp(12px, 1vw, 14px)" }}>
            <li>Receive and review new booking requests instantly</li>
            <li>Chat with riders and discuss pricing details</li>
            <li>Approve or reject trips with one click</li>
            <li>Manage ongoing rides with full transparency</li>
            <li>Enjoy a seamless, efficient hosting experience</li>
          </ul>
        </div>
      </div>
      <div style={{ width: "54%", height: "100%", padding: "clamp(30px, 4vw, 42px)", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "clamp(280px, 25vw, 300px)", padding: "clamp(20px, 2.5vw, 30px) clamp(15px, 2vw, 25px)", background: "#fff", border: ".1px solid #ccc", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", marginTop: "-43px" }}>
          <h1 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 36px)", fontWeight: "300", lineHeight: "46px", WebkitFontSmoothing: "antialiased", marginBottom: "18px" }}>Login</h1>
          <form onSubmit={handleLogin}>
            <label style={{ fontSize: "clamp(12px, 1vw, 14px)" }}>Email</label>
            <input type="email" name="email" placeholder="Enter your email..." value={loginInfo.email} onChange={handleChange} style={{ width: "100%", padding: "clamp(8px, 1vw, 10px)", margin: "8px 0 14px 0", border: "1px solid #ccc", borderRadius: "4px" }} />
            <label style={{ fontSize: "clamp(12px, 1vw, 14px)" }}>Password</label>
            <input type="password" name="password" placeholder="Enter your password..." value={loginInfo.password} onChange={handleChange} style={{ width: "100%", padding: "clamp(8px, 1vw, 10px)", margin: "8px 0 20px 0", border: "1px solid #ccc", borderRadius: "4px" }} />
            <button type="submit" style={{ width: "100%", padding: "clamp(9px, 1.2vw, 11px)", border: "none", borderRadius: "4px", background: "#2b9af3", color: "#fff", fontWeight: "600", cursor: "pointer", fontSize: "clamp(14px, 1.2vw, 16px)" }}>Login</button>
            <div style={{ marginTop: "14px", fontSize: "clamp(11px, 1vw, 13px)", textAlign: "center" }}>Don't have an account? <Link to="/signup" style={{ color: "#2b9af3" }}>Signup</Link></div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Login;
