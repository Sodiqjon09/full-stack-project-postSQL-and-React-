import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/login")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Ma'lumotlarni olishda xatolik:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = data.find((user) => user.email === email);

    if (!user) {
      setError("Email topilmadi!");
      return;
    }

    if (user.password !== password) {
      setError("Noto‘g‘ri parol!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    navigate("/home");
  };
  return (
    <div className="login">
      <div className="loginClass">
        <span className="kirish">kirish</span>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
          />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Kirish</button>
          {error && <span className="error">{error}</span>}
        </form>
        <hr />
        <div className="signin">
          <Link to="/signup">ro'yxatdan o'tish</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
