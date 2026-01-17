// pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaSignInAlt, FaLeaf } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3001/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur de connexion");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #4CAF50, #8BC34A)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    }}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center"
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          style={{ marginBottom: "30px" }}
        >
          <FaLeaf size={60} color="#4CAF50" />
          <h2 style={{ color: "#2E7D32", margin: "20px 0 10px", fontSize: "28px" }}>Tantsaha Connect</h2>
          <p style={{ color: "#666", fontSize: "16px" }}>Hiditra amin'ny kaontinao</p>
        </motion.div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ position: "relative" }}>
            <FaUser style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#4CAF50" }} />
            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px 15px 15px 45px",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
                backgroundColor: "#fafafa"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4CAF50"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <div style={{ position: "relative" }}>
            <FaLock style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#4CAF50" }} />
            <input
              placeholder="Teny miafina"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "15px 15px 15px 45px",
                border: "2px solid #e0e0e0",
                borderRadius: "12px",
                fontSize: "16px",
                outline: "none",
                transition: "border-color 0.3s ease",
                backgroundColor: "#fafafa"
              }}
              onFocus={(e) => e.target.style.borderColor = "#4CAF50"}
              onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
            />
          </div>

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: loading ? "#ccc" : "linear-gradient(135deg, #4CAF50, #45a049)",
              color: "white",
              border: "none",
              padding: "15px",
              borderRadius: "12px",
              fontSize: "18px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              boxShadow: "0 4px 15px rgba(76, 175, 80, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            <FaSignInAlt /> {loading ? "Miditra..." : "Hiditra"}
          </motion.button>
        </form>

        <div style={{ marginTop: "30px", padding: "20px 0", borderTop: "1px solid #eee" }}>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Mbola tsy manana kaonty? {" "}
            <Link to="/register" style={{ color: "#4CAF50", textDecoration: "none", fontWeight: "600" }}>
              Mamorona kaonty
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
