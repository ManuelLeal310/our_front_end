import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";

function NavBar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  return (
    <nav>
      <img />
      <h1>Our Frontend</h1>

      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default NavBar;
