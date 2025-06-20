// src/services/moodService.js
import api from "@/src/services/api";
// Kirim mood + message (POST)
export const submitMood = async (data) => {
  try {
    const res = await api.post("/moods", data); // sudah otomatis bawa token
    return res.data;
  } catch (err) {
    console.error("Gagal submit mood:", err);
    throw err.response?.data || err;
  }
};

// Ambil semua mood user (GET)
export const getUserMoods = async () => {
  try {
    const res = await api.get("/moods");
    return res.data;
  } catch (err) {
    console.error("Gagal ambil mood:", err);
    throw err;
  }
};

// Ambil refleksi berdasarkan userID (GET /moods/:userID)
export const getReflection = async (userID) => {
  if (!userID) {
    throw new Error("userID wajib diisi untuk getReflection");
  }

  try {
    const res = await api.get(`/moods/${userID}`);
    return res.data;
  } catch (err) {
    console.error("Gagal ambil refleksi:", err);
    throw err;
  }
};
