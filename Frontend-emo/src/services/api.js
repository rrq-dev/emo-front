import axios from "axios";

const api = axios.create({
  baseURL: "https://emo-back.onrender.com/api", 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
