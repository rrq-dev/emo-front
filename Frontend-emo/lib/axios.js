import axios from "axios";

const api = axios.create({
  baseURL: "https://emo-back.onrender.com/api", // backend URL kamu
});

// Interceptor: inject Authorization header jika tidak skipAuth
api.interceptors.request.use(
  (config) => {
    if (config.skipAuth) {
      return config; // jika flag ini aktif, jangan inject Authorization
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
