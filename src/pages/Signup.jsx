// Path: frontend\src\pages\Signup.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess, BASE_URL } from "../utils";
import "../index.css";

import Header from "../components/Header";
// ✅ NEW IMPORTS for Google Signup
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { googleAuth } from "../assets/api"; // Import API call

function Signup() {
    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleChange = (e) =>
        setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value });

    // --- NORMAL SIGNUP HANDLER ---
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

    // --- ✅ GOOGLE SIGNUP LOGIC ---
    const responseGoogle = async (authResult) => {
        try {
            if (authResult["code"]) {
                // Call our backend API with the code (This is the same logic as login)
                const result = await googleAuth(authResult["code"]);
                const { name, jwtToken } = result.data; // Backend will return jwtToken, email, name

                // Save data and redirect
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("loggedInUser", name);
                localStorage.setItem("loginTime", Date.now());

                handleSuccess("Google Signup Successful");
                setTimeout(() => navigate("/home"), 500); 
            } else {
                handleError("Google signup failed to get authorization code");
            }
        } catch (err) {
            console.error("Error during Google signup: ", err);
            handleError("Google Signup Failed. Try again.");
        }
    };

    // Hook must be called at the top level
    const googleLogin = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle, // onError is usually also handled by responseGoogle
        flow: "auth-code",
    });

    // --- ✅ GOOGLE BUTTON STYLES ---
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
                flexDirection: isMobile ? "column" : "row",
                overflow: "hidden",
                fontFamily: "Segoe UI, sans-serif",
            }}
        >
            <Header />

            {/* LEFT BLUE SECTION (Same) */}
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
                        borderRadius: "8px", // Added border radius for consistency
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
                        {/* Name Input */}
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

                        {/* Email Input */}
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

                        {/* Password Input */}
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
                    </form>

                    <div style={{ marginTop: "14px", fontSize: "13px", textAlign: "center" }}>
                        Already have an account?
                        <Link to="/login" style={{ color: "#2b9af3", marginLeft: "3px" }}>
                            Login
                        </Link>
                    </div>

                    {/* --- ✅ OR DIVIDER --- */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
                        <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                        <span style={{ margin: '0 10px', color: '#888', fontSize: '14px' }}>OR</span>
                        <div style={{ flex: 1, borderBottom: '1px solid #ccc' }}></div>
                    </div>

                    {/* --- ✅ GOOGLE SIGNUP BUTTON --- */}
                    <button onClick={googleLogin} style={googleButtonStyle}>
                        <FcGoogle style={{ fontSize: "20px", marginRight: "10px" }} />
                        Signup with Google
                    </button>

                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default Signup;