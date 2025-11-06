/**
 * Конфигурация стилей для компонента Text
 * 
 * Этот файл содержит все настройки типографики.
 * Изменяйте значения здесь для быстрой кастомизации компонента в новых проектах.
 */

import type { TextVariant } from "./text-types";

/**
 * ============================================================================
 * СТИЛИ ВАРИАНТОВ ТЕКСТА
 * ============================================================================
 */

/**
 * Базовые стили для каждого варианта типографики
 * Включает размеры шрифта, высоту строки, вес шрифта и адаптивные размеры
 */
export const textVariantStyles: Record<TextVariant, string> = {
    /** Основной заголовок H1 (бывший Display) */
    h1: "2xl:text-[6.25rem] leading-[1] lg:text-[4.5rem] md:text-[3.5rem] sm:text-[3rem] max-sm:text-[2.5rem]",
    
    /** Заголовок второго уровня H2 */
    h2: "2xl:text-[3.25rem] leading-[1] lg:text-[2.5rem] md:text-[2rem] sm:text-[1.875rem] max-sm:text-[1.625rem]",
    
    /** Заголовок третьего уровня H3 */
    h3: "2xl:text-[2.25rem] leading-[1] lg:text-[1.75rem] md:text-[1.375rem] sm:text-[1.5rem] max-sm:text-[1.375rem]",
    
    /** Заголовок четвертого уровня H4 */
    h4: "2xl:text-[1.75rem] leading-[1] lg:text-[1.375rem] md:text-[1.125rem] sm:text-[1.25rem] max-sm:text-[1.125rem]",
    
    /** Заголовок пятого уровня H5 */
    h5: "2xl:text-[1.25rem] leading-[1] lg:text-[1.125rem] md:text-[1rem] sm:text-[1.125rem] max-sm:text-[1rem]",
    
    /** Заголовок шестого уровня H6 */
    h6: "2xl:text-[1rem] leading-[1] lg:text-[0.9375rem] md:text-[0.875rem] sm:text-[1rem] max-sm:text-[0.875rem]",
    
    /** Лидирующий текст (intro) - аналог Body L */
    lead: "2xl:text-[1.25rem] leading-[1.2] lg:text-[1.125rem] md:text-[1rem] sm:text-[1rem] max-sm:text-[1rem]",
    
    /** Крупный основной текст - аналог Body M */
    "body-large": "2xl:text-[1rem] leading-[1] lg:text-[0.9375rem] md:text-[0.875rem] sm:text-[1rem] max-sm:text-[0.875rem]",
    
    /** Стандартный основной текст */
    body: "2xl:text-[0.875rem] leading-[1] max-sm:text-[0.75rem]",
    
    /** Мелкий основной текст - аналог Caption */
    "body-small": "text-[0.75rem] leading-[1] max-sm:text-[0.6875rem]",
    
    /** Подпись (caption) - аналог Small/Label */
    caption: "text-[0.6875rem] leading-[1] font-normal",
};

/**
 * Стили для ссылок
 */
export const linkStyles = {
    /** Базовые стили ссылки */
    base: "",
    /** Hover состояние */
    hover: "hover:opacity-80",
    /** Transition */
    transition: "transition-opacity duration-200",
} as const;

/**
 * ============================================================================
 * АНИМАЦИИ
 * ============================================================================
 */

/**
 * Конфигурация анимаций для текста
 */
export const textAnimations = {
    /** Плавное появление с прозрачности */
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
    
    /** Появление снизу с движением вверх */
    slideUp: {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
    
    /** Появление сверху с движением вниз */
    slideDown: {
        initial: { opacity: 0, y: -30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
    },
    
    /** Увеличение от меньшего размера */
    scale: {
        initial: { opacity: 0, scale: 0.85 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
    },
    
    /** Прыжок с эффектом отскока */
    bounce: {
        initial: { opacity: 0, y: -40 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: 0.8,
            ease: [0.68, -0.55, 0.265, 1.55],
        },
    },
    
    /** Пульсирующее свечение */
    glow: {
        initial: { opacity: 0.3, scale: 0.95 },
        animate: { 
            opacity: 1, 
            scale: 1,
        },
        transition: {
            duration: 1.2,
            ease: "easeInOut",
            repeat: 2,
            repeatType: "reverse" as const,
        },
    },
    
    /** Печатающийся текст - используется через CSS */
    typewriter: {
        initial: {},
        animate: {},
        transition: {},
    },
    
    /** Выплывание из-за цветового фона */
    reveal: {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
} as const;

/**
 * Настройки для анимации reveal (цветовой фон)
 */
export const revealOverlayConfig = {
    initial: { scaleX: 0 },
    animate: { scaleX: 0 },
    exit: { scaleX: 1 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    backgroundColor: "rgb(59, 130, 246)", // Непрозрачный синий
} as const;

/**
 * Настройки длительности анимаций
 */
export const animationDurations = {
    fadeIn: 0.8,
    slideUp: 0.7,
    slideDown: 0.7,
    scale: 0.6,
    bounce: 0.8,
    glow: 1.2,
    typewriter: 2,
    reveal: 0.8,
} as const;

/**
 * ============================================================================
 * УТИЛИТЫ
 * ============================================================================
 */

/**
 * Тип для переопределения конфигурации стилей
 */
export type TextStylesConfig = {
    variants?: Partial<typeof textVariantStyles>;
    link?: Partial<typeof linkStyles>;
    animations?: Partial<typeof textAnimations>;
};

/**
 * Функция для получения стилей варианта с фоллбэком
 */
export function getVariantStyles(variant: TextVariant): string {
    return textVariantStyles[variant] || textVariantStyles.body;
}

/**
 * ============================================================================
 * ПРИМЕРЫ КАСТОМИЗАЦИИ
 * ============================================================================
 * 
 * Пример 1: Изменение размеров заголовков
 * ```ts
 * export const textVariantStyles = {
 *   ...textVariantStyles,
 *   h1: "text-[5rem] leading-[1.1] font-black",
 * };
 * ```
 * 
 * Пример 2: Изменение стилей ссылок
 * ```ts
 * export const linkStyles = {
 *   ...linkStyles,
 *   base: "underline decoration-2 underline-offset-4",
 * };
 * ```
 * 
 * Пример 3: Добавление цветов по умолчанию
 * ```ts
 * export const textVariantStyles = {
 *   ...textVariantStyles,
 *   body: "text-[1rem] leading-[1.5] font-normal text-gray-800",
 * };
 * ```
 * 
 * Пример 4: Настройка анимаций
 * ```ts
 * export const textAnimations = {
 *   ...textAnimations,
 *   fadeIn: {
 *     ...textAnimations.fadeIn,
 *     transition: { duration: 1, ease: "easeOut" },
 *   },
 * };
 * ```
 * 
 * Пример 5: Изменение цвета фона для reveal анимации
 * ```ts
 * export const revealOverlayConfig = {
 *   ...revealOverlayConfig,
 *   backgroundColor: "rgb(239, 68, 68)", // Красный цвет
 * };
 * ```
 */

