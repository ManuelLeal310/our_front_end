import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { Link } from "react-router-dom";

function Admin() {
  const { currentAdmin } = useContext(AuthContext);
  console.log("Here is the name on the admin", currentAdmin);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // or useNavigate for smoother routing
  };

  return (
    <div className="admin-page">
      <h2>{currentAdmin && currentAdmin.adminName}'s Profile</h2>
      <div className="admin-buttons">
        <Link to="/create">
          <button>Create New Festival</button>
        </Link>

        <Link to="/fests">
          <button>All Festivals</button>
        </Link>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Admin;
