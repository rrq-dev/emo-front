import api from "@/src/services/api"; // Axios instance

// REGISTER
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await api.post("/register", {
      name,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    console.error("Gagal register:", err.response?.data || err.message);
    throw err;
  }
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  try {
    const res = await api.post("/login", {
      email,
      password,
    });
    return res.data; // biasanya akan dapat token + user info
  } catch (err) {
    console.error("Gagal login:", err.response?.data || err.message);
    throw err;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
