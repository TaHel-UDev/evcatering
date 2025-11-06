/**
 * TimePicker Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента TimePicker
 */

import { Variants } from "motion/react";
import { TimePickerSize, TimePickerValidationState } from "./timepicker-types";

/**
 * Базовые стили для контейнера
 */
export const timePickerContainerStyles = {
  base: "flex flex-col gap-1.5",
  fullWidth: "w-full",
};

/**
 * Стили для label
 */
export const timePickerLabelStyles = {
  base: "text-sm font-medium text-gray-700",
  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
  disabled: "text-gray-400 cursor-not-allowed",
};

/**
 * Базовые стили для wrapper (содержит input и иконки)
 */
export const timePickerWrapperStyles = {
  base: "relative",
};

/**
 * Базовые стили для input
 */
export const timePickerBaseStyles = {
  base: "w-full rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer",
  withLeftIcon: "pl-11",
  withRightIcon: "pr-10",
};

/**
 * Стили для разных размеров
 */
export const timePickerSizeStyles: Record<TimePickerSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

/**
 * Стили для иконок в зависимости от размера
 */
export const timePickerIconStyles: Record<TimePickerSize, { size: number; position: string }> = {
  sm: { size: 16, position: "left-3" },
  md: { size: 20, position: "left-3.5" },
  lg: { size: 24, position: "left-4" },
};

/**
 * Стили для разных состояний валидации
 */
export const timePickerValidationStyles: Record<TimePickerValidationState, string> = {
  default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
  warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
};

/**
 * Цвета иконок для разных состояний валидации
 */
export const timePickerIconColorStyles: Record<TimePickerValidationState, string> = {
  default: "text-gray-400",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-yellow-500",
};

/**
 * Стили для helper text
 */
export const timePickerHelperTextStyles = {
  base: "text-sm",
  default: "text-gray-600",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

/**
 * Конфигурация анимаций для time picker
 */
export const timePickerAnimations = {
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
 * Экспорт типа конфигурации для кастомизации
 */
export interface TimePickerStylesConfig {
  containerStyles?: typeof timePickerContainerStyles;
  labelStyles?: typeof timePickerLabelStyles;
  wrapperStyles?: typeof timePickerWrapperStyles;
  baseStyles?: typeof timePickerBaseStyles;
  sizeStyles?: Partial<typeof timePickerSizeStyles>;
  iconStyles?: Partial<typeof timePickerIconStyles>;
  validationStyles?: Partial<typeof timePickerValidationStyles>;
  iconColorStyles?: Partial<typeof timePickerIconColorStyles>;
  helperTextStyles?: typeof timePickerHelperTextStyles;
  animations?: typeof timePickerAnimations;
}

/**
 * Пример кастомизации:
 * 
 * import { timePickerValidationStyles, timePickerAnimations } from './timepicker-config';
 * 
 * // Переопределить стили валидации
 * const customValidationStyles = {
 *   ...timePickerValidationStyles,
 *   default: "border-gray-400 focus:border-purple-500 focus:ring-purple-500",
 * };
 * 
 * // Переопределить анимации
 * const customAnimations = {
 *   ...timePickerAnimations,
 *   helperText: {
 *     initial: { opacity: 0, x: -10 },
 *     animate: { opacity: 1, x: 0 },
 *     exit: { opacity: 0, x: -10 },
 *   },
 * };
 */

