// pages/Journal.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlusCircle, FaClipboardList, FaCalendarAlt, FaCloudRain, FaBug, FaSeedling, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { isAdmin } from "../utils/auth";

export default function Journal() {
  const [observations, setObservations] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [form, setForm] = useState({ date: "", pluie: "", parasites: "", lieu: "", culture_id: "" });
  const [editingId, setEditingId] = useState(null);
  const token = localStorage.getItem("token");
  const userIsAdmin = useMemo(() => isAdmin(), []);

  const fetchObservations = () => {
    axios.get("http://localhost:3001/observations", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setObservations(res.data))
      .catch(err => console.error(err));
  };

  const fetchCultures = () => {
    axios.get("http://localhost:3001/cultures", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCultures(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { 
    fetchObservations(); 
    fetchCultures();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/observations", form, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => { fetchObservations(); setForm({ date: "", pluie: "", parasites: "", lieu: "", culture_id: "" }); })
      .catch(err => console.error(err));
  };

  const handleUpdateObservation = async (id, updatedData) => {
    try {
      await axios.put(`http://localhost:3001/observations/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      fetchObservations();
    } catch (err) {
      alert("Erreur lors de la modification");
    }
  };

  const handleDeleteObservation = async (id) => {
    if (confirm("Supprimer cette observation ?")) {
      try {
        await axios.delete(`http://localhost:3001/observations/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchObservations();
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const inputStyle = {
    padding: "15px 20px",
    border: "2px solid #e0e0e0",
    borderRadius: "12px",
    fontSize: "15px",
    transition: "all 0.3s ease",
    outline: "none",
    minWidth: "220px",
    backgroundColor: "#fafafa",
    marginBottom: "5px"
  };

  const buttonStyle = {
    background: "linear-gradient(135deg, #4CAF50, #45a049)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)"
  };

  return (
    <motion.div 
      className="page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <motion.h2 
        style={{ 
          color: "#2E7D32", 
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
        <FaClipboardList /> Fandinihana ny zavamaniry
      </motion.h2>

      {!userIsAdmin && (
        <motion.form 
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
          background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          border: "1px solid #e8f5e8",
          marginBottom: "50px"
        }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaSeedling style={{ color: "#4CAF50", fontSize: "20px" }} />
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#2E7D32" }}>🌾 Karazana zavamaniry</span>
          </div>
          <select
            value={form.culture_id}
            onChange={e => setForm({...form, culture_id:e.target.value})}
            required
            style={{ ...inputStyle, fontSize: "16px", height: "50px" }}
          >
            <option value="">Safidio ny karazana</option>
            {cultures.map(culture => (
              <option key={culture.id} value={culture.id}>
                🌱 {culture.nom_culture}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaCalendarAlt style={{ color: "#4CAF50", fontSize: "20px" }} />
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#2E7D32" }}>📅 Daty</span>
          </div>
          <input 
            type="date" 
            value={form.date} 
            onChange={e => setForm({...form, date:e.target.value})} 
            required 
            style={{ ...inputStyle, fontSize: "16px", height: "50px" }}
          />
        </div>
        
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaCloudRain style={{ color: "#2196F3", fontSize: "20px" }} />
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#1976D2" }}>🌧️ Orana</span>
          </div>
          <select
            value={form.pluie}
            onChange={e => setForm({...form, pluie:e.target.value})}
            style={{ ...inputStyle, fontSize: "16px", height: "50px" }}
          >
            <option value="">Tsy misy orana</option>
            <option value="Orana tsotra">🌦️ Orana tsotra</option>
            <option value="Erika">🌧️ Erika</option>
            <option value="Orambaratra">⛈️ Orambaratra</option>
          </select>
        </div>
        
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaBug style={{ color: "#FF5722", fontSize: "20px" }} />
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#D84315" }}>🐛 Bibikely</span>
          </div>
          <select
            value={form.parasites}
            onChange={e => setForm({...form, parasites:e.target.value})}
            style={{ ...inputStyle, fontSize: "16px", height: "50px" }}
          >
            <option value="">Tsy misy</option>
            <option value="Kankana">🐛 Kankana</option>
            <option value="Olitra">🐛 Olitra</option>
            <option value="Valala">🦗 Valala</option>
            <option value="Sompatra">🐜 Sompatra</option>
            <option value="Kalalao">🪲 Kalalao</option>
            <option value="Bibikely fotsy">🪰 Bibikely fotsy</option>
            <option value="Bibikely maitso">🐛 Bibikely maitso</option>
            <option value="Bibikely hafa">🐛 Bibikely hafa</option>
          </select>
        </div>
        
        <div style={{ position: "relative", marginBottom: "10px" }}>
          <div style={{ marginBottom: "8px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaSeedling style={{ color: "#8BC34A", fontSize: "20px" }} />
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#689F38" }}>🗺️ Toerana</span>
          </div>
          <input 
            type="text" 
            placeholder="Toerana misy ny zavamaniry"
            value={form.lieu} 
            onChange={e => setForm({...form, lieu:e.target.value})} 
            style={{ ...inputStyle, fontSize: "16px", height: "50px" }}
          />
        </div>
        
        <motion.button 
          type="submit" 
          style={{
            ...buttonStyle,
            fontSize: "18px",
            padding: "16px 32px",
            height: "60px",
            minWidth: "200px"
          }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: "0 6px 20px rgba(76, 175, 80, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlusCircle /> 📝 Ampidiro
        </motion.button>
      </motion.form>
      )}

      <motion.h3 
        style={{ 
          marginBottom: "25px", 
          color: "#2E7D32", 
          fontSize: "22px",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          gap: "10px"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        📋 Ny fandinihana farany
      </motion.h3>
      
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "20px" 
      }}>
        {observations.map((obs, index) => (
          <motion.div
            key={obs.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)"
            }}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
              padding: "24px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e8f5e8",
              transition: "all 0.3s ease",
              position: "relative"
            }}
          >
            {!userIsAdmin && (
              <div style={{ position: "absolute", top: "15px", right: "15px", display: "flex", gap: "8px" }}>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setEditingId(editingId === obs.id ? null : obs.id)}
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
                  {editingId === obs.id ? <FaTimes /> : <FaEdit />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDeleteObservation(obs.id)}
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
            
            {editingId === obs.id ? (
              <ObservationEditForm 
                observation={obs} 
                onSave={handleUpdateObservation} 
                onCancel={() => setEditingId(null)} 
              />
            ) : (
              <>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "10px", 
              marginBottom: "20px",
              padding: "12px",
              backgroundColor: "#e8f5e8",
              borderRadius: "10px",
              border: "2px solid #4CAF50"
            }}>
              <FaCalendarAlt style={{ color: "#4CAF50", fontSize: "20px" }} />
              <span style={{ fontWeight: "700", color: "#2E7D32", fontSize: "16px" }}>
                {new Date(obs.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            {userIsAdmin && obs.user_name && (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px", 
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#fff3e0",
                borderRadius: "8px",
                border: "1px solid #ffcc02"
              }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#e65100" }}>
                  👤 Mpikambana: {obs.user_name}
                </span>
              </div>
            )}
            
            {obs.nom_culture && (
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "10px", 
                marginBottom: "15px",
                padding: "10px",
                backgroundColor: "#f3e5f5",
                borderRadius: "8px",
                border: "1px solid #ce93d8"
              }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#7b1fa2" }}>
                  🌾 Karazana: {obs.nom_culture}
                </span>
              </div>
            )}
                
                <div style={{ display: "grid", gap: "16px" }}>
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    padding: "12px",
                    backgroundColor: "#f0f8ff",
                    borderRadius: "10px",
                    border: "1px solid #e3f2fd"
                  }}>
                    <FaCloudRain style={{ color: "#2196F3", fontSize: "18px" }} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      <strong>Orana:</strong> {obs.rain || "Tsy misy orana"}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    padding: "12px",
                    backgroundColor: "#fff3e0",
                    borderRadius: "10px",
                    border: "1px solid #ffe0b2"
                  }}>
                    <FaBug style={{ color: "#FF5722", fontSize: "18px" }} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      <strong>Bibikely:</strong> {obs.pests || "Tsy misy"}
                    </span>
                  </div>
                  
                  <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "12px",
                    padding: "12px",
                    backgroundColor: "#f1f8e9",
                    borderRadius: "10px",
                    border: "1px solid #c8e6c9"
                  }}>
                    <FaSeedling style={{ color: "#8BC34A", fontSize: "18px" }} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      <strong>Toerana:</strong> {obs.lieu || "Tsy voalaza"}
                    </span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
      
      {observations.length === 0 && (
        <motion.div 
          style={{
            textAlign: "center",
            padding: "40px",
            color: "#666",
            fontSize: "16px"
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          🌱 Mbola tsy misy fandinihana. Manomboka ampidiro ny fandinihana voalohany !
        </motion.div>
      )}
    </motion.div>
  );
}

// Composant de formulaire d'édition pour les observations
function ObservationEditForm({ observation, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    date: observation.date,
    pluie: observation.rain || "",
    parasites: observation.pests || "",
    date_plantation: observation.planting_date || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(observation.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <div style={{ display: "grid", gap: "12px" }}>
        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({...formData, date: e.target.value})}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <input
          type="number"
          placeholder="Pluie (mm)"
          value={formData.pluie}
          onChange={(e) => setFormData({...formData, pluie: e.target.value})}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <input
          type="text"
          placeholder="Parasites"
          value={formData.parasites}
          onChange={(e) => setFormData({...formData, parasites: e.target.value})}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
        <input
          type="date"
          value={formData.date_plantation}
          onChange={(e) => setFormData({...formData, date_plantation: e.target.value})}
          style={{ padding: "8px", borderRadius: "8px", border: "1px solid #ddd" }}
        />
      </div>
      <div style={{ display: "flex", gap: "8px", justifyContent: "center", marginTop: "15px" }}>
        <button type="submit" style={{ background: "#4CAF50", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
          <FaSave /> Tehirizo
        </button>
        <button type="button" onClick={onCancel} style={{ background: "#f44336", color: "white", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
          <FaTimes /> Aoka ihany
        </button>
      </div>
    </form>
  );
}
