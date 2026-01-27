import type { ButtonHTMLAttributes } from "react";
import css from "./Button.module.css";

export const Button = ({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className={css.button} {...props}>
      {children}
    </button>
  );
};
export default Button;
