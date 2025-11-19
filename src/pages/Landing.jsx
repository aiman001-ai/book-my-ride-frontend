// Path: frontend\src\pages\Landing.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../index.css";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "../styles/Landing.css";
import logo from "../assets/logo.png";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header */}
      <header className="landing-header">
        {/* LEFT SIDE ICON */}
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

        {/* RIGHT SIDE MENU */}
        <div className="nav-items">
          <Link className="nav-link" to="/about">About Us</Link>
           <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="landing-content">
        <button
          className="tab rent-tab"
          onClick={() => navigate("/rentform")} // ✅ updated path
        >
          Rent a Car
        </button>
        <button
          className="tab partner-tab"
          onClick={() => navigate("/signup")}
        >
          Become a Partner
        </button>
      </div>
    </div>
  );
}

export default Landing;
