import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/src/pages/Homepage";
import CheckIn from "@/src/pages/CheckInPage";
import Heatmap from "@/src/pages/HeatmapPage";
import Refleksi from "@/src/pages/RefleksiPage";
import Profile from "@/src/pages/Profile";
import { LoginPage } from "@/src/pages/auth/LoginPage";
import { RegisterPage } from "@/src/pages/auth/RegisterPage";
import Navbar from "@/components/Navbar";

function AppRoutes() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/check-in" element={<CheckIn />} />
        <Route path="/heatmap" element={<Heatmap />} />
        <Route path="/refleksi" element={<Refleksi />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
