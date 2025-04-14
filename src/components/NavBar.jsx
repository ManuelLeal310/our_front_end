import { Link } from "react-router-dom";

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
          <Link to="/">
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
