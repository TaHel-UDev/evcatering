/**
 * Modal Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Modal
 */

import { Variants } from "motion/react";
import { ModalSize, ModalPosition } from "./modal-types";

/**
 * Стили для backdrop (затемнение фона)
 */
export const modalBackdropStyles = {
  base: "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm",
};

/**
 * Стили для контейнера модального окна
 */
export const modalContainerStyles = {
  base: "fixed inset-0 z-50 flex items-center justify-center p-4",
  top: "fixed inset-0 z-50 flex items-start justify-center p-4 pt-20",
  bottom: "fixed inset-0 z-50 flex items-end justify-center p-4 pb-20",
};

/**
 * Базовые стили для модального окна
 */
export const modalContentStyles = {
  base: "relative bg-soft-gray rounded-xl shadow-2xl w-full max-h-[90vh] overflow-hidden flex flex-col",
};

/**
 * Стили для разных размеров
 */
export const modalSizeStyles: Record<ModalSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
  full: "max-w-full w-full h-full max-h-full rounded-none",
};

/**
 * Стили для кнопки закрытия
 */
export const modalCloseButtonStyles = {
  base: "absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
};

/**
 * Стили для заголовка
 */
export const modalHeaderStyles = {
  base: "px-6 py-4 border-b border-gray-200",
  title: "text-xl font-semibold text-gray-900",
  description: "text-sm text-gray-600 mt-1",
};

/**
 * Стили для тела модального окна
 */
export const modalBodyStyles = {
  base: "px-6 py-4 overflow-y-auto flex-1",
};

/**
 * Стили для футера
 */
export const modalFooterStyles = {
  base: "px-6 py-4 border-t border-gray-200",
  alignLeft: "flex justify-start gap-2",
  alignCenter: "flex justify-center gap-2",
  alignRight: "flex justify-end gap-2",
  alignBetween: "flex justify-between gap-2",
};

/**
 * Конфигурация анимаций для модального окна
 */
export const modalAnimations = {
  /**
   * Анимация backdrop
   */
  backdrop: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  } as Variants,

  /**
   * Анимация модального окна (центр)
   */
  content: {
    initial: { opacity: 0, scale: 0.95, y: 10 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
    transition: { duration: 0.2, ease: "easeOut" },
  } as Variants,

  /**
   * Анимация модального окна (сверху)
   */
  contentTop: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.3, ease: "easeOut" },
  } as Variants,

  /**
   * Анимация модального окна (снизу)
   */
  contentBottom: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.3, ease: "easeOut" },
  } as Variants,
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface ModalStylesConfig {
  backdropStyles?: typeof modalBackdropStyles;
  containerStyles?: typeof modalContainerStyles;
  contentStyles?: typeof modalContentStyles;
  sizeStyles?: Partial<typeof modalSizeStyles>;
  closeButtonStyles?: typeof modalCloseButtonStyles;
  headerStyles?: typeof modalHeaderStyles;
  bodyStyles?: typeof modalBodyStyles;
  footerStyles?: typeof modalFooterStyles;
  animations?: typeof modalAnimations;
}

