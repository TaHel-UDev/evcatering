/**
 * Form Context
 * 
 * React Context для передачи состояния формы через дерево компонентов
 */

import { createContext, useContext } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";

/**
 * Form Context
 */
export const FormContext = createContext<UseFormReturn<any> | null>(null);

/**
 * Hook для получения контекста формы
 */
export function useFormContext<TFieldValues extends FieldValues = FieldValues>() {
  const context = useContext(FormContext) as UseFormReturn<TFieldValues> | null;

  if (!context) {
    throw new Error(
      "useFormContext должен использоваться внутри FormProvider"
    );
  }

  return context;
}



