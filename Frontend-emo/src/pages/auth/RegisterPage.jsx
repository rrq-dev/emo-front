// RegisterPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom"; // ⬅️ tambahkan useNavigate
import Swal from "sweetalert2";
import { registerUser } from "@/src/services/auth";

export function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // ⬅️ inisialisasi navigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      Swal.fire("Registrasi Berhasil", "Akun kamu telah dibuat!", "success");
      navigate("/login");
    } catch (err) {
      Swal.fire("Gagal", err.message || "Registrasi gagal", "error");
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
          Create Your Account ✨
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="your_name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
            Register
          </Button>
        </form>
        <p className="text-sm text-center mt-4 text-gray-600">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}
