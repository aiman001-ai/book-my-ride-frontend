// Path: frontend\src\pages\Landing.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css"
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

  // Removed screenWidth / isMobile logic entirely

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
    padding: "0 clamp(12px, 2vw, 20px)", // responsive horizontal padding
    background: "#0f0e0eff",
    borderBottom: "1px solid #ddd",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 1000,
    boxSizing: "border-box",
  }}
>
  <button
    onClick={() => navigate("/login")}
    style={{
      background: "#e0d2d2ff",
      color: "#003f03ff",
      border: "none",
      padding: "8px clamp(12px, 2vw, 20px)", // responsive padding
      fontSize: "clamp(14px, 1.2vw, 16px)", // responsive font size
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
    flexWrap: "wrap", // allows stacking on small screens
    width: "100%",
    border: "1px solid #e0e0e0",
    borderRadius: "12px",
    boxShadow: "0px 4px 18px rgba(0,0,0,0.12)",
    background: "#fff",
  }}
>
  {/* LEFT FORM BOX */}
  <div
    style={{
      flex: "1 1 300px", // grow, shrink, base width
      maxWidth: "40%",   // on large screens
      minWidth: "280px", // on small screens
      background: "#fff",
      padding: "30px",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      boxSizing: "border-box",
    }}
  >
    <h2
      style={{
        fontSize: "20px", // can scale with CSS clamp if needed
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
    style={getInputStyle()}
  />

  <input
    name="contact"
    placeholder="Contact Number"
    value={formData.contact}
    onChange={handleChange}
    required
    style={getInputStyle()}
  />

  <input
    name="numberOfPassengers"
    placeholder="Number of Passengers"
    type="number"
    value={formData.numberOfPassengers}
    onChange={handleChange}
    required
    style={getInputStyle()}
  />

  <input
    name="cityPickPoint"
    placeholder="City Pick Point"
    value={formData.cityPickPoint}
    onChange={handleChange}
    required
    style={getInputStyle()}
  />

  <input
    name="cityDropPoint"
    placeholder="City Drop Point"
    value={formData.cityDropPoint}
    onChange={handleChange}
    required
    style={getInputStyle()}
  />

  {/* DATE + TIME — Fully Responsive */}
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
    }}
  >
    <input
      name="date"
      type="date"
      value={formData.date}
      onChange={handleChange}
      required
      style={{ ...getInputStyle(), flex: "1 1 160px" }}
    />
    <input
      name="time"
      type="time"
      value={formData.time}
      onChange={handleChange}
      required
      style={{ ...getInputStyle(), flex: "1 1 160px" }}
    />
  </div>

           <button
  type="submit"
  disabled={loading}
  style={{
    width: "100%",
    padding: "clamp(10px, 2.5vw, 14px)",
    background: "#00a86b",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "clamp(14px, 2.5vw, 17px)",
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
    width: "min(100%, 750px)",
    background: "#00a86b",
    color: "#fff",
    padding: "clamp(15px, 3vw, 30px)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: "clamp(10px, 2vw, 20px)",
    textAlign: "left",
    boxSizing: "border-box",
    borderRadius: "8px",
  }}
>
  {/* Info items */}
  <InfoItem
    title="Why BookMyRideToday?"
    text="BookMyRideToday is a completely free platform for both riders and hosts. Riders can submit their booking requests and interact with multiple hosts to compare and negotiate ride prices before confirming their trip. Hosts can sign up, log in, and access the booking list to efficiently manage their rides. This ensures a flexible, transparent, and seamless experience for everyone on the platform."
  />

  <InfoItem
    title="Top-Rated Cars"
    text="Premium, well-maintained vehicles for every journey"
  />

  <InfoItem
    title="Freedom to Explore"
    text="Go anywhere, anytime with flexible trip options"
  />

  <InfoItem
    title="Ride Assurance"
    text="Fully sanitized cars with complete safety coverage"
  />

  <InfoItem
    title="Instant Support"
    text="Quick help from our dedicated travel experts"
  />
</div>

      </div>

      {/* WHY BOOKMYRIDE SECTION - Dark Mode Style */}
      <div
  style={{
    width: "100%",
    background: "#525050ff",
    padding: "clamp(30px, 5vw, 60px)",
    color: "#fff",
  }}
