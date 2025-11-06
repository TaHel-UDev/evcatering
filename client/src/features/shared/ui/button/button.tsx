/**
 * Button Component
 * 
 * Универсальный компонент кнопки с поддержкой:
 * - Различных вариантов (primary, secondary, outline, ghost, danger)
 * - Размеров (sm, md, lg)
 * - Иконок (слева и справа)
 * - Состояния загрузки со спиннером
 * - Анимаций через framer-motion
 */

import React, { forwardRef } from "react";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";
import { ButtonProps } from "./button-types";
import {
  buttonBaseStyles,
  buttonVariantStyles,
  buttonSizeStyles,
  buttonIconSizeStyles,
  buttonLoadingStyles,
  buttonAnimations,
} from "./button-config";

/**
 * Компонент Button
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      type = "button",
      fullWidth = false,
      disabled = false,
      loading = false,
      leftIcon,
      rightIcon,
      children,
      className = "",
      onClick,
      ...props
    },
    ref
  ) => {
    // Собираем классы
    const classes = [
      buttonBaseStyles.base,
      buttonVariantStyles[variant],
      buttonSizeStyles[size],
      fullWidth && buttonBaseStyles.fullWidth,
      loading && buttonLoadingStyles.container,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Обработчик клика с проверкой loading
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) return;
      onClick?.(event);
    };

    // Размер иконок в зависимости от size
    const iconSize = buttonIconSizeStyles[size].size;

    return (
      <motion.button
        ref={ref}
        type={type}
        className={classes}
        disabled={disabled || loading}
        onClick={handleClick}
        whileHover={!disabled && !loading ? buttonAnimations.hover : undefined}
        whileTap={!disabled && !loading ? buttonAnimations.tap : undefined}
        {...props}
      >
        {/* Иконка загрузки */}
        {loading && (
          <motion.div
            animate={buttonAnimations.loading}
            className={buttonLoadingStyles.spinner}
          >
            <Loader2 size={iconSize} />
          </motion.div>
        )}

        {/* Левая иконка */}
        {!loading && leftIcon && (
          <span className="inline-flex items-center" style={{ width: iconSize, height: iconSize }}>
            {leftIcon}
          </span>
        )}

        {/* Текст кнопки */}
        <span>{children}</span>

        {/* Правая иконка */}
        {!loading && rightIcon && (
          <span className="inline-flex items-center" style={{ width: iconSize, height: iconSize }}>
            {rightIcon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;



