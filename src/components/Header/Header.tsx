import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import style from "../../Home.module.css";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import type { FC } from "react";
import { AuthButtons } from "../AuthButton/AuthButton";

interface HeaderProps {
  isAuth: boolean;
  favoritesCount: number;
  onLogout: () => void;
}
const Header: FC<HeaderProps> = ({ isAuth, favoritesCount, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className={style.container}>
      <div className={css.header}>
        {/* Logo */}
        <div className={css.logo}>
          <svg className={css.iconUkraine} width="28" height="28">
            <use href="/public/symbol-defs.svg#icon-ukraine"></use>
          </svg>

          <Link to="/">
            <span className={css.iconText}>LearnLingo</span>
          </Link>
        </div>

        {/* Navigation*/}

        <nav className={css.navigation}>
          <NavLink className={css.navLink} to="/">
            Home
          </NavLink>
          <NavLink className={css.navLink} to="/teachers">
            Teachers
          </NavLink>

          {isAuth && favoritesCount > 0 && (
            <NavLink className={css.navLink} to="/favorites">
              Favorites ({favoritesCount})
            </NavLink>
          )}
        </nav>

        {/* Auth buttons */}

        <AuthButtons
          isAuth={isAuth}
          onLogin={() => setShowLogin(true)}
          onRegister={() => setShowRegister(true)}
          onLogout={onLogout}
        />
      </div>

      {/* modals for login and register */}

      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
      />
    </header>
  );
};

export default Header;
