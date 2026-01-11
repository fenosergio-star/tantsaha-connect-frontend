// App.jsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import Login from "./pages/Logins.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Weather from "./pages/Weather.jsx";
import Journal from "./pages/Observation.jsx";
import Alerts from "./pages/Alerts.jsx";
import Advices from "./pages/Advices.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // durée du splash
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
        <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
        <Route path="/advices" element={<ProtectedRoute><Advices /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
