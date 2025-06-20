import { createContext, useContext, useEffect, useState } from "react";

// 1. Buat context
const AuthContext = createContext();

// 2. Provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null artinya belum login

  // Optional: Simpan login di localStorage (biar gak hilang saat refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("authUser", JSON.stringify(userData));
  };

  const logout = () => {
    // Clear semua localStorage biar bener-bener logout bersih
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook supaya gampang akses context-nya
export function useAuth() {
  return useContext(AuthContext);
}
