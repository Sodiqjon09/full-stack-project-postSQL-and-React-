import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, lastName, email, password };

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Ro‘yxatdan o‘tishda xatolik yuz berdi"
        );
      }

      alert("Ro‘yxatdan o‘tish muvaffaqiyatli!");
      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup">
      <h2>Ro‘yxatdan o‘tish</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ism"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Familiya"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())} // Kichik harfga aylantiramiz
          required
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Ro‘yxatdan o‘tish</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
      <Link to="/login">Kirish</Link>
    </div>
  );
}

export default Signup;
