/**
 * FormField Component
 * 
 * Компонент для связывания полей формы с react-hook-form
 */

import React from "react";
import { Controller, FieldValues } from "react-hook-form";
import { useFormContext } from "./form-context";
import { FormFieldProps } from "./form-types";

/**
 * Компонент FormField
 */
export function FormField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  children,
}: FormFieldProps<TFieldValues>) {
  const { control, formState: { errors } } = useFormContext<TFieldValues>();

  // Получаем ошибку для поля
  const error = errors[name]?.message as string | undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return children({
          value: field.value,
          onChange: field.onChange,
          onBlur: field.onBlur,
          error,
          name: field.name,
        });
      }}
    />
  );
}

export default FormField;



