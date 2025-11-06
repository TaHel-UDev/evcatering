/**
 * FormLabel Component
 * 
 * Компонент для отображения label полей формы
 */

import React from "react";
import { FormLabelProps } from "./form-types";

/**
 * Компонент FormLabel
 */
export function FormLabel({
  children,
  required = false,
  htmlFor,
  className = "",
}: FormLabelProps) {
  const labelClasses = [
    "text-sm font-medium text-gray-700",
    required && "after:content-['*'] after:ml-0.5 after:text-red-500",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label htmlFor={htmlFor} className={labelClasses}>
      {children}
    </label>
  );
}

export default FormLabel;



