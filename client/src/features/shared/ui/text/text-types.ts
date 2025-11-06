import { type ReactNode } from "react";

/**
 * HTML элементы для рендеринга текста
 */
export type TextElement = 
    | "h1" 
    | "h2" 
    | "h3" 
    | "h4" 
    | "h5" 
    | "h6" 
    | "p" 
    | "span" 
    | "label";

/**
 * Варианты типографики
 */
export type TextVariant = 
    | "h1" 
    | "h2" 
    | "h3" 
    | "h4" 
    | "h5" 
    | "h6" 
    | "body-large" 
    | "body" 
    | "body-small" 
    | "caption" 
    | "lead";

/**
 * Варианты анимаций
 */
export type TextAnimation = 
    | "fadeIn"      // Плавное появление
    | "slideUp"     // Появление снизу
    | "slideDown"   // Появление сверху
    | "scale"       // Увеличение
    | "bounce"      // Прыжок
    | "glow"        // Пульсация/свечение
    | "typewriter"  // Печатающийся текст
    | "reveal";     // Выплывание из-за цветового фона

/**
 * Props для компонента Text
 */
export interface TextProps {
    /** HTML элемент для рендеринга */
    as?: TextElement;
    /** Вариант типографики */
    variant?: TextVariant;
    /** Дополнительные CSS классы */
    className?: string;
    /** Содержимое */
    children: ReactNode;
    /** URL для ссылки */
    href?: string;
    /** Анимация появления */
    animation?: TextAnimation;
    /** Задержка анимации (в секундах) */
    animationDelay?: number;
    /** Запускать анимацию при появлении в области видимости */
    whileInView?: boolean;
    /** Запускать анимацию только один раз */
    once?: boolean;
    /** Зациклить анимацию (бесконечное повторение) */
    loop?: boolean;
    /** Цвет фона для reveal анимации (например: "rgb(239, 68, 68)" или "#ef4444") */
    revealColor?: string;
    /** Дополнительные HTML атрибуты */
    [key: string]: any;
}

