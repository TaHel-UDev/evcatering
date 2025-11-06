/**
 * Select Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Select
 */

import { Variants } from "motion/react";
import { SelectSize, SelectValidationState } from "./select-types";

/**
 * Базовые стили для контейнера
 */
export const selectContainerStyles = {
  base: "flex flex-col gap-1.5 relative",
  fullWidth: "w-full",
};

/**
 * Стили для label
 */
export const selectLabelStyles = {
  base: "text-sm font-medium text-gray-700",
  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
  disabled: "text-gray-400 cursor-not-allowed",
};

/**
 * Базовые стили для select button
 */
export const selectButtonStyles = {
  base: "w-full flex items-center justify-between gap-2 rounded-lg border bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 cursor-pointer",
  withLeftIcon: "pl-10",
};

/**
 * Стили для разных размеров
 */
export const selectSizeStyles: Record<SelectSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

/**
 * Стили для иконок в зависимости от размера
 */
export const selectIconStyles: Record<SelectSize, { size: number; position: string }> = {
  sm: { size: 16, position: "left-3" },
  md: { size: 20, position: "left-3.5" },
  lg: { size: 24, position: "left-4" },
};

/**
 * Стили для разных состояний валидации
 */
export const selectValidationStyles: Record<SelectValidationState, string> = {
  default: "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
  warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
};

/**
 * Цвета иконок для разных состояний валидации
 */
export const selectIconColorStyles: Record<SelectValidationState, string> = {
  default: "text-gray-400",
  error: "text-red-500",
  success: "text-green-500",
  warning: "text-yellow-500",
};

/**
 * Стили для dropdown меню
 */
export const selectDropdownStyles = {
  base: "absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto",
  top: "bottom-full mb-1 mt-0",
};

/**
 * Стили для опций
 */
export const selectOptionStyles = {
  base: "flex items-center gap-2 px-4 py-2 cursor-pointer transition-colors duration-150",
  hover: "hover:bg-gray-50",
  selected: "bg-blue-50 text-blue-700",
  disabled: "opacity-50 cursor-not-allowed hover:bg-transparent",
};

/**
 * Стили для helper text
 */
export const selectHelperTextStyles = {
  base: "text-sm",
  default: "text-gray-600",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

/**
 * Конфигурация анимаций для селекта
 */
export const selectAnimations = {
  /**
   * Анимация dropdown меню
   */
  dropdown: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2 },
  } as Variants,

  /**
   * Анимация стрелки при открытии
   */
  chevron: {
    closed: { rotate: 0 },
    open: { rotate: 180 },
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
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface SelectStylesConfig {
  containerStyles?: typeof selectContainerStyles;
  labelStyles?: typeof selectLabelStyles;
  buttonStyles?: typeof selectButtonStyles;
  sizeStyles?: Partial<typeof selectSizeStyles>;
  iconStyles?: Partial<typeof selectIconStyles>;
  validationStyles?: Partial<typeof selectValidationStyles>;
  iconColorStyles?: Partial<typeof selectIconColorStyles>;
  dropdownStyles?: typeof selectDropdownStyles;
  optionStyles?: typeof selectOptionStyles;
  helperTextStyles?: typeof selectHelperTextStyles;
  animations?: typeof selectAnimations;
}

/**
 * Пример кастомизации:
 * 
 * import { selectValidationStyles, selectAnimations } from './select-config';
 * 
 * // Переопределить стили валидации
 * const customValidationStyles = {
 *   ...selectValidationStyles,
 *   default: "border-gray-400 focus:border-purple-500 focus:ring-purple-500",
 * };
 * 
 * // Переопределить анимации
 * const customAnimations = {
 *   ...selectAnimations,
 *   dropdown: {
 *     initial: { opacity: 0, scale: 0.95 },
 *     animate: { opacity: 1, scale: 1 },
 *     exit: { opacity: 0, scale: 0.95 },
 *   },
 * };
 */



