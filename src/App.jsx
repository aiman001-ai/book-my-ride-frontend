// Path: frontend\src\App.jsx

import { Navigate, BrowserRouter, Route, Routes } from "react-router-dom";
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
import {GoogleOAuthProvider} from '@react-oauth/google';

// अपनी Google Client ID यहाँ डालें
const GOOGLE_CLIENT_ID = '42846031442-76iei2p8t06vbnrl7p5mpt4up6rgabvi.apps.googleusercontent.com';


function App() {
// ❌ हमने GoogleAuthWrapper को हटा दिया है, क्योंकि Provider अब सीधे Routes के ऊपर है।


    const [isAuthenticated, setIsAuthenticated] = useState(false);


    // ⭐ AUTO LOGOUT CHECK
    useEffect(() => {
        const interval = setInterval(() => {
            const loginTime = localStorage.getItem("loginTime");
            const token = localStorage.getItem("token");

            if (loginTime && token) {
                const now = Date.now();
                const diff = now - loginTime;

                // 10 minutes timeout
                if (diff >= 10 * 60 * 1000) { 
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
            
            {/* ✅ GoogleOAuthProvider को Routes के ऊपर रैप करें ताकि Login और Signup दोनों को Context मिल सके */}
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

                <Routes>
                    
                    <Route path="/" element={<Landing />} />
                    {/* ✅ अब Login कॉम्पोनेंट सीधा इस्तेमाल हो सकता है */}
                    <Route path="/login" element={<Login />} /> 
                    {/* ✅ Signup कॉम्पोनेंट को भी Context मिल गया है */}
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                    <Route path="/rentform" element={<RentForm />} />
                    <Route path="*" element={<Navigate to="/" />} />
                    <Route path="/about" element={<About />} />
                </Routes>

            </GoogleOAuthProvider>
            
            <Footer /> 
        </div>
    );
}

export default App;