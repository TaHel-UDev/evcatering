/**
 * Textarea Component
 * 
 * Универсальный компонент текстовой области с поддержкой:
 * - Различных размеров (sm, md, lg)
 * - Состояний валидации (default, error, success, warning)
 * - Label, helper text, error text
 * - Автоматического изменения размера
 * - Счетчика символов
 * - Анимаций через framer-motion
 */

import React, { forwardRef, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TextareaProps } from "./textarea-types";
import {
  textareaContainerStyles,
  textareaLabelStyles,
  textareaBaseStyles,
  textareaSizeStyles,
  textareaMinHeightStyles,
  textareaValidationStyles,
  textareaHelperTextStyles,
  textareaCharCountStyles,
  textareaAnimations,
} from "./textarea-config";

/**
 * Компонент Textarea
 */
export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  (
    {
      size = "md",
      validationState = "default",
      label,
      required = false,
      helperText,
      errorText,
      fullWidth = false,
      disabled = false,
      placeholder,
      className = "",
      textareaClassName = "",
      textareaRef,
      minRows = 3,
      maxRows,
      autoResize = false,
      showCharCount = false,
      maxLength,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = useRef<HTMLTextAreaElement>(null);
    const [charCount, setCharCount] = useState(0);

    // Определяем итоговое состояние валидации
    const finalValidationState = errorText ? "error" : validationState;

    // Определяем текст помощи
    const finalHelperText = errorText || helperText;

    // Автоматическое изменение размера
    useEffect(() => {
      if (autoResize && internalRef.current) {
        const textarea = internalRef.current;
        textarea.style.height = "auto";
        const scrollHeight = textarea.scrollHeight;
        
        // Вычисляем высоту с учетом minRows и maxRows
        const lineHeight = parseInt(getComputedStyle(textarea).lineHeight);
        const minHeight = lineHeight * minRows;
        const maxHeight = maxRows ? lineHeight * maxRows : Infinity;
        
        const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight);
        textarea.style.height = `${newHeight}px`;
      }
    }, [value, autoResize, minRows, maxRows]);

    // Обновляем счетчик символов
    useEffect(() => {
      if (showCharCount && value) {
        setCharCount(value.toString().length);
      }
    }, [value, showCharCount]);

    // Стили контейнера
    const containerClasses = [
      textareaContainerStyles.base,
      fullWidth && textareaContainerStyles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили label
    const labelClasses = [
      textareaLabelStyles.base,
      required && textareaLabelStyles.required,
      disabled && textareaLabelStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили textarea
    const textareaClasses = [
      textareaBaseStyles.base,
      autoResize && textareaBaseStyles.noResize,
      textareaSizeStyles[size],
      !autoResize && textareaMinHeightStyles[size],
      textareaValidationStyles[finalValidationState],
      textareaClassName,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили helper text
    const helperTextClasses = [
      textareaHelperTextStyles.base,
      finalValidationState === "error"
        ? textareaHelperTextStyles.error
        : finalValidationState === "success"
        ? textareaHelperTextStyles.success
        : finalValidationState === "warning"
        ? textareaHelperTextStyles.warning
        : textareaHelperTextStyles.default,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили счетчика символов
    const charCountClasses = [
      textareaCharCountStyles.base,
      maxLength && charCount > maxLength * 0.9 && charCount < maxLength
        ? textareaCharCountStyles.warning
        : maxLength && charCount >= maxLength
        ? textareaCharCountStyles.error
        : "",
    ]
      .filter(Boolean)
      .join(" ");

    // Обработчик изменения
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) {
        onChange(e);
      }
      if (showCharCount) {
        setCharCount(e.target.value.length);
      }
    };

    return (
      <div ref={ref} className={containerClasses}>
        {/* Label */}
        {label && <label className={labelClasses}>{label}</label>}

        {/* Textarea field */}
        <textarea
          ref={(node) => {
            // Поддержка двух ref
            if (internalRef) {
              (internalRef as any).current = node;
            }
            if (textareaRef) {
              if (typeof textareaRef === "function") {
                textareaRef(node);
              } else {
                (textareaRef as any).current = node;
              }
            }
          }}
          className={textareaClasses}
          disabled={disabled}
          placeholder={placeholder}
          rows={!autoResize ? minRows : undefined}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          aria-invalid={finalValidationState === "error"}
          aria-describedby={finalHelperText ? "helper-text" : undefined}
          {...props}
        />

        {/* Helper text / Error text и счетчик символов */}
        <div className="flex items-start justify-between gap-2">
          {/* Helper text */}
          <AnimatePresence mode="wait">
            {finalHelperText && (
              <motion.div
                id="helper-text"
                className={helperTextClasses}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textareaAnimations.helperText}
              >
                {finalHelperText}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Счетчик символов */}
          {showCharCount && (
            <div className={charCountClasses}>
              {charCount}
              {maxLength && ` / ${maxLength}`}
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;

