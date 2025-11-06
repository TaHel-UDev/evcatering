/**
 * Button Component Types
 * 
 * Типы и интерфейсы для компонента Button
 */

import { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Варианты отображения кнопки
 */
export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "white";

/**
 * Размеры кнопки
 */
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Тип кнопки
 */
export type ButtonType = "button" | "submit" | "reset";

/**
 * Позиция иконки относительно текста
 */
export type IconPosition = "left" | "right";

/**
 * Свойства компонента Button
 */
export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>, 
  | "type" 
  | "onDrag" 
  | "onDragStart" 
  | "onDragEnd" 
  | "onDragCapture" 
  | "onDragEnter" 
  | "onDragExit" 
  | "onDragLeave" 
  | "onDragOver"
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onAnimationStartCapture"
  | "onAnimationEndCapture"
  | "onAnimationIterationCapture"
> {
  /**
   * Вариант отображения кнопки
   * @default "primary"
   */
  variant?: ButtonVariant;

  /**
   * Размер кнопки
   * @default "md"
   */
  size?: ButtonSize;

  /**
   * Тип кнопки (button, submit, reset)
   * @default "button"
   */
  type?: ButtonType;

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
   * Состояние загрузки (показывает спиннер)
   * @default false
   */
  loading?: boolean;

  /**
   * Иконка слева от текста
   */
  leftIcon?: ReactNode;

  /**
   * Иконка справа от текста
   */
  rightIcon?: ReactNode;

  /**
   * Контент кнопки
   */
  children: ReactNode;

  /**
   * Дополнительные CSS классы
   */
  className?: string;

  /**
   * Обработчик клика
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}



