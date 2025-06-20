import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "../src/router/route";
import "./index.css"; // Ensure this path is correct for your project structure
import { AuthProvider } from "@/src/context/AuthContext"; // sesuaikan path-nya

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
