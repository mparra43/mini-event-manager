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
    <div className="w-full">
      <label className="block text-sm font-medium text-emerald-800 mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        rules={combinedRules}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <input
              {...field}
              value={field.value ?? ""}
              type={type}
              placeholder={placeholder}
              className={`w-full rounded-xl bg-white px-4 py-3 text-black shadow-sm ring-1 ring-emerald-200 focus:ring-emerald-400 outline-none ${fieldState.error ? "ring-red-300" : ""}`}
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
