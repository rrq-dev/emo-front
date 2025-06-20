// Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useAuth } from "@/src/context/authContext"; // gunakan context!

const navLinks = [
  { to: "/", label: "Beranda" },
  { to: "/check-in", label: "Check-In" },
  { to: "/heatmap", label: "Heatmap" },
  { to: "/refleksi", label: "Refleksi" },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "Kamu yakin ingin keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, Logout",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        logout(); // dari context, akan clear localStorage & reset state
        navigate("/login");
        Swal.fire("Berhasil logout", "Sampai jumpa lagi!", "success");
      }
    });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-md px-6 py-4 flex items-center justify-between"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-primary font-bold text-xl"
      >
        <Link to="/">Emobuddy</Link>
      </motion.div>

      {/* Menu */}
      <div className="flex gap-4 items-center">
        {navLinks.map((link) => (
          <motion.div
            key={link.to}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium px-3 py-2 rounded-md ${
                  isActive ? "text-primary" : "text-gray-600"
                } hover:bg-primary/10 transition`
              }
            >
              {link.label}
            </NavLink>
          </motion.div>
        ))}

        {/* Login/Profile/Logout */}
        {!user ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link
              to="/login"
              className="text-sm font-medium px-4 py-2 rounded-md bg-primary text-white transition-colors hover:bg-primary/90"
            >
              Login
            </Link>
          </motion.div>
        ) : (
          <div className="flex gap-2 items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/profile"
                className="text-sm font-medium px-4 py-2 rounded-md bg-gray-100 text-gray-800 transition hover:bg-gray-200"
              >
                Profile
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 rounded-md bg-red-100 text-red-600 transition hover:bg-red-200"
              >
                Logout
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
