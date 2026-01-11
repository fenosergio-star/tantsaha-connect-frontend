// pages/Alerts.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell } from "react-icons/fa";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:3001/alerts", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ color: "#E64A19", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaBell /> Alertes agricoles
      </h2>

      {alerts.length === 0 && <p>Aucune alerte pour le moment ✅</p>}

      <div style={{ display: "grid", gap: "15px", marginTop: "20px" }}>
        {alerts.map(a => (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "#FFF3E0",
              borderLeft: "6px solid #E64A19",
              padding: "15px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <b>{a.type}</b> — {a.message} <br />
            <small style={{ color: "#888" }}>{a.date_sent}</small>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
