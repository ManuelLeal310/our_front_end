import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthContextWrapper } from "./Contexts/AuthContext.jsx";
import { TicketsContextWrapper } from "./Contexts/TicketsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <TicketsContextWrapper>
      <AuthContextWrapper>
        <App />
      </AuthContextWrapper>
    </TicketsContextWrapper>
  </BrowserRouter>
);
