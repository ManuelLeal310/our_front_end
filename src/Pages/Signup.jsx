import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  function handleSignup(event) {
    event.preventDefault();
    const adminToCreateInDB = {
      adminName: username,
      email,
      password: password,
    };
    axios
      .post(`${import.meta.env.VITE_API_URL}/admin/signup`, adminToCreateInDB)
      .then((res) => {
        console.log("user created in the DB", res);
        nav("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="signup-page">
      <h3>Sign up with us</h3>
      <form onSubmit={handleSignup}>
        <label>
          Username:
          <input
            type="text"
            placeholder="enter a username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
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
        <button>Signup</button>
      </form>
      <p>
        Already with us...<Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
