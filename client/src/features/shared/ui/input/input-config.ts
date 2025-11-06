/**
 * Input Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Input
 */

import { Variants } from "motion/react";
import { InputSize, InputValidationState } from "./input-types";

/**
 * Базовые стили для контейнера
 */
export const inputContainerStyles = {
  base: "flex flex-col gap-1.5",
  fullWidth: "w-full",
};

/**
 * Стили для label
 */
export const inputLabelStyles = {
  base: "text-sm font-medium text-gray-700",
  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
  disabled: "text-gray-400 cursor-not-allowed",
};

/**
 * Базовые стили для wrapper (содержит input и иконки)
 */
export const inputWrapperStyles = {
  base: "relative flex items-center",
};

/**
 * Базовые стили для input
 */
export const inputBaseStyles = {
  base: "w-full rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400",
  withLeftIcon: "pl-10",
  withRightIcon: "pr-10",
};

/**
 * Стили для разных размеров
 */
export const inputSizeStyles: Record<InputSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

/**
 * Стили для иконок в зависимости от размера
 */
export const inputIconStyles: Record<InputSize, { size: number; position: string }> = {
  sm: { size: 16, position: "left-3" },
  md: { size: 20, position: "left-3.5" },
  lg: { size: 24, position: "left-4" },
};

/**
 * Стили для правой иконки в зависимости от размера
 */
export const inputRightIconStyles: Record<InputSize, { position: string }> = {
  sm: { position: "right-3" },
  md: { position: "right-3.5" },
  lg: { position: "right-4" },
};

/**
 * Стили для разных состояний валидации
 */
export const inputValidationStyles: Record<InputValidationState, string> = {
  default: "border-gray-300 focus:border-green focus:ring-green",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
  warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
};

/**
 * Цвета иконок для разных состояний валидации
 */
export const inputIconColorStyles: Record<InputValidationState, string> = {
  default: "text-gray-400",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-yellow-500",
};

/**
 * Стили для helper text
 */
export const inputHelperTextStyles = {
  base: "text-sm",
  default: "text-gray-600",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

/**
 * Конфигурация анимаций для поля ввода
 */
export const inputAnimations = {
  /**
   * Анимация при фокусе
   */
  focus: {
    scale: 1.01,
    transition: { duration: 0.2 },
  },

  /**
   * Анимация появления helper text
   */
  helperText: {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.2 },
  } as Variants,

  /**
   * Анимация тряски при ошибке
   */
  error: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  },
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface InputStylesConfig {
  containerStyles?: typeof inputContainerStyles;
  labelStyles?: typeof inputLabelStyles;
  wrapperStyles?: typeof inputWrapperStyles;
  baseStyles?: typeof inputBaseStyles;
  sizeStyles?: Partial<typeof inputSizeStyles>;
  iconStyles?: Partial<typeof inputIconStyles>;
  rightIconStyles?: Partial<typeof inputRightIconStyles>;
  validationStyles?: Partial<typeof inputValidationStyles>;
  iconColorStyles?: Partial<typeof inputIconColorStyles>;
  helperTextStyles?: typeof inputHelperTextStyles;
  animations?: typeof inputAnimations;
}

/**
 * Пример кастомизации:
 * 
 * import { inputValidationStyles, inputAnimations } from './input-config';
 * 
 * // Переопределить стили валидации
 * const customValidationStyles = {
 *   ...inputValidationStyles,
 *   error: "border-red-600 focus:border-red-600 focus:ring-red-600",
 * };
 * 
 * // Переопределить анимации
 * const customAnimations = {
 *   ...inputAnimations,
 *   focus: {
 *     scale: 1.02,
 *     transition: { duration: 0.3 },
 *   },
 * };
 */



