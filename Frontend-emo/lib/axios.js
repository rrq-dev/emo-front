// src/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1506/api/", // ganti kalau pakai domain lain
});

// Interceptor untuk kirim token setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
