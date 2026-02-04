import type { ButtonHTMLAttributes, FC } from "react";
import clsx from "clsx";
import css from "./Button.module.css";

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button {...props} className={clsx(css.button, className)}>
      {children}
    </button>
  );
};

export default Button;
