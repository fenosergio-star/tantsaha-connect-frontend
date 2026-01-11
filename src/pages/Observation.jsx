// pages/Journal.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaPlusCircle, FaClipboardList } from "react-icons/fa";

export default function Journal() {
  const [observations, setObservations] = useState([]);
  const [form, setForm] = useState({ date: "", pluie: "", parasites: "", date_plantation: "" });
  const token = localStorage.getItem("token");

  const fetchObservations = () => {
    axios.get("http://localhost:3001/observations", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setObservations(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchObservations(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3001/observations", form, { headers: { Authorization: `Bearer ${token}` } })
      .then(() => { fetchObservations(); setForm({ date: "", pluie: "", parasites: "", date_plantation: "" }); })
      .catch(err => console.error(err));
  };

  return (
    <motion.div className="page" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h2 style={{ color: "#4CAF50", display: "flex", alignItems: "center", gap: "10px" }}>
        <FaClipboardList /> Journal de culture
      </h2>

      <motion.form onSubmit={handleSubmit}
        style={{
          display: "flex", flexWrap: "wrap", gap: "10px", background: "white", padding: "20px",
          borderRadius: "15px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", marginTop: "20px"
        }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <input type="date" value={form.date} onChange={e => setForm({...form, date:e.target.value})} required />
        <input type="number" placeholder="Pluie (mm)" value={form.pluie} onChange={e => setForm({...form, pluie:e.target.value})} />
        <input type="text" placeholder="Parasites" value={form.parasites} onChange={e => setForm({...form, parasites:e.target.value})} />
        <input type="date" value={form.date_plantation} onChange={e => setForm({...form, date_plantation:e.target.value})} />
        <button type="submit"><FaPlusCircle /> Ajouter</button>
      </motion.form>

      <h3 style={{ marginTop: "30px" }}>📋 Vos observations</h3>
      <div style={{ display: "grid", gap: "15px", marginTop: "15px" }}>
        {observations.map(obs => (
          <motion.div
            key={obs.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
            style={{
              background: "white", padding: "15px", borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <p><b>Date :</b> {obs.date}</p>
            <p><b>Pluie :</b> {obs.rain} mm</p>
            <p><b>Parasites :</b> {obs.pests || "Aucun"}</p>
            <p><b>Date de plantation :</b> {obs.planting_date || "—"}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
