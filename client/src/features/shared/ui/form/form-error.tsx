/**
 * FormError Component
 * 
 * Компонент для отображения ошибок валидации поля
 */

import React from "react";
import { FieldValues } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { useFormContext } from "./form-context";
import { FormErrorProps } from "./form-types";

/**
 * Компонент FormError
 */
export function FormError<TFieldValues extends FieldValues>({
  name,
  className = "",
}: FormErrorProps<TFieldValues>) {
  const { formState: { errors } } = useFormContext<TFieldValues>();

  // Получаем ошибку для поля
  const error = errors[name]?.message as string | undefined;

  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.2 }}
          className={`text-sm text-red-600 ${className}`}
        >
          {error}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default FormError;



