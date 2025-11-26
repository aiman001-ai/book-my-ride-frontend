// Path: frontend\src\pages\Landing.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

import logo from "../assets/logo.png";
import { handleError, handleSuccess } from "../utils";

// 🔥 Import all city images
import delhiImg from "../assets/cities/delhi.jpg";
import mumbaiImg from "../assets/cities/mumbai.jpg";
import bangaloreImg from "../assets/cities/bangalore.jpg";
import chennaiImg from "../assets/cities/chennai.jpg";
import hyderabadImg from "../assets/cities/hyderabad.jpg";
import goaImg from "../assets/cities/goa.jpg";
import jaipurImg from "../assets/cities/jaipur.jpg";
import kolkataImg from "../assets/cities/kolkata.jpg";
import puneImg from "../assets/cities/pune.jpg";
import ahmedabadImg from "../assets/cities/ahmedabad.jpg";
import udaipur from "../assets/cities/udaipur.jpg";
import shimla from "../assets/cities/shimla.jpg";
import manali from "../assets/cities/manali.jpg";
import rishikesh from "../assets/cities/rishikesh.jpg";
import varanasi from "../assets/cities/varanasi.jpg";
import amritsar from "../assets/cities/amritsar.jpg";
import coorg from "../assets/cities/coorg.jpg";
import munnar from "../assets/cities/munnar.jpg";
import darjeeling from "../assets/cities/darjeeling.jpg";
import ooty from "../assets/cities/ooty.jpg";
import jaisalmer from "../assets/cities/jaisalmer.jpg";
import khajuraho from "../assets/cities/khajuraho.jpg";
import leh from "../assets/cities/leh.jpg";
import kodaikanal from "../assets/cities/kodaikanal.jpg";


const BASE_URL = "https://book-my-ride-3.onrender.com";

