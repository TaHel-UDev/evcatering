/**
 * Input Component Types
 * 
 * Типы и интерфейсы для компонента Input
 */

import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Размеры поля ввода
 */
export type InputSize = "sm" | "md" | "lg";

/**
 * Состояния валидации
 */
export type InputValidationState = "default" | "error" | "success" | "warning";

/**
 * Типы input
 */
export type InputType = "text" | "email" | "password" | "number" | "tel" | "url" | "search";

/**
 * Свойства компонента Input
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "value"> {
  /**
   * Значение поля
   */
  value?: string;

  /**
   * Размер поля ввода
   * @default "md"
   */
  size?: InputSize;

  /**
   * Тип поля ввода
   * @default "text"
   */
  type?: InputType;

  /**
   * Состояние валидации
   * @default "default"
   */
  validationState?: InputValidationState;

  /**
   * Label над полем ввода
   */
  label?: string;

  /**
   * Обязательное поле (добавляет * к label)
   * @default false
   */
  required?: boolean;

  /**
   * Текст подсказки под полем
   */
  helperText?: string;

  /**
   * Текст ошибки (автоматически устанавливает validationState в "error")
   */
  errorText?: string;

  /**
   * Иконка слева от поля ввода
   */
  leftIcon?: ReactNode;

  /**
   * Иконка справа от поля ввода
   */
  rightIcon?: ReactNode;

  /**
   * Полная ширина (растянуть на весь контейнер)
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Отключенное состояние
   * @default false
   */
  disabled?: boolean;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Дополнительные CSS классы для контейнера
   */
  className?: string;

  /**
   * Дополнительные CSS классы для input элемента
   */
  inputClassName?: string;

  /**
   * Ref для input элемента
   */
  inputRef?: React.Ref<HTMLInputElement>;

  /**
   * Маска для поля ввода (например: "+7 (000) 000-00-00")
   * Используется библиотека IMask: 0 - цифра, a - буква, * - любой символ
   */
  mask?: string;
}

