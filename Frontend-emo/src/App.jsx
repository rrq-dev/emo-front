import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";

// Import Pages
import Home from "@/src/pages/Homepage";
import CheckIn from "@/src/pages/CheckInPage";
import Heatmap from "@/src/pages/HeatmapPage";
import Refleksi from "@/src/pages/RefleksiPage";
import { LoginPage } from "@/src/pages/auth/LoginPage";
import { RegisterPage } from "@/src/pages/auth/RegisterPage";
import Profile from "@/src/pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800">
        {/* Navbar muncul di semua halaman */}
        <Navbar />

        {/* Isi Halaman */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/refleksi" element={<Refleksi />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
          {/* Tambahkan route lainnya sesuai kebutuhan */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
