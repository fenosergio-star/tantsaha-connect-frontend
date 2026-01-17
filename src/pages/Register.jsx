// pages/Register.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaLeaf, FaCrown } from "react-icons/fa";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member", adminKey: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:3001/auth/register", form);
      alert("Fisoratana anarana vita! Afaka miditra ianao izao.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Nisy olana tamin'ny fisoratana anarana");
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #2196F3, #4CAF50)",
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
          maxWidth: "450px",
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
          <p style={{ color: "#666", fontSize: "16px" }}>Mamorona kaonty vaovao</p>
        </motion.div>

        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ position: "relative" }}>
            <FaUser style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#4CAF50" }} />
            <input
              type="text"
              placeholder="Anarana feno"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
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
            <FaEnvelope style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#4CAF50" }} />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
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
              type="password"
              placeholder="Teny miafina"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
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

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            style={{
              padding: "15px",
              border: "2px solid #e0e0e0",
              borderRadius: "12px",
              fontSize: "16px",
              backgroundColor: "#fafafa",
              outline: "none",
              cursor: "pointer"
            }}
          >
            <option value="member">👤 Mpikambana</option>
            <option value="admin">👑 Mpitantana</option>
          </select>

          {form.role === "admin" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{ position: "relative" }}
            >
              <FaCrown style={{ position: "absolute", left: "15px", top: "50%", transform: "translateY(-50%)", color: "#FF9800" }} />
              <input
                type="password"
                placeholder="Lakilen'ny mpitantana"
                value={form.adminKey}
                onChange={(e) => setForm({ ...form, adminKey: e.target.value })}
                required
                style={{
                  width: "100%",
                  padding: "15px 15px 15px 45px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "12px",
                  fontSize: "16px",
                  outline: "none",
                  transition: "border-color 0.3s ease",
                  backgroundColor: "#fff8e1"
                }}
                onFocus={(e) => e.target.style.borderColor = "#FF9800"}
                onBlur={(e) => e.target.style.borderColor = "#e0e0e0"}
              />
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: loading ? "#ccc" : "linear-gradient(135deg, #2196F3, #4CAF50)",
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
              boxShadow: "0 4px 15px rgba(33, 150, 243, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            <FaUserPlus /> {loading ? "Mamorona..." : "Mamorona kaonty"}
          </motion.button>
        </form>

        <div style={{ marginTop: "30px", padding: "20px 0", borderTop: "1px solid #eee" }}>
          <p style={{ color: "#666", fontSize: "16px" }}>
            Efa manana kaonty? {" "}
            <Link to="/login" style={{ color: "#2196F3", textDecoration: "none", fontWeight: "600" }}>
              Hiditra
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
