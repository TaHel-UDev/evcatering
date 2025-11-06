/**
 * Select Component Types
 * 
 * Типы и интерфейсы для компонента Select
 */

import { ReactNode } from "react";

/**
 * Размеры селекта
 */
export type SelectSize = "sm" | "md" | "lg";

/**
 * Состояния валидации
 */
export type SelectValidationState = "default" | "error" | "success" | "warning";

/**
 * Опция для селекта
 */
export interface SelectOption {
  /**
   * Значение опции
   */
  value: string;

  /**
   * Отображаемый текст
   */
  label: string;

  /**
   * Иконка опции
   */
  icon?: ReactNode;

  /**
   * Отключенная опция
   */
  disabled?: boolean;
}

/**
 * Свойства компонента Select
 */
export interface SelectProps {
  /**
   * Размер селекта
   * @default "md"
   */
  size?: SelectSize;

  /**
   * Состояние валидации
   * @default "default"
   */
  validationState?: SelectValidationState;

  /**
   * Label над селектом
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
   * Опции для выбора
   */
  options: SelectOption[];

  /**
   * Выбранное значение
   */
  value?: string;

  /**
   * Значение по умолчанию для неконтролируемого компонента
   */
  defaultValue?: string;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Иконка слева от селекта
   */
  leftIcon?: ReactNode;

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
   * Обработчик изменения значения
   */
  onChange?: (value: string) => void;

  /**
   * Дополнительные CSS классы для контейнера
   */
  className?: string;

  /**
   * ID для связи с label
   */
  id?: string;

  /**
   * Имя поля для форм
   */
  name?: string;
}



