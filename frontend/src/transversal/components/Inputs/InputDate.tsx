import React from "react";
import { Controller, Control, RegisterOptions } from "react-hook-form";

interface InputDateProps {
  label: string;
  name: string;
  control: Control<any>;
  placeholder?: string;
  rules?: RegisterOptions;
}

// Accepts ISO local datetime without timezone (e.g., 2026-01-12T13:45 or with seconds)
const isoLocalDatetimePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/;

export const InputDate: React.FC<InputDateProps> = ({ label, name, control, placeholder, rules }) => {
  const combinedRules: RegisterOptions = { ...rules };

  // If no pattern rule provided, validate ISO local datetime format
  if (!combinedRules.pattern) {
    combinedRules.pattern = {
      value: isoLocalDatetimePattern,
      message: "Invalid date format",
    };
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
              type="datetime-local"
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

export default InputDate;
