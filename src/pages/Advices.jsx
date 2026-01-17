// pages/Advices.jsx
import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaLightbulb, FaPlus, FaPlay, FaPause, FaEdit, FaTrash, FaSave, FaTimes } from "react-icons/fa";
import { isAdmin } from "../utils/auth";

export default function Advices() {
  const [advices, setAdvices] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAdvice, setNewAdvice] = useState({ title: "", description: "", audio_url: "" });
  const [editingId, setEditingId] = useState(null);
  const [playingAudio, setPlayingAudio] = useState(null);
  const token = localStorage.getItem("token");
  const userIsAdmin = useMemo(() => isAdmin(), []);

  useEffect(() => {
    fetchAdvices();
  }, []);

  const fetchAdvices = () => {
    axios.get("http://localhost:3001/advices", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setAdvices(res.data))
      .catch(err => console.error(err));
  };

  const handleAddAdvice = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/advices", newAdvice, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewAdvice({ title: "", description: "", audio_url: "" });
      setShowForm(false);
      fetchAdvices();
    } catch (err) {
      alert(err.response?.data?.error || "Nisy olana tamin'ny fampidirana torohevitra");
    }
  };

  const handleUpdateAdvice = async (id, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3001/advices/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEditingId(null);
      fetchAdvices();
    } catch (err) {
      console.error('Erreur modification:', err.response);
      alert(`Erreur: ${err.response?.status} - ${err.response?.data?.error || err.message}`);
    }
  };

  const handleDeleteAdvice = async (id) => {
    if (confirm("Hofafana ve ity torohevitra ity ?")) {
      try {
        await axios.delete(`http://localhost:3001/advices/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchAdvices();
      } catch (err) {
        console.error('Erreur suppression:', err.response);
        alert(`Erreur: ${err.response?.status} - ${err.response?.data?.error || err.message}`);
      }
    }
  };

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'mg-MG';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const toggleAudio = (audioUrl, adviceId, text) => {
    if (audioUrl) {
      const audio = document.getElementById(`audio-${adviceId}`);
      if (playingAudio === adviceId) {
        audio.pause();
        setPlayingAudio(null);
      } else {
        if (playingAudio) {
          document.getElementById(`audio-${playingAudio}`).pause();
        }
        audio.play();
        setPlayingAudio(adviceId);
      }
    } else {
      // Utiliser Web Speech API
      if (playingAudio === adviceId) {
        speechSynthesis.cancel();
        setPlayingAudio(null);
      } else {
        speechSynthesis.cancel();
        speakText(text);
        setPlayingAudio(adviceId);
        setTimeout(() => setPlayingAudio(null), text.length * 100);
      }
    }
  };

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ color: "#4CAF50", display: "flex", alignItems: "center", gap: "10px" }}>
          <FaLightbulb /> Torohevitra fambolena
        </h2>
        {userIsAdmin && (
          <button 
            onClick={() => setShowForm(!showForm)}
            style={{
              background: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 15px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px"
            }}
          >
            <FaPlus /> Hanampy torohevitra
          </button>
        )}
      </div>

      {userIsAdmin && showForm && (
        <motion.form 
          onSubmit={handleAddAdvice}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "20px"
          }}
        >
          <input
            type="text"
            placeholder="Lohatenin'ny torohevitra"
            value={newAdvice.title}
            onChange={(e) => setNewAdvice({...newAdvice, title: e.target.value})}
            required
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
          <textarea
            placeholder="Famaritana ny torohevitra"
            value={newAdvice.description}
            onChange={(e) => setNewAdvice({...newAdvice, description: e.target.value})}
            required
            rows="4"
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
          />
          <input
            type="url"
            placeholder="URL feo (azo atao tsy asiana)"
            value={newAdvice.audio_url}
            onChange={(e) => setNewAdvice({...newAdvice, audio_url: e.target.value})}
            style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
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
              textAlign: "center",
              position: "relative"
            }}
          >
            {userIsAdmin && (
              <div style={{ position: "absolute", top: "10px", right: "10px", display: "flex", gap: "5px" }}>
                <button
                  onClick={() => setEditingId(editingId === a.id ? null : a.id)}
                  style={{ background: "#FF9800", color: "white", border: "none", padding: "5px", borderRadius: "50%", cursor: "pointer" }}
                >
                  {editingId === a.id ? <FaTimes /> : <FaEdit />}
                </button>
                <button
                  onClick={() => handleDeleteAdvice(a.id)}
                  style={{ background: "#f44336", color: "white", border: "none", padding: "5px", borderRadius: "50%", cursor: "pointer" }}
                >
                  <FaTrash />
                </button>
              </div>
            )}
            
            <FaLightbulb size={40} color="#FFEB3B" />
            
            {editingId === a.id ? (
              <EditForm advice={a} onSave={handleUpdateAdvice} onCancel={() => setEditingId(null)} />
            ) : (
              <>
                <h3>{a.title}</h3>
                <p style={{ color: "#555" }}>{a.description}</p>
              </>
            )}
            
            {editingId !== a.id && (
              <div style={{ marginTop: "10px" }}>
                <button
                  onClick={() => toggleAudio(a.audio_url, a.id, a.description)}
                  style={{
                    background: playingAudio === a.id ? "#f44336" : "#2196F3",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: "12px",
                    margin: "0 auto"
                  }}
                >
                  {playingAudio === a.id ? <FaPause /> : <FaPlay />}
                  {playingAudio === a.id ? "Ajanona" : "Hihaino"}
                </button>
                {a.audio_url && (
                  <audio
                    id={`audio-${a.id}`}
                    src={a.audio_url}
                    onEnded={() => setPlayingAudio(null)}
                    style={{ display: "none" }}
                  />
                )}
              </div>
            )}
            
            {a.icon && <img src={a.icon} alt="icon" style={{ width: "40px", marginTop: "10px" }} />}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Composant de formulaire d'édition
function EditForm({ advice, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: advice.title,
    description: advice.description,
    audio_url: advice.audio_url || ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(advice.id, formData);
  };

  return (
    <form onSubmit={handleSubmit} style={{ textAlign: "left", marginTop: "10px" }}>
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
        style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({...formData, description: e.target.value})}
        rows="3"
        style={{ width: "100%", padding: "8px", marginBottom: "8px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <input
        type="url"
        placeholder="URL feo"
        value={formData.audio_url}
        onChange={(e) => setFormData({...formData, audio_url: e.target.value})}
        style={{ width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ddd" }}
      />
      <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
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
