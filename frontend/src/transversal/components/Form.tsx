import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodSchema } from "zod";
import type { RegisterOptions } from "react-hook-form";
import InputText from "./Inputs/InputText";
import InputDate from "./Inputs/InputDate";
import Button from "./Button";

type FieldConfig = {
  label: string;
  name: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
  rules?: RegisterOptions;
  inputType: "text" | "date";
};

interface FormProps {
  schema: ZodSchema<any>;
  fields: FieldConfig[];
  buttonProps: {
    label: string;
    type?: "submit" | "button";
    variant?: "primary" | "secondary";
    floating?: boolean;
    disabled?: boolean;
  };
  onSubmit: (data: any) => void;
}

export const Form: React.FC<FormProps> = ({ schema, fields, buttonProps, onSubmit }) => {
  const { control, handleSubmit } = useForm<any>({ resolver: zodResolver(schema as any) });

  const submitHandler: SubmitHandler<any> = (data) => onSubmit(data);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="flex flex-col gap-4 w-full">
      {fields.map((f) => {
        if (f.inputType === "text") {
          return (
            <InputText
              key={f.name}
              label={f.label}
              name={f.name}
              control={control}
              placeholder={f.placeholder}
              type={f.type}
              rules={f.rules}
            />
          );
        }

        return (
          <InputDate
            key={f.name}
            label={f.label}
            name={f.name}
            control={control}
            placeholder={f.placeholder}
            rules={f.rules}
          />
        );
      })}

      <div className="w-full">
        <Button
          label={buttonProps.label}
          type={buttonProps.type === "submit" ? "submit" : "button"}
          variant={buttonProps.variant}
          floating={buttonProps.floating}
          disabled={buttonProps.disabled}
        />
      </div>
    </form>
  );
};

export default Form;
