/**
 * Calendar Component Types
 * 
 * Типы и интерфейсы для компонента Calendar
 */

/**
 * Свойства компонента Calendar
 */
export interface CalendarProps {
  /**
   * Выбранная дата
   */
  value?: Date | null;

  /**
   * Обработчик изменения даты
   */
  onChange?: (date: Date) => void;

  /**
   * Минимальная дата
   */
  minDate?: Date;

  /**
   * Максимальная дата
   */
  maxDate?: Date;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Дни недели
 */
export const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

/**
 * Названия месяцев
 */
export const monthNames = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];



