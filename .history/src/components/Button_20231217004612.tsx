import React, { FC } from "react";
import clsx from "clsx";

export interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  onClick,
}): JSX.Element => {
  return (
    <button
      className={clsx("button", className)}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
