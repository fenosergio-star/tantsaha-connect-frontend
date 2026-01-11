// pages/Weather.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiFog } from "react-icons/wi";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [ville, setVille] = useState("Antananarivo");
  const [error, setError] = useState("");

  const getWeatherIcon = (desc) => {
    if (desc.includes("pluie")) return <WiRain size={120} color="#4FC3F7" />;
    if (desc.includes("nuage")) return <WiCloudy size={120} color="#90A4AE" />;
    if (desc.includes("neige")) return <WiSnow size={120} color="#81D4FA" />;
    if (desc.includes("brouillard")) return <WiFog size={120} color="#B0BEC5" />;
    return <WiDaySunny size={120} color="#FFD54F" />;
  };

  const fetchWeather = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/weather/${ville}`);
      setWeather(res.data);
      setError("");
    } catch {
      setError("Impossible de récupérer la météo. Vérifiez le nom de la ville.");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="page">
      <motion.div
        className="weather-container"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ color: "#4CAF50" }}>Météo locale</h2>
        <p style={{ color: "#777" }}>Entrez une ville pour consulter la météo</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weather && (
          <>
            <motion.div
              className="weather-icon"
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
            >
              {getWeatherIcon(weather.description)}
            </motion.div>
            <div className="weather-temp">{weather.temperature}°C</div>
            <div className="weather-desc">{weather.description}</div>
            <h3 style={{ marginTop: "10px" }}>{weather.ville}</h3>
          </>
        )}

        <div className="weather-input">
          <input
            type="text"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
            placeholder="Entrez une ville..."
          />
          <button onClick={fetchWeather}>Rechercher</button>
        </div>
      </motion.div>
    </div>
  );
}
