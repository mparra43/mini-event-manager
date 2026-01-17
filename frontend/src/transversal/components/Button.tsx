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
  const base = "inline-flex items-center justify-center rounded-full px-5 py-3 font-medium focus:outline-none transition-colors";

  const variantClass =
    variant === "primary"
      ? "bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-md hover:from-emerald-500 hover:to-green-600 disabled:opacity-50"
      : "bg-white text-emerald-700 border border-emerald-200 hover:bg-emerald-50 disabled:opacity-50";

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
