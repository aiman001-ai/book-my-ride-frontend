// Path: frontend\src\pages\RentForm.jsx
import React, { useState } from "react";
import { handleError, handleSuccess } from "../utils";
import { useNavigate } from "react-router-dom";
import {
  FaFacebookF,
  FaWhatsapp,
  FaTwitter,
  FaInstagramSquare,
} from "react-icons/fa";
import "../styles/RentForm.css";
import logo from "../assets/logo.png";

function RentForm() {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    numberOfPassengers: "",
    cityPickPoint: "",
    cityDropPoint: "",
    date: "",
    time: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/rent/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        handleSuccess(data.message);

        setFormData({
          name: "",
          contact: "",
          numberOfPassengers: "",
          cityPickPoint: "",
          cityDropPoint: "",
          date: "",
          time: "",
        });

        setTimeout(() => navigate("/"), 800);
      } else {
        handleError(data.message);
      }
    } catch {
      handleError("Something went wrong");
    }
  };

  return (
    <div className="rentform-page">

      {/* HEADER SAME AS LANDING */}
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

      {/* MAIN FORM BOX */}
      <div
        className="rent-box"
        style={{
          maxWidth: "350px",
          margin: "120px auto 40px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="rent-title">Rent a Car</h1>


        <form onSubmit={handleSubmit} className="rent-form">
          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />

          <input
            name="numberOfPassengers"
            placeholder="Number of Passengers"
            type="number"
            value={formData.numberOfPassengers}
            onChange={handleChange}
            required
          />

          <input
            name="cityPickPoint"
            placeholder="City Pick Point"
            value={formData.cityPickPoint}
            onChange={handleChange}
            required
          />

          <input
            name="cityDropPoint"
            placeholder="City Drop Point"
            value={formData.cityDropPoint}
            onChange={handleChange}
            required
          />

          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
          />

          <input
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RentForm;
