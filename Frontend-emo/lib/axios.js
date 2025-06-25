import axios from "axios";

const api = axios.create({
  baseURL: "https://emo-back.onrender.com/api", // Sesuaikan dengan backend URL Anda
  timeout: 10000,
});

// ✅ FIXED: Request interceptor dengan kondisi khusus
api.interceptors.request.use(
  (config) => {
    // Jangan auto-inject token jika header Authorization sudah ada
    // atau jika ini adalah request untuk anonymous user
    if (!config.headers.Authorization) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor untuk handle error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Hapus token yang expired
      localStorage.removeItem("token");
      // Redirect ke login jika diperlukan
      // window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
