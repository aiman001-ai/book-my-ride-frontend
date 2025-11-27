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
    <div style={{ height: "100vh", width: "100vw", display: "flex", overflow: "hidden", fontFamily: "Segoe UI, sans-serif" }}>
      <Header />
      <div style={{ width: "46%", height: "100%", background: "linear-gradient(135deg,#0f5fb6 0%,#1b87d6 100%)", color: "#fff", padding: "40px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div>
          
          <h2 style={{ margin: "0 0 12px 0", fontSize: "22px" }}>Create your account</h2>
          <p style={{ fontSize: "14px", opacity: 0.95 }}>Join BookMyRideToday to book rides quickly and enjoy a smooth travel experience.</p>
          <ul style={{ marginLeft: "18px", lineHeight: "1.6" }}>
            <li>Easy ride booking</li>
            <li>Secure login system</li>
            <li>Fast customer support</li>
            <li>Compare and negotiate prices</li>
            <li>Track your bookings</li>
          </ul>
        </div>
      </div>
      <div style={{ width: "54%", height: "100%", padding: "42px 36px", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div style={{ width: "100%", maxWidth: "300px", padding: "10px 25px", background: "#fff", border: ".1px solid #ccc", boxShadow: "0 8px 20px rgba(0,0,0,0.15)", marginTop: "-20px" }}>
          <h1 style={{ textAlign: "center", fontSize: "36px", fontWeight: "300", lineHeight: "46px", WebkitFontSmoothing: "antialiased", marginBottom: "18px" }}>Signup</h1>
          <form onSubmit={handleSignup}>
            <label style={{ fontSize: "14px" }}>Full Name</label>
            <input type="text" name="name" placeholder="Enter your name..." value={signupInfo.name} onChange={handleChange} style={{ width: "100%", padding: "10px", margin: "8px 0 14px 0", border: "1px solid #ccc", borderRadius: "4px" }} />
            <label style={{ fontSize: "14px" }}>Email</label>
            <input type="email" name="email" placeholder="Enter your email..." value={signupInfo.email} onChange={handleChange} style={{ width: "100%", padding: "10px", margin: "8px 0 14px 0", border: "1px solid #ccc", borderRadius: "4px" }} />
            <label style={{ fontSize: "14px" }}>Password</label>
            <input type="password" name="password" placeholder="Enter your password..." value={signupInfo.password} onChange={handleChange} style={{ width: "100%", padding: "10px", margin: "8px 0 20px 0", border: "1px solid #ccc", borderRadius: "4px" }} />
            <button type="submit" style={{ width: "100%", padding: "11px", border: "none", borderRadius: "4px", background: "#2b9af3", color: "#fff", fontWeight: "600", cursor: "pointer" }}>Signup</button>
            <div style={{ marginTop: "14px", fontSize: "13px", textAlign: "center" }}>Already have an account? <Link to="/login" style={{ color: "#2b9af3" }}>Login</Link></div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Signup;
