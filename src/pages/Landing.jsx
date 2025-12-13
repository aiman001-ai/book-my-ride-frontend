// Path: frontend\src\pages\Landing.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";


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

const BASE_URL = "https://bookmyridetoday.co.in";

function Landing() {
  // ---- Hooks ----
const navigate = useNavigate();
const [loading, setLoading] = useState(false);

// Screen width
const [screenWidth, setScreenWidth] = useState(
  typeof window !== "undefined" ? window.innerWidth : 0
);

// Header hide on scroll
const [prevScroll, setPrevScroll] = useState(0);
const [hideHeader, setHideHeader] = useState(false);

// ---- Effects ----
// Handle resize
useEffect(() => {
  const handleResize = () => setScreenWidth(window.innerWidth);
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// Handle scroll
useEffect(() => {
  const handleScroll = () => {
    const currentScroll = window.scrollY;

    // Scroll down → hide header, Scroll up → show header
    setHideHeader(currentScroll > prevScroll && currentScroll > 80);

    setPrevScroll(currentScroll);
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [prevScroll]); // Problematic: instead, use functional update

// ---- FIXED VERSION using functional update ----
useEffect(() => {
  const handleScroll = () => {
    setPrevScroll((prev) => {
      const currentScroll = window.scrollY;
      setHideHeader(currentScroll > prev && currentScroll > 80);
      return currentScroll;
    });
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);


  // 🔥 FIX: isMobile breakpoint increased from 900px to 1200px 
  // to ensure column layout and correct text size in 'Desktop Site' mobile view.
  const isMobile = screenWidth <= 1200; 
  const isSmallMobile = screenWidth <= 500;

  // 🔥 SEO Implementation: Update Title and Meta Description
  useEffect(() => {
    document.title = "BookMyRide: Self-Drive Car on Rent | Rent a Car in India";
    
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.name = 'description';
      document.getElementsByTagName('head')[0].appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.content = "Rent a car in India for self-drive, hourly, or outstation trips. Book My Ride Today offers the most affordable and flexible car on rent service. Compare prices and book instantly.";
  }, []);


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

      if (!formData.date || !formData.time) {
    handleError("Please select date and time");
    setLoading(false);
    return;
    }
  

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
    <div style={{ minHeight: "100vh",  }}>
      {/* HEADER */}
      <header
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          height: "65px",
          padding: "0 20px",
          background: "#020202ff",
          
          
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1000,
          transform: hideHeader ? "translateY(-100%)" : "translateY(0)",
    transition: "transform 0.3s ease",
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
          // FIX isMobile handles the switch to column layout for small screens and desktop site view
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          height: isMobile ? "auto" : "calc(100vh - 80px)",
          
          
          
          
            
        }}
      >
        {/* LEFT FORM BOX */}
        <div
          style={{
            width: isMobile ? "100%" : "40%",
          
            padding: isMobile ? "18px" : "30px",
            
            
    borderRight: "2px solid #e0e0e0",

    boxSizing: "border-box",
    background: "transparent",
          }}
        >
          <h2
  style={{
    fontSize: isSmallMobile ? "18px" : isMobile ? "20px" : "20px",
    marginBottom: "8px",
    color: "#fff",
    textAlign: "center",
    fontFamily: "Nabla, sans-serif", // 🔥 Add this line
  }}
>
  Book My Ride 
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
    color: "#ffffff",
    padding: isMobile ? "4px 19px 19px 19px" : "10px 30px 30px 30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: isMobile ? "7px" : "12px",
    textAlign: isMobile ? "center" : "left",
    boxSizing: "border-box",
    minHeight: "100%",

    // 🔥 COMMON TEXT STYLE FOR ENTIRE SECTION
    fontFamily: "'Gloria Hallelujah', cursive",
    fontWeight: "10",
    fontSize: isMobile ? "15px" : "19px",
  }}
>
  {/* Heading */}
  <h1
    style={{
      fontSize: isMobile ? "22px" : "38px",
      margin: 0,
      fontWeight: "10",
      lineHeight: "1.2",
      color: "#f0061aff",
    }}
  >
    <strong>Book MY Ride</strong> Best <strong>Car on Rent</strong> Services
    <br />
    in India.
  </h1>

  {/* Paragraph */}
  <p
    style={{
      margin: "10px 0 20px",
      fontWeight: "10",
    }}
  >
    <strong>Book My Ride</strong> connects riders with local hosts for
    <strong> affordable car rentals</strong>. Compare prices, negotiate deals,
    and book your next trip with confidence.
  </p>

  {/* Bullet List */}
  <ul
    style={{
      listStyle: "disc",
      paddingLeft: isMobile ? "20px" : "25px",
      margin: -6,
    }}
  >
    <li style={{ marginBottom: "1px" }}>
      <strong>Car-On-Rent</strong> Car Rentals for ultimate freedom.
    </li>

    <li style={{ marginBottom: "1px" }}>
      Hourly, Daily, and Weekly <strong>Flexible Rental</strong> Plans.
    </li>

    <li style={{ marginBottom: "1px" }}>
      Wide range of cars available for <strong>rent a car</strong> across 20+ cities.
    </li>

    <li style={{ marginBottom: "1px" }}>
      No hidden charges and <strong>zero commission</strong> platform.
    </li>
  </ul>

  {/* InfoItem */}
  <InfoItem
   title={
    <span style={{ color: "#f0061aff" }}>About BookMyRide</span>
  }
  text={
    <span>
      BookMyRide is a completely free platform for both riders and hosts.
      Riders can submit their booking requests and interact with multiple hosts
      to compare and negotiate ride prices before confirming their trip.
      Hosts can sign up, log in, and access the booking list to efficiently
      manage their rides. This ensures a flexible, transparent, and seamless
      experience for everyone on the platform.
    </span>
    }
    isMobile={isMobile}
  />
</div>


      </div>

      {/* WHY BOOKMYRIDE SECTION - Dark Mode Style */}
      <div
        style={{
          width: "100%",
          background: "transparent", // Dark Background
          padding: isMobile ? "30px 20px" : "60px 60px",
          color: "#fff", // White Text


        borderTop: "1px solid transparent",
borderBottom: "1px solid transparent",

backgroundImage:
  "linear-gradient(to right, transparent, #5b6cff, transparent), linear-gradient(to right, transparent, #5b6cff, transparent)",

backgroundRepeat: "no-repeat, no-repeat",

backgroundSize: "100% 1px, 100% 1px",

backgroundPosition: "top, bottom",


        }}
      >
        <h2
           style={{
    width: "100%",
    textAlign: "center",
    fontSize: isMobile ? "22px" : "38px",
    fontWeight: "10",
    marginBottom: "30px",
    color: "#f0061aff",
    fontFamily: "'Gloria Hallelujah', cursive",
  }}
        >
          Why BookMyRide?
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
              background: "#0a0a24ff",
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
              background: "#142e13ff",
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
              background: "#142e13ff",
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
              background: "#0a0a24ff",
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
          background: "transparent",
          height: isMobile ? "220px" : "350px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          textAlign: "center",
          padding: "20px",

           borderBottom: "1px solid transparent",

backgroundImage:

  "linear-gradient(to right, transparent, #5b6cff, transparent)",

backgroundRepeat: "no-repeat",

backgroundSize: "100% 1px",

backgroundPosition: "bottom",
          
        }}
      >
        {/* Text On Color */}
        <div>
          <h2   style={{
    fontSize: isMobile ? "22px" : "34px",
    marginBottom: "10px",
    color: "#f0061aff",
    fontFamily: "'Gloria Hallelujah', cursive",
  }}
>
            Become a Partner
          </h2>
          <p style={{ fontSize: isMobile ? "14px" : "18px", fontFamily: "'Gloria Hallelujah', cursive",marginBottom: "20px" }}>
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
          background: "transparent",
          padding: isMobile ? "25px 18px" : "50px 60px",
           borderBottom: "1px solid transparent",

backgroundImage:

  "linear-gradient(to right, transparent, #5b6cff, transparent)",

backgroundRepeat: "no-repeat",

backgroundSize: "100% 1px",

backgroundPosition: "bottom",
          
          
        }}
      >
       <h2
  style={{
    fontSize: isMobile ? "22px" : "30px",
    fontWeight: "10",
    marginBottom: "25px",
    textAlign: "center",         // force center
    width: "100%",               // IMPORTANT for proper centering
    fontFamily: "'Gloria Hallelujah', cursive",
    color: "#f0061aff",
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
          background: "transparent",
          color: "#ffffff",
          padding: "50px 30px",
          marginTop: "20px",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <h2 style={{ fontSize: "26px", marginBottom: "15px",fontFamily: "'Gloria Hallelujah', cursive",
    color: "#f0061aff",fontWeight: "10",textAlign: "center",  }}>About Us</h2>

        <p
          style={{
            fontSize: "15px",
            fontWeight: "10",
            lineHeight: "1.6",
            opacity: 0.9,
            fontFamily: "'Gloria Hallelujah', cursive",
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
            fontFamily: "'Gloria Hallelujah', cursive",
            
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
background: "#c2a8a8ff",  
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