import { Button } from "../Ui/Button/Button";
import css from "./AuthButton.module.css";

interface AuthButtonsProps {
  isAuth: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onLogout: () => void;
}

export const AuthButtons = ({
  isAuth,
  onLogin,
  onRegister,
  onLogout,
}: AuthButtonsProps) => {
  return (
    <div className={css.authButtons}>
      {!isAuth ? (
        <>
          <svg
            className={css["icon-login"]}
            width="20"
            height="20"
            role="img"
            aria-hidden="true"
          >
            <use
              href="/symbol-defs1.svg#log-in-011"
              xlinkHref="/symbol-defs1.svg#log-in-011"
            />
          </svg>

          <button className={css.loginButton} onClick={onLogin}>
            Log in
          </button>
          <Button className={css.registerButton} onClick={onRegister}>
            Registration
          </Button>
        </>
      ) : (
        <Button className={css.logoutButton} onClick={onLogout}>
          Logout
        </Button>
      )}
    </div>
  );
};
