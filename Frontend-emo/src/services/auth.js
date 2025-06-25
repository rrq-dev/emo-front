// src/services/auth.js
import api from "./api";

export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await api.post(
      "/register",
      {
        name,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Gagal register:", err.response?.data || err.message);
    throw new Error(err.response?.data?.error || "Registrasi gagal");
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post(
      "/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { token, user, message } = res.data;

    if (!token || !user) {
      throw new Error("Token atau user tidak valid dari server");
    }

    // Simpan token dan user ke localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user, message };
  } catch (err) {
    const status = err.response?.status;
    const data = err.response?.data;

    let errorMsg = data?.error || data?.message || err.message || "Login gagal";

    if (status === 500) {
      errorMsg = `Server error: ${data?.details || errorMsg}`;
    }

    console.error("Login error:", errorMsg);
    throw new Error(errorMsg);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
