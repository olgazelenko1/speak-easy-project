import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <Link className="home-link" to="/">
          <div className="logo">
            <svg></svg>
          </div>
        </Link>
        {/* Navigation*/}
        <nav className="navigation">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
          <NavLink className="nav-link" to="/teachers">
            Teachers
          </NavLink>
          <NavLink className="nav-link" to="/favorites">
            Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  );
};
export default Header;
