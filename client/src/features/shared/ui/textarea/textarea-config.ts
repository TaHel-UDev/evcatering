/**
 * Textarea Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Textarea
 */

import { Variants } from "motion/react";
import { TextareaSize, TextareaValidationState } from "./textarea-types";

/**
 * Базовые стили для контейнера
 */
export const textareaContainerStyles = {
  base: "flex flex-col gap-1.5",
  fullWidth: "w-full",
};

/**
 * Стили для label
 */
export const textareaLabelStyles = {
  base: "text-sm font-medium text-gray-700",
  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
  disabled: "text-gray-400 cursor-not-allowed",
};

/**
 * Базовые стили для textarea
 */
export const textareaBaseStyles = {
  base: "w-full rounded-lg bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400 resize-vertical",
  noResize: "resize-none",
};

/**
 * Стили для разных размеров
 */
export const textareaSizeStyles: Record<TextareaSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
};

/**
 * Минимальная высота в зависимости от размера
 */
export const textareaMinHeightStyles: Record<TextareaSize, string> = {
  sm: "min-h-[80px]",
  md: "min-h-[100px]",
  lg: "min-h-[120px]",
};

/**
 * Стили для разных состояний валидации
 */
export const textareaValidationStyles: Record<TextareaValidationState, string> = {
  default: "border-gray-300 focus:border-green focus:ring-green",
  error: "border-red-500 focus:border-red-500 focus:ring-red-500",
  success: "border-green-500 focus:border-green-500 focus:ring-green-500",
  warning: "border-yellow-500 focus:border-yellow-500 focus:ring-yellow-500",
};

/**
 * Стили для helper text
 */
export const textareaHelperTextStyles = {
  base: "text-sm",
  default: "text-gray-600",
  error: "text-red-600",
  success: "text-green-600",
  warning: "text-yellow-600",
};

/**
 * Стили для счетчика символов
 */
export const textareaCharCountStyles = {
  base: "text-xs text-gray-500 text-right",
  warning: "text-yellow-600",
  error: "text-red-600",
};

/**
 * Конфигурация анимаций для текстовой области
 */
export const textareaAnimations = {
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
export interface TextareaStylesConfig {
  containerStyles?: typeof textareaContainerStyles;
  labelStyles?: typeof textareaLabelStyles;
  baseStyles?: typeof textareaBaseStyles;
  sizeStyles?: Partial<typeof textareaSizeStyles>;
  minHeightStyles?: Partial<typeof textareaMinHeightStyles>;
  validationStyles?: Partial<typeof textareaValidationStyles>;
  helperTextStyles?: typeof textareaHelperTextStyles;
  charCountStyles?: typeof textareaCharCountStyles;
  animations?: typeof textareaAnimations;
}

