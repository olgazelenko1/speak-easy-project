import type { FC } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./LoginModal.module.css";
import Button from "../Ui/Button/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../firebase/auth";
import PasswordToggle from "../toggleButton/toggleButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const LoginModal: FC<Props> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Logged in successfully!");
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const onError = (errors: FieldErrors<FormData>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.loginModal}>
        <div className={css.loginContainer}>
          <h2 className={css.loginTitle}>Log In</h2>

          <p className={css.loginDescription}>
            Welcome back! Please enter your credentials to access your account
            and continue your search for an teacher.
          </p>
        </div>

        <form
          className={css.loginForm}
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          <input
            className={css.input}
            {...register("email")}
            placeholder="Email"
          />

          <div className={css.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={css.input}
              {...register("password")}
              placeholder="Password"
            />
            <PasswordToggle
              show={showPassword}
              onClick={() => setShowPassword((prev) => !prev)}
            />
          </div>

          <Button type="submit" className={css.button}>
            Log In
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
