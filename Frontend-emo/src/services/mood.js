import api from "@/src/services/api";

// Helper ambil token dari localStorage
const getToken = () => localStorage.getItem("token");

// ✅ Submit mood (anonymous / login)
export const submitMood = async ({ mood, message = "", isAnonymous }) => {
  try {
    const payload = {
      mood,
      message,
      is_anonymous: isAnonymous, // snake_case untuk backend
    };

    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Kirim Authorization HANYA kalau user login dan bukan anonim
    if (!isAnonymous && token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const res = await api.post("/moods", payload, { headers });
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.error || err.response?.data?.message || err.message;
    console.error("submitMood error:", errorMessage);
    throw new Error(errorMessage);
  }
};

// ✅ Get semua mood (public)
export const getUserMoods = async () => {
  try {
    const res = await api.get("/moods", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    const msg =
      err.response?.data?.error ||
      err.response?.data?.message ||
      "Gagal mengambil data moods";
    console.error("getUserMoods error:", msg);
    throw new Error(msg);
  }
};

// ✅ GET CHAT REFLECTION TERBARU (RefleksiPage polling)
export const getLatestReflection = async () => {
  try {
    const res = await api.get("/reflection/latest");
    return res.data;
  } catch (err) {
    console.error("getLatestReflection error:", err.message);
    throw err;
  }
};

// ✅ POST CHAT KE GEMINI (opsional, jika kamu punya manual curhat)
export const postChatReflection = async (message) => {
  try {
    const res = await api.post("/reflection", { message });
    return res.data;
  } catch (err) {
    console.error("postChatReflection error:", err.message);
    throw err;
  }
};
