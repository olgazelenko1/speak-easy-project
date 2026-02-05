import { useState, type FC } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Modal/Modal";
import css from "./RegisterModal.module.css";
import Button from "../Ui/Button/Button";
import { toast } from "react-toastify";
import { registerUser } from "../../firebase/auth";
import PasswordToggle from "../toggleButton/toggleButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
});

const RegisterModal: FC<Props> = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data.name, data.email, data.password);
      toast.success("Registered successfully!");
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
    Object.values(errors)
      .map((e) => e?.message)
      .filter(Boolean)
      .forEach((msg) => toast.error(msg as string));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>

      <div className={css.registerModal}>

        <h2 className={css.registerTitle}>Registration</h2>

        <p className={css.registerDescription}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>

        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={css.registerForm}
        >
          <input
            className={css.input}
            {...register("name")}
            placeholder="Name"
          />

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

          <Button type="submit" className={css.registerButton}>
            Sign Up
          </Button>

        </form>

      </div>

    </Modal>
  );
};

export default RegisterModal;
