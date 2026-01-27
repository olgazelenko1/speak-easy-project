import type { FC } from "react";
import css from "./LoginModal.module.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const LoginModal: FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={css.modal}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
          🅧
        </button>
        <h2>Login Form</h2>
      </div>
    </div>
  );
};

export default LoginModal;
