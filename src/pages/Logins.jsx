// pages/Login.jsx
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Erreur de connexion");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Connexion</h2>
      <form onSubmit={handleLogin}>
        <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
        <input placeholder="Mot de passe" type="password" value={password} onChange={e => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Se connecter</button>
        <p>Pas encore de compte? <a href="/register">Créer un compte</a></p>
      </form>
    </div>
  );
}
