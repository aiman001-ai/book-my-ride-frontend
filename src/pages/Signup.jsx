// Path: frontend\src\pages\Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import "../index.css";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "../styles/Signup.css";
import logo from "../assets/logo.png";

// ✅ Update this to your live backend URL
const BASE_URL = "https://book-my-ride-3.onrender.com";

function Signup() {

    const [signupInfo, setSignupInfo] = useState({
        name: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignupInfo({ ...signupInfo, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {
            return handleError('name, email and password are required');
        }

        try {
            const url = `${BASE_URL}/auth/signup`; // ✅ Updated to live URL
            const response = await fetch(url, {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(signupInfo)
            });

            const result = await response.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => navigate('/login'), 1000);
            } else if (error) {
                handleError(error?.details[0].message);
            } else {
                handleError(message);
            }

        } catch (err) {
            handleError(err);
        }
    };

    return (
        <div className="signup-page">

            {/* 🔥 Landing style header */}
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
                    <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
                </div>
            </header>

            {/* SIGNUP BOX */}
            <div className="signup-box">
                <h1>Signup</h1>
                <form onSubmit={handleSignup}>

                    <div>
                        <label>Name</label>
                        <input
                            onChange={handleChange}
                            type='text'
                            name='name'
                            placeholder='Enter your name...'
                            value={signupInfo.name}
                        />
                    </div>

                    <div>
                        <label>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={signupInfo.email}
                        />
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={signupInfo.password}
                        />
                    </div>

                    <button type="submit">Signup</button>

                    <span>
                        Already have an account?
                        <Link to="/login">Login</Link>
                    </span>
                </form>

                <ToastContainer />
            </div>
        </div>
    );
}

export default Signup;
