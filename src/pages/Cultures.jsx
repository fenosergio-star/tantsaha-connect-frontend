import API_URL from '../config.js';

// pages/Cultures.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSeedling, FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaCalendarAlt } from "react-icons/fa";
import { isAdmin } from "../utils/auth";

export default function Cultures() {
  const [cultures, setCultures] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCulture, setNewCulture] = useState({ 
    nom_culture: "", 
    saison_plantation: "", 
    duree_croissance: "", 
    conseils_specifiques: "" 
  });
  const token = localStorage.getItem("token");
  const userIsAdmin = useMemo(() => isAdmin(), []);

  const saisons = [
    { value: "Ririnina", label: "🌨️ Ririnina (Saison sèche)" },
    { value: "Fahavaratra", label: "🌧️ Fahavaratra (Saison des pluies)" },
    { value: "Mandritra ny taona", label: "🌱 Mandritra ny taona" }
  ];

  const mois = [
    "Janoary", "Febroary", "Martsa", "Aprily", "Mey", "Jona",
    "Jolay", "Aogositra", "Septambra", "Oktobra", "Novambra", "Desambra"
  ];

  useEffect(() => {
    fetchCultures();
  }, []);

  const fetchCultures = () => {
    axios.get(`${API_URL}/cultures`, { 
      headers: { Authorization: `Bearer ${token}` } 
    })
    .then(res => setCultures(res.data))
    .catch(err => console.error(err));
  };

  const handleAddCulture = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/cultures`, newCulture, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewCulture({ nom_culture: "", saison_plantation: "", duree_croissance: "", conseils_specifiques: "" });
      setShowForm(false);
      fetchCultures();
    } catch (err) {
      alert("Nisy olana tamin'ny fampidirana");
    }
  };

  const getPlantingMonths = (saison) => {
    if (saison === "Ririnina") return ["Aprily", "Mey", "Jona", "Jolay"];
    if (saison === "Fahavaratra") return ["Septambra", "Oktobra", "Novambra", "Desambra"];
    return mois;
  };

  const getCultureIcon = (nom) => {
    const icons = {
      "Vary": "🌾", "Katsaka": "🌽", "Tsaramaso": "🫘",
      "Patate": "🍠", "Mangahazo": "🥔", "Voanjobory": "🥜",
      "Voanjo": "🥜", "Voatabia": "🍅", "Anana": "🥬", "Salady": "🥗"
    };
    return icons[nom] || "🌱";
  };

  return (
    <motion.div 
      className="page" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <motion.h2 
          style={{ 
            color: "#2E7D32", 
            display: "flex", 
            alignItems: "center", 
            gap: "12px",
            fontSize: "28px",
            fontWeight: "700"
          }}
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <FaSeedling /> Fitantanana ny karazana zavamaniry
        </motion.h2>
        
        {userIsAdmin && (
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              background: "linear-gradient(135deg, #4CAF50, #45a049)",
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
              boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)"
            }}
          >
            <FaPlus /> Hanampy karazana
          </button>
        )}
      </div>

      {userIsAdmin && showForm && (
        <motion.form 
          onSubmit={handleAddCulture}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            border: "1px solid #e8f5e8",
            marginBottom: "30px"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            <input
              type="text"
              placeholder="Anarana ny zavamaniry"
              value={newCulture.nom_culture}
              onChange={(e) => setNewCulture({...newCulture, nom_culture: e.target.value})}
              required
              style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "14px" }}
            />
            
            <select
              value={newCulture.saison_plantation}
              onChange={(e) => setNewCulture({...newCulture, saison_plantation: e.target.value})}
              style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "14px" }}
            >
              <option value="">Safidio ny vanim-potoana</option>
              {saisons.map(saison => (
                <option key={saison.value} value={saison.value}>{saison.label}</option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Andro fitomboana"
              value={newCulture.duree_croissance}
              onChange={(e) => setNewCulture({...newCulture, duree_croissance: e.target.value})}
              style={{ padding: "12px", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "14px" }}
            />
          </div>
          
          <textarea
            placeholder="Torohevitra manokana"
            value={newCulture.conseils_specifiques}
            onChange={(e) => setNewCulture({...newCulture, conseils_specifiques: e.target.value})}
            rows="3"
            style={{ width: "100%", padding: "12px", marginTop: "15px", borderRadius: "8px", border: "2px solid #e0e0e0", fontSize: "14px" }}
          />
          
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <button type="submit" style={{ background: "#4CAF50", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
              Ampidiro
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{ background: "#f44336", color: "white", border: "none", padding: "10px 20px", borderRadius: "8px", cursor: "pointer" }}>
              Aoka ihany
            </button>
          </div>
        </motion.form>
      )}

      {/* Calendrier de plantation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: "linear-gradient(135deg, #E3F2FD, #BBDEFB)",
          padding: "25px",
          borderRadius: "20px",
          marginBottom: "30px",
          boxShadow: "0 8px 25px rgba(33, 150, 243, 0.2)"
        }}
      >
        <h3 style={{ color: "#1976D2", marginBottom: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCalendarAlt /> Kalandrie fambolena
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "12px" }}>
          {mois.map((mois, index) => {
            // Filtrer les cultures qui peuvent être plantées ce mois-ci
            const culturesThisMois = cultures.filter(culture => {
              if (culture.mois_plantation) {
                // Normaliser les noms de mois pour la comparaison
                const moisPlantation = culture.mois_plantation.split(', ').map(m => m.trim());
                return moisPlantation.includes(mois);
              }
              // Fallback sur la saison si pas de mois spécifiques
              return getPlantingMonths(culture.saison_plantation).includes(mois);
            });
            
            const isCurrentMonth = new Date().getMonth() === index;
            const hasPlantings = culturesThisMois.length > 0;
            
            return (
              <motion.div
                key={mois}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{
                  background: isCurrentMonth 
                    ? "linear-gradient(135deg, #FFD700, #FFA000)"
                    : hasPlantings 
                      ? "linear-gradient(135deg, #4CAF50, #66BB6A)" 
                      : "linear-gradient(135deg, #f5f5f5, #e0e0e0)",
                  padding: "15px 8px",
                  borderRadius: "15px",
                  textAlign: "center",
                  border: isCurrentMonth ? "3px solid #FF6F00" : hasPlantings ? "2px solid #2E7D32" : "2px solid transparent",
                  boxShadow: isCurrentMonth 
                    ? "0 8px 25px rgba(255, 193, 7, 0.4)" 
                    : hasPlantings
                      ? "0 6px 20px rgba(76, 175, 80, 0.3)"
                      : "0 4px 15px rgba(0,0,0,0.1)",
                  color: hasPlantings || isCurrentMonth ? "white" : "#666",
                  position: "relative",
                  overflow: "hidden",
                  minHeight: "140px"
                }}
              >
                {isCurrentMonth && (
                  <div style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    fontSize: "12px",
                    background: "rgba(255,255,255,0.3)",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    ⭐
                  </div>
                )}
                
                <div style={{ 
                  fontWeight: "700", 
                  marginBottom: "12px", 
                  fontSize: "14px",
                  textShadow: hasPlantings || isCurrentMonth ? "1px 1px 2px rgba(0,0,0,0.3)" : "none",
                  borderBottom: hasPlantings ? "2px solid rgba(255,255,255,0.3)" : "none",
                  paddingBottom: "8px"
                }}>
                  {mois}
                </div>
                
                <div style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: "4px",
                  alignItems: "center"
                }}>
                  {culturesThisMois.slice(0, 4).map(culture => (
                    <motion.div 
                      key={culture.id} 
                      whileHover={{ scale: 1.1 }}
                      style={{ 
                        fontSize: "11px", 
                        background: "rgba(255,255,255,0.25)",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "4px",
                        width: "90%",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                        border: "1px solid rgba(255,255,255,0.2)"
                      }}
                    >
                      <span style={{ fontSize: "14px" }}>{getCultureIcon(culture.nom_culture)}</span>
                      <span style={{ fontSize: "10px", fontWeight: "600" }}>{culture.nom_culture}</span>
                    </motion.div>
                  ))}
                  {culturesThisMois.length > 4 && (
                    <div style={{ 
                      fontSize: "9px", 
                      background: "rgba(255,255,255,0.2)",
                      padding: "2px 6px",
                      borderRadius: "10px",
                      textAlign: "center",
                      fontWeight: "600"
                    }}>
                      +{culturesThisMois.length - 4} hafa
                    </div>
                  )}
                  {!hasPlantings && (
                    <div style={{
                      fontSize: "11px",
                      color: "#999",
                      fontStyle: "italic",
                      marginTop: "10px"
                    }}>
                      Tsy misy fambolena
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}}
        </div>
      </motion.div>

      {/* Liste des cultures */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
        {cultures.map((culture, index) => (
          <motion.div
            key={culture.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}
            style={{
              background: "linear-gradient(135deg, #ffffff, #f8f9fa)",
              padding: "25px",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              border: "1px solid #e8f5e8",
              position: "relative"
            }}
          >
            <div style={{ fontSize: "40px", textAlign: "center", marginBottom: "15px" }}>
              {getCultureIcon(culture.nom_culture)}
            </div>
            
            <h3 style={{ color: "#2E7D32", textAlign: "center", marginBottom: "15px" }}>
              {culture.nom_culture}
            </h3>
            
            <div style={{ display: "grid", gap: "12px" }}>
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                padding: "8px 12px",
                background: "#e3f2fd",
                borderRadius: "10px",
                border: "1px solid #2196F3"
              }}>
                <span style={{ fontWeight: "600", color: "#1976D2" }}>🌤️ Vanim-potoana:</span>
                <span style={{ color: "#1565C0" }}>{culture.saison_plantation}</span>
              </div>
              
              {culture.mois_plantation && (
                <div style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "8px",
                  padding: "8px 12px",
                  background: "#f3e5f5",
                  borderRadius: "10px",
                  border: "1px solid #9C27B0"
                }}>
                  <span style={{ fontWeight: "600", color: "#7B1FA2" }}>📅 Volana:</span>
                  <span style={{ color: "#6A1B9A", fontSize: "13px" }}>{culture.mois_plantation}</span>
                </div>
              )}
              
              <div style={{ 
                display: "flex", 
                alignItems: "center", 
                gap: "8px",
                padding: "8px 12px",
                background: "#fff3e0",
                borderRadius: "10px",
                border: "1px solid #FF9800"
              }}>
                <span style={{ fontWeight: "600", color: "#F57C00" }}>⏱️ Fitomboana:</span>
                <span style={{ color: "#EF6C00" }}>{culture.duree_croissance || 'Tsy fantatra'} andro</span>
              </div>
              
              {culture.conseils_specifiques && (
                <div style={{ marginTop: "10px", padding: "10px", background: "#f0f8e8", borderRadius: "8px" }}>
                  <span style={{ fontWeight: "600", color: "#2E7D32" }}>Torohevitra:</span>
                  <p style={{ margin: "5px 0 0 0", fontSize: "14px", color: "#555" }}>
                    {culture.conseils_specifiques}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}