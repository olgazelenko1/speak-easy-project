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
  onLoginSuccess?: () => void;
  onLogout: () => void;
}
const Header: FC<HeaderProps> = ({
  isAuth,
  favoritesCount,
  onLoginSuccess,
  onLogout,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <header className={style.container}>
      <div className={css.header}>
        <div className={css.logo}>
          <svg className={css.iconUkraine} width="28" height="28">
            <use href="/icon/symbol-defs.svg#icon-ukraine"></use>
          </svg>

          <Link to="/">
            <span className={css.iconText}>LearnLingo</span>
          </Link>
        </div>

        <nav className={css.navigation}>
          <NavLink className={css.navLink} to="/">
            Home
          </NavLink>
          <NavLink className={css.navLink} to="/teachers">
            Teachers
          </NavLink>

          {isAuth && (
            <NavLink className={css.navLink} to="/favorites">
              Favorites {favoritesCount > 0 && `(${favoritesCount})`}
            </NavLink>
          )}
        </nav>

        <AuthButtons
          isAuth={isAuth}
          onLogin={() => setShowLogin(true)}
          onRegister={() => setShowRegister(true)}
          onLogout={onLogout}
        />
      </div>

      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={() => {
          setShowLogin(false);
          onLoginSuccess?.();
        }}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onRegisterSuccess={() => {
          setShowRegister(false);
          onLoginSuccess?.();
        }}
      />
    </header>
  );
};

export default Header;
