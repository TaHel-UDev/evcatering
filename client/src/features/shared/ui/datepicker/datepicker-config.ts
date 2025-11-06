/**
 * DatePicker Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента DatePicker
 */

import { Variants } from "motion/react";
import { DatePickerSize, DatePickerValidationState } from "./datepicker-types";

/**
 * Базовые стили для контейнера
 */
export const datePickerContainerStyles = {
  base: "flex flex-col gap-1.5",
  fullWidth: "w-full",
};

/**
 * Стили для label
 */
export const datePickerLabelStyles = {
  base: "text-sm font-medium text-gray-700",
  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
  disabled: "text-gray-400 cursor-not-allowed",
};

/**
 * Базовые стили для wrapper (содержит input и иконки)
 */
export const datePickerWrapperStyles = {
  base: "relative",
};

/**
 * Базовые стили для input
 */
export const datePickerBaseStyles = {
  base: "w-full rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer",
  withLeftIcon: "pl-11",
  withRightIcon: "pr-10",
};

/**
 * Стили для разных размеров
 */
export const datePickerSizeStyles: Record<DatePickerSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

/**
 * Стили для иконок в зависимости от размера
 */
export const datePickerIconStyles: Record<DatePickerSize, { size: number; position: string }> = {
  sm: { size: 16, position: "left-3" },
  md: { size: 20, position: "left-3.5" },
  lg: { size: 24, position: "left-4" },
};

/**
 * Стили для разных состояний валидации
 */
export const datePickerValidationStyles: Record<DatePickerValidationState, string> = {
  default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
  warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
};

/**
 * Цвета иконок для разных состояний валидации
 */
export const datePickerIconColorStyles: Record<DatePickerValidationState, string> = {
  default: "text-gray-400",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-yellow-500",
};

/**
 * Стили для helper text
 */
export const datePickerHelperTextStyles = {
  base: "text-sm",
  default: "text-gray-600",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

/**
 * Конфигурация анимаций для date picker
 */
export const datePickerAnimations = {
  /**
   * Анимация появления helper text
   */
  helperText: {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.2 },
  } as Variants,
};

/**
 * Кастомные стили для react-datepicker
 */
export const datePickerCustomStyles = `
  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker {
    font-family: inherit;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .react-datepicker__header {
    background-color: #f9fafb;
    border-bottom: 1px solid #e5e7eb;
    border-radius: 0.5rem 0.5rem 0 0;
    padding-top: 0.5rem;
  }
  
  .react-datepicker__current-month {
    font-weight: 600;
    color: #111827;
    margin-bottom: 0.5rem;
  }
  
  .react-datepicker__day-name {
    color: #6b7280;
    font-weight: 500;
  }
  
  .react-datepicker__day {
    color: #374151;
    border-radius: 0.375rem;
    transition: all 0.15s;
  }
  
  .react-datepicker__day:hover {
    background-color: #e5e7eb;
  }
  
  .react-datepicker__day--selected {
    background-color: #2563eb !important;
    color: white !important;
  }
  
  .react-datepicker__day--keyboard-selected {
    background-color: #dbeafe;
    color: #1e40af;
  }
  
  .react-datepicker__day--disabled {
    color: #d1d5db;
    cursor: not-allowed;
  }
  
  .react-datepicker__day--disabled:hover {
    background-color: transparent;
  }
  
  .react-datepicker__day--outside-month {
    color: #9ca3af;
  }
  
  .react-datepicker__navigation {
    top: 0.75rem;
  }
  
  .react-datepicker__navigation-icon::before {
    border-color: #6b7280;
  }
  
  .react-datepicker__navigation:hover *::before {
    border-color: #111827;
  }
`;

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface DatePickerStylesConfig {
  containerStyles?: typeof datePickerContainerStyles;
  labelStyles?: typeof datePickerLabelStyles;
  wrapperStyles?: typeof datePickerWrapperStyles;
  baseStyles?: typeof datePickerBaseStyles;
  sizeStyles?: Partial<typeof datePickerSizeStyles>;
  iconStyles?: Partial<typeof datePickerIconStyles>;
  validationStyles?: Partial<typeof datePickerValidationStyles>;
  iconColorStyles?: Partial<typeof datePickerIconColorStyles>;
  helperTextStyles?: typeof datePickerHelperTextStyles;
  animations?: typeof datePickerAnimations;
  customStyles?: string;
}

/**
 * Пример кастомизации:
 * 
 * import { datePickerValidationStyles, datePickerAnimations } from './datepicker-config';
 * 
 * // Переопределить стили валидации
 * const customValidationStyles = {
 *   ...datePickerValidationStyles,
 *   default: "border-gray-400 focus:border-purple-500 focus:ring-purple-500",
 * };
 * 
 * // Переопределить анимации
 * const customAnimations = {
 *   ...datePickerAnimations,
 *   helperText: {
 *     initial: { opacity: 0, x: -10 },
 *     animate: { opacity: 1, x: 0 },
 *     exit: { opacity: 0, x: -10 },
 *   },
 * };
 */

