/**
 * DatePicker Component Types
 * 
 * Типы и интерфейсы для компонента DatePicker
 */

import { ReactNode } from "react";

/**
 * Размеры date picker
 */
export type DatePickerSize = "sm" | "md" | "lg";

/**
 * Состояния валидации
 */
export type DatePickerValidationState = "default" | "error" | "success" | "warning";

/**
 * Свойства компонента DatePicker
 */
export interface DatePickerProps {
  /**
   * Размер date picker
   * @default "md"
   */
  size?: DatePickerSize;

  /**
   * Состояние валидации
   * @default "default"
   */
  validationState?: DatePickerValidationState;

  /**
   * Label над полем
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
   * Выбранная дата
   */
  value?: Date | null;

  /**
   * Значение по умолчанию для неконтролируемого компонента
   */
  defaultValue?: Date | null;

  /**
   * Placeholder
   */
  placeholder?: string;

  /**
   * Формат отображения даты
   * @default "dd.MM.yyyy"
   */
  dateFormat?: string;

  /**
   * Минимальная дата
   */
  minDate?: Date;

  /**
   * Максимальная дата
   */
  maxDate?: Date;

  /**
   * Иконка слева от поля
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
   * Обработчик изменения даты
   */
  onChange?: (date: Date | null) => void;

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



