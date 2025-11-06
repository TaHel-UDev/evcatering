/**
 * Modal Component
 * 
 * Универсальный компонент модального окна с поддержкой:
 * - Различных размеров (sm, md, lg, xl, full)
 * - Различных позиций (center, top, bottom)
 * - Любых триггеров (не только кнопки)
 * - Закрытия по клику вне окна или Escape
 * - Блокировки прокрутки body
 * - Анимаций через framer-motion
 * - Portal для рендеринга вне DOM-дерева
 */

import React, { useEffect, useState, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import {
  ModalProps,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from "./modal-types";
import {
  modalBackdropStyles,
  modalContainerStyles,
  modalContentStyles,
  modalSizeStyles,
  modalCloseButtonStyles,
  modalHeaderStyles,
  modalBodyStyles,
  modalFooterStyles,
  modalAnimations,
} from "./modal-config";

/**
 * Компонент Modal
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen: controlledIsOpen,
  onOpenChange,
  onClose,
  trigger,
  children,
  size = "md",
  position = "center",
  title,
  description,
  showCloseButton = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  blockScroll = true,
  className = "",
  backdropClassName = "",
  contentClassName = "",
  showBackdrop = true,
  ariaLabelledBy,
  ariaDescribedBy,
}) => {
  // Внутреннее состояние для uncontrolled режима
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Определяем, используется ли controlled режим
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  // Обработчик открытия/закрытия
  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setInternalIsOpen(open);
    }
    onOpenChange?.(open);
    if (!open) {
      onClose?.();
    }
  };

  // Блокировка прокрутки body при открытии
  useEffect(() => {
    if (isOpen && blockScroll) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, blockScroll]);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape]);

  // Обработчик клика по backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      handleOpenChange(false);
    }
  };

  // Клонируем trigger и добавляем обработчик открытия
  const triggerElement = trigger && isValidElement(trigger)
    ? cloneElement(trigger as React.ReactElement<any>, {
        onClick: (e: React.MouseEvent) => {
          // Вызываем оригинальный onClick, если он есть
          const originalOnClick = (trigger as any).props?.onClick;
          originalOnClick?.(e);
          // Открываем модальное окно
          handleOpenChange(true);
        },
      })
    : null;

  // Определяем контейнер для позиционирования
  const containerClass = 
    position === "top" ? modalContainerStyles.top :
    position === "bottom" ? modalContainerStyles.bottom :
    modalContainerStyles.base;

  // Определяем анимацию в зависимости от позиции
  const contentAnimation = 
    position === "top" ? modalAnimations.contentTop :
    position === "bottom" ? modalAnimations.contentBottom :
    modalAnimations.content;

  // Стили контента
  const contentClasses = [
    modalContentStyles.base,
    modalSizeStyles[size],
    contentClassName,
  ]
    .filter(Boolean)
    .join(" ");

  // ID для accessibility
  const titleId = ariaLabelledBy || (title ? "modal-title" : undefined);
  const descriptionId = ariaDescribedBy || (description ? "modal-description" : undefined);

  // Модальное окно
  const modalContent = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          {showBackdrop && (
            <motion.div
              className={[modalBackdropStyles.base, backdropClassName]
                .filter(Boolean)
                .join(" ")}
              onClick={handleBackdropClick}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={modalAnimations.backdrop}
            />
          )}

          {/* Modal Container */}
          <div className={containerClass} onClick={handleBackdropClick}>
            <motion.div
              className={contentClasses}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={contentAnimation}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              {showCloseButton && (
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
                  className={modalCloseButtonStyles.base}
                  aria-label="Закрыть"
                >
                  <X size={20} />
                </button>
              )}

              {/* Title & Description */}
              {(title || description) && (
                <div className={modalHeaderStyles.base}>
                  {title && (
                    <h2 id={titleId} className={modalHeaderStyles.title}>
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id={descriptionId} className={modalHeaderStyles.description}>
                      {description}
                    </p>
                  )}
                </div>
              )}

              {/* Content */}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {triggerElement}
      {typeof window !== "undefined" && createPortal(modalContent, document.body)}
    </>
  );
};

/**
 * Компонент ModalHeader
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className = "",
}) => {
  const classes = [modalHeaderStyles.base, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
};

/**
 * Компонент ModalBody
 */
export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = "",
}) => {
  const classes = [modalBodyStyles.base, className].filter(Boolean).join(" ");
  return <div className={classes}>{children}</div>;
};

/**
 * Компонент ModalFooter
 */
export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = "",
  align = "right",
}) => {
  const alignClass =
    align === "left"
      ? modalFooterStyles.alignLeft
      : align === "center"
      ? modalFooterStyles.alignCenter
      : align === "between"
      ? modalFooterStyles.alignBetween
      : modalFooterStyles.alignRight;

  const classes = [modalFooterStyles.base, alignClass, className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
};

Modal.displayName = "Modal";
ModalHeader.displayName = "ModalHeader";
ModalBody.displayName = "ModalBody";
ModalFooter.displayName = "ModalFooter";

export default Modal;

