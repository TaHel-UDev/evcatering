/**
 * Calendar Component Configuration
 * 
 * Централизованная конфигурация стилей и анимаций для компонента Calendar
 */

import { Variants } from "motion/react";

/**
 * Базовые стили для календаря
 */
export const calendarContainerStyles = {
  base: "bg-white rounded-lg border border-gray-200 shadow-lg p-4 min-w-[280px]",
};

/**
 * Стили для header
 */
export const calendarHeaderStyles = {
  base: "flex items-center justify-between mb-4",
  title: "text-base font-semibold text-gray-900",
  button:
    "p-1.5 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-gray-700",
};

/**
 * Стили для grid дней недели
 */
export const calendarWeekDaysStyles = {
  base: "grid grid-cols-7 gap-1 mb-1",
  day: "text-center text-xs font-semibold text-gray-600 py-2 uppercase tracking-wide",
};

/**
 * Стили для grid дней месяца
 */
export const calendarDaysGridStyles = {
  base: "grid grid-cols-7 gap-1",
};

/**
 * Стили для дня
 */
export const calendarDayStyles = {
  base: "aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all cursor-pointer",
  default: "text-gray-700 hover:bg-gray-100",
  selected: "bg-blue-600 text-white hover:bg-blue-700 font-semibold",
  today: "border-2 border-blue-500 text-blue-600",
  disabled: "text-gray-300 cursor-not-allowed hover:bg-transparent",
  otherMonth: "text-gray-400 hover:bg-gray-50",
};

/**
 * Конфигурация анимаций для календаря
 */
export const calendarAnimations = {
  /**
   * Анимация смены месяца
   */
  monthChange: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.15 },
  } as Variants,
};

/**
 * Экспорт типа конфигурации для кастомизации
 */
export interface CalendarStylesConfig {
  containerStyles?: typeof calendarContainerStyles;
  headerStyles?: typeof calendarHeaderStyles;
  weekDaysStyles?: typeof calendarWeekDaysStyles;
  daysGridStyles?: typeof calendarDaysGridStyles;
  dayStyles?: typeof calendarDayStyles;
  animations?: typeof calendarAnimations;
}

/**
 * Пример кастомизации:
 * 
 * import { calendarDayStyles } from './calendar-config';
 * 
 * const customDayStyles = {
 *   ...calendarDayStyles,
 *   selected: "bg-purple-600 text-white hover:bg-purple-700",
 * };
 */

