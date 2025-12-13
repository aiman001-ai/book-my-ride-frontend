// Path: frontend\src\pages\Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, BASE_URL } from "../utils";
import "../index.css";

import { useGoogleLogin } from "@react-oauth/google";
import { googleAuth } from "../assets/api"; // Import API call
import { FcGoogle } from "react-icons/fc";


function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const isMobile = window.innerWidth < 768;

    const handleChange = (e) =>
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

    // --- NORMAL LOGIN HANDLER ---
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

    // --- GOOGLE LOGIN HANDLER ---
    const responseGoogle = async (authResult) => {
        try {
            // If successful, we get an authorization code
            if (authResult["code"]) {
                // Call our backend API with the code
                const result = await googleAuth(authResult["code"]);
                const { email, name, jwtToken } = result.data;

                // Save data to localstorage (same as normal login)
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);
                localStorage.setItem("loginTime", Date.now());
                
                handleSuccess("Google Login Successful");
                setTimeout(() => navigate("/home"), 500);
            } else {
                 handleError("Google login failed to get authorization code");
            }
        } catch (err) {
            console.error("Error while requesting google code : ", err);
            handleError("Google Login Failed. Try again.");
        }
    };

    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: "auth-code", // Important for security
    
});

    // --- GOOGLE BUTTON STYLES ---
    const googleButtonStyle = {
        width: "100%",
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        background: "#fff",
        color: "#555",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "15px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        transition: "background 0.3s"
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                display: "flex",
                overflow: "hidden",
                fontFamily: "Segoe UI, sans-serif",
                flexDirection: isMobile ? "column-reverse" : "row",
            }}
        >
           

            {/* LEFT INFO PANEL */}
            <div
                style={{
                    width: isMobile ? "100%" : "46%",
                    minHeight: isMobile ? "42vh" : "100%",
                    background: "linear-gradient(135deg,#0f5fb6 0%,#1b87d6 100%)",
                    color: "#fff",
                    padding: "40px 36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    textAlign: isMobile ? "center" : "left",
                }}
            >
                <h2 style={{ margin: "0 0 12px 0", fontSize: "22px" }}>Welcome Back, Host!</h2>
                <p style={{ fontSize: "14px", opacity: 0.95 }}>
                    Access your bookings, interact with riders, and streamline your hosting workflow
                    effortlessly.
                </p>

                <ul style={{ marginLeft: isMobile ? "0" : "18px", lineHeight: "1.6" }}>
                    <li>Receive new booking requests instantly</li>
                    <li>Chat with riders and discuss pricing</li>
                    <li>Approve or reject trips easily</li>
                    <li>Manage ongoing rides</li>
                    <li>Smooth hosting experience</li>
                </ul>
            </div>

            {/* RIGHT LOGIN PANEL */}
            <div
                style={{
                    width: isMobile ? "100%" : "54%",
                    minHeight: isMobile ? "58vh" : "100%",
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
                        maxWidth: "320px",
                        padding: "30px 25px",
                        background: "#fff",
                        border: "0.1px solid #ccc",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                        borderRadius: "8px",
                    }}
                >
                    <h1
                        style={{
                            textAlign: "center",
                            fontSize: "34px",
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
                    </form>

                    <div style={{ marginTop: "14px", fontSize: "13px", textAlign: "center" }}>
                        Don't have an account?
                        <Link to="/signup" style={{ color: "#2b9af3" }}> Signup </Link>
                    </div>

                    {/* --- OR DIVIDER --- */}
                     <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                        <span style={{ margin: '0 10px', color: '#888', fontSize: '14px' }}>OR</span>
                        <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                    </div>

                    {/* --- GOOGLE LOGIN BUTTON (Placed here as requested) --- */}
                    <button onClick={googleLogin} style={googleButtonStyle}>
                        {/* FcGoogle कंपोनेंट का उपयोग करें */}
    <FcGoogle style={{ fontSize: "20px", marginRight: "10px" }} /> 
    Login with Google
                    </button>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Login;