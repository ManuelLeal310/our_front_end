import { useContext, useEffect } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const { currentAdmin } = useContext(AuthContext);
  console.log(
    "Here is the name on the admin page from the context",
    currentAdmin
  );
  return (
    <div className="profile-page">
      <h2>{currentAdmin && currentAdmin.adminName} 's Profile</h2>
    </div>
  );
}

export default Admin;
