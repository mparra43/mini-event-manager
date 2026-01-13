import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

type InputType = "text" | "email" | "password";

interface InputTextProps {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  type?: InputType;
  rules?: RegisterOptions;
}

export const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  control,
  placeholder,
  type = "text",
  rules,
}) => {
  // default email validation pattern if type is email and no pattern provided
  const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

  const combinedRules: RegisterOptions = { ...rules };

  if (type === "email") {
    if (!combinedRules.pattern) {
      combinedRules.pattern = {
        value: emailPattern,
        message: "Please enter a valid email address",
      };
    }
  }

  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      <Controller
        name={name}
        control={control}
        rules={combinedRules}
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              type={type}
              placeholder={placeholder}
              className={`input input-bordered w-full ${fieldState.error ? "input-error" : ""}`}
            />
            {fieldState.error && (
              <p className="text-sm text-red-600 mt-1">{fieldState.error.message}</p>
            )}
          </>
        )}
      />
    </div>
  );
};

export default InputText;
