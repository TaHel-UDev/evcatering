/**
 * Textarea Component Types
 * 
 * Типы и интерфейсы для компонента Textarea
 */

import { TextareaHTMLAttributes } from "react";

/**
 * Размеры текстовой области
 */
export type TextareaSize = "sm" | "md" | "lg";

/**
 * Состояния валидации
 */
export type TextareaValidationState = "default" | "error" | "success" | "warning";

/**
 * Свойства компонента Textarea
 */
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /**
   * Размер текстовой области
   * @default "md"
   */
  size?: TextareaSize;

  /**
   * Состояние валидации
   * @default "default"
   */
  validationState?: TextareaValidationState;

  /**
   * Label над текстовой областью
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
   * Дополнительные CSS классы для textarea элемента
   */
  textareaClassName?: string;

  /**
   * Ref для textarea элемента
   */
  textareaRef?: React.Ref<HTMLTextAreaElement>;

  /**
   * Минимальное количество строк
   * @default 3
   */
  minRows?: number;

  /**
   * Максимальное количество строк (для авторазмера)
   */
  maxRows?: number;

  /**
   * Автоматическое изменение размера по содержимому
   * @default false
   */
  autoResize?: boolean;

  /**
   * Показывать счетчик символов
   * @default false
   */
  showCharCount?: boolean;

  /**
   * Максимальное количество символов
   */
  maxLength?: number;
}

