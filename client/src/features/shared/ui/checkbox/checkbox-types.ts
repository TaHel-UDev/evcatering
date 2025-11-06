/**
 * Checkbox Component Types
 * 
 * Типы и интерфейсы для компонента Checkbox
 */

import { InputHTMLAttributes, ReactNode } from "react";

/**
 * Размеры чекбокса
 */
export type CheckboxSize = "sm" | "md" | "lg";

/**
 * Свойства компонента Checkbox
 */
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "onChange"> {
  /**
   * Размер чекбокса
   * @default "md"
   */
  size?: CheckboxSize;

  /**
   * Label рядом с чекбоксом
   */
  label?: ReactNode;

  /**
   * Описание под label
   */
  description?: string;

  /**
   * Отметка (checked)
   * @default false
   */
  checked?: boolean;

  /**
   * Значение по умолчанию для неконтролируемого компонента
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * Отключенное состояние
   * @default false
   */
  disabled?: boolean;

  /**
   * Состояние ошибки
   * @default false
   */
  error?: boolean;

  /**
   * Текст ошибки
   */
  errorText?: string;

  /**
   * Обработчик изменения состояния
   */
  onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;

  /**
   * Дополнительные CSS классы для контейнера
   */
  className?: string;

  /**
   * Дополнительные CSS классы для checkbox элемента
   */
  checkboxClassName?: string;

  /**
   * Ref для input элемента
   */
  inputRef?: React.Ref<HTMLInputElement>;
}