function Landing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 900;
  const isSmallMobile = screenWidth <= 500;

  

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    numberOfPassengers: "",
    cityPickPoint: "",
    cityDropPoint: "",
    date: "",
    time: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/rent/create`, {
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
    } catch (err) {
      handleError("Something went wrong");
    }
    setLoading(false);
  };

  // 🔥 Cities array with imported images
  const cities = [
   { name: "Delhi", img: delhiImg },
  { name: "Mumbai", img: mumbaiImg },
  { name: "Bangalore", img: bangaloreImg },
  { name: "Chennai", img: chennaiImg },
  { name: "Hyderabad", img: hyderabadImg },
  { name: "Goa", img: goaImg },
  { name: "Jaipur", img: jaipurImg },
  { name: "Kolkata", img: kolkataImg },
  { name: "Pune", img: puneImg },
  { name: "Ahmedabad", img: ahmedabadImg },
  { name: "Udaipur", img: udaipur },
  { name: "Shimla", img: shimla },
  { name: "Manali", img: manali },
  { name: "Rishikesh", img: rishikesh },
  { name: "Varanasi", img: varanasi },
  { name: "Amritsar", img: amritsar },
  { name: "Coorg", img: coorg },
  { name: "Munnar", img: munnar },
  { name: "Darjeeling", img: darjeeling },
  { name: "Ooty", img: ooty },
  { name: "Jaisalmer", img: jaisalmer },
  { name: "Khajuraho", img: khajuraho },
  { name: "Leh", img: leh },
{ name: "Kodaikanal", img: kodaikanal },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#ececec" }}>
      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "65px",
          padding: "0 20px",
          background: "#fff",
          borderBottom: "1px solid #ddd", 
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1000,
        }}
      >
       <button
    onClick={() => navigate("/login")}
    style={{
      background: "#e0d2d2ff",
      color: "#003f03ff",
      border: "none",
      padding: isMobile ? "6px 14px" : "8px 20px",
      fontSize: isMobile ? "14px" : "16px",
      borderRadius: "6px",
      cursor: "pointer",
      fontWeight: "600",
    }}
  >
    Login / Signup
  </button>
        
        
      </header>

      {/* MAIN LAYOUT */}
      <div
        style={{
          marginTop: "80px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: isMobile ? "auto" : "calc(100vh - 80px)",
        }}
      >
        {/* LEFT FORM BOX */}
        <div
          style={{
            width: isMobile ? "100%" : "40%",
            background: "#fff",
            padding: isMobile ? "18px" : "30px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          }}
        >
          <h2
            style={{
              fontSize: isSmallMobile ? "16px" : isMobile ? "18px" : "20px",
              marginBottom: "15px",
            }}
          >
            Book Self-Drive Car Rentals
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={getInputStyle(isMobile, isSmallMobile)}
            />
            <input
              name="contact"
              placeholder="Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
              style={getInputStyle(isMobile, isSmallMobile)}
            />
            <input
              name="numberOfPassengers"
              placeholder="Number of Passengers"
              type="number"
              value={formData.numberOfPassengers}
              onChange={handleChange}
              required
              style={getInputStyle(isMobile, isSmallMobile)}
            />
            <input
              name="cityPickPoint"
              placeholder="City Pick Point"
              value={formData.cityPickPoint}
              onChange={handleChange}
              required
              style={getInputStyle(isMobile, isSmallMobile)}
            />
            <input
              name="cityDropPoint"
              placeholder="City Drop Point"
              value={formData.cityDropPoint}
              onChange={handleChange}
              required
              style={getInputStyle(isMobile, isSmallMobile)}
            />
            <div
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: "10px",
              }}
            >
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={getInputStyle(isMobile, isSmallMobile)}
              />
              <input
                name="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                required
                style={getInputStyle(isMobile, isSmallMobile)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: isSmallMobile ? "10px" : "14px",
                background: "#00a86b",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                fontSize: isSmallMobile ? "14px" : "17px",
                cursor: "pointer",
                opacity: loading ? 0.6 : 1,
                marginTop: "10px",
              }}
            >
              {loading ? "Please wait..." : "Submit"}
            </button>
          </form>
        </div>

        {/* RIGHT GREEN BOX */}
        <div
          style={{
            width: isMobile ? "100%" : "60%",
            background: "#00a86b",
            color: "#fff",
            padding: isMobile ? "25px" : "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: isMobile ? "20px" : "40px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          <InfoItem
            title="31,000+"
            text="high-quality car options"
            isMobile={isMobile}
          />
          <InfoItem
            title="Unlimited kms"
            text="to drive and stop anywhere"
            isMobile={isMobile}
          />
          <InfoItem
            title="100% Trip protection"
            text="for a safe drive"
            isMobile={isMobile}
          />
          <InfoItem
            title="24/7 support"
            text="dedicated assistance"
            isMobile={isMobile}
          />
        </div>
      </div>

      {/* Cities Grid with imported images */}
      <div
        style={{
          width: "100%",
          background: "#fff",
          padding: isMobile ? "25px 18px" : "50px 60px",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "22px" : "30px",
            fontWeight: "600",
            marginBottom: "25px",
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Zoom Around Popular Cities in India
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
            gap: "18px",
          }}
        >
          {cities.map((city, index) => (
            <div
              key={index}
              style={{
                background: "#f2f2f2",
                borderRadius: "8px",
                cursor: "pointer",
                overflow: "hidden",
              }}
            >
              <img
                src={city.img}
                alt={city.name}
                style={{
                  width: "100%",
                  height: "120px",
                  objectFit: "cover",
                }}
              />
              <div
                style={{
                  padding: "8px",
                  textAlign: "center",
                  fontSize: isMobile ? "15px" : "17px",
                  fontWeight: 500,
                }}
              >
                {city.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getInputStyle = (isMobile, isSmallMobile) => ({
  width: "100%",
  padding: isSmallMobile ? "10px" : isMobile ? "11px" : "12px",
  marginBottom: "12px",
  border: "1px solid #ccc",
  fontSize: isSmallMobile ? "13px" : isMobile ? "14px" : "16px",
  borderRadius: "6px",
});

const InfoItem = ({ title, text, isMobile }) => (
  <div>
    <h3 style={{ fontSize: isMobile ? "22px" : "30px", margin: 0 }}>{title}</h3>
    <p style={{ margin: "5px 0 0", fontSize: isMobile ? "15px" : "18px" }}>
      {text}
    </p>
  </div>
);

export default Landing;
