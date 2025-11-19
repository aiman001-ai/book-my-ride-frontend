// Path: frontend\src\pages\Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "../index.css";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "../styles/Login.css";
import logo from "../assets/logo.png";

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) =>
        setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginInfo.email || !loginInfo.password)
            return handleError('Email and password required');

        try {
            const res = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginInfo)
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.jwtToken);
                localStorage.setItem('loggedInUser', data.name);

                // ⭐ ADDED: Store login time
                localStorage.setItem("loginTime", Date.now());

                handleSuccess(data.message);
                setTimeout(() => navigate('/home'), 500);
            } else {
                handleError(data.message);
            }
        } catch {
            handleError('Server error. Try again later.');
        }
    };

    return (
        <div className="login-page">

            {/* HEADER LIKE LANDING PAGE */}
            <header className="landing-header">
                <div className="header-left">
                          <img
                            src={logo}
                            alt="logo"
                            className="site-logo"
                            onClick={() => navigate("/")}
                          />
                        </div>
                <div className="left-icons">
                    <FaFacebookF className="fb-icon" />
                    <FaWhatsapp className="wa-icon" />
                    <FaTwitter className="twitter-icon" />
                    <FaInstagramSquare className="instagram-icon" />
                </div>

                <div className="nav-items">
                    <span className="nav-link" onClick={() => navigate("/about")}>
                        About Us
                    </span>
                </div>
            </header>

            {/* LOGIN BOX */}
            <div className="login-box">
                <h1>Login</h1>

                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email..."
                            value={loginInfo.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password..."
                            value={loginInfo.password}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit">Login</button>

                    <span className="signup-redirect">
                        Don't have an account? <Link to="/signup">Signup</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
