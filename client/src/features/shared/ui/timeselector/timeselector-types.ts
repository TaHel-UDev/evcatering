/**
 * TimeSelector Component Types
 * 
 * Типы и интерфейсы для компонента TimeSelector
 */

/**
 * Свойства компонента TimeSelector
 */
export interface TimeSelectorProps {
  /**
   * Выбранное время (Date объект)
   */
  value?: Date | null;

  /**
   * Обработчик изменения времени
   */
  onChange?: (time: Date) => void;

  /**
   * Показывать секунды
   * @default false
   */
  showSeconds?: boolean;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}



