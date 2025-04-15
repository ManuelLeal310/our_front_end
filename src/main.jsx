import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthContextWrapper } from "./Contexts/AuthContext.jsx";
import { FestContextWrapper } from "./Contexts/FestContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextWrapper>
      <FestContextWrapper>
        <App />
      </FestContextWrapper>
    </AuthContextWrapper>
  </BrowserRouter>
);
