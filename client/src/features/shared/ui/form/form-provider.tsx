/**
 * FormProvider Component
 * 
 * Провайдер формы с интеграцией react-hook-form и zod
 * Автоматическая валидация через zod схему
 */

import React from "react";
import { useForm, FieldValues, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProviderProps } from "./form-types";
import { FormContext } from "./form-context";

/**
 * Компонент FormProvider
 */
export function FormProvider<TFieldValues extends FieldValues>({
  schema,
  defaultValues,
  mode = "onSubmit",
  onSubmit,
  onError,
  children,
  className = "",
  id,
}: FormProviderProps<TFieldValues>) {
  // Инициализация react-hook-form с zod resolver
  const methods = useForm<TFieldValues>({
    resolver: zodResolver(schema) as any,
    defaultValues,
    mode,
  });

  // Обработчик отправки формы
  const handleSubmit = methods.handleSubmit(
    (data) => {
      onSubmit(data);
    },
    (errors) => {
      onError?.(errors);
    }
  );

  // Рендер children (может быть функцией для доступа к methods)
  const renderChildren = () => {
    if (typeof children === "function") {
      return children(methods as UseFormReturn<TFieldValues, any>);
    }
    return children;
  };

  return (
    <FormContext.Provider value={methods}>
      <form
        id={id}
        onSubmit={handleSubmit}
        className={className}
        noValidate
      >
        {renderChildren()}
      </form>
    </FormContext.Provider>
  );
}

export default FormProvider;



