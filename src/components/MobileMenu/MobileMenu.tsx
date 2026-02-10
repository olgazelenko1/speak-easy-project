import { useState, type FC } from "react";
import { NavLink } from "react-router-dom";
import css from "./MobileMenu.module.css";

interface MobileMenuProps {
  isAuth: boolean;
  favoritesCount: number;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

const MobileMenu: FC<MobileMenuProps> = ({
  isAuth,
  favoritesCount,
  onLogin,
  onRegister,
  onLogout,
}) => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className={css.mobileMenu}>
      <button
        type="button"
        className={css.menuButton}
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`${css.overlay} ${open ? css.overlayOpen : ""}`}>
        <div className={css.panel}>
          <button
            type="button"
            className={css.closeButton}
            aria-label="Close menu"
            onClick={closeMenu}
          >
            ×
          </button>

          <nav className={css.nav}>
            <NavLink className={css.navLink} to="/" onClick={closeMenu}>
              Home
            </NavLink>
            <NavLink className={css.navLink} to="/teachers" onClick={closeMenu}>
              Teachers
            </NavLink>
            {isAuth && (
              <NavLink
                className={css.navLink}
                to="/favorites"
                onClick={closeMenu}
              >
                Favorites {favoritesCount > 0 && `(${favoritesCount})`}
              </NavLink>
            )}
          </nav>

          <div className={css.actions}>
            {isAuth ? (
              <button
                type="button"
                className={css.actionButton}
                onClick={() => {
                  closeMenu();
                  onLogout();
                }}
              >
                Log Out
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className={css.actionButton}
                  onClick={() => {
                    closeMenu();
                    onLogin();
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className={css.actionButton}
                  onClick={() => {
                    closeMenu();
                    onRegister();
                  }}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
