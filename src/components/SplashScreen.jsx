// components/SplashScreen.jsx
import { motion } from "framer-motion";
import { FaSeedling } from "react-icons/fa";

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 0.8 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #8BC34A, #558B2F)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        style={{ textAlign: "center" }}
      >
        <FaSeedling size={80} style={{ marginBottom: "15px" }} />
        <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Tantsaha Connect</h1>
        <p style={{ opacity: 0.9 }}>Chargement...</p>
      </motion.div>
    </motion.div>
  );
}
