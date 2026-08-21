import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wakeBackend = async () => {
      try {
        await fetch("https://lancherixstudio-backend.onrender.com/");
      } catch (error) {
        console.error("Backend wake-up failed:", error);
      } finally {
        setLoading(false);
      }
    };

    wakeBackend();
  }, []);

  if (loading) {
    return (
      <div className="app-loading-screen">
        <img src={symbol} alt="Lancherix" className="app-loading-logo" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}