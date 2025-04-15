import React from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Admin from "./Pages/AdminPage";
import NotFoundPage from "./Pages/NotFoundPage";
import HomePage from "./Pages/HomePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import EditFest from "./Pages/EditFest";
import AllFests from "./Pages/AllFests";
import CreateFest from "./Pages/CreateFest";

import { FestContextWrapper } from "./Contexts/FestContext";
import { AuthContextWrapper } from "./Contexts/AuthContext";

import "./App.css";
import "./index.css";

function App() {
  return (
    <AuthContextWrapper>
      <FestContextWrapper>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateFest />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:festId"
            element={
              <ProtectedRoute>
                <EditFest />
              </ProtectedRoute>
            }
          />
          <Route path="/fests" element={<AllFests />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </FestContextWrapper>
    </AuthContextWrapper>
  );
}

export default App;
