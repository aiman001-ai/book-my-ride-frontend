// Path: frontend\src\RefrshHandler.jsx
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RefrshHandler({ setIsAuthenticated }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      // Agar user landing, login, signup pe hai, redirect to home
      if (["/", "/login", "/signup"].includes(location.pathname)) {
        navigate("/home", { replace: true });
      }
    } else {
      setIsAuthenticated(false);
      // agar token nahi hai aur private route pe hai, redirect to login
      if (["/home", "/rent"].includes(location.pathname)) {
        navigate("/login", { replace: true });
      }
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
}

export default RefrshHandler;
