// Path: frontend\src\assets\api.js
import axios from 'axios';

// baseURL को लोकलहोस्ट से लाइव डोमेन पर बदला गया
const api = axios.create({
    baseURL: 'https://bookmyridetoday.co.in/auth'
});

// Changed to POST request sending code in body
export const googleAuth = (code) => api.post('/google', { code }); 

// बाकी API फ़ंक्शन्स यहाँ हो सकते हैं

export default api;