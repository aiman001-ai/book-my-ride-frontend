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
          background: "#0f0e0eff",
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
          marginTop: "50px",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: isMobile ? "auto" : "calc(100vh - 80px)",
          border: "1px solid #e0e0e0",
          borderRadius: "12px",
          boxShadow: "0px 4px 18px rgba(0,0,0,0.12)",
          background: "#fff",
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
            Book My Ride Today
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
    padding: isMobile ? "4px 19px 19px 19px" : "10px 30px 30px 30px",
 // slightly reduced padding for large screens
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // prevent vertical centering
    gap: isMobile ? "7x" : "12px",
    textAlign: isMobile ? "center" : "left",
    boxSizing: "border-box", // include padding in width
    minHeight: "100%", // allows box to expand with content
  }}
>
  {/* Info items */}

<h1
                        style={{
                            fontSize: isMobile ? "28px" : "44px",
                            margin: 0,
                            fontWeight: "700",
                            lineHeight: "1.2",
                        }}
                    >
                        Best Car on Rent Services
                        <br />
                        in India.
                    </h1>
                    
                    {/* Key SEO and value proposition statement */}
                    <p
                        style={{
                            fontSize: isMobile ? "16px" : "20px",
                            margin: "10px 0 20px",
                            fontWeight: "400",
                        }}
                    >
                        **Book My Ride Today** connects riders with local hosts for **affordable car rentals**. Compare prices, negotiate deals, and book your next trip with confidence.
                    </p>

                    {/* Quick Bullet Points (Replaces InfoItem for better scannability) */}
                    <ul style={{ listStyle: "disc", paddingLeft: isMobile ? "20px" : "25px", margin: 0 }}>
                        <li style={{ fontSize: isMobile ? "14px" : "18px", marginBottom: "8px" }}>Free platform for Riders and Hosts.</li>
                        <li style={{ fontSize: isMobile ? "14px" : "18px", marginBottom: "8px" }}>Compare and negotiate **Car Rental** prices.</li>
                        <li style={{ fontSize: isMobile ? "14px" : "18px", marginBottom: "8px" }}>24/7 Instant Support & Ride Assurance.</li>
                    </ul>

  <InfoItem
    title="Why BookMyRideToday?"
    text="BookMyRideToday is a completely free platform for both riders and hosts. Riders can submit their booking requests and interact with multiple hosts to compare and negotiate ride prices before confirming their trip. Hosts can sign up, log in, and access the booking list to efficiently manage their rides. This ensures a flexible, transparent, and seamless experience for everyone on the platform."
    isMobile={isMobile}
  />
  
  
 

 
</div>

      </div>

      {/* WHY BOOKMYRIDE SECTION - Dark Mode Style */}
      <div
        style={{
          width: "100%",
          background: "#525050ff", // Dark Background
          padding: isMobile ? "30px 20px" : "60px 60px",
          color: "#fff", // White Text
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "22px" : "30px",
            fontWeight: "600",
            marginBottom: "30px",
            textAlign: isMobile ? "center" : "left",
            color: "#f1f1f1",
          }}
        >
          Why BookMyRideToday?
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Item 1 */}
          <div
            style={{
              background: "#1f1f1f",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #2a2a2a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3500/3500827.png"
              alt="Hassle Free"
              style={{ height: "60px", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "5px", color: "#fff" }}>
              100%
            </h3>
            <p style={{ fontSize: "15px", color: "#cfcfcf" }}>
              Hassle Free Secured Trip
            </p>
          </div>

          {/* Item 2 */}
          <div
            style={{
              background: "#5a2f43ff",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #2a2a2a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3208/3208754.png"
              alt="Cars"
              style={{ height: "60px", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "5px", color: "#fff" }}>
              25000+
            </h3>
            <p style={{ fontSize: "15px", color: "#cfcfcf" }}>
              Quality cars in the city
            </p>
          </div>

          {/* Item 3 */}
          <div
            style={{
              background: "#5a2f43ff",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #2a2a2a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854878.png"
              alt="Delivery"
              style={{ height: "60px", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "5px", color: "#fff" }}>
              Delivery
            </h3>
            <p style={{ fontSize: "15px", color: "#cfcfcf" }}>
              Anywhere, Anytime
            </p>
          </div>

          {/* Item 4 */}
          <div
            style={{
              background: "#1f1f1f",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #2a2a2a",
              boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
            }}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/854/854894.png"
              alt="Unlimited"
              style={{ height: "60px", marginBottom: "10px" }}
            />
            <h3 style={{ fontSize: "20px", marginBottom: "5px", color: "#fff" }}>
              Endless
            </h3>
            <p style={{ fontSize: "15px", color: "#cfcfcf" }}>
              Pay by hour, drive limitless
            </p>
          </div>
        </div>
      </div>

      {/* BECOME A HOST SECTION - Solid Color + Signup Navigation */}
      <div
        style={{
          width: "100%",
          marginTop: "50px",
          position: "relative",
          background: "#00a86b",
          height: isMobile ? "220px" : "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {/* Text On Color */}
        <div>
          <h2 style={{ fontSize: isMobile ? "22px" : "34px", marginBottom: "10px" }}>
            Become a Partner
          </h2>
          <p style={{ fontSize: isMobile ? "14px" : "18px", marginBottom: "20px" }}>
            Earn money by sharing your car with trusted renters
          </p>

          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "#fff",
              color: "#00a86b",
              border: "none",
              padding: isMobile ? "10px 20px" : "14px 30px",
              fontSize: isMobile ? "14px" : "18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Start Hosting
          </button>
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
          Ride Around Popular Cities in India
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

      {/* 🔥🔥 ABOUT US SECTION (ADDED HERE) */}
      <div
        style={{
          width: "100%",
          background: "#0f0e0e",
          color: "#fff",
          padding: "50px 30px",
          marginTop: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h2 style={{ fontSize: "26px", marginBottom: "15px" }}>About Us</h2>

        <p
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            opacity: 0.9,
            fontFamily: "'Dancing Script', cursive",
          }}
        >
          Founded in 2025 and headquartered in Najibabad, India, BookMyRideToday is a
          leading marketplace for car sharing focused in India. The BookMyRideToday
          community connects Hosts with Guests, offering affordable, smart, and
          sustainable transportation solutions across the country.
        </p>

        {/* Columns */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            marginTop: "30px",
            gap: "40px",
          }}
        >
          {/* Company */}
          <div>
            <p style={{ fontSize: "14px", margin: "4px 0" }}>Terms and Conditions</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}>Privacy Policy</p>
          </div>

          {/* Our Services */}
          <div>
            <p style={{ fontSize: "14px", margin: "4px 0" }}>Daily Drives</p>
            <p style={{ fontSize: "14px", margin: "4px 0" }}>BookMyRideToday Hosts</p>
          </div>
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
