// Path: frontend\src\assets\api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/auth'
});

// Changed to POST request sending code in body
export const googleAuth = (code) => api.post('/google', { code }); 

// बाकी API फ़ंक्शन्स यहाँ हो सकते हैं

export default api;