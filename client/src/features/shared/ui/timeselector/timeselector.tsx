/**
 * TimeSelector Component
 * 
 * Компонент выбора времени с прямым вводом
 */

import React, { useState, useRef } from "react";
import { TimeSelectorProps } from "./timeselector-types";
import {
  timeSelectorContainerStyles,
  timeSelectorHeaderStyles,
  timeSelectorGridStyles,
  timeSelectorInputStyles,
} from "./timeselector-config";

/**
 * Компонент TimeSelector
 */
export const TimeSelector: React.FC<TimeSelectorProps> = ({
  value,
  onChange,
  showSeconds = false,
  className = "",
}) => {
  // Получаем текущие часы, минуты и секунды
  const currentTime = value || new Date();
  const [hours, setHours] = useState(String(currentTime.getHours()).padStart(2, "0"));
  const [minutes, setMinutes] = useState(String(currentTime.getMinutes()).padStart(2, "0"));
  const [seconds, setSeconds] = useState(String(currentTime.getSeconds()).padStart(2, "0"));

  // Refs для автофокуса
  const minutesRef = useRef<HTMLInputElement>(null);
  const secondsRef = useRef<HTMLInputElement>(null);

  // Функция для создания новой даты с обновленным временем
  const createNewTime = (h: number, m: number, s: number) => {
    const newTime = value ? new Date(value) : new Date();
    newTime.setHours(h);
    newTime.setMinutes(m);
    newTime.setSeconds(s);
    return newTime;
  };

  // Обработка изменения часов
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setHours(val);
  };

  // Обработка изменения минут
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setMinutes(val);
  };

  // Обработка изменения секунд
  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 2);
    setSeconds(val);
  };

  // Обработка потери фокуса - валидация и сохранение
  const handleBlur = () => {
    // Валидация и форматирование
    const h = Math.min(23, Math.max(0, parseInt(hours) || 0));
    const m = Math.min(59, Math.max(0, parseInt(minutes) || 0));
    const s = Math.min(59, Math.max(0, parseInt(seconds) || 0));

    setHours(String(h).padStart(2, "0"));
    setMinutes(String(m).padStart(2, "0"));
    setSeconds(String(s).padStart(2, "0"));

    // Сохраняем изменения
    onChange?.(createNewTime(h, m, s));
  };

  // Обработка Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: "hours" | "minutes" | "seconds") => {
    if (e.key === "Enter") {
      if (field === "hours") {
        minutesRef.current?.focus();
        minutesRef.current?.select();
      } else if (field === "minutes" && showSeconds) {
        secondsRef.current?.focus();
        secondsRef.current?.select();
      } else {
        handleBlur();
      }
    }
  };

  return (
    <div className={`${timeSelectorContainerStyles.base} ${className}`}>
      {/* Header */}
      <div className={timeSelectorHeaderStyles.base}>
        Введите время
      </div>

      {/* Time inputs */}
      <div className={timeSelectorGridStyles.base}>
        {/* Часы */}
        <div className={timeSelectorGridStyles.column}>
          <label className={timeSelectorGridStyles.label}>Часы</label>
          <input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "hours")}
            onFocus={(e) => e.target.select()}
            className={timeSelectorInputStyles.input}
            placeholder="00"
            maxLength={2}
          />
        </div>

        {/* Разделитель */}
        <div className={timeSelectorGridStyles.separator}>:</div>

        {/* Минуты */}
        <div className={timeSelectorGridStyles.column}>
          <label className={timeSelectorGridStyles.label}>Минуты</label>
          <input
            ref={minutesRef}
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            onBlur={handleBlur}
            onKeyDown={(e) => handleKeyDown(e, "minutes")}
            onFocus={(e) => e.target.select()}
            className={timeSelectorInputStyles.input}
            placeholder="00"
            maxLength={2}
          />
        </div>

        {/* Секунды (опционально) */}
        {showSeconds && (
          <>
            <div className={timeSelectorGridStyles.separator}>:</div>
            <div className={timeSelectorGridStyles.column}>
              <label className={timeSelectorGridStyles.label}>Секунды</label>
              <input
                ref={secondsRef}
                type="text"
                value={seconds}
                onChange={handleSecondsChange}
                onBlur={handleBlur}
                onKeyDown={(e) => handleKeyDown(e, "seconds")}
                onFocus={(e) => e.target.select()}
                className={timeSelectorInputStyles.input}
                placeholder="00"
                maxLength={2}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TimeSelector;
