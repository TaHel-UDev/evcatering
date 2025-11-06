/**
 * Button Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Button
 */

import { TargetAndTransition } from "motion/react";
import { ButtonVariant, ButtonSize } from "./button-types";

/**
 * Базовые стили кнопки
 */
export const buttonBaseStyles = {
  base: "inline-flex cursor-pointer items-center justify-center gap-2 font-light rounded-[0.75rem] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  fullWidth: "w-full",
};

/**
 * Стили для разных вариантов кнопок
 */
export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-green text-white hover:bg-green/70 active:bg-green/80 focus:ring-green/50",
  secondary:
    "bg-brown text-white hover:bg-brown/70 active:bg-brown/80 focus:ring-brown/50",
  white:
    "bg-white text-dark hover:bg-white/80 active:bg-white/90 focus:ring-white/50",
  outline:
    "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 focus:ring-gray-500",
  ghost:
    "text-gray-700 hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-500",
  danger:
    "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500",
};

/**
 * Стили для разных размеров кнопок
 */
export const buttonSizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-9 py-4 2xl:text-[1rem] leading-[1] lg:text-[0.9375rem] md:text-[0.875rem] sm:text-[1rem] max-sm:text-[0.875rem]",
  lg: "px-9 py-5 2xl:text-[1rem] leading-[1] lg:text-[0.9375rem] md:text-[0.875rem] sm:text-[1rem] max-sm:text-[0.875rem]",
};

/**
 * Стили для иконок в зависимости от размера
 */
export const buttonIconSizeStyles: Record<ButtonSize, { size: number }> = {
  sm: { size: 16 },
  md: { size: 20 },
  lg: { size: 24 },
};

/**
 * Стили для спиннера загрузки
 */
export const buttonLoadingStyles = {
  spinner: "animate-spin",
  container: "opacity-70 pointer-events-none",
};

/**
 * Конфигурация анимаций для кнопки
 */
export const buttonAnimations = {
  /**
   * Анимация при наведении
   */
  hover: {
    scale: 1,
    transition: { duration: 0.2 },
  } as TargetAndTransition,

  /**
   * Анимация при клике
   */
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  } as TargetAndTransition,

  /**
   * Анимация спиннера загрузки
   */
  loading: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    },
  } as TargetAndTransition,
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface ButtonStylesConfig {
  baseStyles?: typeof buttonBaseStyles;
  variantStyles?: Partial<typeof buttonVariantStyles>;
  sizeStyles?: Partial<typeof buttonSizeStyles>;
  iconSizeStyles?: Partial<typeof buttonIconSizeStyles>;
  loadingStyles?: typeof buttonLoadingStyles;
  animations?: typeof buttonAnimations;
}

/**
 * Пример кастомизации:
 * 
 * import { buttonVariantStyles, buttonAnimations } from './button-config';
 * 
 * // Переопределить стили варианта
 * const customVariantStyles = {
 *   ...buttonVariantStyles,
 *   primary: "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
 * };
 * 
 * // Переопределить анимации
 * const customAnimations = {
 *   ...buttonAnimations,
 *   hover: {
 *     scale: 1.05,
 *     transition: { duration: 0.3 },
 *   },
 * };
 */



