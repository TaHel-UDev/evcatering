/**
 * TimePicker Component
 * 
 * Универсальный компонент выбора времени с поддержкой:
 * - Размеров (sm, md, lg)
 * - Иконок слева
 * - Состояний валидации (default, error, success, warning)
 * - Label, helper text, error text
 * - Анимаций через framer-motion
 * - Контролируемого и неконтролируемого режимов
 * - Ограничений min/max времени
 * - Настраиваемых интервалов
 */

import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock } from "lucide-react";
import TimeSelector from "../timeselector";
import { TimePickerProps } from "./timepicker-types";
import {
  timePickerContainerStyles,
  timePickerLabelStyles,
  timePickerWrapperStyles,
  timePickerBaseStyles,
  timePickerSizeStyles,
  timePickerIconStyles,
  timePickerValidationStyles,
  timePickerIconColorStyles,
  timePickerHelperTextStyles,
  timePickerAnimations,
} from "./timepicker-config";

/**
 * Компонент TimePicker
 */
export const TimePicker = forwardRef<HTMLDivElement, TimePickerProps>(
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
      placeholder = "Выберите время",
      timeFormat = "HH:mm",
      showSeconds = false,
      timeIntervals = 30,
      minTime,
      maxTime,
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
    
    // Состояние открытия выбора времени
    const [isOpen, setIsOpen] = useState(false);
    
    // Ref для контейнера (для обработки кликов вне)
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Выбранное время (контролируемый или неконтролируемый)
    const selectedTime = value !== undefined ? value : internalValue;

    // Определяем итоговое состояние валидации
    const finalValidationState = errorText ? "error" : validationState;

    // Определяем текст помощи
    const finalHelperText = errorText || helperText;

    // Форматирование времени для отображения
    const formatTime = (time: Date | null) => {
      if (!time) return "";
      
      const hours = String(time.getHours()).padStart(2, "0");
      const minutes = String(time.getMinutes()).padStart(2, "0");
      const seconds = String(time.getSeconds()).padStart(2, "0");
      
      return showSeconds ? `${hours}:${minutes}:${seconds}` : `${hours}:${minutes}`;
    };

    // Обработчик изменения времени
    const handleChange = (time: Date) => {
      if (disabled) return;
      
      if (value === undefined) {
        setInternalValue(time);
      }
      
      onChange?.(time);
    };

    // Закрытие селектора при клике вне
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
      timePickerContainerStyles.base,
      fullWidth && timePickerContainerStyles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили label
    const labelClasses = [
      timePickerLabelStyles.base,
      required && timePickerLabelStyles.required,
      disabled && timePickerLabelStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили input
    const inputClasses = [
      timePickerBaseStyles.base,
      timePickerSizeStyles[size],
      timePickerBaseStyles.withLeftIcon, // Иконка всегда есть
      timePickerValidationStyles[finalValidationState],
    ]
      .filter(Boolean)
      .join(" ");

    // Стили иконок
    const iconSize = timePickerIconStyles[size].size;
    const leftIconPosition = timePickerIconStyles[size].position;
    const iconColor = timePickerIconColorStyles[finalValidationState];

    // Стили helper text
    const helperTextClasses = [
      timePickerHelperTextStyles.base,
      finalValidationState === "error"
        ? timePickerHelperTextStyles.error
        : finalValidationState === "success"
        ? timePickerHelperTextStyles.success
        : finalValidationState === "warning"
        ? timePickerHelperTextStyles.warning
        : timePickerHelperTextStyles.default,
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

        {/* TimePicker wrapper */}
        <div ref={containerRef} className={timePickerWrapperStyles.base}>
          {/* Левая иконка */}
          <div
            className={`absolute ${leftIconPosition} top-1/2 -translate-y-1/2 flex items-center pointer-events-none ${iconColor} z-10`}
          >
            <span style={{ width: iconSize, height: iconSize }}>
              {leftIcon || <Clock size={iconSize} />}
            </span>
          </div>

          {/* Input field */}
          <input
            id={id}
            name={name}
            type="text"
            readOnly
            value={formatTime(selectedTime)}
            onClick={() => !disabled && setIsOpen(!isOpen)}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />

          {/* Time selector dropdown */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="absolute z-50 mt-1 top-full left-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TimeSelector
                  value={selectedTime}
                  onChange={handleChange}
                  showSeconds={showSeconds}
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
              variants={timePickerAnimations.helperText}
            >
              {finalHelperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

TimePicker.displayName = "TimePicker";

export default TimePicker;

