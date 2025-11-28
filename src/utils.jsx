// Path: frontend\src\utils.jsx
import { toast } from "react-toastify";

// Base URL of your live backend
export const BASE_URL = "https://book-my-ride-3.onrender.com";  

// Toast notifications
export const handleSuccess = (msg) => toast.success(msg, { position: "top-right" });
export const handleError = (msg) => toast.error(msg, { position: "top-right" });
