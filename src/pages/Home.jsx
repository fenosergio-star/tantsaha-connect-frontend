// pages/Home.jsx
import { motion } from "framer-motion";
import { FaSeedling, FaCloudSun, FaThermometerHalf, FaTint, FaWind, FaEye } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Antananarivo');
  const token = localStorage.getItem("token");

  const cities = [
    { name: 'Antananarivo', label: 'Antananarivo' },
    { name: 'Toamasina', label: 'Toamasina' },
    { name: 'Antsirabe', label: 'Antsirabe' },
    { name: 'Mahajanga', label: 'Mahajanga' },
    { name: 'Fianarantsoa', label: 'Fianarantsoa' },
    { name: 'Toliara', label: 'Toliara' },
    { name: 'Antsiranana', label: 'Antsiranana' }
  ];

  useEffect(() => {
    if (token) {
      fetchWeather(selectedCity);
    }
  }, [token, selectedCity]);

  const fetchWeather = async (city = 'Antananarivo') => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3001/weather/${city}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWeather(response.data);
    } catch (error) {
      console.error('Erreur météo:', error);
    }
    setLoading(false);
  };

  const getWeatherIcon = (condition) => {
    if (condition?.includes('rain') || condition?.includes('Rain')) return '🌧️';
    if (condition?.includes('cloud') || condition?.includes('Cloud')) return '☁️';
    if (condition?.includes('sun') || condition?.includes('Clear')) return '☀️';
    return '🌤️';
  };

  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ 
        textAlign: "center", 
        maxWidth: "900px", 
        margin: "0 auto", 
        padding: "40px 20px"
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        style={{ marginBottom: "40px" }}
      >
        <FaSeedling size={80} color="#4CAF50" style={{ marginBottom: "20px" }} />
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ 
          color: "var(--secondary)", 
          fontSize: "36px", 
          fontWeight: "800",
          marginBottom: "15px"
        }}
      >
        Tongasoa eto amin'ny <span style={{ color: "var(--primary)" }}>Tantsaha Connect</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ 
          fontSize: "18px", 
          color: "var(--text-dark)", 
          opacity: 0.8,
          lineHeight: "1.6",
          marginBottom: "40px",
          maxWidth: "600px",
          margin: "0 auto 40px"
        }}
      >
        Rindranasa natao hanampiana anao amin'ny fitantanana ny fambolenao.
      </motion.p>

      {/* Section Météo */}
      {token && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary))",
            borderRadius: "25px",
            padding: "35px",
            color: "white",
            marginBottom: "40px",
            boxShadow: "0 15px 40px rgba(76, 175, 80, 0.3)",
            position: "relative",
            overflow: "hidden"
          }}
        >
          {/* Background pattern */}
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><circle cx=\"20\" cy=\"20\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"80\" cy=\"80\" r=\"2\" fill=\"rgba(255,255,255,0.1)\"/><circle cx=\"40\" cy=\"60\" r=\"1\" fill=\"rgba(255,255,255,0.1)\"/></svg>')",
            opacity: 0.3
          }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                <FaCloudSun size={35} style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }} />
                <h2 style={{ margin: 0, fontSize: "28px", fontWeight: "800", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>Toetr'andro</h2>
              </div>
              
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "15px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "600",
                  background: "rgba(255,255,255,0.9)",
                  color: "#2c3e50",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                  outline: "none"
                }}
              >
                {cities.map(city => (
                  <option key={city.name} value={city.name}>
                    🏢 {city.label}
                  </option>
                ))}
              </select>
            </div>

            {loading ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ 
                  fontSize: "20px", 
                  textAlign: "center",
                  padding: "40px"
                }}
              >
                🌀 Mahazo ny toetr'andro...
              </motion.div>
            ) : weather ? (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "25px"
              }}>
                {/* Carte principale */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
                    padding: "25px",
                    borderRadius: "20px",
                    textAlign: "center",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{ fontSize: "60px", marginBottom: "15px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                    {getWeatherIcon(weather.description)}
                  </div>
                  <div style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px", textShadow: "0 2px 4px rgba(0,0,0,0.3)" }}>
                    {Math.round(weather.temperature)}°C
                  </div>
                  <div style={{ fontSize: "16px", opacity: "0.9", textTransform: "capitalize", fontWeight: "500" }}>
                    {weather.description}
                  </div>
                  <div style={{ fontSize: "14px", opacity: "0.8", marginTop: "8px" }}>
                    🏢 {weather.ville}
                  </div>
                </motion.div>

                {/* Carte détails */}
                <motion.div
                  whileHover={{ scale: 1.03, y: -5 }}
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1))",
                    padding: "25px",
                    borderRadius: "20px",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <FaTint size={20} color="#87CEEB" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
                        <span style={{ fontWeight: "500" }}>Hamandoana</span>
                      </div>
                      <span style={{ fontWeight: "700", fontSize: "18px" }}>{weather.humidity}%</span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <FaWind size={20} color="#B0E0E6" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
                        <span style={{ fontWeight: "500" }}>Rivotra</span>
                      </div>
                      <span style={{ fontWeight: "700", fontSize: "18px" }}>{weather.windSpeed} km/h</span>
                    </div>
                    
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <FaEye size={20} color="#F0F8FF" style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.3))" }} />
                        <span style={{ fontWeight: "500" }}>Fahitana</span>
                      </div>
                      <span style={{ fontWeight: "700", fontSize: "18px" }}>{weather.visibility} km</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div style={{ 
                fontSize: "18px", 
                opacity: "0.8", 
                textAlign: "center",
                padding: "30px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "15px"
              }}>
                ⚠️ Tsy afaka mahazo ny toetr'andro
              </div>
            )}
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        style={{
          background: "linear-gradient(135deg, var(--primary), var(--secondary))",
          color: "white",
          padding: "25px 40px",
          borderRadius: "20px",
          fontSize: "18px",
          fontWeight: "600",
          boxShadow: "0 8px 25px rgba(76, 175, 80, 0.3)"
        }}
      >
        🌱 "Ny tany no loharanon'ny fiainana, tandremo azy" 🌱
      </motion.div>
    </motion.div>
  );
}