// pages/Alerts.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaBell, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { isAdmin } from "../utils/auth";

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({ type: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");
  const userIsAdmin = useMemo(() => isAdmin(), []);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = () => {
    axios.get("http://localhost:3001/alerts", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAlerts(res.data))
      .catch(err => console.error(err));
  };

  const handleAddAlert = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/alerts", newAlert, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewAlert({ type: "", message: "" });
      setShowForm(false);
      fetchAlerts();
    } catch (err) {
      alert("Nisy olana tamin'ny fampidirana fampandrenesana");
    }
  };

  const getAlertStyle = (type) => {
    const styles = {
      'Urgence': { bg: '#FFEBEE', border: '#F44336', icon: FaExclamationTriangle, color: '#F44336' },
      'Info': { bg: '#E3F2FD', border: '#2196F3', icon: FaInfoCircle, color: '#2196F3' },
      'Attention': { bg: '#FFF3E0', border: '#FF9800', icon: FaBell, color: '#FF9800' }
    };
    return styles[type] || styles['Info'];
  };

  const handleUpdateAlert = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3001/alerts/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      fetchAlerts();
    } catch (err) {
      alert("Nisy olana tamin'ny fanovana");
    }
  };

  const handleDeleteAlert = async (id) => {
    if (confirm("Hofafana ve ity fampandrenesana ity ?")) {
      try {
        await axios.delete(`http://localhost:3001/alerts/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchAlerts();
      } catch (err) {
        alert("Nisy olana tamin'ny famafana");
      }
    }
  };

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
      <motion.h2 
        style={{ 
          color: "#E64A19", 
          display: "flex", 
          alignItems: "center", 
          gap: "12px",
          fontSize: "28px",
          fontWeight: "700",
          marginBottom: "30px",
          textAlign: "center",
          justifyContent: "center"
        }}
        initial={{ y: -20 }}
        animate={{ y: 0 }}
      >
        <FaBell /> Fampandrenesana fambolena
      </motion.h2>
        {userIsAdmin && (
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              background: "linear-gradient(135deg, #E64A19, #D84315)",
              color: "white",
              border: "none",
              padding: "12px 20px",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "14px",
              fontWeight: "600",
              boxShadow: "0 4px 12px rgba(230, 74, 25, 0.3)",
              transition: "all 0.3s ease"
            }}
          >
            <FaPlus /> Hanampy fampandrenesana
          </button>
        )}
      </div>

      {userIsAdmin && showForm && (
        <motion.form 
          onSubmit={handleAddAlert}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
            padding: "25px",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            marginBottom: "30px",
            border: "1px solid #ffebee"
          }}
        >
          <select
            value={newAlert.type}
            onChange={(e) => setNewAlert({...newAlert, type: e.target.value})}
            required
            style={{ 
              width: "100%", 
              padding: "12px 16px", 
              marginBottom: "15px", 
              borderRadius: "12px", 
              border: "2px solid #e0e0e0",
              fontSize: "14px",
              backgroundColor: "#fafafa",
              transition: "border-color 0.3s ease"
            }}
          >
            <option value="">Safidio ny karazana</option>
            <option value="Urgence">🚨 Maika</option>
            <option value="Attention">⚠️ Tandremo</option>
            <option value="Info">ℹ️ Fampahalalana</option>
          </select>
          <textarea
            placeholder="Hafatra fampandrenesana"
            value={newAlert.message}
            onChange={(e) => setNewAlert({...newAlert, message: e.target.value})}
            required
            rows="4"
            style={{ 
              width: "100%", 
              padding: "12px 16px", 
              marginBottom: "20px", 
              borderRadius: "12px", 
              border: "2px solid #e0e0e0",
              fontSize: "14px",
              backgroundColor: "#fafafa",
              resize: "vertical",
              transition: "border-color 0.3s ease"
            }}
          />
          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit" style={{ background: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
              Ampidiro
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: "#f44336", color: "white", border: "none", padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}>
              Aoka ihany
            </button>
          </div>
        </motion.form>
      )}

      {alerts.length === 0 && <p>Mbola tsy misy fampandrenesana ✅</p>}

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
        gap: "20px", 
        marginTop: "30px" 
      }}>
        {alerts.map((a, index) => {
          const alertStyle = getAlertStyle(a.type);
          const IconComponent = alertStyle.icon;
          
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)"
              }}
              style={{
                background: alertStyle.bg,
                borderLeft: `6px solid ${alertStyle.border}`,
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                position: "relative",
                transition: "all 0.3s ease"
              }}
            >
              {userIsAdmin && (
                <div style={{ position: "absolute", top: "15px", right: "15px", display: "flex", gap: "8px" }}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setEditingId(editingId === a.id ? null : a.id)}
                    style={{ 
                      background: "#FF9800", 
                      color: "white", 
                      border: "none", 
                      padding: "8px", 
                      borderRadius: "50%", 
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(255, 152, 0, 0.3)"
                    }}
                  >
                    {editingId === a.id ? <FaTimes /> : <FaEdit />}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteAlert(a.id)}
                    style={{ 
                      background: "#f44336", 
                      color: "white", 
                      border: "none", 
                      padding: "8px", 
                      borderRadius: "50%", 
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(244, 67, 54, 0.3)"
                    }}
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              )}
              
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "15px" }}>
                <IconComponent style={{ color: alertStyle.color, fontSize: "24px" }} />
                <span style={{ 
                  fontWeight: "700", 
                  color: alertStyle.color,
                  fontSize: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  {a.type}
                </span>
              </div>
              
              {editingId === a.id ? (
                <AlertEditForm alert={a} onSave={handleUpdateAlert} onCancel={() => setEditingId(null)} />
              ) : (
                <>
                  <p style={{ 
                    color: "#333", 
                    fontSize: "15px", 
                    lineHeight: "1.6",
                    margin: "0 0 15px 0",
                    fontWeight: "500"
                  }}>
                    {a.message}
                  </p>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "8px",
                    color: "#666",
                    fontSize: "13px",
                    fontWeight: "500"
                  }}>
                    <FaBell style={{ fontSize: "12px" }} />
                    {new Date(a.date_sent).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Composant de formulaire d'édition pour les alertes
function AlertEditForm({ alert, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    type: alert.type,
    message: alert.message
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(alert.id, formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.type}
        onChange={(e) => setFormData({...formData, type: e.target.value})}
        style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <textarea
        value={formData.message}
        onChange={(e) => setFormData({...formData, message: e.target.value})}
        rows="3"
        style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <div style={{ display: "flex", gap: "5px" }}>
        <button type="submit" style={{ background: "#4CAF50", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
          <FaSave /> Tehirizo
        </button>
        <button type="button" onClick={onCancel} style={{ background: "#f44336", color: "white", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}>
          <FaTimes /> Aoka ihany
        </button>
      </div>
    </form>
  );
}
