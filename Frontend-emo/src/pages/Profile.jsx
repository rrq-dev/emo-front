// ProfilePage.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      Swal.fire("Oops!", "Kamu belum login.", "error");
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-50 to-yellow-50 py-10 px-4"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-md p-6">
        <motion.h2
          className="text-2xl font-bold text-center text-gray-800 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Halo, {user.name} 👋
        </motion.h2>
        <div className="text-gray-700 space-y-2">
          <p>
            <strong>Username:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
