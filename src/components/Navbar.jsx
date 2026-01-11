// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCloudSun, FaBell, FaBook, FaLightbulb, FaSignOutAlt, FaSignInAlt, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/weather"><FaCloudSun /> Météo</Link>
      {token ? (
        <>
          <Link to="/"><FaHome /> Accueil</Link>
          <Link to="/journal"><FaBook /> Journal</Link>
          <Link to="/alerts"><FaBell /> Alertes</Link>
          <Link to="/advices"><FaLightbulb /> Conseils</Link>
          <button onClick={handleLogout}><FaSignOutAlt /> Déconnexion</button>
        </>
      ) : (
        <Link to="/login"><FaSignInAlt /> Login</Link>
      )}

      {/* Bouton mode clair/sombre */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={{
          background: "transparent",
          border: "none",
          fontSize: "1.3rem",
          cursor: "pointer"
        }}
        title={darkMode ? "Passer en mode clair" : "Passer en mode sombre"}
      >
        {darkMode ? <FaSun color="gold" /> : <FaMoon color="#eee" />}
      </button>
    </nav>
  );
}
