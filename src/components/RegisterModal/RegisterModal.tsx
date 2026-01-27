import type {FC} from "react";
import css from "./RegisterModal.module.css";

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterModal: FC <RegisterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className={css.modal}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.modalContent}>
        <button className={css.closeButton} onClick={onClose}>
          🅧
        </button>
        <h2>Register Form</h2>
      </div>
    </div>
  );
};
export default RegisterModal;