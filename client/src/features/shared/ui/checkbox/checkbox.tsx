/**
 * Checkbox Component
 * 
 * Универсальный компонент чекбокса с поддержкой:
 * - Размеров (sm, md, lg)
 * - Label и description
 * - Состояний валидации и ошибок
 * - Анимаций через framer-motion
 * - Контролируемого и неконтролируемого режимов
 */

import React, { forwardRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { CheckboxProps } from "./checkbox-types";
import {
  checkboxContainerStyles,
  checkboxWrapperStyles,
  checkboxBaseStyles,
  checkboxSizeStyles,
  checkboxLabelStyles,
  checkboxDescriptionStyles,
  checkboxErrorTextStyles,
  checkboxAnimations,
} from "./checkbox-config";

/**
 * Компонент Checkbox
 */
export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      size = "md",
      label,
      description,
      checked,
      defaultChecked = false,
      disabled = false,
      error = false,
      errorText,
      onChange,
      className = "",
      checkboxClassName = "",
      inputRef,
      ...props
    },
    ref
  ) => {
    // Обработчик изменения
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return;
      onChange?.(event.target.checked, event);
    };

    // Стили контейнера
    const containerClasses = [
      checkboxContainerStyles.base,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили wrapper
    const wrapperClasses = [
      checkboxWrapperStyles.base,
      disabled && checkboxWrapperStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили checkbox
    const isChecked = checked ?? defaultChecked;
    const hasError = error || !!errorText;

    const checkboxClasses = [
      checkboxBaseStyles.base,
      checkboxSizeStyles[size].box,
      isChecked
        ? hasError
          ? checkboxBaseStyles.checkedError
          : checkboxBaseStyles.checked
        : hasError
        ? checkboxBaseStyles.error
        : checkboxBaseStyles.default,
      checkboxClassName,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили label
    const labelClasses = [
      checkboxLabelStyles.base,
      checkboxLabelStyles[size],
      disabled && checkboxLabelStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили description
    const descriptionClasses = [
      checkboxDescriptionStyles.base,
      disabled && checkboxDescriptionStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Размер иконки
    const iconSize = checkboxSizeStyles[size].icon;

    return (
      <div ref={ref} className={containerClasses}>
        <label className={wrapperClasses}>
          {/* Hidden input */}
          <input
            ref={inputRef}
            type="checkbox"
            className="sr-only"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            onChange={handleChange}
            aria-invalid={hasError}
            aria-describedby={errorText ? "error-text" : undefined}
            {...props}
          />

          {/* Custom checkbox */}
          <motion.div
            className={checkboxClasses}
            whileHover={!disabled ? checkboxAnimations.hover : undefined}
            whileTap={!disabled ? checkboxAnimations.tap : undefined}
          >
            <AnimatePresence mode="wait">
              {isChecked && (
                <motion.div
                  key="checkmark"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={checkboxAnimations.checkmark}
                >
                  <Check size={iconSize} className="text-white" strokeWidth={3} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Label and description */}
          {(label || description) && (
            <div className="flex flex-col">
              {label && <span className={labelClasses}>{label}</span>}
              {description && <span className={descriptionClasses}>{description}</span>}
            </div>
          )}
        </label>

        {/* Error text */}
        <AnimatePresence mode="wait">
          {errorText && (
            <motion.div
              id="error-text"
              className={checkboxErrorTextStyles.base}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={checkboxAnimations.errorText}
            >
              {errorText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;



