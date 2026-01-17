// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaBell, FaBook, FaLightbulb, FaSignOutAlt, FaSignInAlt, FaMoon, FaSun, FaCrown, FaSeedling } from "react-icons/fa";
import { useEffect, useState, useMemo } from "react";
import { getUserFromToken, isAdmin } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const user = useMemo(() => getUserFromToken(), [token]);
  const userIsAdmin = useMemo(() => isAdmin(), [token]);

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 12px",
    borderRadius: "15px",
    fontSize: "14px",
    fontWeight: "500",
    transition: "all 0.3s ease",
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(5px)"
  };

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
    <nav style={{
      background: "linear-gradient(135deg, #1B5E20, #2E7D32, #388E3C)",
      padding: "12px 20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      border: "1px solid rgba(255,255,255,0.2)",
      borderTop: "none"
    }}>
      {/* Logo et liens principaux */}
      <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
        {token && (
          <>
            <Link to="/" style={linkStyle}><FaHome /> Fandraisana</Link>
            <Link to="/cultures" style={linkStyle}><FaSeedling /> Karazana</Link>
            <Link to="/journal" style={linkStyle}><FaBook /> Fandinihana</Link>
            <Link to="/alerts" style={linkStyle}><FaBell /> Fampandrenesana</Link>
            <Link to="/advices" style={linkStyle}><FaLightbulb /> Torohevitra</Link>
          </>
        )}
      </div>

      {/* Section droite : Rôle + Mode sombre + Déconnexion */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        {token ? (
          <>
            {/* Groupe Rôle + Mode sombre */}
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.15)",
              padding: "8px 15px",
              borderRadius: "25px",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)"
            }}>
              {/* Rôle */}
              <span style={{ 
                color: userIsAdmin ? "#FFD700" : "#E8F5E9", 
                fontSize: "13px", 
                display: "flex", 
                alignItems: "center", 
                gap: "5px",
                fontWeight: "600"
              }}>
                {userIsAdmin ? <FaCrown size={14} /> : null} 
                {userIsAdmin ? "Admin" : "Membre"}
              </span>
              
              {/* Séparateur */}
              <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.3)" }} />
              
              {/* Mode sombre */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "4px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  transition: "all 0.3s ease"
                }}
                title={darkMode ? "Maivana" : "Maizina"}
              >
                {darkMode ? <FaSun color="#FFD700" /> : <FaMoon color="#E8F5E9" />}
              </button>
            </div>
            
            {/* Bouton déconnexion */}
            <button 
              onClick={handleLogout}
              style={{
                background: "rgba(244, 67, 54, 0.9)",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                fontWeight: "600",
                transition: "all 0.3s ease",
                boxShadow: "0 2px 8px rgba(244, 67, 54, 0.3)"
              }}
            >
              <FaSignOutAlt /> Mivoaka
            </button>
          </>
        ) : (
          <Link to="/login" style={{
            ...linkStyle,
            background: "rgba(255,255,255,0.2)",
            padding: "10px 20px",
            borderRadius: "20px",
            textDecoration: "none"
          }}>
            <FaSignInAlt /> Hiditra
          </Link>
        )}
      </div>
    </nav>
  );
}
