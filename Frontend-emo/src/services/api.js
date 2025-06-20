// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:1506/api/", // backend Fiber URL kamu
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
