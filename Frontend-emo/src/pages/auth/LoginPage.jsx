import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { loginUser } from "@/src/services/auth";
import { useAuth } from "@/src/context/AuthContext"; // ✅ NEW

export function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ NEW

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);

      // ✅ Simpan user dan token ke localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ Simpan ke AuthContext
      login(data.user);

      Swal.fire("Berhasil!", "Login berhasil!", "success");
      navigate("/");
    } catch (err) {
      Swal.fire(
        "Oops!",
        err.response?.data?.message || "Login gagal!",
        "error"
      );
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-100 to-yellow-50 flex items-center justify-center px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-md bg-white shadow-lg rounded-xl p-8 backdrop-blur-sm"
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type="submit" className="w-full mt-2" variant="default">
            Login
          </Button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
