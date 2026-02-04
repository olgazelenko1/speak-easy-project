import type { FC } from "react";
import css from "./toggleButtton.module.css";

const PasswordToggle: FC<{ show: boolean; onClick: () => void }> = ({
  show,
  onClick,
}) => (
  <button
    type="button"
    className={css.togglePassword}
    onClick={onClick}
    aria-label={show ? "Hide password" : "Show password"}
  >
    {show ? (
      <svg
        className={css.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <circle cx="12" cy="12" r="3" />
        <line x1="2" y1="2" x2="22" y2="22" strokeLinecap="round" />
      </svg>
    ) : (
      <svg
        className={css.icon}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <ellipse cx="12" cy="12" rx="10" ry="6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    )}
  </button>
);
export default PasswordToggle;
