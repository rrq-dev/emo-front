import api from "@/src/services/api";

// Helper ambil token dari localStorage
const getToken = () => localStorage.getItem("token");

// ✅ Submit mood (anonymous / login)
export const submitMood = async ({
  mood,
  message = "",
  is_anonymous = false,
}) => {
  try {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    // Token hanya dikirim kalau BUKAN anonymous
    if (!is_anonymous) {
      const token = getToken();
      if (!token) throw new Error("Token tidak tersedia untuk user login");
      headers["Authorization"] = `Bearer ${token}`;
    }

    const payload = {
      mood,
      message,
      isAnonymous: is_anonymous, // camelCase karena backend pakai ini
    };

    const res = await api.post("/moods", payload, { headers });
    return res.data;
  } catch (err) {
    const errorMessage =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err.message ||
      "Terjadi kesalahan saat submit mood.";
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
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      "Gagal mengambil data moods";
    console.error("getUserMoods error:", msg);
    throw new Error(msg);
  }
};

// ✅ Get mood spesifik user (login required)
export const getReflection = async (userId) => {
  if (!userId) throw new Error("User ID wajib diisi");

  try {
    const token = getToken();
    const res = await api.get(`/moods/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.error("getReflection error:", err);
    throw err.response?.data || err;
  }
};

// ✅ Get refleksi terakhir (login required)
export const getLatestReflection = async () => {
  try {
    const token = getToken();
    const res = await api.get("/chat-reflections", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.error("getLatestReflection error:", err);
    throw err.response?.data || err;
  }
};

// ✅ Submit curhat chat refleksi (login required)
export const submitChatReflection = async (data) => {
  try {
    const token = getToken();
    const res = await api.post("/chat-refleksi", data, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err) {
    console.error("submitChatReflection error:", err);
    throw err.response?.data || err;
  }
};
