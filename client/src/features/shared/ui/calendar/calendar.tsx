/**
 * Calendar Component
 * 
 * Кастомный компонент календаря с поддержкой:
 * - Выбора даты
 * - Ограничений min/max дат
 * - Навигации по месяцам и годам
 * - Анимаций через framer-motion
 */

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CalendarProps, weekDays, monthNames } from "./calendar-types";
import {
  calendarContainerStyles,
  calendarHeaderStyles,
  calendarWeekDaysStyles,
  calendarDaysGridStyles,
  calendarDayStyles,
  calendarAnimations,
} from "./calendar-config";

/**
 * Компонент Calendar
 */
export const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  className = "",
}) => {
  // Текущий просматриваемый месяц
  const [currentDate, setCurrentDate] = useState(() => value || new Date());

  // Получаем год и месяц
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Сегодняшняя дата для подсветки
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Функция для получения дней месяца
  const getDaysInMonth = useMemo(() => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    // Получаем день недели первого дня (0 = Вс, 1 = Пн, ..., 6 = Сб)
    // Преобразуем: Вс (0) -> 6, Пн (1) -> 0, и т.д.
    let firstDayOfWeek = firstDay.getDay() - 1;
    if (firstDayOfWeek === -1) firstDayOfWeek = 6;

    const daysInMonth = lastDay.getDate();
    const daysArray: (Date | null)[] = [];

    // Заполняем пустые дни в начале
    for (let i = 0; i < firstDayOfWeek; i++) {
      const prevMonthDay = new Date(currentYear, currentMonth, -firstDayOfWeek + i + 1);
      daysArray.push(prevMonthDay);
    }

    // Заполняем дни текущего месяца
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(new Date(currentYear, currentMonth, day));
    }

    // Заполняем пустые дни в конце (чтобы было кратно 7)
    const remainingDays = 7 - (daysArray.length % 7);
    if (remainingDays < 7) {
      for (let i = 1; i <= remainingDays; i++) {
        daysArray.push(new Date(currentYear, currentMonth + 1, i));
      }
    }

    return daysArray;
  }, [currentYear, currentMonth]);

  // Навигация по месяцам
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  // Проверка, можно ли перейти к предыдущему месяцу
  const canGoPrevious = useMemo(() => {
    if (!minDate) return true;
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    return firstDayOfMonth > minDate;
  }, [currentYear, currentMonth, minDate]);

  // Проверка, можно ли перейти к следующему месяцу
  const canGoNext = useMemo(() => {
    if (!maxDate) return true;
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    return lastDayOfMonth < maxDate;
  }, [currentYear, currentMonth, maxDate]);

  // Обработчик выбора дня
  const handleDayClick = (date: Date) => {
    // Проверка ограничений
    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    onChange?.(date);
  };

  // Проверка, выбрана ли дата
  const isDateSelected = (date: Date) => {
    if (!value) return false;
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return selectedDate.getTime() === compareDate.getTime();
  };

  // Проверка, сегодня ли
  const isToday = (date: Date) => {
    const compareDate = new Date(date);
    compareDate.setHours(0, 0, 0, 0);
    return compareDate.getTime() === today.getTime();
  };

  // Проверка, отключена ли дата
  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  // Проверка, из другого месяца ли день
  const isOtherMonth = (date: Date) => {
    return date.getMonth() !== currentMonth;
  };

  return (
    <div className={`${calendarContainerStyles.base} ${className}`}>
      {/* Month/Year Navigation */}
      <div className={calendarHeaderStyles.base}>
        <button
          type="button"
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          className={calendarHeaderStyles.button}
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentYear}-${currentMonth}`}
            className={calendarHeaderStyles.title}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={calendarAnimations.monthChange}
          >
            {monthNames[currentMonth]} {currentYear}
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className={calendarHeaderStyles.button}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Week days */}
      <div className={calendarWeekDaysStyles.base}>
        {weekDays.map((day) => (
          <div key={day} className={calendarWeekDaysStyles.day}>
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentYear}-${currentMonth}-grid`}
          className={calendarDaysGridStyles.base}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={calendarAnimations.monthChange}
        >
          {getDaysInMonth.map((date, index) => {
            if (!date) return <div key={`empty-${index}`} />;

            const selected = isDateSelected(date);
            const today = isToday(date);
            const disabled = isDateDisabled(date);
            const otherMonth = isOtherMonth(date);

            const dayClasses = [
              calendarDayStyles.base,
              selected
                ? calendarDayStyles.selected
                : otherMonth
                ? calendarDayStyles.otherMonth
                : calendarDayStyles.default,
              today && !selected && calendarDayStyles.today,
              disabled && calendarDayStyles.disabled,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`}
                type="button"
                className={dayClasses}
                onClick={() => !disabled && handleDayClick(date)}
                disabled={disabled}
              >
                {date.getDate()}
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Calendar;

