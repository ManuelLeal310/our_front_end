import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Admin from "./Pages/Admin";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
