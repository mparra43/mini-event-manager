import React from "react";

type ButtonType = "button" | "submit" | "reset";
type Variant = "primary" | "secondary";

interface ButtonProps {
  label: string;
  type?: ButtonType;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  floating?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  variant = "primary",
  floating = false,
}) => {
  const base = "inline-flex items-center justify-center rounded px-4 py-2 font-medium focus:outline-none";

  const variantClass =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      : "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50";

  const floatingClass =
    floating
      ? "fixed bottom-6 right-6 rounded-full p-4 shadow-lg z-50"
      : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variantClass} ${floatingClass}`}
    >
      {label}
    </button>
  );
};

export default Button;
