import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import clsx from "clsx";
import type { TextProps } from "./text-types";
import { getVariantStyles, linkStyles, textAnimations, revealOverlayConfig } from "./text-config";

/**
 * Компонент для анимации печатания текста по символам
 */
function TypewriterText({ 
    Component, 
    variantClass, 
    className, 
    animationDelay,
    whileInView,
    once,
    loop,
    props,
    children 
}: any) {
    const text = typeof children === "string" ? children : "";
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(!whileInView);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (!isStarted || (once && hasAnimated && !loop)) return;

        // Задержка перед началом анимации
        const startTimeout = setTimeout(() => {
            setHasAnimated(true);
        }, animationDelay * 1000);

        return () => clearTimeout(startTimeout);
    }, [animationDelay, isStarted, once, hasAnimated, loop]);

    useEffect(() => {
        if (!hasAnimated) return;

        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 50); // 50ms между символами

            return () => clearTimeout(timeout);
        } else if (loop && currentIndex >= text.length) {
            // Перезапуск анимации для loop
            const resetTimeout = setTimeout(() => {
                setDisplayedText("");
                setCurrentIndex(0);
            }, 1000); // Пауза перед повтором

            return () => clearTimeout(resetTimeout);
        }
    }, [currentIndex, text, hasAnimated, loop]);

    if (whileInView) {
        const MotionComponent = motion(Component);
        return (
            <MotionComponent
                className={clsx(variantClass, className, "inline-block")}
                onViewportEnter={() => {
                    if (!once || !hasAnimated) {
                        setIsStarted(true);
                    }
                }}
                viewport={{ once: once ?? true }}
                {...props}
            >
                {displayedText}
                {currentIndex < text.length && hasAnimated && (
                    <motion.span
                        className="inline-block w-0.5 h-[1em] bg-black ml-0.5 align-middle"
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                    />
                )}
            </MotionComponent>
        );
    }

    return (
        <Component
            className={clsx(
                variantClass,
                className,
                "inline-block"
            )}
            {...props}
        >
            {displayedText}
            {currentIndex < text.length && (
                <motion.span
                    className="inline-block w-0.5 h-[1em] bg-black ml-0.5 align-middle"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
            )}
        </Component>
    );
}

/**
 * Компонент Text - единая система типографики с анимациями
 * 
 * Предоставляет консистентную типографику во всем приложении
 * с адаптивными размерами, анимациями и настраиваемыми стилями через конфигурацию
 * 
 * @example
 * ```tsx
 * <Text variant="h1">Заголовок</Text>
 * <Text as="p" variant="body">Основной текст</Text>
 * <Text variant="caption" className="text-gray-500">Подпись</Text>
 * <Text variant="h2" animation="fadeIn">Анимированный заголовок</Text>
 * <Text variant="body" animation="slideUp" animationDelay={0.2}>С задержкой</Text>
 * ```
 */
export default function Text({
    as,
    variant = "body",
    className = "",
    href,
    animation,
    animationDelay = 0,
    whileInView = false,
    once = true,
    loop = false,
    revealColor,
    children,
    ...props
}: TextProps) {
    // Определяем компонент для рендеринга
    const Component = (as || (variant.startsWith("h") ? variant : "p")) as any;
    
    // Получаем стили варианта
    const variantClass = getVariantStyles(variant);

    // Получаем конфигурацию анимации
    const animationConfig = animation ? textAnimations[animation] : null;
    
    // Цвет для reveal анимации
    const revealBackgroundColor = revealColor || revealOverlayConfig.backgroundColor;
    
    // Модифицируем transition для loop
    const getTransitionWithLoop = (baseTransition: any) => {
        if (!loop) return baseTransition;
        return {
            ...baseTransition,
            repeat: Infinity,
            repeatType: "loop" as const,
        };
    };

    // Специальная обработка для typewriter анимации
    if (animation === "typewriter") {
        return <TypewriterText 
            Component={Component}
            variantClass={variantClass}
            className={className}
            animationDelay={animationDelay}
            whileInView={whileInView}
            once={once}
            loop={loop}
            props={props}
        >
            {children}
        </TypewriterText>;
    }

    // Специальная обработка для reveal анимации
    if (animation === "reveal") {
        const MotionComponent = motion(Component);
        
        return (
            <div className="relative inline-block overflow-hidden">
                <MotionComponent
                    className={clsx(variantClass, className)}
                    initial={animationConfig?.initial}
                    {...(whileInView 
                        ? { whileInView: animationConfig?.animate }
                        : { animate: animationConfig?.animate }
                    )}
                    viewport={{ once }}
                    transition={getTransitionWithLoop({
                        ...animationConfig?.transition,
                        delay: animationDelay,
                    })}
                    {...props}
                >
                    {children}
                </MotionComponent>
                <motion.div
                    className="absolute inset-0 origin-left"
                    style={{ backgroundColor: revealBackgroundColor }}
                    initial={{ scaleX: 1 }}
                    {...(whileInView 
                        ? { whileInView: { scaleX: 0 } }
                        : { animate: { scaleX: 0 } }
                    )}
                    viewport={{ once }}
                    transition={getTransitionWithLoop({
                        ...revealOverlayConfig.transition,
                        delay: animationDelay,
                    })}
                />
            </div>
        );
    }

    // Если есть анимация, используем motion компонент
    if (animation && animationConfig) {
        const MotionComponent = motion(Component);
        
        return (
            <MotionComponent
                initial={animationConfig.initial}
                {...(whileInView 
                    ? { whileInView: animationConfig.animate }
                    : { animate: animationConfig.animate }
                )}
                viewport={{ once }}
                transition={getTransitionWithLoop({
                    ...animationConfig.transition,
                    delay: animationDelay,
                })}
                className={clsx(variantClass, className)}
                {...props}
            >
                {children}
            </MotionComponent>
        );
    }

    // Если передан href, рендерим ссылку
    if (href) {
        return (
            <Link
                href={href}
                className={clsx(
                    linkStyles.base,
                    linkStyles.hover,
                    linkStyles.transition,
                    variantClass,
                    className
                )}
                {...props}
            >
                {children}
            </Link>
        );
    }

    // Обычный текстовый элемент
    return (
        <Component className={clsx(variantClass, className)} {...props}>
            {children}
        </Component>
    );
}