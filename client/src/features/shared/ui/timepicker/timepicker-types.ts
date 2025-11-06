/**
 * TimePicker Component Types
 * 
 * Типы и интерфейсы для компонента TimePicker
 */

import { ReactNode } from "react";

/**
 * Размеры time picker
 */
export type TimePickerSize = "sm" | "md" | "lg";

/**
 * Состояния валидации
 */
export type TimePickerValidationState = "default" | "error" | "success" | "warning";

/**
 * Свойства компонента TimePicker
 */
export interface TimePickerProps {
  /**
   * Размер time picker
   * @default "md"
   */
  size?: TimePickerSize;

  /**
   * Состояние валидации
   * @default "default"
   */
  validationState?: TimePickerValidationState;

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
   * Выбранное время
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
   * Формат отображения времени
   * @default "HH:mm"
   */
  timeFormat?: string;

  /**
   * Показывать секунды
   * @default false
   */
  showSeconds?: boolean;

  /**
   * Интервал между временами (в минутах)
   * @default 30
   */
  timeIntervals?: number;

  /**
   * Минимальное время
   */
  minTime?: Date;

  /**
   * Максимальное время
   */
  maxTime?: Date;

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
   * Обработчик изменения времени
   */
  onChange?: (time: Date | null) => void;

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



