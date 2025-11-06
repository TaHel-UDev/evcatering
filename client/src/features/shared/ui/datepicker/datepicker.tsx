/**
 * DatePicker Component
 * 
 * Универсальный компонент выбора даты с поддержкой:
 * - Размеров (sm, md, lg)
 * - Иконок слева
 * - Состояний валидации (default, error, success, warning)
 * - Label, helper text, error text
 * - Анимаций через framer-motion
 * - Контролируемого и неконтролируемого режимов
 * - Ограничений min/max дат
 */

import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar as CalendarIcon } from "lucide-react";
import Calendar from "../calendar";
import { DatePickerProps } from "./datepicker-types";
import {
  datePickerContainerStyles,
  datePickerLabelStyles,
  datePickerWrapperStyles,
  datePickerBaseStyles,
  datePickerSizeStyles,
  datePickerIconStyles,
  datePickerValidationStyles,
  datePickerIconColorStyles,
  datePickerHelperTextStyles,
  datePickerAnimations,
} from "./datepicker-config";

/**
 * Компонент DatePicker
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      size = "md",
      validationState = "default",
      label,
      required = false,
      helperText,
      errorText,
      value,
      defaultValue,
      placeholder = "Выберите дату",
      dateFormat = "dd.MM.yyyy",
      minDate,
      maxDate,
      leftIcon,
      fullWidth = false,
      disabled = false,
      onChange,
      className = "",
      id,
      name,
    },
    ref
  ) => {
    // Локальное состояние для неконтролируемого компонента
    const [internalValue, setInternalValue] = useState<Date | null>(defaultValue || null);
    
    // Состояние открытия календаря
    const [isOpen, setIsOpen] = useState(false);
    
    // Ref для контейнера (для обработки кликов вне)
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Выбранная дата (контролируемый или неконтролируемый)
    const selectedDate = value !== undefined ? value : internalValue;

    // Определяем итоговое состояние валидации
    const finalValidationState = errorText ? "error" : validationState;

    // Определяем текст помощи
    const finalHelperText = errorText || helperText;

    // Форматирование даты для отображения
    const formatDate = (date: Date | null) => {
      if (!date) return "";
      
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      
      return `${day}.${month}.${year}`;
    };

    // Обработчик изменения даты
    const handleChange = (date: Date) => {
      if (disabled) return;
      
      if (value === undefined) {
        setInternalValue(date);
      }
      
      onChange?.(date);
      setIsOpen(false);
    };

    // Закрытие календаря при клике вне
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen]);

    // Стили контейнера
    const containerClasses = [
      datePickerContainerStyles.base,
      fullWidth && datePickerContainerStyles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили label
    const labelClasses = [
      datePickerLabelStyles.base,
      required && datePickerLabelStyles.required,
      disabled && datePickerLabelStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили input
    const inputClasses = [
      datePickerBaseStyles.base,
      datePickerSizeStyles[size],
      datePickerBaseStyles.withLeftIcon, // Иконка всегда есть
      datePickerValidationStyles[finalValidationState],
    ]
      .filter(Boolean)
      .join(" ");

    // Стили иконок
    const iconSize = datePickerIconStyles[size].size;
    const leftIconPosition = datePickerIconStyles[size].position;
    const iconColor = datePickerIconColorStyles[finalValidationState];

    // Стили helper text
    const helperTextClasses = [
      datePickerHelperTextStyles.base,
      finalValidationState === "error"
        ? datePickerHelperTextStyles.error
        : finalValidationState === "success"
        ? datePickerHelperTextStyles.success
        : finalValidationState === "warning"
        ? datePickerHelperTextStyles.warning
        : datePickerHelperTextStyles.default,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={containerClasses}>
        {/* Label */}
        {label && (
          <label htmlFor={id} className={labelClasses}>
            {label}
          </label>
        )}

        {/* DatePicker wrapper */}
        <div ref={containerRef} className={datePickerWrapperStyles.base}>
          {/* Левая иконка */}
          <div
            className={`absolute ${leftIconPosition} top-1/2 -translate-y-1/2 flex items-center pointer-events-none ${iconColor} z-10`}
          >
            <span style={{ width: iconSize, height: iconSize }}>
              {leftIcon || <CalendarIcon size={iconSize} />}
            </span>
          </div>

          {/* Input field */}
          <input
            id={id}
            name={name}
            type="text"
            readOnly
            value={formatDate(selectedDate)}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />

          {/* Calendar dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute z-50 mt-1 top-full left-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar
                  value={selectedDate}
                  onChange={handleChange}
                  minDate={minDate}
                  maxDate={maxDate}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Helper text / Error text */}
        <AnimatePresence mode="wait">
          {finalHelperText && (
            <motion.div
              className={helperTextClasses}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={datePickerAnimations.helperText}
            >
              {finalHelperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export default DatePicker;

