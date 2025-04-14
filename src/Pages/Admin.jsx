import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const { currentUser } = useContext(AuthContext);
  console.log("Here is the name on the admin page from the context", name);
  return (
    <div className="profile-page">
      <h2>{currentUser.username} 's Profile</h2>
    </div>
  );
}

export default Admin;
