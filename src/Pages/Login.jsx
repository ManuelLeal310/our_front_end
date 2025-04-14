import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const nav = useNavigate();

  function handleLogin(event) {
    event.preventDefault();
    const adminToLogin = { email, password };
    axios
      .post(`${import.meta.env.VITE_API_URL}/admin/login`, adminToLogin)
      .then((res) => {
        console.log("admin was logged in", res);
        localStorage.setItem("adminToken", res.data.authToken);
        nav("/admin");
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.errorMessage);
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
      {errorMessage ? <p>{errorMessage}</p> : null}
      <p>
        New here...<Link to="/">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
