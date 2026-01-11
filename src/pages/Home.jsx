// pages/Home.jsx
import { motion } from "framer-motion";
import { FaSeedling } from "react-icons/fa";

export default function Home() {
  return (
    <motion.div
      className="page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: "center" }}
    >
      <FaSeedling size={80} color="#4CAF50" style={{ marginBottom: "10px" }} />
      <h1 style={{ color: "#4CAF50" }}>Bienvenue sur <b>Tantsaha Connect</b></h1>
      <p style={{ maxWidth: "600px", margin: "0 auto", color: "#555" }}>
        Une application d’aide à la gestion des cultures et des saisons agricoles pour les paysans malagasy.
      </p>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        style={{
          background: "#8BC34A",
          color: "white",
          padding: "15px 25px",
          borderRadius: "20px",
          display: "inline-block",
          marginTop: "30px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
        }}
      >
        🌱 Explorez les fonctionnalités agricoles
      </motion.div>
    </motion.div>
  );
}
