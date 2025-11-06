/**
 * Select Component
 * 
 * Универсальный компонент выпадающего списка с поддержкой:
 * - Размеров (sm, md, lg)
 * - Иконок (для каждой опции и слева от кнопки)
 * - Состояний валидации (default, error, success, warning)
 * - Label, helper text, error text
 * - Анимаций через framer-motion
 * - Контролируемого и неконтролируемого режимов
 */

import React, { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";
import { SelectProps } from "./select-types";
import {
  selectContainerStyles,
  selectLabelStyles,
  selectButtonStyles,
  selectSizeStyles,
  selectIconStyles,
  selectValidationStyles,
  selectIconColorStyles,
  selectDropdownStyles,
  selectOptionStyles,
  selectHelperTextStyles,
  selectAnimations,
} from "./select-config";

/**
 * Компонент Select
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      size = "md",
      validationState = "default",
      label,
      required = false,
      helperText,
      errorText,
      options = [],
      value,
      defaultValue,
      placeholder = "Выберите опцию",
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
    // Состояние открытия dropdown
    const [isOpen, setIsOpen] = useState(false);
    
    // Локальное состояние для неконтролируемого компонента
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    
    // Выбранное значение (контролируемый или неконтролируемый)
    const selectedValue = value !== undefined ? value : internalValue;

    // Ref для контейнера (для обработки кликов вне)
    const containerRef = useRef<HTMLDivElement>(null);

    // Определяем итоговое состояние валидации
    const finalValidationState = errorText ? "error" : validationState;

    // Определяем текст помощи
    const finalHelperText = errorText || helperText;

    // Находим выбранную опцию
    const selectedOption = options.find((opt) => opt.value === selectedValue);

    // Обработчик выбора опции
    const handleSelect = (optionValue: string) => {
      if (disabled) return;
      
      if (value === undefined) {
        setInternalValue(optionValue);
      }
      
      onChange?.(optionValue);
      setIsOpen(false);
    };

    // Закрытие dropdown при клике вне
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
      selectContainerStyles.base,
      fullWidth && selectContainerStyles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили label
    const labelClasses = [
      selectLabelStyles.base,
      required && selectLabelStyles.required,
      disabled && selectLabelStyles.disabled,
    ]
      .filter(Boolean)
      .join(" ");

    // Стили select button
    const buttonClasses = [
      selectButtonStyles.base,
      selectSizeStyles[size],
      leftIcon && selectButtonStyles.withLeftIcon,
      selectValidationStyles[finalValidationState],
    ]
      .filter(Boolean)
      .join(" ");

    // Стили иконок
    const iconSize = selectIconStyles[size].size;
    const leftIconPosition = selectIconStyles[size].position;
    const iconColor = selectIconColorStyles[finalValidationState];

    // Стили helper text
    const helperTextClasses = [
      selectHelperTextStyles.base,
      finalValidationState === "error"
        ? selectHelperTextStyles.error
        : finalValidationState === "success"
        ? selectHelperTextStyles.success
        : finalValidationState === "warning"
        ? selectHelperTextStyles.warning
        : selectHelperTextStyles.default,
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

        {/* Select container */}
        <div ref={containerRef} className="relative">
          {/* Левая иконка */}
          {leftIcon && (
            <div
              className={`absolute ${leftIconPosition} top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none ${iconColor} z-10`}
            >
              <span className="inline-flex items-center justify-center" style={{ width: iconSize, height: iconSize }}>
                {leftIcon}
              </span>
            </div>
          )}

          {/* Select button */}
          <button
            id={id}
            type="button"
            className={buttonClasses}
            disabled={disabled}
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <span className="flex items-center gap-2 flex-1 text-left">
              {selectedOption?.icon && (
                <span className="inline-flex items-center justify-center shrink-0" style={{ width: iconSize, height: iconSize }}>
                  {selectedOption.icon}
                </span>
              )}
              <span className={selectedOption ? "" : "text-gray-400"}>
                {selectedOption?.label || placeholder}
              </span>
            </span>
            
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={selectAnimations.chevron}
              className={iconColor}
            >
              <ChevronDown size={iconSize} />
            </motion.div>
          </button>

          {/* Hidden input for form compatibility */}
          {name && (
            <input
              type="hidden"
              name={name}
              value={selectedValue}
            />
          )}

          {/* Dropdown menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.ul
                className={selectDropdownStyles.base}
                role="listbox"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={selectAnimations.dropdown}
              >
                {options.map((option) => {
                  const isSelected = option.value === selectedValue;
                  const optionClasses = [
                    selectOptionStyles.base,
                    !option.disabled && selectOptionStyles.hover,
                    isSelected && selectOptionStyles.selected,
                    option.disabled && selectOptionStyles.disabled,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <li
                      key={option.value}
                      className={optionClasses}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => !option.disabled && handleSelect(option.value)}
                    >
                      {option.icon && (
                        <span className="inline-flex items-center justify-center shrink-0" style={{ width: iconSize, height: iconSize }}>
                          {option.icon}
                        </span>
                      )}
                      <span>{option.label}</span>
                    </li>
                  );
                })}
              </motion.ul>
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
              variants={selectAnimations.helperText}
            >
              {finalHelperText}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;

