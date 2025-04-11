import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <img />
      <h1>Our Frontend</h1>
      <Link to="/">
        <button>Sign up</button>
      </Link>
    </nav>
  );
}

export default NavBar;
