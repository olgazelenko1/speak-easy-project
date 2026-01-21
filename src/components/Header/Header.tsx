import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

interface HeaderProps {
  isAuth: boolean;
  favoritesCount: number;
  onLogout: () => void;
}
const Header = ({ isAuth, favoritesCount, onLogout }: HeaderProps) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLogin(false);
        setShowRegister(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

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

          {isAuth && favoritesCount > 0 && (
            <NavLink className="nav-link" to="/favorites">
              Favorites ({favoritesCount})
            </NavLink>
          )}
        </nav>

        <div className="auth-buttons">
          {!isAuth ? (
            <>
              <button onClick={() => setShowLogin(true)}>Login</button>
              <button onClick={() => setShowRegister(true)}>Register</button>
            </>
          ) : (
            <button onClick={onLogout}>Logout</button>
          )}
        </div>
      </div>

      {/* modals for login and register */}

      {showLogin && (
        <div
          className="modal"
          onClick={(e) => e.target === e.currentTarget && setShowLogin(false)}
        >
          <div className="modal-content">
            <button onClick={() => setShowLogin(false)}>🅧</button>
            <h2>Login Form</h2>
            {/* Login form react-hook-form*/}
          </div>
        </div>
      )}

      {showRegister && (
        <div
          className="modal"
          onClick={(e) =>
            e.target === e.currentTarget && setShowRegister(false)
          }
        >
          <div className="modal-content">
            <button onClick={() => setShowRegister(false)}>🅧</button>
            <h2>Register Form</h2>
            {/* Register form react-hook-form*/}
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
