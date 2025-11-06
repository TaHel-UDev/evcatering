/**
 * Form Component Types
 * 
 * Типы и интерфейсы для компонента Form и FormProvider
 */

import { ReactNode, ReactElement } from "react";
import { UseFormReturn, FieldValues, SubmitHandler, Path, DefaultValues } from "react-hook-form";
import { z, ZodType } from "zod";

/**
 * Свойства компонента FormProvider
 */
export interface FormProviderProps<TFieldValues extends FieldValues> {
  /**
   * Zod схема для валидации
   */
  schema: ZodType<TFieldValues, any, any>;

  /**
   * Значения по умолчанию
   */
  defaultValues?: DefaultValues<TFieldValues>;

  /**
   * Режим валидации
   * @default "onSubmit"
   */
  mode?: "onSubmit" | "onBlur" | "onChange" | "onTouched" | "all";

  /**
   * Обработчик отправки формы
   */
  onSubmit: SubmitHandler<TFieldValues>;

  /**
   * Обработчик ошибок валидации
   */
  onError?: (errors: any) => void;

  /**
   * Контент формы
   */
  children: ReactNode | ((methods: UseFormReturn<TFieldValues, any>) => ReactNode);

  /**
   * Дополнительные CSS классы
   */
  className?: string;

  /**
   * ID формы
   */
  id?: string;
}

/**
 * Свойства компонента FormField
 */
export interface FormFieldProps<TFieldValues extends FieldValues> {
  /**
   * Имя поля в схеме
   */
  name: Path<TFieldValues>;

  /**
   * Label поля
   */
  label?: string;

  /**
   * Обязательное поле
   */
  required?: boolean;

  /**
   * Контент поля (render function)
   */
  children: (field: {
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error?: string;
    name: string;
  }) => ReactElement;
}

/**
 * Свойства компонента FormError
 */
export interface FormErrorProps<TFieldValues extends FieldValues> {
  /**
   * Имя поля в схеме
   */
  name: Path<TFieldValues>;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Свойства компонента FormLabel
 */
export interface FormLabelProps {
  /**
   * Label text
   */
  children: ReactNode;

  /**
   * Обязательное поле (добавляет *)
   */
  required?: boolean;

  /**
   * HTML for attribute
   */
  htmlFor?: string;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Хелперы для создания zod схем
 */
export const formSchemaHelpers = {
  /**
   * Строка с минимальной длиной
   */
  string: (minLength = 1, message = "Это поле обязательно для заполнения") =>
    z.string({ message }).min(minLength, message),

  /**
   * Email
   */
  email: (message = "Введите корректный email адрес") =>
    z.string({ message: "Email обязателен" }).email(message),

  /**
   * Число
   */
  number: (message = "Введите число") =>
    z.number({ message }),

  /**
   * Число с минимальным значением
   */
  numberMin: (min: number, message?: string) =>
    z.number({ message: "Обязательное поле" }).min(min, message || `Минимальное значение: ${min}`),

  /**
   * Число с максимальным значением
   */
  numberMax: (max: number, message?: string) =>
    z.number({ message: "Обязательное поле" }).max(max, message || `Максимальное значение: ${max}`),

  /**
   * Дата
   */
  date: (message = "Выберите дату") =>
    z.date({ message }),

  /**
   * Boolean (checkbox)
   */
  boolean: () => z.boolean().default(false),

  /**
   * Опциональная строка
   */
  optionalString: () =>
    z.preprocess(
      (val) => (val === "" || val === null || val === undefined ? undefined : val),
      z.string().optional()
    ),

  /**
   * Опциональное поле
   */
  optional: <T extends ZodType>(schema: T) => schema.optional(),

  /**
   * Массив
   */
  array: <T extends ZodType>(schema: T) => z.array(schema),
};