>
  <h2
    style={{
      fontSize: "clamp(22px, 3vw, 30px)",
      fontWeight: "600",
      marginBottom: "30px",
      textAlign: "center",
      color: "#f1f1f1",
    }}
  >
    Why BookMyRideToday?
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
    height: "clamp(220px, 30vw, 350px)",  // fully responsive height
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
    <h2
      style={{
        fontSize: "clamp(22px, 3vw, 34px)",
        marginBottom: "10px",
      }}
    >
      Become a Partner
    </h2>

    <p
      style={{
        fontSize: "clamp(14px, 1.5vw, 18px)",
        marginBottom: "20px",
      }}
    >
      Earn money by sharing your car with trusted renters
    </p>

          <button
  onClick={() => navigate("/signup")}
  style={{
    background: "#fff",
    color: "#00a86b",
    border: "none",
    padding: "clamp(10px, 2vw, 16px) clamp(20px, 3vw, 34px)",
    fontSize: "clamp(14px, 1.5vw, 18px)",
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
    padding: "clamp(20px, 4vw, 60px)",
  }}
>
  <h2
    style={{
      fontSize: "clamp(20px, 2.5vw, 30px)",
      fontWeight: "600",
      marginBottom: "25px",
      textAlign: "left",
    }}
  >
           Ride Around Popular Cities in India
</h2>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // fully responsive grid
    gap: "clamp(12px, 2vw, 18px)",
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
        transition: "0.2s",
      }}
    >
      <img
        src={city.img}
        alt={city.name}
        style={{
          width: "100%",
          height: "clamp(100px, 20vw, 140px)", // responsive image height
          objectFit: "cover",
        }}
      />
      <div
        style={{
          padding: "10px",
          textAlign: "center",
          fontSize: "clamp(14px, 1.2vw, 17px)", // responsive text
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
    padding: "clamp(40px, 5vw, 60px) clamp(20px, 4vw, 40px)", // responsive padding
    marginTop: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
  }}
>
  <h2
    style={{
      fontSize: "clamp(22px, 3vw, 32px)", // responsive heading size
      marginBottom: "clamp(12px, 2vw, 20px)",
      fontWeight: "600",
    }}
  >
    About Us
  </h2>

     <p
  style={{
    fontSize: "clamp(14px, 1.2vw, 16px)",   // responsive font
    lineHeight: "1.65",
    opacity: 0.9,
    fontFamily: "'Dancing Script', cursive",
    maxWidth: "900px",
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
    gap: "clamp(20px, 3vw, 40px)", // responsive gap
  }}
>
  {/* Company */}
  <div style={{ flex: "1 1 200px" }}>
    <p style={{ fontSize: "clamp(12px, 1vw, 14px)", margin: "4px 0" }}>
      Terms and Conditions
    </p>
    <p style={{ fontSize: "clamp(12px, 1vw, 14px)", margin: "4px 0" }}>
      Privacy Policy
    </p>
  </div>

  {/* Our Services */}
  <div style={{ flex: "1 1 200px" }}>
    <p style={{ fontSize: "clamp(12px, 1vw, 14px)", margin: "4px 0" }}>
      Daily Drives
    </p>
    <p style={{ fontSize: "clamp(12px, 1vw, 14px)", margin: "4px 0" }}>
      BookMyRideToday Hosts
    </p>
  </div>
</div>
      </div>
    </div>
  );
}

const getInputStyle = () => ({
  width: "100%",
  padding: "clamp(10px, 1.2vw, 12px)",
  marginBottom: "12px",
  border: "1px solid #ccc",
  fontSize: "clamp(13px, 1vw, 16px)",
  borderRadius: "6px",
});

const InfoItem = ({ title, text }) => (
  <div style={{ marginBottom: "15px" }}>
    <h3 style={{ fontSize: "clamp(22px, 2vw, 30px)", margin: 0 }}>{title}</h3>
    <p style={{ margin: "5px 0 0", fontSize: "clamp(15px, 1.2vw, 18px)" }}>{text}</p>
  </div>
);


export default Landing;
