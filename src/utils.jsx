// Path: frontend\src\utils.jsx
import { toast } from 'react-toastify';

// Base URL of your deployed backend on Render
export const BASE_URL = "https://book-my-ride.onrender.com"; // <-- apna backend live URL yaha daale

// Toast notifications
export const handleSuccess = (msg) => toast.success(msg, { position: 'top-right' });
export const handleError = (msg) => toast.error(msg, { position: 'top-right' });
