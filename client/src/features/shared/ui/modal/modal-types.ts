/**
 * Modal Component Types
 * 
 * Типы и интерфейсы для компонента Modal
 */

import { ReactNode } from "react";

/**
 * Размеры модального окна
 */
export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

/**
 * Позиция модального окна
 */
export type ModalPosition = "center" | "top" | "bottom";

/**
 * Свойства компонента Modal
 */
export interface ModalProps {
  /**
   * Открыто ли модальное окно
   */
  isOpen?: boolean;

  /**
   * Callback при изменении состояния открытия
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Callback при закрытии модального окна
   */
  onClose?: () => void;

  /**
   * Триггер для открытия модального окна
   * Может быть любым React элементом
   */
  trigger?: ReactNode;

  /**
   * Содержимое модального окна
   */
  children: ReactNode;

  /**
   * Размер модального окна
   * @default "md"
   */
  size?: ModalSize;

  /**
   * Позиция модального окна
   * @default "center"
   */
  position?: ModalPosition;

  /**
   * Заголовок модального окна
   */
  title?: string | React.ReactNode;

  /**
   * Описание модального окна (под заголовком)
   */
  description?: string;

  /**
   * Показывать ли кнопку закрытия
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Закрывать ли модальное окно при клике на backdrop
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Закрывать ли модальное окно при нажатии Escape
   * @default true
   */
  closeOnEscape?: boolean;

  /**
   * Блокировать ли прокрутку body при открытии
   * @default true
   */
  blockScroll?: boolean;

  /**
   * Дополнительные CSS классы для контейнера модального окна
   */
  className?: string;

  /**
   * Дополнительные CSS классы для backdrop
   */
  backdropClassName?: string;

  /**
   * Дополнительные CSS классы для контента
   */
  contentClassName?: string;

  /**
   * Показывать ли backdrop
   * @default true
   */
  showBackdrop?: boolean;

  /**
   * ID для aria-labelledby
   */
  ariaLabelledBy?: string;

  /**
   * ID для aria-describedby
   */
  ariaDescribedBy?: string;
}

/**
 * Свойства компонента ModalHeader
 */
export interface ModalHeaderProps {
  /**
   * Содержимое заголовка
   */
  children: ReactNode;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Свойства компонента ModalBody
 */
export interface ModalBodyProps {
  /**
   * Содержимое тела модального окна
   */
  children: ReactNode;

  /**
   * Дополнительные CSS классы
   */
  className?: string;
}

/**
 * Свойства компонента ModalFooter
 */
export interface ModalFooterProps {
  /**
   * Содержимое футера
   */
  children: ReactNode;

  /**
   * Дополнительные CSS классы
   */
  className?: string;

  /**
   * Выравнивание содержимого
   * @default "right"
   */
  align?: "left" | "center" | "right" | "between";
}

