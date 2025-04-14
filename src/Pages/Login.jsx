import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const adminToCreateInDB = { email, password };
    axios
      .post(`${import.meta.env.VITE_API_URL}/admin/login`, adminToLogin)
      .then((res) => {
        console.log("admin was logged in", res);
        nav("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <h3>Login with us</h3>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            placeholder="enter a email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            placeholder="enter the password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <button>Login</button>
      </form>
      <p>
        New here...<Link to="/">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
