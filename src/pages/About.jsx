// Path: frontend\src\pages\About.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaWhatsapp, FaTwitter, FaInstagramSquare } from "react-icons/fa";
import "../index.css";
import "../styles/About.css";  
import logo from "../assets/logo.png";

function About() {
  const navigate = useNavigate();

  return (
    <div className="about-page">
      {/* Header */}
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
          <span className="nav-home" onClick={() => navigate("/")}>
            Home
          </span>
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </header>

      {/* About Content */}
      <div className="about-box">
        

        <p>
          Our website is designed to create a simple and reliable connection between
          people who want to book a car for their travel and the drivers who are
          looking for genuine customers. Many travelers struggle to find trusted
          drivers, and at the same time, many drivers find it difficult to get
          regular bookings. Our platform bridges this gap by connecting both sides
          directly.
        </p>

        <p>
          One of the most important features of our service is that we do not set
          any fixed prices for the journey. Instead, the customer and the driver
          can communicate directly and decide the price that suits both of them,
          based on distance, time, and personal convenience. This ensures complete
          freedom, transparency, and flexibility for both parties.
        </p>

        <p>
          Our mission is to provide a safe, smooth, and trustworthy travel experience
          for users while also offering fair earning opportunities to drivers. Through
          this platform, we aim to create a reliable network where travelers can find
          the right driver and drivers can easily reach new customers without any
          hassle.
        </p>

        <p>
          We are committed to building a transparent system that benefits everyone and
          makes the process of booking or offering car services completely effortless.
        </p>
      </div>
    </div>
  );
}

export default About;
