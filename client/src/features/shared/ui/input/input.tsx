/**
 * Input Component
 * 
 * Универсальный компонент поля ввода с поддержкой:
 * - Различных типов (text, email, password, number, tel, url, search)
 * - Размеров (sm, md, lg)
 * - Иконок (слева и справа)
 * - Состояний валидации (default, error, success, warning)
 * - Label, helper text, error text
 * - Анимаций через framer-motion
 */

import React, { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { IMaskInput } from "react-imask";
import { InputProps } from "./input-types";
import {
  inputContainerStyles,
  inputLabelStyles,
  inputWrapperStyles,
  inputBaseStyles,
  inputSizeStyles,
  inputIconStyles,
  inputRightIconStyles,
  inputValidationStyles,
  inputIconColorStyles,
  inputHelperTextStyles,
  inputAnimations,
} from "./input-config";

/**
 * Компонент Input
 */
export const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      size = "md",
      type = "text",
      validationState = "default",
      label,
      required = false,
      helperText,
      errorText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled = false,
      placeholder,
      className = "",
      inputClassName = "",
      inputRef,
      mask,
      ...props
    },
    ref
  ) => {
    // Состояние для показа/скрытия пароля
    const [showPassword, setShowPassword] = useState(false);

    // Определяем итоговый тип поля
    const inputType = type === "password" && showPassword ? "text" : type;

    // Определяем итоговое состояние валидации
    const finalValidationState = errorText ? "error" : validationState;

    // Определяем текст помощи
    const finalHelperText = errorText || helperText;

    // Стили контейнера
    const containerClasses = [
      inputContainerStyles.base,
      fullWidth && inputContainerStyles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили label
    const labelClasses = [
      inputLabelStyles.base,
      required && inputLabelStyles.required,
      disabled && inputLabelStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили input
    const inputClasses = [
      inputBaseStyles.base,
      inputSizeStyles[size],
      leftIcon && inputBaseStyles.withLeftIcon,
      (rightIcon || type === "password") && inputBaseStyles.withRightIcon,
      inputValidationStyles[finalValidationState],
      inputClassName,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили иконок
    const iconSize = inputIconStyles[size].size;
    const leftIconPosition = inputIconStyles[size].position;
    const rightIconPosition = inputRightIconStyles[size].position;
    const iconColor = inputIconColorStyles[finalValidationState];

    // Стили helper text
    const helperTextClasses = [
      inputHelperTextStyles.base,
      finalValidationState === "error"
        ? inputHelperTextStyles.error
        : finalValidationState === "success"
        ? inputHelperTextStyles.success
        : finalValidationState === "warning"
        ? inputHelperTextStyles.warning
        : inputHelperTextStyles.default,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={containerClasses}>
        {/* Label */}
        {label && (
          <label className={labelClasses}>
            {label}
          </label>
        )}

        {/* Input wrapper */}
        <div className={inputWrapperStyles.base}>
          {/* Левая иконка */}
          {leftIcon && (
            <div
              className={`absolute ${leftIconPosition} flex items-center pointer-events-none ${iconColor}`}
            >
              <span style={{ width: iconSize, height: iconSize }}>
                {leftIcon}
              </span>
            </div>
          )}

          {/* Input field */}
          {mask ? (
            <IMaskInput
              mask={mask}
              lazy={true}
              inputRef={inputRef as any}
              type={inputType}
              className={inputClasses}
              disabled={disabled}
              placeholder={placeholder}
              aria-invalid={finalValidationState === "error"}
              aria-describedby={finalHelperText ? "helper-text" : undefined}
              {...props}
            />
          ) : (
            <input
              ref={inputRef}
              type={inputType}
              className={inputClasses}
              disabled={disabled}
              placeholder={placeholder}
              aria-invalid={finalValidationState === "error"}
              aria-describedby={finalHelperText ? "helper-text" : undefined}
              {...props}
            />
          )}

          {/* Правая иконка или кнопка показа пароля */}
          {(rightIcon || type === "password") && (
            <div className={`absolute ${rightIconPosition} flex items-center ${iconColor}`}>
              {type === "password" ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
                  disabled={disabled}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff size={iconSize} />
                  ) : (
                    <Eye size={iconSize} />
                  )}
                </button>
              ) : (
                <span className="pointer-events-none" style={{ width: iconSize, height: iconSize }}>
                  {rightIcon}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Helper text / Error text */}
        <AnimatePresence mode="wait">
          {finalHelperText && (
            <motion.div
              id="helper-text"
              className={helperTextClasses}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={inputAnimations.helperText}
            >
              {finalHelperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;

