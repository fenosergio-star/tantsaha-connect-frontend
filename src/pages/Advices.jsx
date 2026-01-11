// pages/Advices.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLightbulb } from "react-icons/fa";

export default function Advices() {
  const [advices, setAdvices] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:3001/advices", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAdvices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ color: "#4CAF50", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaLightbulb /> Conseils agricoles
      </h2>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px",
        marginTop: "20px"
      }}>
        {advices.map(a => (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              textAlign: "center"
            }}
          >
            <FaLightbulb size={40} color="#FFEB3B" />
            <h3>{a.title}</h3>
            <p style={{ color: "#555" }}>{a.description}</p>
            {a.icon && <img src={a.icon} alt="icon" style={{ width: "40px", marginTop: "10px" }} />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
