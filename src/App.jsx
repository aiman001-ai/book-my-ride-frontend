// Path: frontend\src\App.jsx

import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import RentForm from "./pages/RentForm";
import RefrshHandler from "./RefrshHandler";
import { useState, useEffect } from "react";
import About from "./pages/About";
import Footer from "./components/Footer";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


    // ⭐ AUTO LOGOUT CHECK
  useEffect(() => {
    const interval = setInterval(() => {
      const loginTime = localStorage.getItem("loginTime");
      const token = localStorage.getItem("token");

      if (loginTime && token) {
        const now = Date.now();
        const diff = now - loginTime;

        if (diff >= 10 * 60 * 1000) {   // 10 minutes
          localStorage.removeItem("token");
          localStorage.removeItem("loginTime");
          localStorage.removeItem("loggedInUser");
          window.location.href = "/login";
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <div className="App">
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/rentform" element={<RentForm />} /> {/* ✅ updated path */}
        <Route path="*" element={<Navigate to="/" />} />
         <Route path="/about" element={<About />} />
      </Routes>
      <Footer /> 
    </div>
  );
}

export default App;
