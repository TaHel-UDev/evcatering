/**
 * Пример использования типизированного квиза
 * 
 * Этот файл демонстрирует, как использовать createQuizConfig
 * для получения автодополнения ID вопросов и результатов
 */

import { createQuizConfig } from "./quiz-types";
import { CheckCircle, XCircle } from "lucide-react";

/**
 * ✨ Создаем конфиг с помощью createQuizConfig
 * TypeScript автоматически выведет типы и будет подсказывать ID!
 */
export const typedQuizConfig = createQuizConfig({
  questions: [
    {
      id: "start",
      title: "У вас уже есть сайт?",
      type: "boolean" as const,
      options: [
        {
          id: "has_yes",
          label: "Да, есть",
          value: true,
          // ✅ TypeScript подскажет: "start" | "improve" | "budget" | "type" | "details"
          nextQuestionId: "improve",
        },
        {
          id: "has_no",
          label: "Нет, нужно создать",
          value: false,
          // ✅ TypeScript подскажет доступные ID вопросов
          nextQuestionId: "type",
        },
      ],
    },
    {
      id: "improve",
      title: "Что нужно улучшить?",
      type: "multiple" as const,
      options: [
        { id: "imp_1", label: "Дизайн", value: "design" },
        { id: "imp_2", label: "Скорость", value: "speed" },
        { id: "imp_3", label: "SEO", value: "seo" },
      ],
    },
    {
      id: "budget",
      title: "Какой бюджет?",
      type: "single" as const,
      options: [
        { id: "b1", label: "До 30К", value: "small" },
        { id: "b2", label: "30-100К", value: "medium" },
        { id: "b3", label: "Более 100К", value: "large" },
      ],
    },
    {
      id: "type",
      title: "Какой тип сайта?",
      type: "single" as const,
      options: [
        {
          id: "type_landing",
          label: "Лендинг",
          value: "landing",
          // ✅ TypeScript подскажет: "result_landing" | "result_corporate" | "result_shop" | "result_default"
          resultId: "result_landing",
        },
        {
          id: "type_corporate",
          label: "Корпоративный",
          value: "corporate",
          // ✅ Автодополнение результатов
          resultId: "result_corporate",
        },
        {
          id: "type_shop",
          label: "Магазин",
          value: "shop",
          // ✅ Защита от опечаток
          resultId: "result_shop",
        },
        {
          id: "type_other",
          label: "Другое",
          value: "other",
          // ✅ Или переход к вопросу
          nextQuestionId: "details",
        },
      ],
    },
    {
      id: "details",
      title: "Опишите подробнее",
      type: "text" as const,
      placeholder: "Расскажите о проекте...",
    },
  ],
  results: [
    {
      id: "result_landing",
      title: "Лендинг — быстро и эффективно",
      description: "От 25 000 ₽, срок 5-7 дней",
      buttonText: "Получить КП",
    },
    {
      id: "result_corporate",
      title: "Корпоративный сайт",
      description: "От 70 000 ₽, срок 2-3 недели",
      buttonText: "Обсудить проект",
    },
    {
      id: "result_shop",
      title: "Интернет-магазин",
      description: "От 120 000 ₽, срок 3-4 недели",
      buttonText: "Консультация",
    },
    {
      id: "result_default",
      title: "Поможем реализовать!",
      description: "Обсудим детали и подберем решение",
      buttonText: "Связаться",
    },
  ],
  // ✅ TypeScript подскажет ID стартового вопроса
  startQuestionId: "start",
  settings: {
    showProgress: true,
    showBackButton: true,
    animated: true,
    title: "Подбор решения",
  },
});

/**
 * ❌ Пример ОШИБКИ: неправильный ID
 * 
 * Если раскомментировать этот код, TypeScript покажет ошибку:
 */
/*
export const incorrectConfig = createQuizConfig({
  questions: [
    {
      id: "q1",
      title: "Вопрос",
      type: "boolean" as const,
      options: [
        {
          id: "opt1",
          label: "Да",
          nextQuestionId: "non_existent_question", // ❌ Ошибка! Такого вопроса нет
        },
      ],
    },
  ],
  results: [
    {
      id: "result1",
      title: "Результат",
    },
  ],
});
*/

/**
 * 💡 СОВЕТ: Используйте as const для литеральных типов
 * 
 * Без as const:
 * type: "boolean" → тип будет string
 * 
 * С as const:
 * type: "boolean" as const → тип будет именно "boolean"
 */

/**
 * 🎯 Альтернативный способ - через as const для всего конфига
 */
export const alternativeConfig = {
  questions: [
    {
      id: "start",
      title: "Начальный вопрос",
      type: "boolean",
      options: [
        {
          id: "yes",
          label: "Да",
          nextQuestionId: "next",
        },
      ],
    },
    {
      id: "next",
      title: "Следующий",
      type: "text",
    },
  ],
  results: [
    {
      id: "result",
      title: "Результат",
    },
  ],
} as const;

// Используем TypedQuizConfig для типизации
// type AlternativeConfigType = TypedQuizConfig<typeof alternativeConfig>;

