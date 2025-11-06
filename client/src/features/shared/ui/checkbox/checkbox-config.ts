/**
 * Checkbox Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Checkbox
 */

import { Variants } from "motion/react";
import { CheckboxSize } from "./checkbox-types";

/**
 * Базовые стили для контейнера
 */
export const checkboxContainerStyles = {
  base: "flex flex-col gap-1",
};

/**
 * Стили для wrapper (содержит checkbox и label)
 */
export const checkboxWrapperStyles = {
  base: "flex items-center gap-2 cursor-pointer",
  disabled: "cursor-not-allowed opacity-60",
};

/**
 * Базовые стили для checkbox
 */
export const checkboxBaseStyles = {
  base: "relative flex items-center justify-center shrink-0 rounded border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  default: "border-gray-300 bg-white hover:border-gray-400 focus:ring-blue-500",
  checked: "border-green bg-green hover:bg-green/70 hover:border-green/70",
  error: "border-red-500 focus:ring-red-500",
  checkedError: "border-red-600 bg-red-600",
};

/**
 * Стили для разных размеров
 */
export const checkboxSizeStyles: Record<CheckboxSize, { box: string; icon: number }> = {
  sm: { box: "w-4 h-4", icon: 12 },
  md: { box: "w-5 h-5", icon: 16 },
  lg: { box: "w-6 h-6", icon: 20 },
};

/**
 * Стили для label
 */
export const checkboxLabelStyles = {
  base: "text-gray-700 select-none",
  disabled: "text-gray-400",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

/**
 * Стили для description
 */
export const checkboxDescriptionStyles = {
  base: "text-sm text-gray-600 mt-0.5",
  disabled: "text-gray-400",
};

/**
 * Стили для error text
 */
export const checkboxErrorTextStyles = {
  base: "text-sm text-red-600 mt-1",
};

/**
 * Конфигурация анимаций для чекбокса
 */
export const checkboxAnimations = {
  /**
   * Анимация появления галочки
   */
  checkmark: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: { duration: 0.15, ease: "easeOut" },
  } as Variants,

  /**
   * Анимация при клике
   */
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },

  /**
   * Анимация при наведении
   */
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },

  /**
   * Анимация появления error text
   */
  errorText: {
    initial: { opacity: 0, y: -5 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -5 },
    transition: { duration: 0.2 },
  } as Variants,
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface CheckboxStylesConfig {
  containerStyles?: typeof checkboxContainerStyles;
  wrapperStyles?: typeof checkboxWrapperStyles;
  baseStyles?: typeof checkboxBaseStyles;
  sizeStyles?: Partial<typeof checkboxSizeStyles>;
  labelStyles?: typeof checkboxLabelStyles;
  descriptionStyles?: typeof checkboxDescriptionStyles;
  errorTextStyles?: typeof checkboxErrorTextStyles;
  animations?: typeof checkboxAnimations;
}

/**
 * Пример кастомизации:
 * 
 * import { checkboxBaseStyles, checkboxAnimations } from './checkbox-config';
 * 
 * // Переопределить стили
 * const customBaseStyles = {
 *   ...checkboxBaseStyles,
 *   checked: "border-purple-600 bg-purple-600 hover:bg-purple-700",
 * };
 * 
 * // Переопределить анимации
 * const customAnimations = {
 *   ...checkboxAnimations,
 *   checkmark: {
 *     initial: { scale: 0, rotate: -180 },
 *     animate: { scale: 1, rotate: 0 },
 *     exit: { scale: 0, rotate: 180 },
 *   },
 * };
 */



